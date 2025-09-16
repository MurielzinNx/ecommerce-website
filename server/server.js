
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// CONFIG - replace with env vars in production
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_with_a_secure_random_string';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_replace';
const stripe = Stripe(STRIPE_SECRET_KEY);

// Initialize SQLite DB
const db = new sqlite3.Database('./database.sqlite');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    theme TEXT DEFAULT 'light'
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    price INTEGER,
    description TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    items TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    items TEXT,
    total INTEGER,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Helper functions
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
}

function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'email and password required' });
  const hashed = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users (name,email,password) VALUES (?,?,?)`, [name,email,hashed], function(err){
    if(err) return res.status(400).json({ error: err.message });
    const user = { id: this.lastID, name, email };
    const token = generateToken(user);
    res.json({ user, token });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(400).json({ error: 'User not found' });
    const ok = await bcrypt.compare(password, row.password);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const user = { id: row.id, name: row.name, email: row.email, theme: row.theme };
    const token = generateToken(user);
    res.json({ user, token });
  });
});

// Theme endpoints
app.get('/api/user/theme', authenticate, (req,res)=>{
  db.get(`SELECT theme FROM users WHERE id = ?`, [req.user.id], (err,row)=>{
    if(err) return res.status(500).json({ error: err.message });
    res.json({ theme: row ? row.theme : 'light' });
  });
});
app.post('/api/user/theme', authenticate, (req,res)=>{
  const { theme } = req.body;
  db.run(`UPDATE users SET theme = ? WHERE id = ?`, [theme, req.user.id], function(err){
    if(err) return res.status(500).json({ error: err.message });
    res.json({ ok: true, theme });
  });
});

// Cart endpoints (simple, stored per user)
app.post('/api/cart/add', authenticate, (req,res)=>{
  const { items } = req.body; // items should be array [{productId, qty}, ...]
  const itemsStr = JSON.stringify(items || []);
  db.get(`SELECT * FROM carts WHERE userId = ?`, [req.user.id], (err,row)=>{
    if(err) return res.status(500).json({ error: err.message });
    if(row){
      db.run(`UPDATE carts SET items = ? WHERE id = ?`, [itemsStr, row.id], function(e){
        if(e) return res.status(500).json({ error: e.message });
        res.json({ ok:true });
      });
    } else {
      db.run(`INSERT INTO carts (userId, items) VALUES (?,?)`, [req.user.id, itemsStr], function(e){
        if(e) return res.status(500).json({ error: e.message });
        res.json({ ok:true });
      });
    }
  });
});
app.get('/api/cart', authenticate, (req,res)=>{
  db.get(`SELECT items FROM carts WHERE userId = ?`, [req.user.id], (err,row)=>{
    if(err) return res.status(500).json({ error: err.message });
    res.json({ items: row ? JSON.parse(row.items) : [] });
  });
});

// Orders and checkout
app.post('/api/checkout', authenticate, async (req,res)=>{
  try {
    const { items, paymentMethod } = req.body; // items array with price in cents
    const total = (items || []).reduce((s,i)=> s + (i.price * (i.qty||1)), 0);
    // Create Stripe PaymentIntent (example)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'brl',
      payment_method_types: ['card'],
      description: 'E-commerce order'
    });
    // Save order with status pending
    db.run(`INSERT INTO orders (userId, items, total, status) VALUES (?,?,?,?)`, [req.user.id, JSON.stringify(items), total, 'pending'], function(err){
      if(err) return res.status(500).json({ error: err.message });
      res.json({ clientSecret: paymentIntent.client_secret, orderId: this.lastID });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/orders', authenticate, (req,res)=>{
  db.all(`SELECT * FROM orders WHERE userId = ? ORDER BY created_at DESC`, [req.user.id], (err,rows)=>{
    if(err) return res.status(500).json({ error: err.message });
    res.json({ orders: rows });
  });
});

// Support via email
app.post('/api/support', (req,res)=>{
  const { name, email, message } = req.body;
  // Configure transporter - replace with env / real SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'user@example.com',
      pass: process.env.SMTP_PASS || 'password'
    }
  });
  const mailOptions = {
    from: email,
    to: process.env.SUPPORT_EMAIL || 'support@example.com',
    subject: `Suporte - nova dúvida de ${name}`,
    text: message
  };
  transporter.sendMail(mailOptions, (err, info)=>{
    if(err) {
      console.error('Mail error', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.json({ ok:true, info });
  });
});

// Simple products endpoint to seed/list
app.get('/api/products', (req,res)=>{
  db.all(`SELECT * FROM products`, [], (err,rows)=>{
    if(err) return res.status(500).json({ error: err.message });
    res.json({ products: rows });
  });
});

// Seed a few products if none exist
db.get(`SELECT COUNT(*) as c FROM products`, [], (err,row)=>{
  if(!err && row && row.c === 0){
    const sample = [
      ['Premium White Sneakers', 29990, 'Confortáveis e estilosas - R$299,90'],
      ['Wireless Headphones', 19990, 'Fones bluetooth com ótima qualidade - R$199,90'],
      ['Smartwatch Classic', 39990, 'Acompanhe sua saúde e notificações - R$399,90']
    ];
    const stmt = db.prepare(`INSERT INTO products (title,price,description) VALUES (?,?,?)`);
    for(const p of sample) stmt.run(p);
    stmt.finalize();
    console.log('Seeded products');
  }
});

const PORT = process.env.PORT || 4000;

// Stripe webhook endpoint to confirm payment and update order status
// Set STRIPE_WEBHOOK_SECRET in env to enable signature verification.
app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || null;
  let event;

  if (webhookSecret) {
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('⚠️  Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    // If no webhook secret configured, parse body (not secure) — only for testing
    try {
      event = JSON.parse(req.body.toString());
    } catch (err) {
      return res.status(400).send('Invalid payload');
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Your logic to mark order as paid. We assume metadata.orderId may be present.
      const orderId = paymentIntent.metadata ? paymentIntent.metadata.orderId : null;
      if (orderId) {
        db.run(`UPDATE orders SET status = ? WHERE id = ?`, ['paid', orderId], function(err){
          if(err) console.error('Failed to update order status:', err.message);
          else console.log('Order marked as paid:', orderId);
        });
      }
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed', event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});
app.listen(PORT, ()=> console.log('Server running on', PORT));

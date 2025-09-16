
'use client';
import { useEffect, useState } from 'react';
import { apiFetch, getToken } from '../../../components/Api';

export default function CartPage(){
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  useEffect(()=>{
    async function load(){
      try{
        const token = getToken();
        const data = await apiFetch('/api/cart', { token });
        setItems(data.items || []);
      }catch(err){
        setError(err.message);
      }
    }
    load();
  },[]);

  async function checkout(){
    try{
      const token = getToken();
      const data = await apiFetch('/api/checkout', { method: 'POST', token, body: { items, paymentMethod: 'card' } });
      // redirect to Stripe checkout or use clientSecret to confirm
      alert('Checkout iniciado. clientSecret: ' + data.clientSecret + '\nOrderId: ' + data.orderId);
    }catch(err){
      setError(err.message);
    }
  }

  return (
    <div style={{padding:20}}>
      <h1>Carrinho</h1>
      {error && <div style={{color:'red'}}>{error}</div>}
      <ul>
        {items.map((it,i)=> <li key={i}>{it.productId} — qty: {it.qty} — price: {it.price}</li>)}
      </ul>
      <button onClick={checkout}>Finalizar compra</button>
    </div>
  );
}

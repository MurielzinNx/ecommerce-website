
'use client';
import { useEffect, useState } from 'react';
import { apiFetch, getToken } from '../../components/Api';

export default function LojaPage(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    async function load(){
      const data = await apiFetch('/api/products');
      setProducts(data.products || []);
    }
    load();
  },[]);

  async function addToCart(product){
    try{
      const token = getToken();
      // basic: get cart, append, save
      const current = await apiFetch('/api/cart', { token });
      const items = current.items || [];
      const idx = items.findIndex(i=>i.productId===product.id);
      if(idx>-1) items[idx].qty += 1;
      else items.push({ productId: product.id, qty: 1, price: product.price });
      await apiFetch('/api/cart/add', { method: 'POST', token, body: { items } });
      alert('Adicionado ao carrinho');
    }catch(err){
      alert('Erro: ' + err.message);
    }
  }

  return (
    <div style={{padding:20}}>
      <h1>Loja</h1>
      <ul>
        {products.map(p=> (
          <li key={p.id} style={{marginBottom:10}}>
            <strong>{p.title}</strong> — R$ {(p.price/100).toFixed(2)}<br/>
            <button onClick={()=>addToCart(p)}>Adicionar ao carrinho</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

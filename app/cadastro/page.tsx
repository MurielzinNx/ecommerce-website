
'use client';
import { useState } from 'react';
import { apiFetch, saveToken } from '../../components/Api';

export default function RegisterPage(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  async function onSubmit(e){
    e.preventDefault();
    try{
      const data = await apiFetch('/api/auth/register', { method: 'POST', body: { name, email, password } });
      saveToken(data.token);
      window.location.href = '/';
    }catch(err){
      setError(err.message);
    }
  }
  return (
    <div style={{padding:20}}>
      <h1>Cadastro</h1>
      <form onSubmit={onSubmit}>
        <div><label>Nome</label><br/>
          <input value={name} onChange={e=>setName(e.target.value)} /></div>
        <div><label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label>Senha</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Cadastrar</button>
      </form>
      {error && <div style={{color:'red'}}>{error}</div>}
    </div>
  );
}


'use client';
import { useState } from 'react';
import { apiFetch, saveToken } from '../../components/Api';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  async function onSubmit(e){
    e.preventDefault();
    try{
      const data = await apiFetch('/api/auth/login', { method: 'POST', body: { email, password } });
      saveToken(data.token);
      // redirect to home
      window.location.href = '/';
    }catch(err){
      setError(err.message);
    }
  }
  return (
    <div style={{padding:20}}>
      <h1>Login</h1>
      <form id="login-form" onSubmit={onSubmit}>
        <div><label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div><label>Senha</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <button type="submit">Entrar</button>
      </form>
      {error && <div style={{color:'red'}}>{error}</div>}
    </div>
  );
}

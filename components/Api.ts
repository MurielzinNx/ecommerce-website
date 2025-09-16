export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export async function apiFetch(path, {method='GET', body=null, token=null} = {}){
  const headers = {'Content-Type':'application/json'};
  if(token) headers['Authorization'] = 'Bearer ' + token;
  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if(!res.ok) throw new Error(data.error || 'API error');
  return data;
}

export function saveToken(token){
  if(typeof window !== 'undefined'){
    localStorage.setItem('token', token);
  }
}
export function getToken(){
  if(typeof window !== 'undefined'){
    return localStorage.getItem('token');
  }
  return null;
}
export function logout(){
  if(typeof window !== 'undefined'){
    localStorage.removeItem('token');
  }
}

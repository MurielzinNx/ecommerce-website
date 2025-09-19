"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getToken, saveToken } from "@/components/Api";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiFetch("/login", {
        method: "POST",
        body: { email, senha },
      });

      saveToken(data.token);
      router.push("/carrinho-page"); // redireciona para o carrinho
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-80 p-6 bg-gray-100 rounded-xl shadow"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Login</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

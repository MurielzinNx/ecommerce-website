"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getToken, saveToken } from "@/components/api";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function CarrinhoPage() {
  const router = useRouter();
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregarCarrinho() {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login-page");
        return;
      }
      const data = await apiFetch("/carrinho", { token });
      setCarrinho(data.itens || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function removerItem(id: number) {
    try {
      const token = getToken();
      if (!token) return;
      await apiFetch(`/carrinho/${id}`, { method: "DELETE", token });
      setCarrinho((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  }

  function handleLogout() {
    logout();
    router.push("/login-page");
  }

  useEffect(() => {
    carregarCarrinho();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Meu Carrinho</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul className="space-y-3">
          {carrinho.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>
                {item.nome} - {item.quantidade}x R${item.preco.toFixed(2)}
              </span>
              <button
                onClick={() => removerItem(item.id)}
                className="text-red-600 hover:underline"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleLogout}
        className="mt-6 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
      >
        Sair
      </button>
    </div>
  );
}

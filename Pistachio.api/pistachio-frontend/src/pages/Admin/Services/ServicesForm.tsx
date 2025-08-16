import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Service {
  id?: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  isFeatured: boolean;
}

export default function ServiceForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<Service>({
    name: "",
    description: "",
    price: 0,
    isActive: true,
    isFeatured: false
  });

  const token = localStorage.getItem("token"); // pega token do localStorage

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setService(data))
        .catch(() => setError("Erro ao carregar serviço."));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = id ? "PUT" : "POST";
      const url = id ? `/api/services/${id}` : "/api/services";
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      navigate("/admin/services");
    } catch {
      setError("Erro ao salvar serviço.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-10">
        <h2 className="text-4xl font-bold text-gray-100 mb-8 text-center">
          {id ? "Editar Serviço" : "Novo Serviço"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Nome
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nome"
              className="w-full px-5 py-3 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
              value={service.name}
              onChange={(e) => setService({ ...service, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="description" className="sr-only">
              Descrição
            </label>
            <textarea
              id="description"
              placeholder="Descrição"
              className="w-full px-5 py-3 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
              value={service.description}
              onChange={(e) =>
                setService({ ...service, description: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="price" className="sr-only">
              Preço
            </label>
            <input
              id="price"
              type="number"
              placeholder="Preço"
              className="w-full px-5 py-3 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
              value={service.price}
              onChange={(e) =>
                setService({ ...service, price: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={service.isActive || false}
                onChange={(e) =>
                  setService({ ...service, isActive: e.target.checked })
                }
                className="accent-indigo-500"
              />
              <span>Ativo</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={service.isFeatured || false}
                onChange={(e) =>
                  setService({ ...service, isFeatured: e.target.checked })
                }
                className="accent-indigo-500"
              />
              <span>Destaque</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-indigo-400"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token"); // pega token do localStorage

   const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Erro ao buscar serviços");
      const data: Service[] = await res.json();
      setServices(data);
    } catch (err) {
      setError("Erro ao carregar serviços.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Erro ao deletar serviço");
      setServices(services.filter((s) => s.id !== id));
    } catch {
      setError("Erro ao excluir serviço.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

   return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-100">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Serviços</h1>
          <Link
            to="/admin/services/new"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md font-semibold transition"
          >
            Novo Serviço
          </Link>
        </div>

        <input
          type="text"
          placeholder="Buscar serviço..."
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4">Nome</th>
                <th className="py-2 px-4">Descrição</th>
                <th className="py-2 px-4">Preço</th>
                <th className="py-2 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-b border-gray-700">
                  <td className="py-2 px-4">{service.name}</td>
                  <td className="py-2 px-4">{service.description}</td>
                  <td className="py-2 px-4">R$ {service.price.toFixed(2)}</td>
                  <td className="py-2 px-4 space-x-2">
                    <Link
                      to={`/admin/services/${service.id}`}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
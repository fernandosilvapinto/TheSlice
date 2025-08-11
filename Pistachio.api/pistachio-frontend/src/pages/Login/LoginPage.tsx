// src/pages/Login/LoginPage.tsx
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Senha</label>
            <input type="password" className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

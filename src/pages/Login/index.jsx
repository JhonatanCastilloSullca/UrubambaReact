import { useState } from "react";
import { useAuth } from "../../components/Services/Auth/auth";

function Login() {
  const [usuario, setusuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }

      const data = await response.json();
      console.log("Login exitoso", data);

      login(data.data);

    } catch (err) {
      console.error("Error al iniciar sesión", err);
      setError("Error al iniciar sesión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full m-0 min-h-screen flex flex-col">
      <div className="page-content mt-0 flex-grow p-6 items-center flex bg-backAdmin-light dark:bg-backAdmin-dark">
        <div className="w-full mx-auto flex flex-row max-w-6xl">
          <div className="basis-5/12 bg-[url('https://i1.sndcdn.com/artworks-000102934157-8ipbcu-t500x500.jpg')] bg-cover bg-center"></div>
          <div className="basis-7/12">
            <div className="py-5 px-4">
              <a href="#" className="text-textAdmin-light dark:text-textAdmin-dark text-2xl font-bold">
                Municipalidad Provincial de Urubamba
              </a>
              <form onSubmit={handleSubmit}>
                <div className="mt-2">
                  <label
                    htmlFor="usuario"
                    className="block text-sm/6 font-medium text-textAdmin-light dark:text-textAdmin-dark"
                  >
                    Usuario
                  </label>
                  <div className="flex items-center rounded-md bg-white dark:bg-gray-800 pl-3 outline outline-1 -outline-offset-1 outline-backAdmin-light dark:outline-backAdmin-dark focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-backAdmin-dark">
                    <input
                      type="text"
                      name="usuario"
                      id="usuario"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 dark:text-textAdmin-light placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      placeholder="Usuario"
                      value={usuario}
                      onChange={(e) => setusuario(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-textAdmin-light dark:text-textAdmin-dark"
                  >
                    Password
                  </label>
                  <div className="flex items-center rounded-md bg-white dark:bg-gray-800 pl-3 outline outline-1 -outline-offset-1 outline-backAdmin-light dark:outline-backAdmin-dark focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-backAdmin-dark">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 dark:text-textAdmin-light placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="max-w-32 w-32 rounded py-3 px-5 mt-2 text-sm text-textAdmin-dark dark:text-backAdmin-dark bg-backAdmin-dark dark:bg-backAdmin-light hover:text-textAdmin-dark dark:hover:font-bold focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                  </button>
                </div>
              </form>

              {error && <div className="mt-2 text-red-500">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

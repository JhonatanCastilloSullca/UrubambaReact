import { useState } from "react";
import { useAuth } from "../../components/Services/Auth/auth";

function Login() {
    const { auth, login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, password });
    };

    return (
        <div className="w-full m-0 min-h-screen flex flex-col">
            <div className="page-content mt-0 flex-grow p-6 items-center flex bg-backAdmin-light dark:bg-backAdmin-dark">
                <div className="w-full mx-auto flex flex-row max-w-6xl">
                    <div className="basis-5/12 bg-[url('https://i1.sndcdn.com/artworks-000102934157-8ipbcu-t500x500.jpg')] bg-cover bg-center"></div>
                    <div className="basis-7/12">
                        <div className="py-5 px-4">
                            <a href="#" className="text-textAdmin-light dark:text-textAdmin-dark text-2xl font-bold">Municipalidad Provincial de Urubamba</a>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-2">
                                    <label
                                        htmlFor="username"
                                        className="block text-sm/6 font-medium text-textAdmin-light dark:text-textAdmin-dark">
                                        Username
                                    </label>
                                    <div className="flex items-center rounded-md bg-white dark:bg-gray-800 pl-3 outline outline-1 -outline-offset-1 outline-backAdmin-light dark:outline-backAdmin-dark focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-backAdmin-dark">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 dark:text-textAdmin-light placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            placeholder="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm/6 font-medium text-textAdmin-light dark:text-textAdmin-dark">
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
                                        className="max-w-32 w-32 rounded py-3 px-5 mt-2 text-sm text-textAdmin-dark dark:text-backAdmin-dark bg-backAdmin-dark dark:bg-backAdmin-light hover:text-textAdmin-dark dark:hover:font-bold focus:outline-none">
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

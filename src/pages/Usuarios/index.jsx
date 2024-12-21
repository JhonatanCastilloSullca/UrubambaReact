import { useEffect, useState } from "react";
import ErrorIcono from "../../assets/icons/errorIcono";
import Datatable from "../../components/Datatable";
import MainCard from "../../components/MainCard";

const columns = [
    {
        header: "ID",
        accessorKey: 'id',
    },
    {
        header: "Nombres",
        accessorKey: 'first_name',
    },
    {
        header: "Apellidos",
        accessorKey: 'last_name',
    },
    {
        header: "E-mail",
        accessorKey: 'email',
    },
    {
        header: "Genero",
        accessorKey: 'gender',
    },
    {
        header: "IP",
        accessorKey: 'ip_address',
    },
]

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchUsuarios = async () => {
            try {
                const response = await fetch("https://api.vertigotravelperu.com/api/users");

                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios");
                }

                const data = await response.json();
                setUsuarios(data);
            } catch (err) {
                setError("Error al obtener los usuarios. Intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <MainCard>
            <div className="">
                <h4 className="mb-4">Listado de Usuarios</h4>
                <button type="button" className="font-bold text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 gap-4">
                    <ErrorIcono strokeColor="#FFFFFF" />
                    Crear Usuario
                </button>
            </div>
            <Datatable columns={columns} data={usuarios} /> {/* Usar los datos de la API */}
        </MainCard>
    );
}

export default Usuarios;

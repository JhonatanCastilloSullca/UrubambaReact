import { useQuery } from '@tanstack/react-query';
import ErrorIcono from "../../assets/icons/errorIcono";
import Datatable from "../../components/Datatable";
import MainCard from "../../components/MainCard";



const columns = [
    {
        header: "ID",
        accessorKey: 'id',
    },
    {
        header: "Usuario",
        accessorKey: 'usuario',
    },
    {
        header: "Nombres",
        accessorKey: 'nombres',
    },
    {
        header: "Apellido Paterno",
        accessorKey: 'ape_paterno',
    },
    {
        header: "Apellido Materno",
        accessorKey: 'ape_materno',
    },
    {
        header: "E-mail",
        accessorKey: 'email',
    },
    {
        header: "Fecha de Creación",
        accessorKey: 'fecha_creacion',
    },
    {
        header: "Estado",
        accessorKey: 'estado',
    },
];

const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");


    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
    }

    const data = await response.json();
    return data.data;
};


function Usuarios() {
    const { data: usuarios, isLoading, isError, error } = useQuery({
        queryKey: ['usuarios'],
        queryFn: fetchUsuarios,
        retry: false,
    });



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div className="error-container">
                <ErrorIcono />
                <p>{error.message || "Error al obtener los usuarios. Intenta nuevamente."}</p>
            </div>
        );
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
            <Datatable columns={columns} data={usuarios.data} />
        </MainCard>
    );
}

export default Usuarios;

import { useQuery } from '@tanstack/react-query';
import ErrorIcono from "../../assets/icons/errorIcono";
import Datatable from "../../components/Datatable";
import MainCard from "../../components/MainCard";
import { useNavigate } from 'react-router-dom';



const columns = (navigate) => [
    {
        header: "ID",
        accessorKey: 'id',
    },
    {
        header: "Sector",
        accessorKey: 'unidad.cod_sector',
    },
    {
        header: "Manzana",
        accessorKey: 'unidad.cod_manzana',
    },
    {
        header: "Lote",
        accessorKey: 'unidad.cod_lote',
    },
    {
        header: "Direccion",
        accessorKey: 'direccion',
    },
    {
        header: "Fecha de Creación",
        accessorKey: 'fecha_creacion',
    },
    {
        header: "Acciones",
        accessorKey: 'acciones',
        cell: ({ row }) => (
            <button
                onClick={() => navigate(`/impresion/ficha-registro-catalogacion-inmuebles/${row.original.id}`)}
                className="btn btn-primary"
            >
                Ver detalles
            </button>
        ),
    },
];

const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");


    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-inmueble`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
    }

    const data = await response.json();
    return data;
};


function ImpresionFichaRegistroHistorico() {

    const navigate = useNavigate();   



    const { data: usuarios, isLoading, isError, error } = useQuery({
        queryKey: ['usuarios'],
        queryFn: fetchUsuarios,
        retry: false,
    });


    console.log('Datos de usuarios:', usuarios);

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


            </div>
            <Datatable columns={columns(navigate)} data={usuarios.data} />
        </MainCard>
    );
}

export default ImpresionFichaRegistroHistorico;



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
];

const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");


    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-registro-historico`, {
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
            <Datatable columns={columns} data={usuarios.data} />
        </MainCard>
    );
}

export default ImpresionFichaRegistroHistorico;



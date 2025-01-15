import { useQuery, useQueryClient } from '@tanstack/react-query';
import ErrorIcono from "../../../assets/icons/errorIcono";
import Datatable from "../../../components/Datatable";
import MainCard from "../../../components/MainCard";
import { useNavigate } from 'react-router-dom';

const columns = (navigate, handleDelete) => [
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
            <div className="flex gap-2">
                <button
                    onClick={() => navigate(`/impresion/ficha-registro-catalogacion-inmuebles-area-monumental/${row.original.id}`)}
                    className="btn btn-primary"
                >
                    Ver Ficha
                </button>
                <button
                    onClick={() => navigate(`/edit/edit-ficha-registro-catalogacion-inmuebles-area-monumental/${row.original.id}`)}
                    className="btn btn-primary"
                >
                    Editar Ficha
                </button>
                <button
                    onClick={() => handleDelete(row.original.id)}
                    className="btn btn-danger"
                >
                    Eliminar
                </button>
            </div>
        ),
    },
];

const fetchUsuarios = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-inmueble-arquitectonica`, {
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
    const queryClient = useQueryClient();

    const { data: usuarios, isLoading, isError, error } = useQuery({
        queryKey: ['usuarios'],
        queryFn: fetchUsuarios,
        retry: false,
    });

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-inmueble-arquitectonica/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert("Registro eliminado exitosamente.");
                    queryClient.invalidateQueries(['usuarios']);
                } else {
                    const errorData = await response.json();
                    console.error("Error al eliminar:", errorData);
                    alert("Hubo un problema al eliminar el registro.");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("Ocurrió un error al intentar eliminar el registro.");
            }
        }
    };

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
            <div>
                <h4 className="mb-4">Listado de Usuarios</h4>
            </div>
            <Datatable columns={columns(navigate, handleDelete)} data={usuarios.data} />
        </MainCard>
    );
}

export default ImpresionFichaRegistroHistorico;

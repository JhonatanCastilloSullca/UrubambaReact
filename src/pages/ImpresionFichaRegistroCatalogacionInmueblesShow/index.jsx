import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ErrorIcono from "../../assets/icons/errorIcono";

const fetchFichaRegistroHistorico = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-registro-historico/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener la ficha de registro histórico');
    }

    const data = await response.json();
    return data;
};

function ImpresionFichaRegistroCatalogacionInmueblesShow() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['fichaRegistroHistorico', id],
        queryFn: () => fetchFichaRegistroHistorico(id),
        retry: false,
    });

    // Aquí agregamos el console.log para ver los datos de la consulta.
    if (isLoading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center flex-col space-y-4">
                <ErrorIcono className="w-16 h-16 text-red-600" />
                <p className="text-red-600">{error.message || "Error al obtener los datos. Intenta nuevamente."}</p>
            </div>
        );
    }

    console.log("Datos obtenidos:", data);

    return (
        <div className="px-6 py-4 max-w-7xl mx-auto">
            <table className="min-w-full table-auto border-separate border-spacing-2">
                <tbody>
                    <tr>
                        <td colSpan="4" className="text-xl font-bold bg-gray-600 text-white px-4 py-2 text-center">FICHA DE REGISTRO HISTÓRICO – REGISTRO DE INMUEBLE URBANO</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td colSpan={4} className="px-4 py-2 font-medium">Dirección: {data.data.direccion}</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td colSpan={1} className="px-4 py-2 font-medium">Sector:</td>
                        <td colSpan={1} className="px-4 py-2 font-medium">Manzana:</td>
                        <td colSpan={2} className="px-4 py-2 font-medium">Lote:</td>
                    </tr>
                    <tr className="bg-gray-50">
                        <td colSpan={1} className="px-4 py-2 font-medium">Fecha: {data.data.fecha_creacion}</td>
                        <td colSpan={1} className="px-4 py-2 font-medium">PROPIETARIOS <br></br>Y/O ARRENDATARIO:</td>
                        <td colSpan={1} className="px-4 py-2 font-medium">DESCRIPCIÓN:</td>
                        <td colSpan={1} className="px-4 py-2 font-medium">FUENTE:</td>
                    </tr>
                    <tr className="bg-gray-100">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="4" className="text-xl font-semibold bg-gray-200 px-4 py-2 ">Registrado: {data.data.registrado}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ImpresionFichaRegistroCatalogacionInmueblesShow;

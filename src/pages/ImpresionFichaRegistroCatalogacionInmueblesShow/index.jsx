import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ErrorIcono from "../../assets/icons/errorIcono";
import OnlyLabelTd from '../../components/OnlyLabelTd';

const fetchFichaRegistroHistorico = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-inmueble/${id}`, {
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
        <div className="flex flex-col w-full ">
            <div className="mx-auto flex w-full border-2 border-black">
                <div className="h-56 w-96 bg-white flex justify-center items-center">x</div>
                <div className='flex w-full flex-col'>
                    <div className="h-28 flex w-full">
                        <div className="w-full flex flex-col">
                            <div className="h-14 flex justify-center items-center bg-cyan-500 font-bold ">FICHA DE REGISTRO DE CATALOGACION DE INMUEBLES - ARQUITECTURA</div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-5 bg-white flex">
                                    <div className="h-14 w-7 bg-blue-400 flex justify-center items-center">
                                        1
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                            CODIGO UNICO CATASTRAL - CUC
                                        </div>
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.cod_unico_catastral}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 bg-white flex">
                                    <div className="h-14 w-7 bg-blue-400 flex justify-center items-center">
                                        2
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                            CODIGO HOJA CATASTRAL
                                        </div>
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.cod_hoja_catastral}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 bg-white flex">
                                    <div className="h-14 w-7 bg-blue-400 flex justify-center items-center">
                                        <span className="rotate-90">191</span>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                            N° DE FICHA
                                        </div>
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.num_ficha}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="h-28 w-28 bg-white flex justify-center items-center">x</div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-9 bg-white flex flex-col">
                            <div className="h-7 flex justify-center items-center bg-cyan-500 font-bold ">CODIGO DE REFERENCIA CATASTRAL</div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-3 bg-white flex flex-col">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        UBIGEO
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                            DEP.
                                        </div><div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                            PROV.
                                        </div><div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                            DIST.
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_dep}
                                        </div>
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_prov}
                                        </div>
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_dist}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            SECTOR
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_sector}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            MZNA.
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_manzana}.
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            LOTE
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_lote}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            FRACCION
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_fraccion}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            EDIFICA
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_edifica}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            ENTRADA
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_entrada}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            PISO
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_piso}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            UNIDAD
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_unidad}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            DC
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.unidad.cod_dc}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 bg-white flex flex-col">
                            <div className="h-7 flex justify-center items-center bg-cyan-500 font-bold ">CODIGO DE REGISTRO</div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-3 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            SECTOR
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.registro.cod_sector}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            MZNA.
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.registro.cod_manzana}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-3 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            LOTE
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.registro.cod_lote}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 bg-white flex flex-col">
                                    <div className="flex">
                                        <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex">
                                            FRACCION
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full bg-white h-7 text-center justify-center items-center flex">
                                            {data.data.registro.cod_fraccion}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-7 flex justify-center items-center bg-cyan-500 font-bold border-l-2 border-r-2 border-black ">
                INFORMACION GENERAL
            </div>
            <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                <div className="col-span-5 flex flex-col ">
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-14 w-14 flex justify-center items-center'>
                                        194
                                    </div>
                                    <div className="w-full bg-white h-14 font-bold text-center justify-center items-center flex">
                                        DECLARADO PATRIMONIO
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 flex w-full">
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        SI
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.patrimonio_si}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        NO
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.patrimonio_no}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        EN TRAMITE
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.patrimonio_tramite}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-7 flex justify-center items-center'>
                                        195
                                    </div>
                                    <div className="w-full bg-blue-400 h-7 font-bold ps-4 flex">
                                        DIRECCION
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-full flex ps-4'>
                                        {data.data.informacion.patrimonio_tramite}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-7 flex justify-center items-center'>
                                        251
                                    </div>
                                    <div className="w-full bg-blue-400 h-7 font-bold ps-4 flex">
                                        BARRIO
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-full flex ps-4'>
                                        {data.data.informacion.barrio}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-7 flex justify-center items-center'>
                                        196
                                    </div>
                                    <div className="w-full bg-blue-400 h-7 font-bold ps-4 flex">
                                        DENOMINACION
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-full flex ps-4'>
                                        {data.data.informacion.denominacion}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-9 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-7 flex justify-center items-center'>
                                        197
                                    </div>
                                    <div className="w-full bg-blue-400 h-7 font-bold ps-4 flex">
                                        CATEGORIA DE CATALOGACION
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full border-l-2  border-black">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        CH
                                    </div>
                                </div>
                                <div className="flex w-full border-l-2  border-black">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.categoria}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-9 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-14 w-7 flex justify-center items-center'>
                                        198
                                    </div>
                                    <div className="w-full bg-blue-400 h-14 font-bold ps-4 flex items-center">
                                        ZONIFICACION
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full border-l-2  border-black">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        AM
                                    </div>
                                </div>
                                <div className="flex w-full border-l-2  border-black">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.zonificacion_am}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="flex w-full border-l-2  border-black">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        ZT
                                    </div>
                                </div>
                                <div className="flex w-full border-l-2  border-black">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.zonificacion_zt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-7 flex justify-center items-center'>
                                        199
                                    </div>
                                    <div className="w-full bg-blue-400 h-7 font-bold ps-4 flex">
                                        SECTORES DE GESTION
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-7 w-full flex ps-4'>
                                        {data.data.informacion.sectores}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 border-l-2 border-r-2 border-black">
                        <div className="col-span-6 flex flex-col ">
                            <div className="flex w-full">
                                <div className="flex w-full" >
                                    <div className='bg-white h-14 w-14 flex justify-center items-center'>
                                        200
                                    </div>
                                    <div className="w-full bg-white h-14 font-bold text-center justify-center items-center flex">
                                        FILIACION CULTURAL
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 flex w-full">
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        PH
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.filiacion_ph}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        C
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.filiacion_c}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        R
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.filiacion_r}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex">
                                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                        CP
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                        {data.data.informacion.filiacion_cp}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-7 flex flex-col ">
                    <div className='h-full'>
                        <div className="flex border">
                            <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                                CONTEXTO HISTORICO ESPACIAL
                            </div>
                        </div>
                        <div className="w-full bg-white h-full flex">
                            {data.data.informacion.contexto_historico}
                        </div>
                    </div>

                    <div className='h-full'>
                        <div className="flex border">
                            <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                                DESCRIPCION GENERAL
                            </div>
                        </div>
                        <div className="w-full bg-white h-full flex">
                            {data.data.informacion.descripcion_general}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-7 flex justify-center items-center bg-cyan-500 font-bold border-2 border-black ">
                ANALISIS DE BLOQUES NO CONSTRUIDOS
            </div>
            <div className="grid grid-cols-12 gap-4 border-l-2 border-r-2 border-black">
                <div className="col-span-12 flex flex-col gap-2">
                    <div className="w-full overflow-x-auto">
                        <table className="bg-white table-auto border-collapse border-none border-gray-300 w-full text-center">
                            <thead>
                                <tr>
                                    <OnlyLabelTd rowspan={3} label="SECTORES" orientation="vertical" />
                                    <OnlyLabelTd colspan={7} label="206" />
                                    <OnlyLabelTd colspan={4} label="207" />
                                    <OnlyLabelTd colspan={13} label="TIPO DE ACABADO" />
                                    <OnlyLabelTd colspan={3} label="210" />
                                    <OnlyLabelTd colspan={6} label="211" />
                                    <OnlyLabelTd colspan={4} label="212" />
                                    <OnlyLabelTd colspan={7} label="213" />
                                    <OnlyLabelTd colspan={2} label="214" />
                                    <OnlyLabelTd colspan={4} label="215" />
                                    <OnlyLabelTd colspan={4} label="216" />
                                </tr>
                                <tr>

                                    <OnlyLabelTd colspan={7} label="TIPO" />
                                    <OnlyLabelTd colspan={4} label="EPOCA DE CONSTRUCCION" />
                                    <OnlyLabelTd colspan={11} label="208 PISO" />
                                    <OnlyLabelTd colspan={2} label="209 TECHO" />
                                    <OnlyLabelTd colspan={3} label="ESTADO DE LA CONST." />
                                    <OnlyLabelTd colspan={6} label="ELEMENTOS" />
                                    <OnlyLabelTd colspan={4} label="VEGETACION" />
                                    <OnlyLabelTd colspan={7} label="TIPO DE INTERVENCION" />
                                    <OnlyLabelTd colspan={2} label="USO" />
                                    <OnlyLabelTd colspan={4} label="ESTADO CONSERV." />
                                    <OnlyLabelTd colspan={4} label="CATEGORIA DE REGISTRO" />

                                </tr>
                                <tr>
                                    <OnlyLabelTd colspan={1} label="Patio" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Jardin" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Patio- Jardin" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Huerto" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Corral" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Estacionamiento" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Otros" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Prehispanico" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Colonial" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Republicano" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Contemporaneo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Canto rodado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Laja de Piedra" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Empedrado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Concreto" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Terrazo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Ceramico" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Tierra" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Ladrillo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Piso Verde" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Otros" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Sin Acabado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Opaco" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Translucido" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Terminado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="En construccion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Inconclusa" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Bancas" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Jardinera" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Escalera" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Fuente" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Escultura" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Diseminado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Arb. Nativos" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Arb. Foraneos" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Arbustos" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Gras" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Sin intervencion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Restauracion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Refacion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Remodelacion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Reconstrucion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Obra Nueva" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Demolicion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Compartido" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Privado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Bueno" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Regular" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Malo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Ruinoso" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Valor Patrimonial" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Valor Contextual" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Elemento Patrimoni" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Sin Valor" orientation="vertical" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.bloquesnoconstruidos.map((item, index) => (
                                        <tr key={index}>
                                            <OnlyLabelTd colspan={1} label={item.sector} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_patio} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_jardin} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_patio_jardin} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_huerto} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_corral} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_estacionamiento} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_otros} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_prehispanico} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_colonial} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_republicano} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_contemporaneo} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_canto} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_laja_piedra} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_empedrado} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_concreto} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_terrazo} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_ceramico} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_tierra} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_ladrillo} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_verde} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_otros} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_piso_sin_acabado} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_techo_opaco} />
                                            <OnlyLabelTd colspan={1} label={item.acabado_techo_translucido} />
                                            <OnlyLabelTd colspan={1} label={item.estado_terminado} />
                                            <OnlyLabelTd colspan={1} label={item.estado_en_construccion} />
                                            <OnlyLabelTd colspan={1} label={item.estado_inconclusa} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_bancas} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_jadinera} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_escalera} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_fuente} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_escultura} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_diseminado} />
                                            <OnlyLabelTd colspan={1} label={item.vegetacion_nativos} />
                                            <OnlyLabelTd colspan={1} label={item.vegetacion_foraneos} />
                                            <OnlyLabelTd colspan={1} label={item.vegetacion_arbustos} />
                                            <OnlyLabelTd colspan={1} label={item.vegetacion_gras} />
                                            <OnlyLabelTd colspan={1} label={item.intervencion_sin_intervencion} />
                                            <OnlyLabelTd colspan={1} label={item.intervencion_restauracion} />
                                            <OnlyLabelTd colspan={1} label={item.intervencion_refaccion} />
                                            <OnlyLabelTd colspan={1} label={item.intervencion_remodelacion} />
                                            <OnlyLabelTd colspan={1} label={item.intervencion_reconstruccion} />
                                            <OnlyLabelTd colspan={1} label={item.intervencion_obra_nueva} />
                                            <OnlyLabelTd colspan={1} label={item.intervencion_demolicion} />
                                            <OnlyLabelTd colspan={1} label={item.uso_compartido} />
                                            <OnlyLabelTd colspan={1} label={item.uso_privado} />
                                            <OnlyLabelTd colspan={1} label={item.estado_bueno} />
                                            <OnlyLabelTd colspan={1} label={item.estado_regular} />
                                            <OnlyLabelTd colspan={1} label={item.estado_malo} />
                                            <OnlyLabelTd colspan={1} label={item.estado_ruinoso} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_valor_patrimonial} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_valor_contextual} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_elemento_patrimonial} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_sin_valor} />
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            <div className="border-l-2 border-r-2 border-black h-7 flex justify-center items-center bg-cyan-500 font-bold ">
                ANALISIS DE BLOQUES CONSTRUIDOS
            </div>
            <div className="grid grid-cols-12 gap-4 border-2 border-black ">
                <div className="col-span-12 flex flex-col gap-2">
                    <div className="w-full overflow-x-auto">
                        <table className="bg-white table-auto border-collapse border-none border-gray-300 w-full text-center">
                            <thead>

                                <tr>

                                    <OnlyLabelTd label="217" />
                                    <OnlyLabelTd label="218" />
                                    <OnlyLabelTd colspan={5} label="219" />
                                    <OnlyLabelTd colspan={4} label="207" />
                                    <OnlyLabelTd colspan={6} label="220" />
                                    <OnlyLabelTd colspan={7} label="221" />
                                    <OnlyLabelTd colspan={4} label="210" />
                                    <OnlyLabelTd colspan={6} label="222" />
                                    <OnlyLabelTd colspan={6} label="223" />
                                    <OnlyLabelTd colspan={5} label="224" />
                                    <OnlyLabelTd colspan={8} label="225" />
                                    <OnlyLabelTd colspan={8} label="226" />
                                    <OnlyLabelTd colspan={4} label="227" />
                                    <OnlyLabelTd colspan={3} label="228" />
                                    <OnlyLabelTd colspan={6} label="229" />
                                    <OnlyLabelTd colspan={4} label="215" />
                                    <OnlyLabelTd colspan={4} label="216" />
                                    <OnlyLabelTd colspan={9} label="230" />
                                    <OnlyLabelTd colspan={4} label="231" />
                                </tr>
                                <tr>

                                    <OnlyLabelTd rowspan={4} label="BLOQUE" orientation="vertical" />
                                    <OnlyLabelTd rowspan={4} label="NIVEL DE EDIFICACION" orientation="vertical" />
                                    <OnlyLabelTd colspan={5} rowspan={2} label="PARTIDO ARQUITECT." />
                                    <OnlyLabelTd colspan={4} rowspan={2} label="EPOCA DE CONSTRUC." />
                                    <OnlyLabelTd colspan={6} rowspan={2} label="TIPO DE ARQUITECTURA" />
                                    <OnlyLabelTd colspan={7} rowspan={2} label="FILIACION ESTILISTICA" />
                                    <OnlyLabelTd colspan={4} rowspan={2} label="ESTADO DE LA CONST." />
                                    <OnlyLabelTd colspan={17} label="MATERIAL PREDOMINANTE" />
                                    <OnlyLabelTd colspan={8} rowspan={2} label="TIPO DE INTERVENCION" />
                                    <OnlyLabelTd colspan={8} rowspan={2} label="USO ACTUAL DEL SUELO" />
                                    <OnlyLabelTd colspan={4} rowspan={2} label="CONDICION DE HABITABILIDAD" />
                                    <OnlyLabelTd colspan={3} rowspan={2} label="SERVICIOS COMUNES" />
                                    <OnlyLabelTd colspan={6} rowspan={2} label="REGIMEN DE TENENCIA" />
                                    <OnlyLabelTd colspan={4} rowspan={2} label="ESTADO CONSERV." />
                                    <OnlyLabelTd colspan={4} rowspan={2} label="CATEGORIA DE REGISTRO" />
                                    <OnlyLabelTd colspan={9} rowspan={2} label="ESPACIOS" />
                                    <OnlyLabelTd colspan={4} rowspan={2} label="ELEMENTOS DE VALOR" />
                                </tr>
                                <tr>
                                    <OnlyLabelTd colspan={6} label="MUROS" />
                                    <OnlyLabelTd colspan={6} label="PISOS" />
                                    <OnlyLabelTd colspan={5} label="TECHOS" />
                                </tr>
                                <tr>
                                    <OnlyLabelTd rowspan={2} label="Bloque en U" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Bloque en L" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Bloque en I" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Claustral" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Compacto" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Prehispanico" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Colonial" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Republicano" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Contemp." orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Civil Publica" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Civil Domestica" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Religiosa" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Industrial" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Comercial" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Militar" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Manierista" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Plateresco" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Barroco" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Neoclasico" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Rococo" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Mudejar" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Terminado" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="En construccion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Inconclusa" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Sin construir" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Adobe" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Quincha" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Ladrillo" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Piedra" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Concreto" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Madera / Parquet" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Ladrillo Pastelero" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Ceramico" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Piedra" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Tierra" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Concreto" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Teja artesanal" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Teja indust." orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Calamina" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Translucidos" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Concreto" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Obra Original" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Restauracion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Refacion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Remodelacion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Reconstrucion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Obra Nueva" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Demolicion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Ampliacion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Residencial" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Comercio y servicio" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Hospedaje" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Educacion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Salud" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Recreacion" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Indust./Produc." orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Otros Usos" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Optimo" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Hacinado" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Tugurio" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Desocupado" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Servicio Higienico" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Grifo de agua" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Energia de Luz" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Propietario" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Alquilado" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Anticresis" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Consenso" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Alojado" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Bueno" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Regular" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Malo" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Ruinoso" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Valor Patrimomial" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Valor Contextual" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Elemento Patrimonial" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Sin Valor" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Zagua" orientation="vertical" />
                                    <OnlyLabelTd colspan={2} label="Galeria" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Corredor" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Chiflon" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Caja de Escalera" orientation="vertical" />
                                    <OnlyLabelTd colspan={2} label="Logia" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Pintura Mural" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Religiosos" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Bienes Muebles" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="Diseminados" orientation="vertical" />

                                </tr>
                                <tr>
                                    <OnlyLabelTd label="Arcos" orientation="vertical" />
                                    <OnlyLabelTd label="Adintelado" orientation="vertical" />
                                    <OnlyLabelTd label="Arcos" orientation="vertical" />
                                    <OnlyLabelTd label="Adintelado" orientation="vertical" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.bloquesconstruidos.map((item, index) => (
                                        <tr key={index}>
                                            <OnlyLabelTd colspan={1} label={item.bloque} />
                                            <OnlyLabelTd colspan={1} label={item.nivel_edificacion} />
                                            <OnlyLabelTd colspan={1} label={item.partido_bloque_u} />
                                            <OnlyLabelTd colspan={1} label={item.partido_bloque_l} />
                                            <OnlyLabelTd colspan={1} label={item.partido_bloque_i} />
                                            <OnlyLabelTd colspan={1} label={item.partido_claustral} />
                                            <OnlyLabelTd colspan={1} label={item.partido_compacto} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_prehispanico} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_colonial} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_republicano} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_contemporaneo} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_arquitectura_civil_publica} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_arquitectura_civil_democratica} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_arquitectura_religiosa} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_arquitectura_industrial} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_arquitectura_comercial} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_arquitectura_militar} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_manierista} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_plateresco} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_barroco} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_neoclasico} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_rococo} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_mudejar} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_otros} />
                                            <OnlyLabelTd colspan={1} label={item.estado_construccion_terminado} />
                                            <OnlyLabelTd colspan={1} label={item.estado_construccion_en_construccion} />
                                            <OnlyLabelTd colspan={1} label={item.estado_construccion_inconclusa} />
                                            <OnlyLabelTd colspan={1} label={item.estado_construccion_sin_construir} />
                                            <OnlyLabelTd colspan={1} label={item.material_muro_adobe} />
                                            <OnlyLabelTd colspan={1} label={item.material_muro_quincha} />
                                            <OnlyLabelTd colspan={1} label={item.material_muro_madera} />
                                            <OnlyLabelTd colspan={1} label={item.material_muro_ladrillo} />
                                            <OnlyLabelTd colspan={1} label={item.material_muro_piedra} />
                                            <OnlyLabelTd colspan={1} label={item.material_muro_concreto} />
                                            <OnlyLabelTd colspan={1} label={item.material_pisos_madera} />
                                            <OnlyLabelTd colspan={1} label={item.material_pisos_ladrillo} />
                                            <OnlyLabelTd colspan={1} label={item.material_pisos_ceramico} />
                                            <OnlyLabelTd colspan={1} label={item.material_pisos_piedra} />
                                            <OnlyLabelTd colspan={1} label={item.material_pisos_tierra} />
                                            <OnlyLabelTd colspan={1} label={item.material_pisos_concreto} />
                                            <OnlyLabelTd colspan={1} label={item.material_techos_teja_artesanal} />
                                            <OnlyLabelTd colspan={1} label={item.material_techos_teja_industrial} />
                                            <OnlyLabelTd colspan={1} label={item.material_techos_calamina} />
                                            <OnlyLabelTd colspan={1} label={item.material_techos_translucidos} />
                                            <OnlyLabelTd colspan={1} label={item.material_techos_concreto} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_obra_original} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_restauracion} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_refacion} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_remodelacion} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_reconstruccion} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_obra_nueva} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_demolicion} />
                                            <OnlyLabelTd colspan={1} label={item.tipo_intervension_ampliacion} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_residencial} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_comercio} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_hospedaje} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_educacion} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_salud} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_recreacion} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_industrial} />
                                            <OnlyLabelTd colspan={1} label={item.uso_actual_otros} />
                                            <OnlyLabelTd colspan={1} label={item.condicion_optimo} />
                                            <OnlyLabelTd colspan={1} label={item.condicion_hacinado} />
                                            <OnlyLabelTd colspan={1} label={item.condicion_tugurio} />
                                            <OnlyLabelTd colspan={1} label={item.condicion_desocupado} />
                                            <OnlyLabelTd colspan={1} label={item.sevicios_servicio_higenico} />
                                            <OnlyLabelTd colspan={1} label={item.sevicios_grifo_agua} />
                                            <OnlyLabelTd colspan={1} label={item.sevicios_energia_luz} />
                                            <OnlyLabelTd colspan={1} label={item.regimen_propietario} />
                                            <OnlyLabelTd colspan={1} label={item.regimen_alquilado} />
                                            <OnlyLabelTd colspan={1} label={item.regimen_anticresis} />
                                            <OnlyLabelTd colspan={1} label={item.regimen_consenso} />
                                            <OnlyLabelTd colspan={1} label={item.regimen_alojado} />
                                            <OnlyLabelTd colspan={1} label={item.regimen_otros} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_bueno} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_regular} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_malo} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_ruinoso} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_valor_patrimonial} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_valor_contextual} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_elemento_patrimonial} />
                                            <OnlyLabelTd colspan={1} label={item.categoria_sin_valor} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_zaguan} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_arcos_galeria} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_adintelado_galeria} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_corredor} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_chiflon} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_caja_escalera} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_arcos_logia} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_adintelado_logia} />
                                            <OnlyLabelTd colspan={1} label={item.espacios_otros} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_pintura_mural} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_religiosos} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_bienes_muebles} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_diseminados} />
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 border-2 border-black ">
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            PLANO DE UBICACION - BLOQUES
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data.plano_ubicacion} alt="" />
                    </div>

                </div>
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            FOTOGRAFIA FACHADA PRINCIPAL
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data.foto_fachada} alt="" />
                    </div>

                </div>
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            DESCRIPCION DE LA  FACHADA
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <div className="w-full bg-white h-7 flex">
                            {data.data.descripcion_fachada}
                        </div>
                    </div>

                </div>
            </div>
            <div className="border-l-2 border-r-2 border-black h-7 flex justify-center items-center bg-cyan-500 font-bold ">
                ANALISIS DE FACHADAS
            </div>
            <div className="grid grid-cols-12  border-2 border-black ">
                <div className="col-span-12 flex flex-col">
                    <div className="w-full overflow-x-auto">
                        <table className="bg-white table-auto border-collapse border-none border-gray-300 w-full text-center">
                            <thead>

                                <tr>
                                    <OnlyLabelTd label="233" />
                                    <OnlyLabelTd label="234" />
                                    <OnlyLabelTd colspan={2} label="235" />
                                    <OnlyLabelTd colspan={4} label="236" />
                                    <OnlyLabelTd colspan={4} label="237" />
                                    <OnlyLabelTd colspan={7} label="221" />
                                    <OnlyLabelTd colspan={8} label="238" />
                                    <OnlyLabelTd colspan={4} label="239" />
                                    <OnlyLabelTd colspan={8} label="240" />
                                    <OnlyLabelTd colspan={4} label="215" />
                                </tr>
                                <tr>
                                    <OnlyLabelTd rowspan={2} label="ELEMENTO" orientation="vertical" />
                                    <OnlyLabelTd rowspan={2} label="CANTIDAD" orientation="vertical" />

                                    <OnlyLabelTd colspan={2} label="FACTURA" />
                                    <OnlyLabelTd colspan={4} label="UBICACION" />
                                    <OnlyLabelTd colspan={4} label="EPOCA" />
                                    <OnlyLabelTd colspan={7} label="FILIACION ESTILISTICA" />
                                    <OnlyLabelTd colspan={8} label="MATERIAL" />
                                    <OnlyLabelTd colspan={4} label="DETALLES" />
                                    <OnlyLabelTd colspan={8} label="COLOR" />
                                    <OnlyLabelTd colspan={4} label="ESTADO CONSERV." />
                                </tr>
                                <tr>
                                    <OnlyLabelTd label="Simple" orientation="vertical" />
                                    <OnlyLabelTd label="Elaborado" orientation="vertical" />
                                    <OnlyLabelTd label="Fachada 1" orientation="vertical" />
                                    <OnlyLabelTd label="Fachada 2" orientation="vertical" />
                                    <OnlyLabelTd label="Fachada 3" orientation="vertical" />
                                    <OnlyLabelTd label="Fachada 4" orientation="vertical" />
                                    <OnlyLabelTd label="Prehispanico" orientation="vertical" />
                                    <OnlyLabelTd label="Colonial" orientation="vertical" />
                                    <OnlyLabelTd label="Republicano" orientation="vertical" />
                                    <OnlyLabelTd label="Contemp." orientation="vertical" />
                                    <OnlyLabelTd label="Manierista" orientation="vertical" />
                                    <OnlyLabelTd label="Plateresco" orientation="vertical" />
                                    <OnlyLabelTd label="Barroco" orientation="vertical" />
                                    <OnlyLabelTd label="Neoclasico" orientation="vertical" />
                                    <OnlyLabelTd label="Rococo" orientation="vertical" />
                                    <OnlyLabelTd label="Mudejar" orientation="vertical" />
                                    <OnlyLabelTd label="Otros" orientation="vertical" />
                                    <OnlyLabelTd label="Tierra" orientation="vertical" />
                                    <OnlyLabelTd label="Ladrillo" orientation="vertical" />
                                    <OnlyLabelTd label="Piedra" orientation="vertical" />
                                    <OnlyLabelTd label="yeso" orientation="vertical" />
                                    <OnlyLabelTd label="Concreto" orientation="vertical" />
                                    <OnlyLabelTd label="Madera" orientation="vertical" />
                                    <OnlyLabelTd label="metal" orientation="vertical" />
                                    <OnlyLabelTd label="Vidrio" orientation="vertical" />
                                    <OnlyLabelTd label="Rejas" orientation="vertical" />
                                    <OnlyLabelTd label="Balaustres" orientation="vertical" />
                                    <OnlyLabelTd label="Celosias" orientation="vertical" />
                                    <OnlyLabelTd label="Casetones" orientation="vertical" />
                                    <OnlyLabelTd label="Blanco" orientation="vertical" />
                                    <OnlyLabelTd label="Marfil" orientation="vertical" />
                                    <OnlyLabelTd label="Crema" orientation="vertical" />
                                    <OnlyLabelTd label="Azul" orientation="vertical" />
                                    <OnlyLabelTd label="Marron" orientation="vertical" />
                                    <OnlyLabelTd label="Verde" orientation="vertical" />
                                    <OnlyLabelTd label="Natural" orientation="vertical" />
                                    <OnlyLabelTd label="Otros" orientation="vertical" />
                                    <OnlyLabelTd label="Bueno" orientation="vertical" />
                                    <OnlyLabelTd label="Regular" orientation="vertical" />
                                    <OnlyLabelTd label="Malo" orientation="vertical" />
                                    <OnlyLabelTd label="Ruinoso" orientation="vertical" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.analisisfachadas.map((item, index) => (
                                        <tr key={index}>
                                            <OnlyLabelTd colspan={1} label={item.elemento} />
                                            <OnlyLabelTd colspan={1} label={item.cantidad} />
                                            <OnlyLabelTd colspan={1} label={item.factura_simple} />
                                            <OnlyLabelTd colspan={1} label={item.factura_elaborado} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada1} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada2} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada3} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada4} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_prehispanico} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_colonial} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_republicano} />
                                            <OnlyLabelTd colspan={1} label={item.epoca_contemporaneo} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_manierista} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_plateresco} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_barroco} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_neoclasico} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_rococo} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_mudejar} />
                                            <OnlyLabelTd colspan={1} label={item.filiacion_otros} />
                                            <OnlyLabelTd colspan={1} label={item.material_tierra} />
                                            <OnlyLabelTd colspan={1} label={item.material_ladrillo} />
                                            <OnlyLabelTd colspan={1} label={item.material_piedra} />
                                            <OnlyLabelTd colspan={1} label={item.material_yeso} />
                                            <OnlyLabelTd colspan={1} label={item.material_concreto} />
                                            <OnlyLabelTd colspan={1} label={item.material_madera} />
                                            <OnlyLabelTd colspan={1} label={item.material_metal} />
                                            <OnlyLabelTd colspan={1} label={item.material_vidrio} />
                                            <OnlyLabelTd colspan={1} label={item.detalles_rejas} />
                                            <OnlyLabelTd colspan={1} label={item.detalles_balaustres} />
                                            <OnlyLabelTd colspan={1} label={item.detalles_celosias} />
                                            <OnlyLabelTd colspan={1} label={item.detalles_casetones} />
                                            <OnlyLabelTd colspan={1} label={item.color_blanco} />
                                            <OnlyLabelTd colspan={1} label={item.color_marfil} />
                                            <OnlyLabelTd colspan={1} label={item.color_crema} />
                                            <OnlyLabelTd colspan={1} label={item.color_azul} />
                                            <OnlyLabelTd colspan={1} label={item.color_marron} />
                                            <OnlyLabelTd colspan={1} label={item.color_verde} />
                                            <OnlyLabelTd colspan={1} label={item.color_natural} />
                                            <OnlyLabelTd colspan={1} label={item.color_otros} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_bueno} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_regular} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_malo} />
                                            <OnlyLabelTd colspan={1} label={item.estado_conservacion_ruinoso} />
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 flex flex-col w-full ">
                    <div className="flex border">
                        <div className='bg-white h-7 w-14'>
                            244
                        </div>
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            OBSERVACIONES
                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.observaciones}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 ">
                <div className="col-span-12 flex flex-col w-full border-l-2 border-r-2 border-black">
                    <div className=" h-7 flex justify-center items-center bg-cyan-500 font-bold ">
                        IV. CULTURA VIVA
                    </div>
                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                        PROYECTOS ARQUEOLOGICOS LLEVADOS A CABO EN EL BIEN INMUEBLE
                    </div>
                </div>

                <div className="col-span-4 flex flex-col w-full ">
                    <div className="w-full bg-white  flex">
                        <img src={data.data.culturaviva.imagen1} alt="" />
                    </div>
                </div>
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className='bg-white h-7 w-14'>
                            242
                        </div>
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            DESCRIPCIÓN
                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.culturaviva.descripcion}
                    </div>
                </div>
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className='bg-white h-7 w-14'>
                            243
                        </div>
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            OBSERVACIONES
                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.culturaviva.observaciones}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 ">
                <div className="col-span-12 flex flex-col w-full border-l-2 border-r-2 border-black">

                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                        LEVANTAMIENTO PLANIMETRICO DE FACHADAS
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">

                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            FACHADA 1
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data?.fachada?.fachada1} alt="" />
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        Codigo: {data.data?.fachada?.codigo_fachada1}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">

                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            FACHADA 2
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data?.fachada?.fachada2} alt="" />
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        Codigo: {data.data?.fachada?.codigo_fachada2}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">

                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            FACHADA 3
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data?.fachada?.fachada3} alt="" />
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        Codigo: {data.data?.fachada?.codigo_fachada3}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">

                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            FACHADA 4
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data?.fachada?.fachada4} alt="" />
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        Codigo: {data.data?.fachada?.codigo_fachada4}
                    </div>
                </div>
            </div>


            <div className="grid grid-cols-12 justify-center items-center ">
                <div className="col-span-2 flex flex-col w-full ">
                    <div className="flex flex-col w-full">
                        <div className="flex">
                            <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                FECHA
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                {data.data.responsable.fecha_creacion.split(' ')[0]}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col w-full ">
                    <div className="flex flex-col w-full">
                        <div className="flex">
                            <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                HORA
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                {data.data.responsable.fecha_creacion.split(' ')[1]}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 flex flex-col w-full ">
                    <div className="flex flex-col w-full">
                        <div className="flex">
                            <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                                BRIGADA
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-full bg-white h-7 px-2 text-center justify-center items-center flex">
                                {data.data.responsable.brigada}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 ">
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                            CORDINADOR DE BRIGADA
                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.responsable.coordinador.nombres}

                    </div>
                </div>
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                            TECNICO CATALOGADOR

                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.responsable.tecnico.nombres}
                    </div>
                </div>
                <div className="col-span-4 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                            PROPIETARIO

                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.responsable.propietario.nombres}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImpresionFichaRegistroCatalogacionInmueblesShow;

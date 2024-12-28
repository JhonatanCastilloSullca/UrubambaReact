import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ErrorIcono from "../../assets/icons/errorIcono";
import OnlyLabelTd from '../../components/OnlyLabelTd';

const fetchFichaRegistroCatalogacionInmueblesAreaMonumental = async (id) => {
    const token = localStorage.getItem("token");

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-inmueble-arquitectonica/${id}`, {
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

function ImpresionFichaRegistroCatalogacionInmueblesAreaMonumentalShow() {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['fichaRegistroHistorico', id],
        queryFn: () => fetchFichaRegistroCatalogacionInmueblesAreaMonumental(id),
        retry: false,
    });


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
                <div className="h-56 w-96 bg-white flex justify-center items-center px-4">
                    <img src="/Imagen1.png" alt="" />
                </div>
                <div className='flex w-full flex-col'>
                    <div className="h-28 flex w-full">
                        <div className="w-full flex flex-col">
                            <div className="h-14 flex justify-center items-center bg-cyan-500 font-bold ">FICHA DE REGISTRO DE CATALOGACION DE INMUEBLES - ARQUEOLOGÍA</div>
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
                        <div className="h-28 w-28 bg-white flex justify-center items-center p-2 px-4">
                            <img src="/muniwanchaq-ic.png" alt="" />
                        </div>
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
                                            {data.data.unidad.cod_manzana}
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

            <div className="flex border-l-2 border-r-2 border-black">
                <div className="h-7 w-96 bg-white flex ">
                    <div className="w-full text-center">{data.data.direccion}</div>
                    <div className="h-7 w-7 text-center">195</div>
                </div>
                <div className='w-full bg-white text-center'>
                    FICHA  DE REGISTRO DE EVIDENCIAS ARQUEOLOGICAS EN BIENES INMUEBLES EN LA PROVINCIA DE URUBAMBA
                </div>
            </div>
            <div className="h-7 flex justify-center items-center bg-cyan-500 font-bold border-2 border-black ">
                I.EVIDENCIAS ARQUEOLOGICAS EN LA(S) FACHADA(S) DEL INMUEBLE
            </div>
            <div className="grid grid-cols-12 gap-4 border-l-2 border-r-2 border-black">
                <div className="col-span-12 flex flex-col gap-2">
                    <div className="w-full overflow-x-auto">
                        <table className="bg-white table-auto border-collapse border-none border-gray-300 w-full text-center">
                            <thead>

                                <tr>
                                    <OnlyLabelTd label="251" />
                                    <OnlyLabelTd colspan={4} label="252	UBICACIÓN" />
                                    <OnlyLabelTd colspan={6} label="253	IDENTIFICACION DE PARAMENTO" />
                                    <OnlyLabelTd colspan={9} label="254	TIPO DE CONSTRUCCION DE LA ESTRUCTURA ARQUEOLOGICA" />
                                    <OnlyLabelTd colspan={11} label="255 ELEMENTOS DE LA ESTRUCTURA ARQUEOLOGICA" />
                                    <OnlyLabelTd colspan={8} label="256	APAREJOS Y ACABADOS" />
                                    <OnlyLabelTd colspan={7} label="257	MATERIAL CONSTRUCTIVO" />
                                    <OnlyLabelTd colspan={8} label="258	MORTERO" />
                                    <OnlyLabelTd colspan={6} label="259	MEDIDAS (en metros)" />
                                    <OnlyLabelTd label="260	ESTRUCTURAS COMPARTIDAS" />
                                    <OnlyLabelTd colspan={3} label="261	CONSERVACION" />
                                </tr>
                                <tr>
                                    <OnlyLabelTd colspan={1} label="Evidencia Material" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Fachada 1" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Fachada 2" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Fachada 3" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Fachada 4" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Original Prehispanico" orientation="vertical" />
                                    <OnlyLabelTd className="h-48" colspan={1} label="Con elementos originales reutilizados" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Reconstruido" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Restaurado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Anden" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Cancha" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Canal" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Calle" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Contencion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Escalinata" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Recinto" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Muro Portante" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Argollas" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Canal de Drenaje" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Clavos" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Dintel" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Nicho" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Petroglifo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Vano Original" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Vano Aperturado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Umbral" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Celular" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Canteado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Engastado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Poligonal" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Sedimentario" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Rustico" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Andesita" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Arenisca" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Caliza" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Diorita" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Granito" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Arcilla" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Barro" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Calicanto" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Emboquillado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Sin Mortero" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Cemento" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Altura Promedio" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Ancho" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Largo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Profundidad" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Diametro - Dimension" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Inclinacion  %" orientation="vertical" />
                                    <OnlyLabelTd className="h-48" colspan={1} label="Inmuebles que comparten las evidencias y/o estructuras Arqueologicas" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Bueno" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Regular" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Malo" orientation="vertical" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.evidenciaarquelogicafachadas.map((item, index) => (
                                        <tr key={index}>
                                            <OnlyLabelTd colspan={1} label={item.evidencia_material} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada1} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada2} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada3} />
                                            <OnlyLabelTd colspan={1} label={item.ubicacion_fachada4} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_origial_prehispanico} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_elementos_originales} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_reconstruido} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_restaurado} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_anden} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_cancha} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_canal} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_calle} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_contencion} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_escalinata} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_recinto} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_muro_portante} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_argollas} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_canal_drenaje} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_clavos} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_dintel} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_nicho} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_petroglifo} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_vano_original} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_vano_aperturado} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_umbral} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_celular} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_canteado} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_engastado} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_poligonal} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_sedimentario} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_rustico} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.material_andesita} />
                                            <OnlyLabelTd colspan={1} label={item.material_arenisca} />
                                            <OnlyLabelTd colspan={1} label={item.material_caliza} />
                                            <OnlyLabelTd colspan={1} label={item.material_diorita} />
                                            <OnlyLabelTd colspan={1} label={item.material_granito} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_arcilla} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_barro} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_calicanto} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_emboquillado} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_sin_mortero} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_cemento} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_altura} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_ancho} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_largo} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_profundida} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_diametro} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_inclinacion} />
                                            <OnlyLabelTd colspan={1} label={item.estructuras_inmuebles} />
                                            <OnlyLabelTd colspan={1} label={item.conservacion_bueno} />
                                            <OnlyLabelTd colspan={1} label={item.conservacion_regular} />
                                            <OnlyLabelTd colspan={1} label={item.conservacion_malo} />
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex w-full border-2 border-black ">
                <div className="bg-white  h-14 w-14 font-bold text-center justify-center items-center flex">
                    244
                </div>
                <div className="w-full bg-white h-14 p-2">
                    Observaciones
                </div>
            </div>

            <div className="border-l-2 border-r-2 border-black h-7 flex justify-center items-center bg-cyan-500 font-bold ">
                II.EVIDENCIAS ARQUEOLOGICAS EN EL INTERIOR DEL INMUEBLE
            </div>
            <div className="grid grid-cols-12 gap-4 border-2 border-black ">
                <div className="col-span-12 flex flex-col gap-2">
                    <div className="w-full overflow-x-auto">
                        <table className="bg-white table-auto border-collapse border-none border-gray-300 w-full text-center">
                            <thead>
                                <tr>
                                    <OnlyLabelTd label="251" />
                                    <OnlyLabelTd colspan={8} label="253	IDENTIFICACION DE PARAMENTO" />
                                    <OnlyLabelTd colspan={8} label="254	TIPO DE CONSTRUCCION DE LA ESTRUCTURA ARQUEOLOGICA" />
                                    <OnlyLabelTd colspan={12} label="255 ELEMENTOS DE LA ESTRUCTURA ARQUEOLOGICA" />
                                    <OnlyLabelTd colspan={9} label="256	APAREJOS Y ACABADOS" />
                                    <OnlyLabelTd colspan={7} label="257	MATERIAL CONSTRUCTIVO" />
                                    <OnlyLabelTd colspan={8} label="258	MORTERO" />
                                    <OnlyLabelTd colspan={6} label="259	MEDIDAS (en metros)" />
                                    <OnlyLabelTd label="260	ESTRUCTURAS COMPARTIDAS" />
                                    <OnlyLabelTd colspan={3} label="261	CONSERVACION" />
                                </tr>
                                <tr>
                                    <OnlyLabelTd colspan={1} label="Evidencia Material" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Original Prehispanico" orientation="vertical" />
                                    <OnlyLabelTd className="h-48" colspan={1} label="Con elementos originales reutilizados" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Reconstruido" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Restaurado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Anden" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Cancha" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Canal" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Calle" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Contencion" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Escalinata" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Recinto" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Muro Portante" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Argollas" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Canal de Drenaje" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Clavos" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Dintel" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Nicho" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Petroglifo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Vano Original" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Vano Aperturado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Umbral" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Elem. Liticos Sueltos" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Celular" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Canteado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Engastado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Poligonal" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Sedimentario" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Rustico" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Andesita" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Arenisca" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Caliza" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Diorita" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Granito" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Arcilla" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Barro" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Calicanto" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Emboquillado" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Sin Mortero" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Cemento" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Altura Promedio" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Ancho" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Largo" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Profundidad" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Diametro - Dimension" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Inclinacion  %" orientation="vertical" />
                                    <OnlyLabelTd className="h-48" colspan={1} label="Inmuebles que comparten las evidencias y/o estructuras Arqueologicas" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Bueno" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Regular" orientation="vertical" />
                                    <OnlyLabelTd colspan={1} label="Malo" orientation="vertical" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.evidenciaarquelogicainmuebles.map((item, index) => (
                                        <tr key={index}>
                                            <OnlyLabelTd colspan={1} label={item.evidencia_material} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_origial_prehispanico} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_elementos_originales} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_reconstruido} />
                                            <OnlyLabelTd colspan={1} label={item.identificacion_restaurado} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_anden} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_cancha} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_canal} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_calle} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_contencion} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_escalinata} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_recinto} />
                                            <OnlyLabelTd colspan={1} label={item.construccion_muro_portante} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_argollas} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_canal_drenaje} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_clavos} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_dintel} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_nicho} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_petroglifo} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_vano_original} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_vano_aperturado} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_umbral} />
                                            <OnlyLabelTd colspan={1} label={item.elementos_liticos_sueltos} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_celular} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_canteado} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_engastado} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_poligonal} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_sedimentario} />
                                            <OnlyLabelTd colspan={1} label={item.acabados_rustico} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.material_andesita} />
                                            <OnlyLabelTd colspan={1} label={item.material_arenisca} />
                                            <OnlyLabelTd colspan={1} label={item.material_caliza} />
                                            <OnlyLabelTd colspan={1} label={item.material_diorita} />
                                            <OnlyLabelTd colspan={1} label={item.material_granito} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_arcilla} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_barro} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_calicanto} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_emboquillado} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_sin_mortero} />
                                            <OnlyLabelTd colspan={1} label={item.mortero_cemento} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={""} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_altura} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_ancho} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_largo} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_profundida} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_diametro} />
                                            <OnlyLabelTd colspan={1} label={item.medidas_inclinacion} />
                                            <OnlyLabelTd colspan={1} label={item.estructuras_inmuebles} />
                                            <OnlyLabelTd colspan={1} label={item.conservacion_bueno} />
                                            <OnlyLabelTd colspan={1} label={item.conservacion_regular} />
                                            <OnlyLabelTd colspan={1} label={item.conservacion_malo} />
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex w-full border-l-2 border-r-2 border-black">
                <div className="bg-white border h-14 w-14 font-bold text-center justify-center items-center flex">
                    244
                </div>
                <div className="w-full bg-white h-14 p-2">
                    Observaciones: {data.data.observaciones_evidencias}
                </div>
            </div>

            <div className="grid grid-cols-12 ">
                <div className="col-span-12 flex flex-col w-full border-l-2 border-r-2 border-black">
                    <div className=" h-7 flex justify-center items-center bg-cyan-500 font-bold ">
                        III. INFORMACION SOBRE EL INMUEBLE
                    </div>
                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                        PROYECTOS ARQUEOLOGICOS LLEVADOS A CABO EN EL BIEN INMUEBLE
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="grid grid-cols-10 ">
                        <div className="col-span-3 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex text-sm">
                                    PEA
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full bg-white h-7 text-center justify-center items-center flex text-sm">
                                    {data.data.informacioninmuebles.pea}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex text-sm">
                                    PIA
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full bg-white h-7 text-center justify-center items-center flex text-sm">
                                    {data.data.informacioninmuebles.pia}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex text-sm">
                                    PMAR
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full bg-white h-7 text-center justify-center items-center flex text-sm">
                                    {data.data.informacioninmuebles.pmar}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-blue-400 h-14 font-bold text-center justify-center items-center flex text-sm">
                                    PEA
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-sm">
                                    AÑO
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full bg-white h-7 text-center justify-center items-center flex text-sm">
                                    {data.data.informacioninmuebles.pea_año}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-sm">
                                    AÑO
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full bg-white h-7 text-center justify-center items-center flex text-sm">
                                    {data.data.informacioninmuebles.pia_año}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-sm">
                                    AÑO
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-full bg-white h-7 text-center justify-center items-center flex text-sm">
                                    {data.data.informacioninmuebles.pmar_año}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col w-full ">
                            <div className="flex">
                                <div className="w-full bg-white h-14 font-bold text-center justify-center items-center flex text-sm">
                                    {data.data.informacioninmuebles.ninguna}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-9 flex flex-col w-full ">
                    <div className="flex">
                        <div className="bg-white  h-14 w-14 font-bold text-center justify-center items-center flex">
                            244
                        </div>
                        <div className="w-full bg-white h-14 p-2">
                            Observaciones
                        </div>
                    </div>
                    <div className="w-full bg-white h-14 p-2">
                        {data.data.informacioninmuebles.observaciones}
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

                <div className="col-span-6 flex flex-col w-full ">
                    <div className="flex border">
                        <div className='bg-white h-7 w-14'>
                            269
                        </div>
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            COSTUMBRES Y TRADICIONES
                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.culturaviva.constumbres_tradiciones}
                    </div>
                </div>
                <div className="col-span-6 flex flex-col w-full ">
                    <div className="flex border">
                        <div className='bg-white h-7 w-14'>
                            271
                        </div>
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            COLECCIONES - SINGULARES
                        </div>
                    </div>
                    <div className="w-full bg-white h-7 flex">
                        {data.data.culturaviva.colecciones_singulares}
                    </div>
                </div>
                <div className="col-span-6 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            REGISTRO FOTOGRAFICO  1
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data.culturaviva.imagen1} alt="" />
                    </div>
                    <div className="w-full bg-white h-14 flex">
                        {data.data.culturaviva.descripcionfachada1}
                    </div>
                </div>
                <div className="col-span-6 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex">
                            DETALLES DE LA FACHADA
                        </div>
                    </div>
                    <div className="w-full bg-white  flex">
                        <img src={data.data.culturaviva.imagen2} alt="" />
                    </div>
                    <div className="w-full bg-white h-14 flex">
                        {data.data.culturaviva.descripcionfachada2}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 ">
                <div className="col-span-12 flex flex-col w-full border-l-2 border-r-2 border-black">
                    <div className=" h-7 flex justify-center items-center bg-cyan-500 font-bold ">
                        V. EVIDENCIAS ARQUEOLOGICAS NO ESTRUCTURALES
                    </div>
                    <div className="w-full bg-blue-400 h-7 font-bold text-center justify-center items-center flex">
                        PROYECTOS ARQUEOLOGICOS LLEVADOS A CABO EN EL BIEN INMUEBLE
                    </div>
                </div>

                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                            CERAMICA (DESCRIBIR)
                        </div>
                    </div>
                    <div className="w-full bg-white h-14 flex">
                        {data.data.evidenciaarquelogicaestructural.ceramica}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                            ORGANICOS (DESCRIBIR)
                        </div>
                    </div>
                    <div className="w-full bg-white h-14 flex">
                        {data.data.evidenciaarquelogicaestructural.organicos}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                            OTROS(DESCRIBIR)
                        </div>
                    </div>
                    <div className="w-full bg-white h-14 flex">
                        {data.data.evidenciaarquelogicaestructural.otros}
                    </div>
                </div>
                <div className="col-span-3 flex flex-col w-full ">
                    <div className="flex border">
                        <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                            LITOS TRABAJADOS - PETROGLIFOS (DESCRIBIR)
                        </div>
                    </div>
                    <div className="w-full bg-white h-14 flex">
                        {data.data.evidenciaarquelogicaestructural.litos_trabajados}
                    </div>
                </div>
                <div className="col-span-12 flex flex-col w-full items-center justify-center ">
                    <div className="w-full bg-white  flex justify-center">
                        <img src={data.data.evidenciaarquelogicaestructural.plano_planta} alt="" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12">
                {data.data.declarantes.map((declarante, index) => (
                    <div key={declarante.id} className="col-span-3 flex flex-col w-full">
                        <div className="flex border">
                            <div className="w-full bg-white h-7 font-bold text-center justify-center items-center flex text-xs">
                                FIRMA DEL DECLARANTE {index + 1}:
                            </div>
                        </div>
                        <div className="w-full bg-white h-7 flex">
                            D.N.I: {declarante.declarante_id}
                        </div>
                        <div className="w-full bg-white h-7 flex">
                            NOMBRES: {declarante.persona?.nombres || "No disponible"}
                        </div>
                        <div className="w-full bg-white h-7 flex">
                            APELLIDOS: {declarante.persona?.apellido_paterno || "No disponible"}
                        </div>
                    </div>
                ))}
            </div>



        </div>
    );
}

export default ImpresionFichaRegistroCatalogacionInmueblesAreaMonumentalShow;

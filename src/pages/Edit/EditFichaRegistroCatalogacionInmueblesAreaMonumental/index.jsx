import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import OnlyInputError from "../../../components/OnlyInputError";
import NumeroForm from "../../../components/NumeroForm";
import MainCard from "../../../components/MainCard";
import OnlyLabelTd from "../../../components/OnlyLabelTd";
import OnlyInputLetras from "../../../components/OnlyInputLetras";
import ErrorIcono from "../../../assets/icons/errorIcono";

function EditFichaRegistroCatalogacionInmueblesAreaMonumental() {
    const methods = useForm();
    const { register, control, handleSubmit, formState: { errors } } = methods;
    const { fields: fields_evidencias_arq_fachadas_inmuebles, append: append_fields_evidencias_arq_fachadas_inmuebles, remove: remove_fields_evidencias_arq_fachadas_inmuebles } = useFieldArray({
        control,
        name: "evidencias_arq_fachadas_inmuebles",
    });
    const { fields: fields_evidencias_arq_fachadas_interior_inmuebles, append: append_fields_evidencias_arq_fachadas_interior_inmuebles, remove: remove_fields_evidencias_arq_fachadas_interior_inmuebles } = useFieldArray({
        control,
        name: "evidencias_arq_fachadas_interior_inmuebles",
    });


    const navigate = useNavigate();



    const postData = async (formData) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-inmueble-arquitectonica`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos');
        }
        return response.json();
    };





    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: () => {
            console.log("Enviado correctamente");
            navigate("/");
        },
        onError: (error) => {
            console.error("Error al enviar los datos:", error);
        },
    });




    const onSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                data[key].forEach((file) => {
                    if (file instanceof File) {
                        formData.append(`${key}`, file);
                    }
                });
            } else if (data[key] instanceof FileList) {
                Array.from(data[key]).forEach((file) => {
                    formData.append(`${key}`, file);
                });
            } else if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key]);
            }
        });

        const arraysToProcess = [
            { name: "evidencias_arq_fachadas_inmuebles", fields: fields_evidencias_arq_fachadas_inmuebles },
            { name: "evidencias_arq_fachadas_interior_inmuebles", fields: fields_evidencias_arq_fachadas_interior_inmuebles },
        ];

        arraysToProcess.forEach(({ name, fields }) => {
            const groupData = fields.map((item, index) => {
                const obj = {
                    ...data[name][index]
                };
                return obj;
            });

            formData.append(name, JSON.stringify(groupData));
        });

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }


        mutation.mutate(formData);
    };
    return (
        <>
            <h3 className="mb-4 font-bold text-2xl text-textAdmin-light dark:text-textAdmin-dark">
                FICHA DE REGISTRO DE CATALOGACION DE INMUEBLES DEL AREA MONUMENTAL
            </h3>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="1"
                                    text="CODIGO UNICO CATASTRAL - CUC"
                                    size="sm"
                                />

                                <OnlyInputError
                                    name={`codigo_unico_catastral`}
                                    register={register}
                                    errors={errors.codigo_unico_catastral}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm
                                    nro="2"
                                    text="CODIGO HOJA CATASTRAL"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`codigo_hoja_catastral`}
                                    register={register}
                                    errors={errors.codigo_hoja_catastral}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-2">
                                <NumeroForm
                                    nro="191"
                                    text="FICHA N°"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`nro_ficha`}
                                    register={register}
                                    errors={errors.nro_ficha}
                                    maxLength={15}
                                    isRequired={true}
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-2">
                                <NumeroForm
                                    nro="195"
                                    text="NOMBRE DE CALLE"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`nombre_calle`}
                                    register={register}
                                    errors={errors.nombre_calle}
                                    maxLength={100}
                                    isRequired={false}
                                />
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-9 flex flex-col gap-2">
                                <NumeroForm
                                    nro="3"
                                    text="CODIGO DE REFERENCIA CATASTRAL"
                                    size="sm"
                                />
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-3 flex flex-col gap-2">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-4 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">DPTO.</div>
                                                <OnlyInputError
                                                    name={`ubicacion_dpto`}
                                                    register={register}
                                                    errors={errors.ubicacion_dpto}
                                                    maxLength={2}
                                                    isRequired={true}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-4 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">PROV.</div>
                                                <OnlyInputError
                                                    name={`ubicacion_prov`}
                                                    register={register}
                                                    errors={errors.ubicacion_prov}
                                                    maxLength={2}
                                                    isRequired={true}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-4 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">DIST.</div>
                                                <OnlyInputError
                                                    name={`ubicacion_dist`}
                                                    register={register}
                                                    errors={errors.ubicacion_dist}
                                                    maxLength={2}
                                                    isRequired={true}
                                                    tipo="numeros"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-9 flex flex-col gap-2">
                                        <div className="grid grid-cols-9 gap-4">
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">SECTOR</div>
                                                <OnlyInputError
                                                    name={`ubicacion_sector`}
                                                    register={register}
                                                    errors={errors.ubicacion_sector}
                                                    maxLength={3}
                                                    isRequired={true}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">MANZANA</div>
                                                <OnlyInputError
                                                    name={`ubicacion_mzna`}
                                                    register={register}
                                                    errors={errors.ubicacion_mzna}
                                                    maxLength={3}
                                                    isRequired={true}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">LOTE</div>
                                                <OnlyInputError
                                                    name={`ubicacion_lote`}
                                                    register={register}
                                                    errors={errors.ubicacion_lote}
                                                    maxLength={3}
                                                    isRequired={true}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">FRACCION</div>
                                                <OnlyInputError
                                                    name={`ubicacion_cod_fraccion`}
                                                    register={register}
                                                    errors={errors.ubicacion_cod_fraccion}
                                                    maxLength={2}
                                                    isRequired={false}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">EDIFICA</div>
                                                <OnlyInputError
                                                    name={`ubicacion_edifica`}
                                                    register={register}
                                                    errors={errors.ubicacion_edifica}
                                                    maxLength={2}
                                                    isRequired={false}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">ENTRADA</div>
                                                <OnlyInputError
                                                    name={`ubicacion_entrada`}
                                                    register={register}
                                                    errors={errors.ubicacion_entrada}
                                                    maxLength={2}
                                                    isRequired={false}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">PISO</div>
                                                <OnlyInputError
                                                    name={`ubicacion_piso`}
                                                    register={register}
                                                    errors={errors.ubicacion_piso}
                                                    maxLength={2}
                                                    isRequired={false}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">UNIDAD</div>
                                                <OnlyInputError
                                                    name={`ubicacion_unidad`}
                                                    register={register}
                                                    errors={errors.ubicacion_unidad}
                                                    maxLength={2}
                                                    isRequired={false}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-csenter self-center text-xs">DC</div>
                                                <OnlyInputError
                                                    name={`ubicacion_dc`}
                                                    register={register}
                                                    errors={errors.ubicacion_dc}
                                                    maxLength={1}
                                                    isRequired={false}
                                                    tipo="numeros"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="192"
                                    text="CODIGO DE REGISTRO"
                                    size="sm"
                                />
                                <div className="grid grid-cols-8 gap-4">
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <div className="titulo-text px-4 text-center self-center text-xs">SECTOR</div>
                                        <OnlyInputError
                                            name={`ubicacion_sector_2`}
                                            register={register}
                                            errors={errors.ubicacion_sector_2}
                                            maxLength={3}
                                            isRequired={true}
                                            tipo="numeros"
                                        />
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <div className="titulo-text px-4 text-center self-center text-xs">MANZANA</div>
                                        <OnlyInputError
                                            name={`ubicacion_mzna_2`}
                                            register={register}
                                            errors={errors.ubicacion_mzna_2}
                                            maxLength={3}
                                            isRequired={true}
                                            tipo="numeros"
                                        />
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <div className="titulo-text px-4 text-center self-center text-xs">LOTE</div>
                                        <OnlyInputError
                                            name={`ubicacion_lote_2`}
                                            register={register}
                                            errors={errors.ubicacion_lote_2}
                                            maxLength={3}
                                            isRequired={true}
                                            tipo="numeros"
                                        />
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-2">
                                        <div className="titulo-text px-4 text-center self-center text-xs">FRACCION</div>
                                        <OnlyInputError
                                            name={`ubicacion_fraccion`}
                                            register={register}
                                            errors={errors.ubicacion_fraccion}
                                            maxLength={2}
                                            isRequired={false}
                                            tipo="numeros"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            I.EVIDENCIAS ARQUEOLOGICAS EN LA(S) FACHADA(S) DEL INMUEBLE
                        </h4>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <div className="w-full overflow-x-auto">
                                    <table className="table-auto border-collapse border-none border-gray-300 w-full text-center">
                                        <thead>
                                            <tr>
                                                <td rowSpan="6" className="w-8 min-w-8 max-w-8 p-0 border-none border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <button
                                                        type="button"
                                                        className="h-8 w-8 bg-green-600 rounded-sm"
                                                        onClick={() => append_fields_evidencias_arq_fachadas_interior_inmuebles({ carac_fachada_sectores: "", carac_fachada_nro_unidad_cat: "" })}
                                                    >

                                                        +
                                                    </button>
                                                </td>
                                            </tr>
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
                                                <OnlyLabelTd colspan={1} label="Vacio 1" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 2" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Anden" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Cancha" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Canal" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Calle" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Contencion" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Escalinata" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Recinto" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Muro Portante" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 1" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Argollas" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Canal de Drenaje" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Clavos" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Dintel" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Nicho" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Petroglifo" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vano Original" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vano Aperturado" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Umbral" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 1" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 2" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Celular" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Canteado" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Engastado" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Poligonal" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Sedimentario" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Rustico" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 1" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 2" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Andesita" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Arenisca" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Caliza" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Diorita" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Granito" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 1" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 2" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Arcilla" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Barro" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Calicanto" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Emboquillado" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Sin Mortero" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Cemento" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 1" orientation="vertical" />
                                                <OnlyLabelTd colspan={1} label="Vacio 2" orientation="vertical" />
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

                                            {fields_evidencias_arq_fachadas_interior_inmuebles.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove_fields_evidencias_arq_fachadas_interior_inmuebles(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>

                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.evidencia_material`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._evidencia_material}
                                                        maxLength={1}
                                                        tipo="numeros"
                                                        isRequired={true}
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ubicacion_fachada_1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ubicacion_fachada_1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ubicacion_fachada_2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ubicacion_fachada_2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ubicacion_fachada_3`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ubicacion_fachada_3}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ubicacion_fachada_4`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ubicacion_fachada_4}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ident_paramento_original_prehisp`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ident_paramento_original_prehisp}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ident_paramento_elem_orig_reutilizados`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ident_paramento_elem_orig_reutilizados}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ident_paramento_reconstruido`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ident_paramento_reconstruido}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ident_paramento_restaurado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ident_paramento_restaurado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ident_paramento_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ident_paramento_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.ident_paramento_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._ident_paramento_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_anden`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_anden}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_cancha`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_cancha}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_canal`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_canal}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_calle`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_calle}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_contencion`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_contencion}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_escalinata`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_escalinata}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_recinto`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_recinto}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_muro_portante`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_muro_portante}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.tipo_const_estruc_arq_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._tipo_const_estruc_arq_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_argollas`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_argollas}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_canal_drenaje`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_canal_drenaje}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_clavos`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_clavos}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_dintel`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_dintel}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_nicho`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_nicho}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_petroglifo`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_petroglifo}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_vano_original`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_vano_original}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_vano_aperturado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_vano_aperturado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_umbral`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_umbral}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.elem_estruc_arq_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._elem_estruc_arq_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_celular`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_celular}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_canteado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_canteado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_engastado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_engastado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_poligonal`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_poligonal}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_sedimentario`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_sedimentario}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_rustico`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_rustico}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.aparejos_acab_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._aparejos_acab_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.material_const_andesita`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._material_const_andesita}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.material_const_arenisca`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._material_const_arenisca}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.material_const_caliza`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._material_const_caliza}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.material_const_diorita`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._material_const_diorita}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.material_const_granito`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._material_const_granito}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.material_const_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._material_const_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.material_const_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._material_const_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_arcilla`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_arcilla}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_barro`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_barro}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_calicanto`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_calicanto}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_emboquillado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_emboquillado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_sin_mortero`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_sin_mortero}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_cemento`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_cemento}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.mortero_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._mortero_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.medidas_altura_promedio`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._medidas_altura_promedio}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.medidas_ancho`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._medidas_ancho}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.medidas_largo`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._medidas_largo}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.medidas_profundidad`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._medidas_profundidad}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.medidas_diametro_dimension`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._medidas_diametro_dimension}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.medidas_inclinacion`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._medidas_inclinacion}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.estruc_compart_inmueb_compart_evidenc_estruc_arq`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._estruc_compart_inmueb_compart_evidenc_estruc_arq}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.conserv_bueno`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._conserv_bueno}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.conserv_regular`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._conserv_regular}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_interior_inmuebles.${index}.conserv_malo`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_interior_inmuebles?.[index]?._conserv_malo}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </MainCard>

                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            II.EVIDENCIAS ARQUEOLOGICAS EN EL INTERIOR DEL INMUEBLE
                        </h4>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <div className="w-full overflow-x-auto">
                                    <table className="table-auto border-collapse border-none border-gray-300 w-full text-center">
                                        <thead>
                                            <tr>
                                                <td rowSpan="6" className="w-8 min-w-8 max-w-8 p-0 border-none border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <button
                                                        type="button"
                                                        className="h-8 w-8 bg-green-600 rounded-sm"
                                                        onClick={() => append_fields_evidencias_arq_fachadas_inmuebles({ carac_fachada_sectores: "", carac_fachada_nro_unidad_cat: "" })}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>
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
                                            {fields_evidencias_arq_fachadas_inmuebles.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove_fields_evidencias_arq_fachadas_inmuebles(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.evidencia_material`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._evidencia_material}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="numeros"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_original_prehisp`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_original_prehisp}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_elem_orig_reutilizados`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_elem_orig_reutilizados}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_reconstruido`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_reconstruido}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_restaurado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_restaurado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_vacio3`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_vacio3}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.ident_paramento_vacio4`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._ident_paramento_vacio4}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_anden`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_anden}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_cancha`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_cancha}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_canal`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_canal}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_calle`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_calle}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_contencion`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_contencion}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_escalinata`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_escalinata}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_recinto`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_recinto}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.tipo_const_estruc_arq_muro_portante`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._tipo_const_estruc_arq_muro_portante}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_argollas`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_argollas}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_canal_drenaje`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_canal_drenaje}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_clavos`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_clavos}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_dintel`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_dintel}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_nicho`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_nicho}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_petroglifo`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_petroglifo}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_vano_original`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_vano_original}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_vano_aperturado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_vano_aperturado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_umbral`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_umbral}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_elem_liticos_sueltos`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_elem_liticos_sueltos}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.elem_estruc_arq_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._elem_estruc_arq_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_celular`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_celular}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_canteado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_canteado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_engastado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_engastado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_poligonal`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_poligonal}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_sedimentario`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_sedimentario}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_rustico`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_rustico}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.aparejos_acab_vacio3`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._aparejos_acab_vacio3}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.material_const_andesita`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._material_const_andesita}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.material_const_arenisca`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._material_const_arenisca}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.material_const_caliza`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._material_const_caliza}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.material_const_diorita`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._material_const_diorita}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.material_const_granito`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._material_const_granito}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.material_const_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._material_const_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.material_const_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._material_const_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_arcilla`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_arcilla}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_barro`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_barro}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_calicanto`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_calicanto}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_emboquillado`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_emboquillado}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_sin_mortero`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_sin_mortero}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_cemento`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_cemento}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_vacio1`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_vacio1}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.mortero_vacio2`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._mortero_vacio2}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.medidas_altura_promedio`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._medidas_altura_promedio}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.medidas_ancho`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._medidas_ancho}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.medidas_largo`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._medidas_largo}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.medidas_profundidad`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._medidas_profundidad}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.medidas_diametro_dimension`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._medidas_diametro_dimension}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.medidas_inclinacion`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._medidas_inclinacion}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.estruc_compart_inmueb_compart_evidenc_estruc_arq`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._estruc_compart_inmueb_compart_evidenc_estruc_arq}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.conserv_bueno`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._conserv_bueno}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.conserv_regular`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._conserv_regular}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`evidencias_arq_fachadas_inmuebles.${index}.conserv_malo`}
                                                        register={register}
                                                        errors={errors.evidencias_arq_fachadas_inmuebles?.[index]?._conserv_malo}
                                                        maxLength={1}
                                                        isRequired={false}
                                                        tipo="letras"
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm
                                    nro="244"
                                    text="OBSERVACIONES EVIDENCIAS ARQUEOLOGICAS EN EL INTERIOR DEL INMUEBLE"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Observaciones Evidencias Arqueologicas en el Interior del Inmueble..."
                                        {...register('observaciones_evidencias_arqueologicas_int', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.observaciones_evidencias_arqueologicas_int && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.observaciones_evidencias_arqueologicas_int.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="244"
                                    text="OBSERVACIONES"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Observaciones..."
                                        {...register('observaciones', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.observaciones && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.observaciones.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="276"
                                    text="RECOMENDACIONES"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Recomendaciones..."
                                        {...register('recomendaciones', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.recomendaciones && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.recomendaciones.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            III. INFORMACION SOBRE EL INMUEBLE
                        </h4>
                        <NumeroForm
                            nro="262"
                            text="PROYECTOS ARQUEOLOGICOS LLEVADOS A CABO EN EL BIEN INMUEBLE"
                            size="sm"
                        />
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 flex flex-col gap-2">
                                <div className="flex gap-4">
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <NumeroForm
                                            text="PEA"
                                            size="xs"
                                        />
                                        <OnlyInputError
                                            name={`pea`}
                                            register={register}
                                            errors={errors.pea}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <NumeroForm
                                            text="AÑO"
                                            size="xs"
                                        />
                                        <OnlyInputError
                                            name={`pea_año`}
                                            register={register}
                                            errors={errors.pea_año}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <div className="flex gap-4">
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <NumeroForm
                                            text="PIA"
                                            size="xs"
                                        />
                                        <OnlyInputError
                                            name={`pia`}
                                            register={register}
                                            errors={errors.pia}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <NumeroForm
                                            text="AÑO"
                                            size="xs"
                                        />
                                        <OnlyInputError
                                            name={`pia_año`}
                                            register={register}
                                            errors={errors.pia_año}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <div className="flex gap-4">
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <NumeroForm
                                            text="PMAR"
                                            size="xs"
                                        />
                                        <OnlyInputError
                                            name={`pmar`}
                                            register={register}
                                            errors={errors.pmar}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-2">
                                        <NumeroForm
                                            text="AÑO"
                                            size="xs"
                                        />
                                        <OnlyInputError
                                            name={`pmar_año`}
                                            register={register}
                                            errors={errors.pmar_año}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2 justify-center items-center">
                                <NumeroForm
                                    text="NINGUNA"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`ninguna`}
                                    register={register}
                                    errors={errors.ninguna}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm
                                    nro="244"
                                    text="OBSERVACIONES"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Observaciones..."
                                        {...register('observaciones_informacion_inmueble', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.observaciones_informacion_inmueble && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.observaciones_informacion_inmueble.message}
                                    </span>
                                )}
                            </div>
                        </div>

                    </MainCard>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            IV. CULTURA VIVA
                        </h4>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="269"
                                    text="COSTUMBRES Y TRADICIONES"
                                    size="sm"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Costumbre y tradiciones..."
                                        {...register('costumbres_tradiciones', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.costumbres_tradiciones && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.costumbres_tradiciones.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="271"
                                    text="COLECCIONES - SINGULARES"
                                    size="sm"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Colecciones Singulares..."
                                        {...register('colecciones_singulares', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.colecciones_singulares && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.colecciones_singulares.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="273"
                                    text="REGISTRO FOTOGRAFICO 1"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="registro_fotografico_1"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('registro_fotografico_1', {
                                        // required: 'La imagen es obligatoria.',
                                        // validate: {
                                        //     fileType: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.type.startsWith('image/') ? true : 'Solo se permiten imágenes.';
                                        //     },
                                        //     fileSize: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.size <= 2 * 1024 * 1024 ? true : 'La imagen debe pesar menos de 2MB.';
                                        //     }
                                        // }
                                    })}
                                />
                                {errors.registro_fotografico_1 && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.registro_fotografico_1.message}
                                    </span>
                                )}

                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Registro fotografico Descripción..."
                                        {...register('registro_fotografico_1_descripcion', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.registro_fotografico_1_descripcion && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.registro_fotografico_1_descripcion.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="274"
                                    text="REGISTRO FOTOGRAFICO 2"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="registro_fotografico_2"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('registro_fotografico_2', {
                                        // required: 'La imagen es obligatoria.',
                                        // validate: {
                                        //     fileType: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.type.startsWith('image/') ? true : 'Solo se permiten imágenes.';
                                        //     },
                                        //     fileSize: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.size <= 2 * 1024 * 1024 ? true : 'La imagen debe pesar menos de 2MB.';
                                        //     }
                                        // }
                                    })}
                                />
                                {errors.registro_fotografico_2 && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.registro_fotografico_2.message}
                                    </span>
                                )}

                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Registro fotografico Descripción..."
                                        {...register('registro_fotografico_2_descripcion', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.registro_fotografico_2_descripcion && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.registro_fotografico_2_descripcion.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="275"
                                    text="CONTAMINACION"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Contaminacion..."
                                        {...register('contaminacion', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.contaminacion && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.contaminacion.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="246"
                                    text="HORA"
                                    size="sm"
                                />
                                <input
                                    type="time"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('hora_inspeccion', {
                                        // required: 'Este campo es obligatorio.',
                                        // validate: value => value !== '' || 'Debe seleccionar una hora válida.',
                                    })}
                                />
                                {errors.hora_inspeccion && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.hora_inspeccion.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="245"
                                    text="FECHA"
                                    size="sm"
                                />
                                <input
                                    type="date"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('fecha_inspeccion', {
                                        // required: 'Este campo es obligatorio.',
                                        // validate: value => new Date(value) <= new Date() || 'La fecha no puede ser futura.',
                                    })}
                                />
                                {errors.fecha_inspeccion && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.fecha_inspeccion.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="249"
                                    text="NOMBRE DEL CATALOGADOR:"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`nombre_catalogador`}
                                    register={register}
                                    errors={errors.nombre_catalogador}
                                    maxLength={100}
                                    isRequired={false}
                                    tipo="letras"
                                />
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            IV. CULTURA VIVA
                        </h4>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="264"
                                    text="CERAMICA (DESCRIBIR)"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="CERAMICA (DESCRIBIR)"
                                        {...register('evidencias_arq_no_estruc_ceramica', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.evidencias_arq_no_estruc_ceramica && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.evidencias_arq_no_estruc_ceramica.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="265"
                                    text="ORGANICOS (DESCRIBIR)"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="ORGANICOS (DESCRIBIR)"
                                        {...register('evidencias_arq_no_estruc_organicos', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.evidencias_arq_no_estruc_organicos && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.evidencias_arq_no_estruc_organicos.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="266"
                                    text="OTROS (DESCRIBIR)"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="OTROS (DESCRIBIR)"
                                        {...register('evidencias_arq_no_estruc_otros', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.evidencias_arq_no_estruc_otros && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.evidencias_arq_no_estruc_otros.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="267"
                                    text="LITOS TRABAJADOS PETROGLIFOS (DESCRIBIR)"
                                    size="xs"
                                />
                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="LITOS TRABAJADOS PETROGLIFOS (DESCRIBIR)"
                                        {...register('evidencias_arq_no_estruc_litos_trabajados_petroglifos', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.evidencias_arq_no_estruc_litos_trabajados_petroglifos && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.evidencias_arq_no_estruc_litos_trabajados_petroglifos.message}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="268"
                                    text="PLANO DE PLANTA"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="plano_planta"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('plano_planta', {
                                        // required: 'La imagen es obligatoria.',
                                        // validate: {
                                        //     fileType: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.type.startsWith('image/') ? true : 'Solo se permiten imágenes.';
                                        //     },
                                        //     fileSize: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.size <= 2 * 1024 * 1024 ? true : 'La imagen debe pesar menos de 2MB.';
                                        //     }
                                        // }
                                    })}
                                />
                                {errors.plano_planta && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.plano_planta.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="277"
                                    text="FIRMA DEL DECLARANTE"
                                    size="sm"
                                />
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="DNI"
                                        size="xs"
                                    />

                                    <OnlyInputError
                                        name={`declarante_1_dni`}
                                        register={register}
                                        errors={errors.declarante_1_dni}
                                        maxLength={15}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="NOMBRES"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_1_nombres`}
                                        register={register}
                                        errors={errors.declarante_1_nombres}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="APELLIDOS"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_1_apellidos`}
                                        register={register}
                                        errors={errors.declarante_1_apellidos}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="278"
                                    text="FIRMA DEL DECLARANTE"
                                    size="sm"
                                />
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="DNI"
                                        size="xs"
                                    />

                                    <OnlyInputError
                                        name={`declarante_2_dni`}
                                        register={register}
                                        errors={errors.declarante_2_dni}
                                        maxLength={15}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="NOMBRES"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_2_nombres`}
                                        register={register}
                                        errors={errors.declarante_2_nombres}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="APELLIDOS"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_2_apellidos`}
                                        register={register}
                                        errors={errors.declarante_2_apellidos}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="279"
                                    text="FIRMA DEL DECLARANTE"
                                    size="sm"
                                />
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="DNI"
                                        size="xs"
                                    />

                                    <OnlyInputError
                                        name={`declarante_3_dni`}
                                        register={register}
                                        errors={errors.declarante_3_dni}
                                        maxLength={15}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="NOMBRES"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_3_nombres`}
                                        register={register}
                                        errors={errors.declarante_3_nombres}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="APELLIDOS"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_3_apellidos`}
                                        register={register}
                                        errors={errors.declarante_3_apellidos}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="280"
                                    text="FIRMA DEL DECLARANTE"
                                    size="sm"
                                />
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="DNI"
                                        size="xs"
                                    />

                                    <OnlyInputError
                                        name={`declarante_4_dni`}
                                        register={register}
                                        errors={errors.declarante_4_dni}
                                        maxLength={15}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="NOMBRES"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_4_nombres`}
                                        register={register}
                                        errors={errors.declarante_4_nombres}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    <NumeroForm
                                        className="h-2"
                                        text="APELLIDOS"
                                        size="xs"
                                    />
                                    <OnlyInputError
                                        name={`declarante_4_apellidos`}
                                        register={register}
                                        errors={errors.declarante_4_apellidos}
                                        maxLength={100}
                                        isRequired={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </MainCard>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
export default EditFichaRegistroCatalogacionInmueblesAreaMonumental;
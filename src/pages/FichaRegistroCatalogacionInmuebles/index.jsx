import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import MainCard from "../../components/MainCard";
import ErrorIcono from "../../assets/icons/errorIcono";
import NumeroForm from "../../components/NumeroForm";
import OnlyInputLetras from "../../components/OnlyInputLetras";
import OnlyLabelTd from "../../components/OnlyLabelTd";
import OnlyInputError from "../../components/OnlyInputError";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function FichaRegistroCatalogacionInmuebles() {
    const methods = useForm();
    const { register, control, handleSubmit, formState: { errors } } = methods;
    const { fields: fields_no_const, append: append_fields_no_const, remove: remove_fields_no_const } = useFieldArray({
        control,
        name: "analisis_bloques_no_construidos",
    });
    const { fields: fields_const, append: append_fields_const, remove: remove_fields_const } = useFieldArray({
        control,
        name: "analisis_bloques_construidos",
    });
    const { fields: fields_analisis_fachadas, append: append_fields_analisis_fachadas, remove: remove_fields_analisis_fachadas } = useFieldArray({
        control,
        name: "analisis_fachadas",
    });

    const navigate = useNavigate();

    const postData = async (formData) => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-inmueble`, {
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

    const appendToFormData = (formData, fieldName, fieldData) => {
        if (Array.isArray(fieldData)) {
            fieldData.forEach((item, index) => {
                if (item instanceof File) {
                    formData.append(`${fieldName}[]`, item);
                } else {
                    formData.append(`${fieldName}[${index}]`, JSON.stringify(item));
                }
            });
        } else {
            formData.append(fieldName, fieldData);
        }
    };

    const onSubmit = (data) => {
        const formData = new FormData();

        // 1. Iterar sobre las propiedades de `data` y agregar cada una al FormData
        Object.keys(data).forEach(fieldName => {
            const fieldData = data[fieldName];
            appendToFormData(formData, fieldName, fieldData);
        });

        // 2. Agregar los FieldArrays específicos: 'analisis_bloques_no_construidos', 'analisis_bloques_construidos', 'analisis_fachadas'
        ['analisis_bloques_no_construidos', 'analisis_bloques_construidos', 'analisis_fachadas'].forEach(fieldName => {
            const fieldData = data[fieldName];
            appendToFormData(formData, fieldName, fieldData);
        });

        // 3. Revisa el contenido de formData antes de enviarlo
        for (let [key, value] of formData.entries()) {
            console.log(key, value);  // Verifica el contenido de FormData
        }

        // 4. Enviar la solicitud con `FormData`
        mutation.mutate(formData);
    };











    return (
        <>
            <h3 className="mb-4 font-bold text-2xl text-textAdmin-light dark:text-textAdmin-dark">
                FICHA DE REGISTRO DE CATALOGACION DE INMUEBLES
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
                                    errors={errors.codigo_registro}
                                    maxLength={10}
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
                                    <div className="col-span-4 flex flex-col gap-2">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-4 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">DPTO.</div>
                                                <OnlyInputError
                                                    name={`ubicacion_dpto`}
                                                    register={register}
                                                    errors={errors.ubicacion_dpto}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-4 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">PROV.</div>
                                                <OnlyInputError
                                                    name={`ubicacion_prov`}
                                                    register={register}
                                                    errors={errors.ubicacion_prov}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-4 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">DIST.</div>
                                                <OnlyInputError
                                                    name={`ubicacion_dist`}
                                                    register={register}
                                                    errors={errors.ubicacion_dist}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-8 flex flex-col gap-2">
                                        <div className="grid grid-cols-8 gap-4">
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">SECTOR</div>
                                                <OnlyInputError
                                                    name={`ubicacion_sector`}
                                                    register={register}
                                                    errors={errors.ubicacion_sector}
                                                    maxLength={10}
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
                                                    maxLength={10}
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
                                                    maxLength={10}
                                                    isRequired={true}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">EDIFICA</div>
                                                <OnlyInputError
                                                    name={`ubicacion_edifica`}
                                                    register={register}
                                                    errors={errors.ubicacion_edifica}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">ENTRADA</div>
                                                <OnlyInputError
                                                    name={`ubicacion_entrada`}
                                                    register={register}
                                                    errors={errors.ubicacion_entrada}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                    isRequired={false}
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">PISO</div>
                                                <OnlyInputError
                                                    name={`ubicacion_piso`}
                                                    register={register}
                                                    errors={errors.ubicacion_piso}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                    isRequired={false}
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">UNIDAD</div>
                                                <OnlyInputError
                                                    name={`ubicacion_unidad`}
                                                    register={register}
                                                    errors={errors.ubicacion_unidad}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                    isRequired={false}
                                                />
                                            </div>
                                            <div className="col-span-1 flex flex-col gap-2">
                                                <div className="titulo-text px-4 text-center self-center text-xs">DC</div>
                                                <OnlyInputError
                                                    name={`ubicacion_dc`}
                                                    register={register}
                                                    errors={errors.ubicacion_dc}
                                                    maxLength={10}
                                                    tipo="numeros"
                                                    isRequired={false}
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
                                            maxLength={10}
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
                                            maxLength={10}
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
                                            maxLength={10}
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
                                            maxLength={10}
                                            tipo="numeros"
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <NumeroForm
                            text="INFORMACION GENERAL"
                            size="sm"
                        />
                        <div className="grid grid-cols-24 gap-4">
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="194"
                                    text="DECLARADO PATRIMONIO"
                                    size="xs"
                                />
                                <div className="">
                                    <select
                                        id="select"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        {...register('info_general_declaro_patrimonio', {
                                            // required: 'Este campo es obligatorio.',
                                        })}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                        <option value="EN TRAMITE">EN TRAMITE</option>
                                    </select>
                                </div>
                                {errors.info_general_declaro_patrimonio && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.info_general_declaro_patrimonio.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="195"
                                    text="DIRECCION"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_direccion`}
                                    register={register}
                                    errors={errors.info_general_direccion}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="251"
                                    text="BARRIO"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_barrio`}
                                    register={register}
                                    errors={errors.info_general_barrio}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="196"
                                    text="DENOMINACION"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_denominacion`}
                                    register={register}
                                    errors={errors.info_general_denominacion}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-5 flex flex-col gap-2">
                                <NumeroForm
                                    nro="197"
                                    text="CATEGORIA DE CATALOGACION CH"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_cat_catal_ch`}
                                    register={register}
                                    errors={errors.info_general_cat_catal_ch}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="198"
                                    text="ZONIFICACION AM"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_zon_am`}
                                    register={register}
                                    errors={errors.info_general_zon_am}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="198"
                                    text="ZONIFICACION ZT"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_zon_zt`}
                                    register={register}
                                    errors={errors.info_general_zon_zt}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="199"
                                    text="SECT. GEST. S-7"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_sect_gest_s7`}
                                    register={register}
                                    errors={errors.info_general_sect_gest_s7}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="200"
                                    text="FIL. CULT. PH"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_fil_cult_ph`}
                                    register={register}
                                    errors={errors.info_general_fil_cult_ph}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="200"
                                    text="FIL. CULT. C"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_fil_cult_c`}
                                    register={register}
                                    errors={errors.info_general_fil_cult_c}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="200"
                                    text="FIL. CULT. R"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_fil_cult_r`}
                                    register={register}
                                    errors={errors.info_general_fil_cult_r}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="200"
                                    text="FIL. CULT. CP"
                                    size="xs"
                                />
                                <OnlyInputError
                                    name={`info_general_fil_cult_cp`}
                                    register={register}
                                    errors={errors.info_general_fil_cult_cp}
                                    maxLength={10}
                                    isRequired={false}
                                />
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="col-span-12 flex flex-col gap-2">
                            <NumeroForm
                                nro="201"
                                text="CONTEXTO HISTORICO ESPACIAL"
                                size="xs"
                            />
                            <div className="my-4">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Observaciones Tipos..."
                                    {...register('contexto_historico_espacial', {
                                        // required: 'Este campo es obligatorio.',
                                        // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                        // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                    })}
                                >
                                </textarea>
                            </div>
                            {errors.contexto_historico_espacial && (
                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                    {errors.contexto_historico_espacial.message}
                                </span>
                            )}
                        </div>
                        <div className="col-span-12 flex flex-col gap-2">
                            <NumeroForm
                                nro="202"
                                text="DESCRIPCION GENERAL"
                                size="xs"
                            />
                            <div className="my-4">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Observaciones Tipos..."
                                    {...register('descripcion_general', {
                                        // required: 'Este campo es obligatorio.',
                                        // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                        // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                    })}
                                >
                                </textarea>
                            </div>
                            {errors.descripcion_general && (
                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                    {errors.descripcion_general.message}
                                </span>
                            )}
                        </div>
                    </MainCard>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            ANALISIS DE BLOQUES NO CONSTRUIDOS
                        </h4>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm
                                    nro="214"
                                    text="ANALISIS DE BLOQUES NO CONSTRUIDOS"
                                    size="sm"
                                />
                                <div className="w-full overflow-x-auto">
                                    <table className="table-auto border-collapse border-none border-gray-300 w-full text-center">
                                        <thead>
                                            <tr>
                                                <td rowSpan="6" className="w-8 min-w-8 max-w-8 p-0 border-none border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <button
                                                        type="button"
                                                        className="h-8 w-8 bg-green-600 rounded-sm"
                                                        onClick={() => append_fields_no_const({})}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>
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
                                            {fields_no_const.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove_fields_no_const(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.sectores`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._sectores}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="numeros"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_patio`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_patio}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_jardin`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_jardin}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_patio_jardin`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_patio_jardin}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_huerto`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_huerto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_corral`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_corral}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_estacionamiento`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_estacionamiento}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_otros`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.epoca_const_prehispanico`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._epoca_const_prehispanico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.epoca_const_colonial`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._epoca_const_colonial}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.epoca_const_republicano`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._epoca_const_republicano}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.epoca_const_contemporaneo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._epoca_const_contemporaneo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_canto_rodado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_canto_rodado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_laja_piedra`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_laja_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_empedrado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_empedrado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_concreto`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_terrazo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_terrazo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_ceramico`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_ceramico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_tierra`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_tierra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_ladrillo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_ladrillo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_piso_verde`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_piso_verde}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_otros`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_piso_sin_acabado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_piso_sin_acabado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_techo_opaco`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_techo_opaco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_acabado_techo_translucido`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._tipo_acabado_techo_translucido}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.estado_const_terminado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._estado_const_terminado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.estado_const_en_const`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._estado_const_en_const}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.estado_const_inconcluso`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?._estado_const_inconcluso}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.elementos_bancas`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.elementos_bancas}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.elementos_jardinera`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.elementos_jardinera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.elementos_escalera`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.elementos_escalera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.elementos_fuente`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.elementos_fuente}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.elementos_escultura`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.elementos_escultura}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.elementos_diseminado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.elementos_diseminado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.vegetacion_arb_nativos`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.vegetacion_arb_nativos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.vegetacion_arb_foraneos`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.vegetacion_arb_foraneos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.vegetacion_arbustos`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.vegetacion_arbustos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.vegetacion_gras`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.vegetacion_gras}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_intervencion_sin_intervencion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.tipo_intervencion_sin_intervencion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_intervencion_restauracion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.tipo_intervencion_restauracion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_intervencion_refacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.tipo_intervencion_refacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_intervencion_remodelacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.tipo_intervencion_remodelacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_intervencion_reconstruccion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.tipo_intervencion_reconstruccion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_intervencion_obra_nueva`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.tipo_intervencion_obra_nueva}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.tipo_intervencion_demolicion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.tipo_intervencion_demolicion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.uso_compartido`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.uso_compartido}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.uso_privado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.uso_privado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.estado_conserv_bueno`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.estado_conserv_bueno}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.estado_conserv_regular`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.estado_conserv_regular}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.estado_conserv_malo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.estado_conserv_malo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.estado_conserv_ruinoso`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.estado_conserv_ruinoso}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.categoria_registro_valor_patri`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.categoria_registro_valor_patri}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.categoria_registro_valor_contex`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.categoria_registro_valor_contex}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.categoria_registro_element_patrimoni`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.categoria_registro_element_patrimoni}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_no_construidos.${index}.categoria_registro_sin_valor`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_no_construidos?.[index]?.categoria_registro_sin_valor}
                                                        maxLength={1}
                                                        isRequired={true}
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
                            ANALISIS DE BLOQUES CONSTRUIDOS
                        </h4>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm
                                    nro="214"
                                    text="ANALISIS DE BLOQUES NO CONSTRUIDOS"
                                    size="sm"
                                />
                                <div className="w-full overflow-x-auto">
                                    <table className="table-auto border-collapse border-none border-gray-300 w-full text-center">
                                        <thead>
                                            <tr>
                                                <td rowSpan="6" className="w-8 min-w-8 max-w-8 p-0 border-none border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <button
                                                        type="button"
                                                        className="h-8 w-8 bg-green-600 rounded-sm"
                                                        onClick={() => append_fields_const({})}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>
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
                                            {fields_const.map((item, index) => (
                                                <tr key={item.id}>

                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove_fields_const(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.bloque`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._bloque}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="numeros"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.nivel_edificacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._nivel_edificacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="numeros"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.partido_arq_bloque_u`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._partido_arq_bloque_u}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.partido_arq_bloque_l`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._partido_arq_bloque_l}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.partido_arq_bloque_i`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._partido_arq_bloque_i}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.partido_arq_claustral`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._partido_arq_claustral}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.partido_arq_compacto`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._partido_arq_compacto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.epoca_const_prehispanico`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._epoca_const_prehispanico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.epoca_const_colonial`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._epoca_const_colonial}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.epoca_const_republicano`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._epoca_const_republicano}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.epoca_const_contemp`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._epoca_const_contemp}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_arq_civil_publica`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_arq_civil_publica}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_arq_civil_domest`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_arq_civil_domest}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_arq_religiosa`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_arq_religiosa}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_arq_indust`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_arq_indust}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_arq_comercial`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_arq_comercial}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_arq_militar`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_arq_militar}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.filiacion_estilist_manierista`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._filiacion_estilist_manierista}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.filiacion_estilist_plateresco`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._filiacion_estilist_plateresco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.filiacion_estilist_barroco`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._filiacion_estilist_barroco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.filiacion_estilist_neoclasico`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._filiacion_estilist_neoclasico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.filiacion_estilist_rococo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._filiacion_estilist_rococo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.filiacion_estilist_mudejar`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._filiacion_estilist_mudejar}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.filiacion_estilist_otros`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._filiacion_estilist_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_const_terminado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_const_terminado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_const_en_const`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_const_en_const}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_const_inconclusa`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_const_inconclusa}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_const_sin_construir`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_const_sin_construir}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_muros_adobe`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_muros_adobe}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_muros_quincha`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_muros_quincha}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_muros_madera`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_muros_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_muros_ladrillo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_muros_ladrillo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_muros_piedra`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_muros_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_muros_concreto`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_muros_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_pisos_madera_parquet`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_pisos_madera_parquet}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_pisos_ladrillo_pastelero`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_pisos_ladrillo_pastelero}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_pisos_ceramico`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_pisos_ceramico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_pisos_piedra`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_pisos_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_pisos_tierra`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_pisos_tierra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_pisos_concreto`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_pisos_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_techos_teja_artesanal`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_techos_teja_artesanal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_techos_teja_indust`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_techos_teja_indust}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_techos_calamina`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_techos_calamina}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_techos_translucido`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_techos_translucido}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.material_pred_techos_concreto`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._material_pred_techos_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_obra_original`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_obra_original}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_restauracion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_restauracion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_refacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_refacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_remodelacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_remodelacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_reconstrucion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_reconstrucion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_obra_nueva`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_obra_nueva}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_demolicion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_demolicion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.tipo_intervencion_ampliacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._tipo_intervencion_ampliacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_residencial`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_residencial}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_comercio_servicio`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_comercio_servicio}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_hospedaje`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_hospedaje}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_educacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_educacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_salud`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_salud}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_recreacion`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_recreacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_indus_produc`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_indus_produc}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.uso_actual_suelo_otros_usos`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._uso_actual_suelo_otros_usos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.cond_habitabilidad_optimo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._cond_habitabilidad_optimo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.cond_habitabilidad_hacinado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._cond_habitabilidad_hacinado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.cond_habitabilidad_tugurio`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._cond_habitabilidad_tugurio}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.cond_habitabilidad_desocupado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._cond_habitabilidad_desocupado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.servicios_comunes_serv_higienico`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._servicios_comunes_serv_higienico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.servicios_comunes_grifo_agua`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._servicios_comunes_grifo_agua}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.servicios_comunes_energia_luz`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._servicios_comunes_energia_luz}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.regimen_tenencia_propietario`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._regimen_tenencia_propietario}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.regimen_tenencia_alquilado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._regimen_tenencia_alquilado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.regimen_tenencia_anticresis`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._regimen_tenencia_anticresis}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.regimen_tenencia_consenso`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._regimen_tenencia_consenso}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.regimen_tenencia_alojado`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._regimen_tenencia_alojado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.regimen_tenencia_otros`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._regimen_tenencia_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_conserv_bueno`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_conserv_bueno}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_conserv_regular`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_conserv_regular}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_conserv_malo`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_conserv_malo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.estado_conserv_ruinoso`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._estado_conserv_ruinoso}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.categoria_registro_valor_patrimonial`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._categoria_registro_valor_patrimonial}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.categoria_registro_valor_contextual`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._categoria_registro_valor_contextual}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.categoria_registro_elem_patrimoni`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._categoria_registro_elem_patrimoni}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.categoria_registro_sin_valor`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._categoria_registro_sin_valor}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_zaguan`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_zaguan}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_galeria_arcos`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_galeria_arcos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_galeria_adint`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_galeria_adint}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_corredor`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_corredor}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_chiflon`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_chiflon}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_caja_escalera`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_caja_escalera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_logia_arcos`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_logia_arcos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_logia_adint`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_logia_adint}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.espacios_otros`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._espacios_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.elem_valor_pintura_mural`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._elem_valor_pintura_mural}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.elem_valor_religiosas`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._elem_valor_religiosas}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.elem_valor_bienes_muebles`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._elem_valor_bienes_muebles}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_bloques_construidos.${index}.elem_valor_diseminados`}
                                                        register={register}
                                                        errors={errors.analisis_bloques_construidos?.[index]?._elem_valor_diseminados}
                                                        maxLength={1}
                                                        isRequired={true}
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
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="193"
                                    text="PLANO DE UBICACION - BLOQUES"
                                    size="sm"
                                />
                                <input
                                    type="file"
                                    id="imagen"
                                    name={`imagen`}
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('imagen', {
                                        // required: 'La imagen es obligatoria.',
                                        // validate: {
                                        //     fileType: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.type.startsWith('image/') ? true : 'Solo se permiten imágenes.';
                                        //     },
                                        //     // fileSize: (fileList) => {
                                        //     //     const file = fileList?.[0];
                                        //     //     return file && file.size <= 2 * 1024 * 1024 ? true : 'La imagen debe pesar menos de 2MB.';
                                        //     // }
                                        // }
                                    })}
                                />
                                {errors.imagen && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.imagen.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="203"
                                    text="FOTOGRAFIA FACHADA PRINCIPAL"
                                    size="sm"
                                />
                                <input
                                    type="file"
                                    id="pdf"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('pdf', {
                                        // required: 'El archivo PDF es obligatorio.',
                                        // validate: {
                                        //     fileType: (fileList) => {
                                        //         const file = fileList?.[0];
                                        //         return file && file.type === 'application/pdf' ? true : 'Solo se permiten archivos PDF.';
                                        //     },
                                        //     // fileSize: (fileList) => {
                                        //     //     const file = fileList?.[0];
                                        //     //     return file && file.size <= 2 * 1024 * 1024 ? true : 'El PDF debe pesar menos de 2MB.';
                                        //     // }
                                        // }
                                    })}
                                />
                                {errors.pdf && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.pdf.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-12 flex flex-col gap-2">
                                <div className="my-4">
                                    <NumeroForm
                                        nro="204"
                                        text="DESCRIPCION DE LA FACHADA"
                                        size="sm"
                                    />
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Observaciones..."
                                        {...register('caracteristicas_fachada_colores_observaciones', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.caracteristicas_fachada_colores_observaciones && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.caracteristicas_fachada_colores_observaciones.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <NumeroForm
                            nro="232"
                            text="LEVANTAMIENTO PLANIMETRICO DE FACHADAS"
                            size="sm"
                        />
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    text="FACHADA 1"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="imagen_fachada_1"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('imagen_fachada_1', {
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
                                {errors.imagen_fachada_1 && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.imagen_fachada_1.message}
                                    </span>
                                )}
                                <div className="flex gap-4 mt-2">
                                    <NumeroForm
                                        text="Codigo:"
                                        size="xs"
                                    />
                                    <div className="flex flex-col">
                                        <OnlyInputError
                                            name={`codigo_imagen_fachada_1`}
                                            register={register}
                                            errors={errors.codigo_imagen_fachada_1}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    text="FACHADA 2"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="imagen_fachada_2"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('imagen_fachada_2', {
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
                                {errors.imagen_fachada_2 && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.imagen_fachada_2.message}
                                    </span>
                                )}
                                <div className="flex gap-4 mt-2">
                                    <NumeroForm
                                        text="Codigo:"
                                        size="xs"
                                    />
                                    <div className="flex flex-col">
                                        <OnlyInputError
                                            name={`codigo_imagen_fachada_2`}
                                            register={register}
                                            errors={errors.codigo_imagen_fachada_2}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    text="FACHADA 3"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="imagen_fachada_3"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('imagen_fachada_3', {
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
                                {errors.imagen_fachada_3 && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.imagen_fachada_3.message}
                                    </span>
                                )}
                                <div className="flex gap-4 mt-2">
                                    <NumeroForm
                                        text="Codigo:"
                                        size="xs"
                                    />
                                    <div className="flex flex-col">
                                        <OnlyInputError
                                            name={`codigo_imagen_fachada_3`}
                                            register={register}
                                            errors={errors.codigo_imagen_fachada_3}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    text="FACHADA 4"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="imagen_fachada_4"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('imagen_fachada_4', {
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
                                {errors.imagen_fachada_4 && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.imagen_fachada_4.message}
                                    </span>
                                )}
                                <div className="flex gap-4 mt-2">
                                    <NumeroForm
                                        text="Codigo:"
                                        size="xs"
                                    />
                                    <div className="flex flex-col">
                                        <OnlyInputError
                                            name={`codigo_imagen_fachada_4`}
                                            register={register}
                                            errors={errors.codigo_imagen_fachada_4}
                                            maxLength={10}
                                            isRequired={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <NumeroForm
                            text="CULTURA VIVA"
                            size="sm"
                        />
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="241"
                                    text="IMAGEN"
                                    size="xs"
                                />
                                <input
                                    type="file"
                                    id="imagen_cultura_viva"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('imagen_cultura_viva', {
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
                                {errors.imagen_cultura_viva && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.imagen_cultura_viva.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="242"
                                    text="DESCRIPCION"
                                    size="xs"
                                />

                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Descripcion..."
                                        {...register('cultura_viva_descripcion', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.cultura_viva_descripcion && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.cultura_viva_descripcion.message}
                                    </span>
                                )}
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="243"
                                    text="DESCRIPCION"
                                    size="xs"
                                />

                                <div className="my-4">
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Observaciones..."
                                        {...register('cultura_viva_observaciones', {
                                            // required: 'Este campo es obligatorio.',
                                            // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.cultura_viva_observaciones && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.cultura_viva_observaciones.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            ANALISIS DE FACHADAS
                        </h4>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm
                                    nro="214"
                                    text="ANALISIS DE FACHADAS"
                                    size="sm"
                                />
                                <div className="w-full overflow-x-auto">
                                    <table className="table-auto border-collapse border-none border-gray-300 w-full text-center">
                                        <thead>
                                            <tr>
                                                <td rowSpan="6" className="w-8 min-w-8 max-w-8 p-0 border-none border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <button
                                                        type="button"
                                                        className="h-8 w-8 bg-green-600 rounded-sm"
                                                        onClick={() => append_fields_analisis_fachadas({})}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>
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
                                            {fields_analisis_fachadas.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove_fields_analisis_fachadas(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.elemento_codigo`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._elemento_codigo}
                                                        maxLength={2}
                                                        isRequired={true}
                                                        tipo="numeros"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.cantidad`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._cantidad}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="numeros"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.facturacion_simple`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._facturacion_simple}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.facturacion_elaborado`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._facturacion_elaborado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.ubicacion_fachada_1`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._ubicacion_fachada_1}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.ubicacion_fachada_2`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._ubicacion_fachada_2}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.ubicacion_fachada_3`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._ubicacion_fachada_3}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.ubicacion_fachada_4`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._ubicacion_fachada_4}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.epoca_prehispanico`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._epoca_prehispanico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.epoca_colonial`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._epoca_colonial}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.epoca_republicano`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._epoca_republicano}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.epoca_contemp`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._epoca_contemp}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.filiacion_estilistica_manierista`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._filiacion_estilistica_manierista}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.filiacion_estilistica_plateresco`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._filiacion_estilistica_plateresco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.filiacion_estilistica_barroco`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._filiacion_estilistica_barroco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.filiacion_estilistica_neoclasico`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._filiacion_estilistica_neoclasico}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.filiacion_estilistica_rococo`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._filiacion_estilistica_rococo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.filiacion_estilistica_mudejar`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._filiacion_estilistica_mudejar}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.filiacion_estilistica_otros`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._filiacion_estilistica_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_tierra`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_tierra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_ladrillo`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_ladrillo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_piedra`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_yeso`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_yeso}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_concreto`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_madera`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_metal`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_metal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.material_vidrio`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._material_vidrio}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.detalles_rejas`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._detalles_rejas}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.detalles_balaustres`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._detalles_balaustres}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.detalles_celosias`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._detalles_celosias}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.detalles_casetones`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._detalles_casetones}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_blanco`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_blanco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_marfil`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_marfil}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_crema`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_crema}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_azul`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_azul}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_marron`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_marron}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_verde`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_verde}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_natural`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_natural}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.color_otros`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._color_otros}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.estado_conserv_bueno`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._estado_conserv_bueno}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.estado_conserv_regular`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._estado_conserv_regular}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.estado_conserv_malo`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._estado_conserv_malo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`analisis_fachadas.${index}.estado_conserv_ruinoso`}
                                                        register={register}
                                                        errors={errors.analisis_fachadas?.[index]?._estado_conserv_ruinoso}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 flex flex-col gap-2">
                            <div className="my-4">
                                <NumeroForm
                                    nro="204"
                                    text="OBSERVACIONES"
                                    size="sm"
                                />
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Observaciones..."
                                    {...register('analisis_fachadas_observaciones', {
                                        // required: 'Este campo es obligatorio.',
                                        // minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                        // pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                    })}
                                >
                                </textarea>
                            </div>
                            {errors.analisis_fachadas_observaciones && (
                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                    {errors.analisis_fachadas_observaciones.message}
                                </span>
                            )}
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="1"
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
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="2"
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
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="3"
                                    text="BRIGADA"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`brigada`}
                                    register={register}
                                    errors={errors.brigada}
                                    maxLength={100}
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="1"
                                    text="COORDINADOR DE BRIGADA"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`coordinador_brigada`}
                                    register={register}
                                    errors={errors.coordinador_brigada}
                                    maxLength={100}
                                    tipo="letras"
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="2"
                                    text="TECNICO CATALOGADOR"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`tecnico_catalogador`}
                                    register={register}
                                    errors={errors.tecnico_catalogador}
                                    maxLength={100}
                                    tipo="letras"
                                    isRequired={false}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="3"
                                    text="PROPIETARIO"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`propietario`}
                                    register={register}
                                    errors={errors.propietario}
                                    maxLength={100}
                                    tipo="letras"
                                    isRequired={false}
                                />
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
                </form >
            </FormProvider >
        </>
    )
}
export default FichaRegistroCatalogacionInmuebles;
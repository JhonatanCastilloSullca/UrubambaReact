import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import MainCard from "../../components/MainCard";
import ErrorIcono from "../../assets/icons/errorIcono";
import NumeroForm from "../../components/NumeroForm";
import OnlyInputLetras from "../../components/OnlyInputLetras";
import OnlyLabelTd from "../../components/OnlyLabelTd";
import OnlyInputError from "../../components/OnlyInputError";

function FichaCatalogacionEspaciosPublicos() {
    const methods = useForm();
    const { register, control, handleSubmit, formState: { errors } } = methods;


    const { fields, append, remove } = useFieldArray({
        control,
        name: "caracteristicas_fachada",
    });

    const { fields: fields_tipo, append: append_tipo, remove: remove_tipo } = useFieldArray({
        control,
        name: "caracteristicas_fachada_tipos",
    });
    const { fields: fields_color, append: append_color, remove: remove_color } = useFieldArray({
        control,
        name: "caracteristicas_fachada_colores",
    });
    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
    };

    return (
        <>
            <h3 className="mb-4 font-bold text-2xl text-textAdmin-light dark:text-textAdmin-dark">
                FICHA DE REGISTRO DE CATALOGACION DE ESPACIOS PUBLICOS DEL AMBIENTE URBANO DEL CENTRO HISTORICO
            </h3>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-3 flex flex-col gap-2">
                                <NumeroForm
                                    nro="200"
                                    text="CODIGO UNICO CATASTRAL - CUC"
                                    size="sm"
                                />

                                <OnlyInputError
                                    name={`codigo_unico_catastral`}
                                    register={register}
                                    errors={errors.codigo_unico_catastral}
                                    maxLength={10}
                                    isRequired={true}
                                    tipo="letras"
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm
                                    nro="201"
                                    text="CODIGO HOJA CATASTRAL"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`codigo_hoja_catastral`}
                                    register={register}
                                    errors={errors.codigo_hoja_catastral}
                                    maxLength={10}
                                    isRequired={true}
                                    tipo="letras"
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm
                                    nro="203"
                                    text="CODIGO DE REGISTRO"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`codigo_registro`}
                                    register={register}
                                    errors={errors.codigo_registro}
                                    maxLength={10}
                                    isRequired={true}
                                    tipo="letras"
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm
                                    nro="204"
                                    text="Codigo de via"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`codigo_via`}
                                    register={register}
                                    errors={errors.codigo_via}
                                    maxLength={10}
                                    isRequired={true}
                                    tipo="letras"
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-2">
                                <NumeroForm
                                    nro="205"
                                    text="N° DE FICHA"
                                    size="sm"
                                />
                                <OnlyInputError
                                    name={`nro_ficha`}
                                    register={register}
                                    errors={errors.nro_ficha}
                                    maxLength={10}
                                    isRequired={true}
                                    tipo="letras"
                                />
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="206"
                                    text="Nombre del espacio Publico (Denominación)"
                                    size="sm"
                                />

                                <OnlyInputError
                                    name={`codigo_unico_catastral`}
                                    register={register}
                                    errors={errors.codigo_unico_catastral}
                                    maxLength={10}
                                    isRequired={true}
                                    tipo="letras"
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm
                                    nro="209"
                                    text="Categoria de Catalogacion"
                                    size="sm"
                                />

                                <OnlyInputError
                                    name={`codigo_unico_catastral`}
                                    register={register}
                                    errors={errors.codigo_unico_catastral}
                                    maxLength={10}
                                    isRequired={true}
                                    tipo="letras"
                                />
                            </div>
                            <div className="col-span-4 flex flex-col ">
                                <NumeroForm
                                    nro="201"
                                    text="CODIGO HOJA CATASTRAL"
                                    size="sm"
                                />
                                <div className="w-full overflow-x-auto h-full">
                                    <table className="table-auto border-collapse border-none border-gray-300 w-full text-center">
                                        <thead>
                                            <tr>
                                                <OnlyLabelTd label="Preh" />
                                                <OnlyLabelTd label="Col" />
                                                <OnlyLabelTd label="Rep" />
                                                <OnlyLabelTd label="Cont" />
                                            </tr>
                                            <tr>
                                                <OnlyInputLetras
                                                    name={`ficha_cultural_preh`}
                                                    register={register}
                                                    errors={errors.ficha_cultural_preh}
                                                    maxLength={1}
                                                    isRequired={true}
                                                    tipo="letras"
                                                />
                                                <OnlyInputLetras
                                                    name={`ficha_cultural_col`}
                                                    register={register}
                                                    errors={errors.ficha_cultural_col}
                                                    maxLength={1}
                                                    isRequired={true}
                                                    tipo="letras"
                                                />
                                                <OnlyInputLetras
                                                    name={`ficha_cultural_rep`}
                                                    register={register}
                                                    errors={errors.ficha_cultural_rep}
                                                    maxLength={1}
                                                    isRequired={true}
                                                    tipo="letras"
                                                />
                                                <OnlyInputLetras
                                                    name={`ficha_cultural_cont`}
                                                    register={register}
                                                    errors={errors.ficha_cultural_cont}
                                                    maxLength={1}
                                                    isRequired={true}
                                                    tipo="letras"
                                                />
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div className="col-span-12 flex flex-col gap-2">
                                <div className="my-4">
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Observaciones Tipos..."
                                        {...register('ficha_cultural_descripcion', {
                                            required: 'Este campo es obligatorio.',
                                            minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                            maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    >
                                    </textarea>
                                </div>
                                {errors.ficha_cultural_descripcion && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.ficha_cultural_descripcion.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm
                                    nro="202"
                                    text="CODIGO DE REFERENCIA CATASTRAL"
                                    size="sm"
                                />
                                <div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <div className="col-span-2 flex flex-col gap-2 items-center">
                                            <div className="titulo-text px-4">Dpt.</div>
                                            <OnlyInputError
                                                name={`ubicacion_dpt`}
                                                register={register}
                                                errors={errors.ubicacion_dpt}
                                                maxLength={10}
                                                isRequired={true}
                                                tipo="letras"
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-2 items-center">
                                            <div className="titulo-text px-4">Prov.</div>
                                            <OnlyInputError
                                                name={`ubicacion_prov`}
                                                register={register}
                                                errors={errors.ubicacion_prov}
                                                maxLength={10}
                                                isRequired={true}
                                                tipo="letras"
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-2 items-center">
                                            <div className="titulo-text px-4">Dist.</div>
                                            <OnlyInputError
                                                name={`ubicacion_dist`}
                                                register={register}
                                                errors={errors.ubicacion_dist}
                                                maxLength={10}
                                                isRequired={true}
                                                tipo="letras"
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-2 items-center">
                                            <div className="titulo-text px-4">Mzna.</div>
                                            <OnlyInputError
                                                name={`ubicacion_mzna`}
                                                register={register}
                                                errors={errors.ubicacion_mzna}
                                                maxLength={10}
                                                isRequired={true}
                                                tipo="letras"
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-col gap-2 items-center">
                                            <div className="titulo-text px-4">Lte Ref.</div>
                                            <OnlyInputError
                                                name={`ubicacion_lote_ref`}
                                                register={register}
                                                errors={errors.ubicacion_lote_ref}
                                                maxLength={10}
                                                isRequired={true}
                                                tipo="numeros"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MainCard>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl text-textAdmin-light dark:text-textAdmin-dark">
                            CARACTERISTICAS DE LA FACHADAS
                        </h4>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm
                                    nro="214"
                                    text="Materiales"
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
                                                        onClick={() => append({ carac_fachada_sectores: "", carac_fachada_nro_unidad_cat: "" })}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd rowspan={4} label="SECTORES" orientation="vertical" />
                                                <OnlyLabelTd rowspan={5} label="Nº de Unid. Catalog." orientation="vertical" />
                                                <OnlyLabelTd colspan={48} label="Materiales" />
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd colspan={15} label="Elementos Estructurales" />
                                                <OnlyLabelTd colspan={25} label="Elementos de Composición" />
                                                <OnlyLabelTd colspan={8} label="Elementos Ornamentales" />
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd colspan={2} label="Muro Cont." />
                                                <OnlyLabelTd colspan={6} label="Muro" />
                                                <OnlyLabelTd colspan={4} label="Cubiertas" />
                                                <OnlyLabelTd colspan={2} label="Columna" />
                                                <OnlyLabelTd rowspan={3} label="Arqueria de piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Tejaroz" orientation="vertical" />
                                                <OnlyLabelTd colspan={7} label="Revestimiento" />
                                                <OnlyLabelTd colspan={2} label="Puerta" />
                                                <OnlyLabelTd colspan={2} label="Ventana" />
                                                <OnlyLabelTd colspan={2} label="Puerta Ventana" />
                                                <OnlyLabelTd rowspan={3} label="Portada de piedra" orientation="vertical" />
                                                <OnlyLabelTd colspan={3} label="Balcones" />
                                                <OnlyLabelTd colspan={2} label="Balconcillo" />
                                                <OnlyLabelTd colspan={2} label="Ajimez" />
                                                <OnlyLabelTd rowspan={3} label="Logia" orientation="vertical" />
                                                <OnlyLabelTd colspan={2} label="Reja de Ingreso" />
                                                <OnlyLabelTd rowspan={3} label="Zocalo" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Pilastras" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Blasones" orientation="vertical" />
                                                <OnlyLabelTd colspan={2} label="Cruz" />
                                                <OnlyLabelTd rowspan={3} label="Nichos" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Arcos" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Otros" orientation="vertical" />
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd rowspan={2} label="Concreto" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Concreto" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Ladrillo" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Adobe" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Adobe - Piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Planchas Piedra de Zinc" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Teja" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Sin cubierta" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Concreto" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="reboque" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="enlucido" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="tarrajeo" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="embarre" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Chaqlapeo" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Sin Revestimiento" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Metal" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Metal" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Metal" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Metal" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Concreto" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Metal" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Metal" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Madera" orientation="vertical" />
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd label="214" orientation="vertical" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((item, index) => (

                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._sectores`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._sectores}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._nro_unidad_cat`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._nro_unidad_cat}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.muro_conten_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.muro_conten_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.muro_conten_concreto`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.muro_conten_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.muro_concreto`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.muro_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.muro_ladrillo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.muro_ladrillo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.muro_adobe`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.muro_adobe}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.muro_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.muro_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.muro_adobe_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.muro_adobe_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />


                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._muro_adobe_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._muro_adobe_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.cubiertas_planchas_zinc`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.cubiertas_planchas_zinc}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.cubiertas_teja`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.cubiertas_teja}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.cubiertas_sin_cubierta`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.cubiertas_sin_cubierta}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.cubiertas_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.cubiertas_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.columna_concreto`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.columna_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.columna_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.columna_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}.arqueria_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?.arqueria_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._tejaroz`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._tejaroz}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._revest_reboque`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._revest_reboque}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._revest_enlucido`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._revest_enlucido}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._revest_tarrajeo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._revest_tarrajeo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._revest_embarre`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._revest_embarre}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._revest_chaqlapeo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._revest_chaqlapeo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._revest_sin_revest`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._revest_sin_revest}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._revest_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._revest_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._puerta_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._puerta_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._puerta_metal`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._puerta_metal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._ventana_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._ventana_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._ventana_metal`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._ventana_metal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._puerta_ventana_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._puerta_ventana_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._puerta_ventana_metal`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._puerta_ventana_metal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._portada_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._portada_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._balcones_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._balcones_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._balcones_metal`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._balcones_metal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._balcones_concreto`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._balcones_concreto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._balconcillo_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._balconcillo_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._balconcillo_metal`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._balconcillo_metal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._ajimez_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._ajimez_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._ajimez_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._ajimez_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._logia`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._logia}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._reja_ingreso_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._reja_ingreso_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._reja_ingreso_metal`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._reja_ingreso_metal}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._zocalo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._zocalo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._pilastras`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._pilastras}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._blasones`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._blasones}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._cruz_madera`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._cruz_madera}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._cruz_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._cruz_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._nichos`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._nichos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />


                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._arcos`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._arcos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada.${index}._otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada?.[index]?._otros}
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
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2 mt-10">
                                <NumeroForm
                                    nro="215"
                                    text="Tipos"
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
                                                        onClick={() => append_tipo({ carac_fachada_sectores: "", carac_fachada_nro_unidad_cat: "" })}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd rowspan={5} label="SECTORES" orientation="vertical" />
                                                <OnlyLabelTd colspan={2} rowspan={2} label="Caract. Volumetricas" />
                                                <OnlyLabelTd colspan={38} label="Tipos" />
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd colspan={8} label="Elementos Estructurales" />
                                                <OnlyLabelTd colspan={22} label="Elementos de Composicion" />
                                                <OnlyLabelTd colspan={6} label="Elementos Ornamentales" />
                                                <OnlyLabelTd colspan={2} label="Otros" />
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd rowspan={3} label="Nivel max. De edificacion" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Altura maxima" orientation="vertical" />
                                                <OnlyLabelTd colspan={3} label="Arqueria" />
                                                <OnlyLabelTd colspan={3} label="Columnas" />
                                                <OnlyLabelTd colspan={2} label="Tejaroz" />
                                                <OnlyLabelTd colspan={3} label="Puerta" />
                                                <OnlyLabelTd colspan={2} label="Ventana" />
                                                <OnlyLabelTd colspan={2} label="Puerta - Ventana" />
                                                <OnlyLabelTd colspan={2} label="Portada" />
                                                <OnlyLabelTd colspan={3} label="Balcones" />
                                                <OnlyLabelTd colspan={2} label="Balconcillo" />
                                                <OnlyLabelTd colspan={2} label="Ajimez" />
                                                <OnlyLabelTd colspan={2} label="Reja de Ingreso" />
                                                <OnlyLabelTd colspan={4} label="Zocalo" />
                                                <OnlyLabelTd colspan={3} label="Pilastras" />
                                                <OnlyLabelTd rowspan={3} label="Blasones" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Arcos" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="Nichos" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="" orientation="vertical" />
                                                <OnlyLabelTd rowspan={3} label="" orientation="vertical" />
                                            </tr>
                                            <tr>
                                                <OnlyLabelTd rowspan={2} label="Medio Punto" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Carpanel" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Lisa" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Estriada" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Salomonica" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Continuo" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Adosado a Muro" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Decoradas" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Simples" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="otras" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Con Reja" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Sin reja" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Simple" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Decorada" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Simple" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Decorada" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Abierto" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Semiabierto" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="cerrado" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Abautrado" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="de tablero Rebajao" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="En Esquina" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="En plano" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Decoradas" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Simples" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Enchapado de Piedra" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Escarchado" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="tarrajeo" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Otros" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Lisa" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Estriada" orientation="vertical" />
                                                <OnlyLabelTd rowspan={2} label="Salomonica" orientation="vertical" />
                                            </tr>
                                            <tr>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields_tipo.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove_tipo(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._sectores`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._sectores}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._nivel_max_edificacion`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._nivel_max_edificacion}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._altura_maxima`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._altura_maxima}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_arqueria_medio_punto`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_arqueria_medio_punto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_arqueria_carpanel`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_arqueria_carpanel}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_arqueria_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_arqueria_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_col_lisa`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_col_lisa}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_col_estirada`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_col_estirada}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_col_salomonica`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_col_salomonica}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_tejaroz_continuo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_tejaroz_continuo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_estruc_tejaroz_adosado_muro`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_estruc_tejaroz_adosado_muro}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_puerta_decorada`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_puerta_decorada}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_puerta_simple`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_puerta_simple}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_puerta_otras`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_puerta_otras}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_ventana_con_reja`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_ventana_con_reja}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_ventana_sin_reja`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_ventana_sin_reja}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_puerta_ventana_simple`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_puerta_ventana_simple}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_puerta_ventana_decorada`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_puerta_ventana_decorada}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_portada_simple`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_portada_simple}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_portada_decorada`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_portada_decorada}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_balcones_abierto`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_balcones_abierto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_balcones_semiabierto`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_balcones_semiabierto}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_balcones_cerrado`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_balcones_cerrado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_balconcillo_abautrado`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_balconcillo_abautrado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_balconcillo_tablero_rebajao`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_balconcillo_tablero_rebajao}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_ajimez_esquina`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_ajimez_esquina}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_ajimez_plano`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_ajimez_plano}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_reja_ingreso_decoradas`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_reja_ingreso_decoradas}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_reja_ingreso_simple`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_reja_ingreso_simple}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_zocalo_enchapado_piedra`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_zocalo_enchapado_piedra}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_zocalo_escarchado`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_zocalo_escarchado}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_zocalo_tarrajeo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_zocalo_tarrajeo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_composicion_zocalo_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_composicion_zocalo_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_ornamental_pilastras_lisa`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_ornamental_pilastras_lisa}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_ornamental_pilastras_estirada`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_ornamental_pilastras_estirada}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_ornamental_pilastras_salomonica`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_ornamental_pilastras_salomonica}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_ornamental_blasones`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_ornamental_blasones}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_ornamental_arcos`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_ornamental_arcos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.${index}._ele_ornamental_nichos`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[index]?._ele_ornamental_nichos}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.0._otros1`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[0]}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_tipos.0._otros2`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_tipos?.[0]}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="numeros"
                                                    />
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Observaciones Tipos..."
                                {...register('caracteristicas_fachada_tipos_observaciones', {
                                    required: 'Este campo es obligatorio.',
                                    minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                    maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                })}
                            >
                            </textarea>
                        </div>
                        {errors.caracteristicas_fachada_tipos_observaciones && (
                            <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                {errors.caracteristicas_fachada_tipos_observaciones.message}
                            </span>
                        )}

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2 mt-10">
                                <NumeroForm
                                    nro="216"
                                    text="Colores"
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
                                                        onClick={() => append_color({ carac_fachada_sectores: "", carac_fachada_nro_unidad_cat: "" })}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                            </tr>

                                            <tr>
                                                <OnlyLabelTd rowspan={4} label="SECTORES" orientation="vertical" />
                                                <OnlyLabelTd colspan={42} label="Colores" />
                                            </tr>
                                            <tr>


                                                <OnlyLabelTd colspan={9} label="Elementos Estructurales" />
                                                <OnlyLabelTd colspan={31} label="Elementos de Composición" />
                                                <OnlyLabelTd colspan={2} label="Otros" />
                                            </tr>
                                            <tr>

                                                <OnlyLabelTd colspan={6} label="Muro" />
                                                <OnlyLabelTd colspan={3} label="Cubiertas" />
                                                <OnlyLabelTd colspan={6} label="Puerta" />
                                                <OnlyLabelTd colspan={5} label="Ventana" />
                                                <OnlyLabelTd colspan={5} label="Puerta - Ventana" />
                                                <OnlyLabelTd colspan={5} label="Balcones" />
                                                <OnlyLabelTd colspan={5} label="Balconcillo" />
                                                <OnlyLabelTd colspan={5} label="Reja de Ingreso" />
                                                <OnlyLabelTd rowspan={5} label="" orientation="vertical" />
                                                <OnlyLabelTd rowspan={5} label="" orientation="vertical" />
                                            </tr>
                                            <tr>

                                                <OnlyLabelTd label="Crema" orientation="vertical" />
                                                <OnlyLabelTd label="Blanco" orientation="vertical" />
                                                <OnlyLabelTd label="Blanco Humo" orientation="vertical" />
                                                <OnlyLabelTd label="Beige" orientation="vertical" />
                                                <OnlyLabelTd label="Marfil" orientation="vertical" />
                                                <OnlyLabelTd label="Sin Color" orientation="vertical" />
                                                <OnlyLabelTd label="Ocre" orientation="vertical" />
                                                <OnlyLabelTd label="Plomo" orientation="vertical" />
                                                <OnlyLabelTd label="Otros" orientation="vertical" />
                                                <OnlyLabelTd label="Azul Añil" orientation="vertical" />
                                                <OnlyLabelTd label="Verde" orientation="vertical" />
                                                <OnlyLabelTd label="Marron" orientation="vertical" />
                                                <OnlyLabelTd label="Plomo" orientation="vertical" />
                                                <OnlyLabelTd label="Natural" orientation="vertical" />
                                                <OnlyLabelTd label="Otros" orientation="vertical" />
                                                <OnlyLabelTd label="Azul Añil" orientation="vertical" />
                                                <OnlyLabelTd label="Verde" orientation="vertical" />
                                                <OnlyLabelTd label="Marron" orientation="vertical" />
                                                <OnlyLabelTd label="Natural" orientation="vertical" />
                                                <OnlyLabelTd label="Otros" orientation="vertical" />
                                                <OnlyLabelTd label="Azul Añil" orientation="vertical" />
                                                <OnlyLabelTd label="Verde" orientation="vertical" />
                                                <OnlyLabelTd label="Marron" orientation="vertical" />
                                                <OnlyLabelTd label="Natural" orientation="vertical" />
                                                <OnlyLabelTd label="Otros" orientation="vertical" />
                                                <OnlyLabelTd label="Azul Añil" orientation="vertical" />
                                                <OnlyLabelTd label="Verde" orientation="vertical" />
                                                <OnlyLabelTd label="Marron" orientation="vertical" />
                                                <OnlyLabelTd label="Natural" orientation="vertical" />
                                                <OnlyLabelTd label="Otros" orientation="vertical" />
                                                <OnlyLabelTd label="Azul Añil" orientation="vertical" />
                                                <OnlyLabelTd label="Verde" orientation="vertical" />
                                                <OnlyLabelTd label="Marron" orientation="vertical" />
                                                <OnlyLabelTd label="Natural" orientation="vertical" />
                                                <OnlyLabelTd label="Otros" orientation="vertical" />
                                                <OnlyLabelTd label="Blanco" orientation="vertical" />
                                                <OnlyLabelTd label="Negro" orientation="vertical" />
                                                <OnlyLabelTd label="Azul" orientation="vertical" />
                                                <OnlyLabelTd label="Plomo" orientation="vertical" />
                                                <OnlyLabelTd label="Otros" orientation="vertical" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields_color.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove_color(index)}
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._sectores`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._sectores}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_muro_crema`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_muro_crema}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_muro_blanco`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_muro_blanco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_muro_blanco_humo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_muro_blanco_humo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_muro_beige`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_muro_beige}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_muro_marfil`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_muro_marfil}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_muro_sin_color`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_muro_sin_color}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_cubiertas_ocre`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_cubiertas_ocre}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_cubiertas_plomo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_cubiertas_plomo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_estructurales_cubiertas_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_estructurales_cubiertas_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_azul_añil`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_azul_añil}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_verde`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_verde}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_marron`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_marron}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_plomo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_plomo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_natural`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_natural}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_ventana_azul_añil`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_ventana_azul_añil}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_ventana_verde`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_ventana_verde}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_ventana_marron`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_ventana_marron}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_ventana_natural`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_ventana_natural}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_ventana_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_ventana_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_ventana_azul_añil`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_ventana_azul_añil}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_ventana_verde`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_ventana_verde}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_ventana_marron`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_ventana_marron}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_ventana_natural`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_ventana_natural}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_puerta_ventana_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_puerta_ventana_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balcones_azul_añil`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balcones_azul_añil}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balcones_verde`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balcones_verde}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balcones_marron`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balcones_marron}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balcones_natural`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balcones_natural}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balcones_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balcones_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balconcillo_azul_añil`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balconcillo_azul_añil}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balconcillo_verde`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balconcillo_verde}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balconcillo_marron`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balconcillo_marron}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balconcillo_natural`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balconcillo_natural}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_balconcillo_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_balconcillo_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_reja_ingreso_blanco`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_reja_ingreso_blanco}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_reja_ingreso_negro`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_reja_ingreso_negro}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_reja_ingreso_azul`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_reja_ingreso_azul}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />

                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_reja_ingreso_plomo`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_reja_ingreso_plomo}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_reja_ingreso_otros`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_reja_ingreso_otros}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_otros1`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_otros1}
                                                        maxLength={1}
                                                        isRequired={true}
                                                        tipo="letras"
                                                    />
                                                    <OnlyInputLetras
                                                        name={`caracteristicas_fachada_colores.${index}._ele_composicion_otros2`}
                                                        register={register}
                                                        errors={errors.caracteristicas_fachada_colores?.[index]?._ele_composicion_otros2}
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
                        <div className="my-4">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observaciones</label>
                            <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Observaciones..."
                                {...register('caracteristicas_fachada_colores_observaciones', {
                                    required: 'Este campo es obligatorio.',
                                    minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                    maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
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
                    </MainCard>
                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-6 flex flex-col gap-2">
                                <NumeroForm
                                    nro="212"
                                    text="FOTOGRAFIA"
                                    size="sm"
                                />
                                <input
                                    type="file"
                                    id="imagen"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('imagen', {
                                        required: 'La imagen es obligatoria.',
                                        validate: {
                                            fileType: (fileList) => {
                                                const file = fileList?.[0];
                                                return file && file.type.startsWith('image/') ? true : 'Solo se permiten imágenes.';
                                            },
                                            fileSize: (fileList) => {
                                                const file = fileList?.[0];
                                                return file && file.size <= 2 * 1024 * 1024 ? true : 'La imagen debe pesar menos de 2MB.';
                                            }
                                        }
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
                                    nro="211"
                                    text="PLANO DE UBICACIÓN"
                                    size="sm"
                                />
                                <input
                                    type="file"
                                    id="pdf"
                                    accept=".pdf"
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    {...register('pdf', {
                                        required: 'El archivo PDF es obligatorio.',
                                        validate: {
                                            fileType: (fileList) => {
                                                const file = fileList?.[0];
                                                return file && file.type === 'application/pdf' ? true : 'Solo se permiten archivos PDF.';
                                            },
                                            fileSize: (fileList) => {
                                                const file = fileList?.[0];
                                                return file && file.size <= 2 * 1024 * 1024 ? true : 'El PDF debe pesar menos de 2MB.';
                                            }
                                        }
                                    })}
                                />
                                {errors.pdf && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.pdf.message}
                                    </span>
                                )}
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
    );
}

export default FichaCatalogacionEspaciosPublicos;

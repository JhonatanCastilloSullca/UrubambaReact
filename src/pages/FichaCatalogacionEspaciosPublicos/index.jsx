import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import MainCard from "../../components/MainCard";

import ErrorIcono from "../../assets/icons/errorIcono";
import NumeroForm from "../../components/NumeroForm";

function FichaCatalogacionEspaciosPublicos() {
    const methods = useForm();
    const { register, control, handleSubmit, formState: { errors } } = methods;


    const { fields, append, remove } = useFieldArray({
        control,
        name: "caracteristicas_fachada",
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
                                <div>
                                    <input
                                        type="text"
                                        className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        {...register('codigo_unico_catastral', {
                                            required: 'Este campo es obligatorio.',
                                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                            maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    />
                                </div>
                                {errors.codigo_unico_catastral && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.codigo_unico_catastral.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm
                                    nro="201"
                                    text="CODIGO HOJA CATASTRAL"
                                    size="sm"
                                />
                                <div>
                                    <input
                                        type="text"
                                        className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        {...register('codigo_hoja_catastral', {
                                            required: 'Este campo es obligatorio.',
                                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                            maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    />
                                </div>
                                {errors.codigo_hoja_catastral && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.codigo_hoja_catastral.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm
                                    nro="203"
                                    text="CODIGO DE REGISTRO"
                                    size="sm"
                                />
                                <div>
                                    <input
                                        type="text"
                                        className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        {...register('codigo_registro', {
                                            required: 'Este campo es obligatorio.',
                                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                            maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    />
                                </div>
                                {errors.codigo_registro && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.codigo_registro.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm
                                    nro="204"
                                    text="Codigo de via"
                                    size="sm"
                                />
                                <div>
                                    <input
                                        type="text"
                                        className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        {...register('codigo_via', {
                                            required: 'Este campo es obligatorio.',
                                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                            maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    />
                                </div>
                                {errors.codigo_via && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.codigo_via.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col gap-2 col-span-2">
                                <NumeroForm
                                    nro="205"
                                    text="N° DE FICHA"
                                    size="sm"
                                />
                                <div>
                                    <input
                                        type="text"
                                        className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                        {...register('nro_ficha', {
                                            required: 'Este campo es obligatorio.',
                                            minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                            maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                            pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                        })}
                                    />
                                </div>
                                {errors.nro_ficha && (
                                    <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                        <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                        {errors.nro_ficha.message}
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
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            <div className="titulo-text px-4">Dpt.</div>
                                            <input
                                                type="text"
                                                className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                {...register('ubicacion_dpt', {
                                                    required: 'Este campo es obligatorio.',
                                                    minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                    maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                })}
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            <div className="titulo-text px-4">Prov.</div>
                                            <input
                                                type="text"
                                                className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                {...register('ubicacion_prov', {
                                                    required: 'Este campo es obligatorio.',
                                                    minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                    maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                })}
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            <div className="titulo-text px-4">Dist.</div>
                                            <input
                                                type="text"
                                                className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                {...register('ubicacion_dist', {
                                                    required: 'Este campo es obligatorio.',
                                                    minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                    maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                })}
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            <div className="titulo-text px-4">Mzna.</div>
                                            <input
                                                type="text"
                                                className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                {...register('ubicacion_mzna', {
                                                    required: 'Este campo es obligatorio.',
                                                    minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                    maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                })}
                                            />
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            <div className="titulo-text px-4">Lte Ref.</div>
                                            <input
                                                type="text"
                                                className="w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                                {...register('ubicacion_lote_ref', {
                                                    required: 'Este campo es obligatorio.',
                                                    minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                    maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="grid grid-cols-10 gap-4">
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            {errors.ubicacion_dpt && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ubicacion_dpt.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            {errors.ubicacion_prov && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ubicacion_prov.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            {errors.ubicacion_dist && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ubicacion_dist.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            {errors.ubicacion_mzna && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ubicacion_mzna.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="col-span-2 flex flex-row gap-2 items-center">
                                            {errors.ubicacion_lote_ref && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ubicacion_lote_ref.message}
                                                </span>
                                            )}
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
                                    nro="201"
                                    text="CODIGO HOJA CATASTRAL"
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
                                                <td rowSpan="4" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>SECTORES</div>
                                                </td>
                                                <td rowSpan="5" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Nº de Unid. Catalog.</div>
                                                </td>
                                                <td colSpan="48" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs">
                                                    <div className="p-0 ">Materiales</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="15" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Elementos Estructurales</div>
                                                </td>
                                                <td colSpan="25" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Elementos de Composición</div>
                                                </td>
                                                <td colSpan="8" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Elementos Ornamentales</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" className="p-0 border border-gray-300 text-xs">
                                                    <div className="p-0 ">Muro <br></br> Cont.</div>
                                                </td>
                                                <td colSpan="6" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Muro</div>
                                                </td>
                                                <td colSpan="4" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Cubiertas</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Columna</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180">
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Arqueria de piedra</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180">
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Tejaroz</div>
                                                </td>
                                                <td colSpan="7" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Revestimiento</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Puerta</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Ventana</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Puerta<br></br> Ventana</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180">
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Portada de piedra</div>
                                                </td>
                                                <td colSpan="3" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Balcones</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Balconcillo</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Ajimez</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180" >
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Logia</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Reja de <br></br>Ingreso</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180" >
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Zocalo</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180" >
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Pilastras</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180" >
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Blasones</div>
                                                </td>
                                                <td colSpan="2" className=" p-0 border border-gray-300 text-xs">
                                                    <div className=" p-0 ">Cruz</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180" >
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Nichos</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180" >
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Arcos</div>
                                                </td>
                                                <td rowSpan="3" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 text-xs align-middle text-vertical rotate-180" >
                                                    <div className="w-8 min-w-8 max-w-8 p-0 ">Otros</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    Concreto
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Piedra</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Concreto</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Ladrillo</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Adobe</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Piedra</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Adobe - Piedra</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Otros</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Planchas Piedra de Zinc</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Teja</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Sin cubierta</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Otros</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Concreto</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Piedra</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>reboque</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>enlucido</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>tarrajeo</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>embarre</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Chaqlapeo</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Sin Revestimiento</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Otros</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Metal</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Metal</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Metal</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Metal</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Concreto</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Metal</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Piedra</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Metal</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Piedra</div>
                                                </td>
                                                <td rowSpan="2" className="w-8 min-w-8 max-w-8 p-0 border border-gray-300 align-middle text-vertical rotate-180 text-xs">
                                                    <div>Madera</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className=" border border-gray-300 text-vertical rotate-180 text-xs">
                                                    <div className=" p-0 ">214</div>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fields.map((item, index) => (

                                                <tr key={item.id}>
                                                    <td className="">
                                                        <button
                                                            type="button"
                                                            className="w-8 bg-red-600 rounded-sm"
                                                            onClick={() => remove(index)} // Eliminar el campo correspondiente
                                                        >
                                                            -
                                                        </button>
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._sectores`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._sectores && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._nro_unidad_cat`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._nro_unidad_cat && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.muro_conten_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.muro_conten_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.muro_conten_concreto`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.muro_conten_concreto && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.muro_concreto`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.muro_concreto && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.muro_ladrillo`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.muro_ladrillo && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.muro_adobe`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.muro_adobe && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.muro_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.muro_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.muro_adobe_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.muro_adobe_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._muro_adobe_piedra`, {

                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._muro_adobe_piedra && (

                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.cubiertas_planchas_zinc`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.cubiertas_planchas_zinc && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.cubiertas_teja`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.cubiertas_teja && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.cubiertas_sin_cubierta`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.cubiertas_sin_cubierta && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.cubiertas_otros`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.cubiertas_otros && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.columna_concreto`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.columna_concreto && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.columna_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.columna_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}.arqueria_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?.arqueria_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._tejaroz`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._tejaroz && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._revest_reboque`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._revest_reboque && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._revest_enlucido`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._revest_enlucido && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._revest_tarrajeo`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._revest_tarrajeo && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._revest_embarre`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._revest_embarre && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._revest_chaqlapeo`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._revest_chaqlapeo && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._revest_sin_revest`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._revest_sin_revest && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._revest_otros`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._revest_otros && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._puerta_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._puerta_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._puerta_metal`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._puerta_metal && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._ventana_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._ventana_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._ventana_metal`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._ventana_metal && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._puerta_ventana_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._puerta_ventana_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._puerta_ventana_metal`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._puerta_ventana_metal && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._portada_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._portada_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._balcones_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._balcones_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._balcones_metal`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._balcones_metal && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._balcones_concreto`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._balcones_concreto && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._balconcillo_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._balconcillo_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._balconcillo_metal`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._balconcillo_metal && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._ajimez_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._ajimez_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._ajimez_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._ajimez_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._logia`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._logia && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._reja_ingreso_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._reja_ingreso_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._reja_ingreso_metal`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._reja_ingreso_metal && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._zocalo`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._zocalo && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._pilastras`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._pilastras && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._blasones`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._blasones && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._cruz_madera`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._cruz_madera && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._cruz_piedra`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._cruz_piedra && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._nichos`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._nichos && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._arcos`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._arcos && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="border">
                                                        <input type="text" className="w-8 text-center text-secondBackAdmin-dark"
                                                            {...register(`caracteristicas_fachada.${index}._otros`, {
                                                                required: 'Este campo es obligatorio.',
                                                                minLength: { value: 5, message: 'Debe tener al menos 5 caracteres.' },
                                                                maxLength: { value: 10, message: 'No debe exceder los 10 caracteres.' },
                                                                pattern: { value: /^[a-zA-Z]+$/, message: 'Solo se permiten letras.' },
                                                            })}
                                                        />
                                                        {errors.caracteristicas_fachada?.[index]?._otros && (
                                                            <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                                                                <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                </form >
            </FormProvider >
        </>
    );
}

export default FichaCatalogacionEspaciosPublicos;

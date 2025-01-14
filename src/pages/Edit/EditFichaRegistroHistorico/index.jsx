import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import MainCard from "../../../components/MainCard";
import ErrorIcono from "../../../assets/icons/errorIcono";
import NumeroForm from "../../../components/NumeroForm";
import OnlyInputError from "../../../components/OnlyInputError";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


function EditFichaRegistroHistorico() {
    const methods = useForm({
        defaultValues: {
            ficha_registro_historico: [],
        },
        mode: "onBlur",
    });
    const { register, control, handleSubmit, formState: { errors } } = methods;
    const { fields: fields_ficha_registro_hist, append: append_fields_ficha_registro_hist, remove: remove_fields_ficha_registro_hist } = useFieldArray({
        control,
        name: "ficha_registro_historico",
    });



    const { id } = useParams();
    const navigate = useNavigate();

    const getHeaders = () => ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    });

    const fetchData = async (id) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-registro-historico/${id}`, {
            method: "GET",
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos");
        }

        return response.json();
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["ficha_registro_historico", id],
        queryFn: () => fetchData(id),
        enabled: !!id,
    });

    const postData = async (data) => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/ficha-registro-historico`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(data),
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
            navigate("/impresion/ficha-registro-historico");
        },
        onError: (error) => {
            console.error("Error al enviar los datos:", error);
        },
    });

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
        console.log("Errores:", errors);
        const data2 = {
            ...data,
            ficha_id_anterior: id,
        };
        console.log(data2);
        mutation.mutate(data2);

    };


    useEffect(() => {
        if (data) {
            methods.reset(data);
            if (data.data.registrohistoricos?.length > 0) {
                data.data.registrohistoricos.forEach((registro) => {
                    append_fields_ficha_registro_hist({
                        fecha: registro.fecha || '',
                        propietario_arrendatario: registro.propietario || '',
                        fuente: registro.fuente || '',
                        descripcion: registro.descripcion || '',
                        id: registro.id,

                    });
                });
            }
        }
    }, [data, methods, append_fields_ficha_registro_hist]);


    if (isLoading || mutation.isLoading) {
        return <div>Cargando...</div>;
    }

    if (isError || mutation.isError) {
        return <div>Error: {error?.message || "Error desconocido"}</div>;
    }

    return (
        <>
            <h3 className="mb-4 font-bold text-2xl text-textAdmin-light dark:text-textAdmin-dark">
                FICHA DE REGISTRO DE CATALAGOCIÓN DE INMUEBLES
            </h3>


            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl">Dirección y Sectores</h4>
                        <div className="grid grid-cols-12 gap-4">

                            <div className="col-span-12 flex flex-col gap-2">
                                <NumeroForm nro="1" text="DIRECCION" size="sm" />
                                <OnlyInputError
                                    name="direccion"
                                    register={register}
                                    errors={errors.direccion}
                                    maxLength={255}
                                    isRequired={false}
                                    value={data?.data?.direccion || ''}
                                />
                            </div>


                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm nro="2" text="Sector" size="sm" />
                                <OnlyInputError
                                    name={`cod_sector`}
                                    register={register}
                                    errors={errors.cod_sector}
                                    maxLength={255}
                                    isRequired={true}
                                    value={data?.data?.unidad?.cod_sector || ''}
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm nro="3" text="Manzana" size="sm" />
                                <OnlyInputError
                                    name={`cod_manzana`}
                                    register={register}
                                    errors={errors.cod_manzana}
                                    maxLength={255}
                                    isRequired={true}
                                    value={data?.data?.unidad?.cod_manzana || ''}
                                />
                            </div>
                            <div className="flex flex-col gap-2 col-span-3">
                                <NumeroForm nro="4" text="Lote" size="sm" />
                                <OnlyInputError
                                    name={`cod_lote`}
                                    register={register}
                                    errors={errors.cod_lote}
                                    maxLength={255}
                                    isRequired={true}
                                    value={data?.data?.unidad?.cod_lote || ''}
                                />
                            </div>
                        </div>
                    </MainCard>

                    <MainCard>
                        <h4 className="mb-4 font-bold text-xl">ANÁLISIS DE BLOQUES NO CONSTRUIDOS</h4>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 flex flex-col gap-2">
                                <div className="flex gap-4 items-center">
                                    <NumeroForm nro="214" text="ANÁLISIS DE BLOQUES NO CONSTRUIDOS" size="sm" />
                                    <button
                                        type="button"
                                        className="h-8 w-8 bg-green-600 rounded-sm"
                                        onClick={() => append_fields_ficha_registro_hist({})}
                                    >
                                        +
                                    </button>
                                </div>

                                {fields_ficha_registro_hist.map((item, index) => (
                                    <div className="grid grid-cols-12 gap-4" key={item.id}>

                                        <div className="flex flex-col gap-2 col-span-3">
                                            <NumeroForm
                                                nro="5"
                                                text="Fecha"
                                                size="sm"
                                            />
                                            <OnlyInputError
                                                name={`ficha_registro_historico.${index}.fecha`}
                                                register={register}
                                                errors={errors.ficha_registro_historico?.[index]?.fecha}
                                                maxLength={255}
                                                isRequired={false}
                                                value={item?.fecha || ''}
                                            />
                                        </div>
                                        <div className="col-span-10"></div>
                                        <div className="flex flex-col gap-2 col-span-6">
                                            <NumeroForm
                                                nro="6"
                                                text="Propietario y/o Arrendatario"
                                                size="sm"
                                            />
                                            <div className="my-4">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Propietario y/o Arrendatario</label>
                                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Propietario y/o Arrendatario..."
                                                    {...register(`ficha_registro_historico.${index}.propietario_arrendatario`, {
                                                        required: 'Este campo es obligatorio.',
                                                        minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                                        maxLength: { value: 255, message: 'No debe exceder los 255 caracteres.' },

                                                    })}
                                                >
                                                </textarea>
                                            </div>
                                            {errors.ficha_registro_historico?.[index]?.propietario_arrendatario && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ficha_registro_historico?.[index]?.propietario_arrendatario.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2 col-span-6">
                                            <NumeroForm
                                                nro="7"
                                                text="Fuente"
                                                size="sm"
                                            />
                                            <div className="my-4">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fuente</label>
                                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Fuente..."

                                                    {...register(`ficha_registro_historico.${index}.fuente`, {
                                                        required: 'Este campo es obligatorio.',
                                                        minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                                        maxLength: { value: 255, message: 'No debe exceder los 255 caracteres.' },

                                                    })}
                                                >
                                                </textarea>
                                            </div>
                                            {errors.ficha_registro_historico?.[index]?.fuente && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ficha_registro_historico?.[index]?.fuente.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2 col-span-12">
                                            <NumeroForm
                                                nro="8"
                                                text="Descripcion"
                                                size="sm"
                                            />
                                            <div className="my-4">
                                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
                                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Descripcion..."
                                                    {...register(`ficha_registro_historico.${index}.descripcion`, {
                                                        required: 'Este campo es obligatorio.',
                                                        minLength: { value: 1, message: 'Debe tener al menos 1 caracteres.' },
                                                        maxLength: { value: 1000, message: 'No debe exceder los 255 caracteres.' },
                                                    })}
                                                >
                                                </textarea>
                                            </div>
                                            {errors.ficha_registro_historico?.[index]?.descripcion && (
                                                <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                                                    {errors.ficha_registro_historico?.[index]?.descripcion.message}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-2 col-span-12">
                                            <div className="flex gap-4 items-center">
                                                <NumeroForm text={`Eliminar ${index + 1} información`} size="sm" />
                                                <button
                                                    type="button"
                                                    className="w-8 bg-red-600 rounded-sm"
                                                    onClick={() => remove_fields_ficha_registro_hist(index)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MainCard>

                    <MainCard>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 flex flex-col gap-2">
                                <NumeroForm text="Registrado" size="sm" />
                                <OnlyInputError
                                    name={`registrado`}
                                    register={register}
                                    errors={errors.registrado}
                                    maxLength={255}
                                    isRequired={false}
                                    value={data?.data?.registrado || ''}

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
                </form>
            </FormProvider>

        </>
    )
}
export default EditFichaRegistroHistorico;
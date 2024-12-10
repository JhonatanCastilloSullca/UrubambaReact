import { useForm } from "react-hook-form";
import ErrorIcono from "../../assets/icons/errorIcono";

const Formulario = ({ seccion }) => {
    const { register, formState: { errors } } = useForm();

    return (
        <div className="grid grid-cols-12 gap-4">
            {seccion.map((campo, index) => {
                // Aquí puedes calcular dinámicamente el valor de `col-span`
                const colSpan = campo.col || 4; // Usa 4 como valor predeterminado

                return (
                    <div className={`col-span-${colSpan}`} key={index}>
                        {/* Número y Label */}
                        <div className="flex gap-2">
                            <div className="flex justify-center items-center h-8 w-8 flex-shrink-0 flex-grow-0 rounded-sm bg-green-500 text-white">
                                {campo.numero}
                            </div>
                            <div className="titulo-text">{campo.label}</div>
                        </div>

                        {/* Input */}
                        <div>
                            <input
                                type="text"
                                className="w-full peer h-10 rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                                {...register(campo.nombre || `campo_${index}`, {
                                    required: campo.required ? 'Este campo es obligatorio.' : false,
                                    minLength: campo.minLength ? {
                                        value: campo.minLength[0],
                                        message: campo.minLength[1],
                                    } : undefined,
                                    maxLength: campo.maxLength ? {
                                        value: campo.maxLength[0],
                                        message: campo.maxLength[1],
                                    } : undefined,
                                    pattern: campo.pattern ? {
                                        value: campo.pattern[0],
                                        message: campo.pattern[1],
                                    } : undefined,
                                })}
                            />
                        </div>

                        {/* Mensaje de Error */}
                        {errors[campo.nombre || `campo_${index}`] && (
                            <span className="text-sm text-red-600 font-medium flex items-center gap-2">
                                <span className="link-icon">
                                    <ErrorIcono strokeWidth={2} strokeColor="currentColor" />
                                </span>
                                {errors[campo.nombre || `campo_${index}`]?.message}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Formulario;

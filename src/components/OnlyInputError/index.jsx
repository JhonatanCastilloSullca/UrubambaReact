import { useState } from "react";
import ErrorIcono from "../../assets/icons/errorIcono";

const OnlyInputError = ({
    name,
    register,
    errors,
    maxLength = 1,
    isRequired = true,
    className = 'w-full peer h-10 rounded-md text-secondBackAdmin-dark font-normal bg-gray-50 px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400',
    tipo = '',
    value = '',
}) => {
    const [inputValue, setInputValue] = useState(value);

    const pattern = tipo === 'letras'
        ? /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/
        : tipo === 'numeros'
            ? /^[0-9]+$/
            : /./;

    const errorMessage = tipo === 'letras'
        ? 'Solo se permiten letras.'
        : tipo === 'numeros'
            ? 'Solo se permiten números.'
            : 'Solo se permiten letras y números.';

    const handleInput = (event) => {
        const { value } = event.target;
        if (tipo === 'letras') {
            setInputValue(value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, ''));
        } else if (tipo === 'numeros') {
            setInputValue(value.replace(/[^0-9]/g, ''));
        } else {
            setInputValue(value);
        }
    };

    return (
        <>
            <input
                type="text"
                className={className}
                maxLength={maxLength}
                inputMode={tipo === 'numeros' ? 'numeric' : 'text'}
                onInput={handleInput}
                value={inputValue}
                {...register(name, {
                    required: isRequired ? 'Este campo es obligatorio.' : false,
                    pattern: { value: pattern, message: errorMessage },
                    maxLength: { value: maxLength, message: `Máximo de ${maxLength} caracteres permitidos` },
                })}
            />
            {errors?.message && (
                <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                    {errors.message}
                </span>
            )}
        </>
    );
};

export default OnlyInputError;

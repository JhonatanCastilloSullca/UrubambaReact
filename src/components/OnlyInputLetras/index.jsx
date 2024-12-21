import ErrorIcono from "../../assets/icons/errorIcono";

const OnlyInputLetras = ({
    name,
    register,
    errors,
    maxLength = 1,
    isRequired = true,
    nextOnComplete = true,
    className = 'w-full text-center text-secondBackAdmin-dark h-full py-3',
    tipo = 'letras'
}) => {

    const pattern = tipo === 'letras'
        ? /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/
        : /^[0-9]+$/;

    const errorMessage = tipo === 'letras'
        ? 'Solo se permiten letras.'
        : 'Solo se permiten números.';


    const inputFilter = tipo === 'letras'
        ? /[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g
        : /[^0-9]/g;

    return (
        <td className="border">
            <input
                type="text"
                className={className}
                maxLength={maxLength}
                onInput={(e) => {
                    const input = e.target;

                    input.value = input.value.replace(inputFilter, '');


                    if (input.value.length === maxLength && nextOnComplete) {
                        const nextInput = input.closest('td').nextElementSibling?.querySelector('input');
                        nextInput?.focus();
                    }
                }}
                {...register(name, {
                    required: isRequired ? 'Este campo es obligatorio.' : false,
                    pattern: { value: pattern, message: errorMessage }
                })}
            />

            {errors && (
                <span className="text-sm text-red-600 font-medium flex items-center gap-2 text-center">
                    <span className="link-icon">{<ErrorIcono strokeWidth={2} strokeColor="currentColor" />}</span>
                </span>
            )}

        </td>
    );
};

export default OnlyInputLetras;

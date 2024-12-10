function NumeroForm({ nro, text, size, required }) {
    return (
        <div className="flex gap-2 items-center">
            {nro && (
                <div
                    className={`flex justify-center items-center h-8 w-8 flex-shrink-0 flex-grow-0 rounded-sm 
                    ${required ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                    {nro}
                </div>
            )}
            <div className={`titulo-text text-${size}`}>{text}</div>
        </div>
    )
}

export default NumeroForm;

import ErrorIcono from "../../assets/icons/errorIcono"
import MainCard from "../../components/MainCard"

function Usuarios() {
    return (
        <>
            <MainCard>
                <div className="">
                    <h4 className="mb-4">Listado de Usuarios
                    </h4>
                    <button type="button" className="font-bold text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2 gap-4">
                        <ErrorIcono strokeColor="#FFFFFF" />
                        Crear Usuario
                    </button>
                </div>
            </MainCard>
        </>

    )
}

export default Usuarios
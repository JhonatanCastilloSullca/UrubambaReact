import ErrorIcono from "../../assets/icons/errorIcono"
import Datatable from "../../components/Datatable"
import MainCard from "../../components/MainCard"
import data from "../../data/usuarios.json"

// {
//     "id": 1,
//     "first_name": "Pennie",
//     "last_name": "Vivien",
//     "email": "pvivien0@ed.gov",
//     "gender": "Female",
//     "ip_address": "190.146.39.81"
// },

const columns = [
    {
        header: "ID",
        accessorKey: 'id',
    },
    {
        header: "Nombres",
        accessorKey: 'first_name',
    },
    {
        header: "Apellidos",
        accessorKey: 'last_name',
    },
    {
        header: "E-mail",
        accessorKey: 'email',
    },
    {
        header: "Genero",
        accessorKey: 'gender',
    },
    {
        header: "IP",
        accessorKey: 'ip_address',
    },
]

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
                <Datatable columns={columns} data={data} />
            </MainCard>
        </>

    )
}

export default Usuarios
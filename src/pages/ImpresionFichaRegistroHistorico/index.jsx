import ErrorIcono from "../../assets/icons/errorIcono"
import Datatable from "../../components/Datatable"
import MainCard from "../../components/MainCard"
import data from "../../data/usuarios.json"


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

function ImpresionFichaRegistroHistorico() {

    return (
        <>
            <MainCard>
                <div className="">
                    <h4 className="mb-4">Fichas de registro historico
                    </h4>
                </div>
                <Datatable columns={columns} data={data} />
            </MainCard>
        </>

    )
}

export default ImpresionFichaRegistroHistorico
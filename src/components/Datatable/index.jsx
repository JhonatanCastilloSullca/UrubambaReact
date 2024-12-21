import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import ArrowDoubleLeft from "../../assets/icons/arrowDoubleLeft"
import ArrowLeft from "../../assets/icons/arrowLeft"
import ArrowRight from "../../assets/icons/arrowRight"
import ArrowDoubleRight from "../../assets/icons/arrowDoubleRight"
import { useState } from "react"
import SearchIcon from "../../assets/icons/searchIcon"

function Datatable({ data, columns }) {

    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState("");
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,

    })



    return (
        <>
            <div className="datatable-top">
                <div className="datatable-search relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <SearchIcon strokeColor="currentColor" />
                    </div>
                    <input
                        className="px-20 datatable-input pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="text"
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        placeholder="Buscar..."
                    />
                </div>
            </div>

            <div>
                <table className="datatable-table">
                    <thead>
                        {
                            table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {header.column.getIsSorted() === 'asc' ? "🔼" : header.column.getIsSorted() === 'desc' ? "🔽" : ""}
                                        </th>

                                    ))}
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map((row) => (

                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 " key={row.id}>

                                    {
                                        row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))

                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="datatable-bottom">
                <div className="datatable-info">
                    Mostrando del {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} al {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)} de {data.length} datos
                </div>

                <nav className="datatable-pagination">
                    <ul className="datatable-pagination-list">
                        <li className="datatable-pagination-list-item ">

                            <button className="datatable-pagination-list-item-link" onClick={() => table.setPageIndex(0)}>
                                <ArrowDoubleLeft strokeColor="#9ca3af" />
                            </button>
                        </li>
                        <li className="datatable-pagination-list-item ">
                            <button className="datatable-pagination-list-item-link" onClick={() => table.previousPage()}>
                                <ArrowLeft strokeColor="#9ca3af" />
                            </button>
                        </li>
                        <li className="datatable-pagination-list-item">
                            <button className="datatable-pagination-list-item-link" onClick={() => table.nextPage()}>
                                <ArrowRight strokeColor="#9ca3af" />
                            </button>
                        </li>
                        <li className="datatable-pagination-list-item">
                            <button className="datatable-pagination-list-item-link" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                                <ArrowDoubleRight strokeColor="#9ca3af" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div >
        </>
    )
}

export default Datatable
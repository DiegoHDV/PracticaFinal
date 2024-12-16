'use client'
import { useRouter } from "next/navigation"



export default function ListarProyectosCliente(projects){
    const router = useRouter()
    console.log(projects)
    return(
        <div>
            <h2 className="text-xl font-semibold mb-2 text-white text-center">Proyectos</h2>
            <table className="table-auto w-full border-collapse border-gray-200">
                {/* Encabezado */}
                <thead className="text-white">
                    <tr>
                        <th className="border px-4 py-2">Nombre</th>
                        <th className="border px-4 py-2">Código</th>
                        <th className="border px-4 py-2">Estado</th>
                    </tr>
                </thead>
                <tbody className="text-white text-center">
                    {projects.projects.map((item, index) => (
                        <tr key={index} className="transition-transform transform hover:scale-105 hover:bg-yellow-400 hover:text-black" onClick={() => router.push(`/proyectos/${item._id}`)}>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.projectCode}</td>
                            <td className="px-4 py-2">
                                {item.notes ? item.notes : 'Sin estado'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
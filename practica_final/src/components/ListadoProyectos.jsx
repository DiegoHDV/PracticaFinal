import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function ListadoProyectos({projects}){
    const router = useRouter()
    

    return(
        <div className="space-y-4">
            {projects.map((item, index) => {
                
                return(
                    <div key={index}>
                        <Link href={`/proyectos/${item._id}`} className="flex justify-between space-x-4 p-4 border-2 border-yellow-400 rounded transition-transform transform hover:scale-95">
                            <h1 className="text-gray-800 text-white font-medium hover:underline">Nombre del proyecto: {item.name}</h1>
                            <h1 className="pr-6 text-gray-800 text-white font-medium hover:underline">Código interno: {item.projectCode}</h1>
                        </Link>
                    </div>
                )}
            )}
            <div className="flex justify-end">
                <button onClick={() => router.push('/proyectos/addProject')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300">
                    Crear proyecto
                </button>
            </div>
        </div>
    )
}
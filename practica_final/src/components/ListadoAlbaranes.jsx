import Link from 'next/link'
import { useRouter } from 'next/navigation'


export default function ListadoAlbaranes({albaranes}){
    const router = useRouter()
    
    return(
        <div>
            {albaranes.map((item, index) => {
                const fecha = new Date(item.createdAt)
                const anio = fecha.getFullYear()
                const mes = String(fecha.getMonth() + 1).padStart(2, "0")
                const dia = String(fecha.getDate()).padStart(2, "0")
                return(
                    <div key={index} className="mb-4">
                        <Link href={`/albaranes/${item._id}`} className="flex justify-between space-x-4 p-4 border-2 border-orange-500 rounded transition-transform transform hover:scale-105"> 
                            <h1 className="text-gray-800 text-white font-medium hover:underline">Descripción: {item.description}</h1>
                            <h1 className="text-gray-800 text-white font-medium hover:underline">Fecha de creación {anio}/{mes}/{dia}</h1>
                        </Link>
                    </div>
                )}
            )}
            <div className="flex justify-end">
                <button onClick={() => router.push('/albaranes/addAlbaran')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300">
                    Crear albarán
                </button>
            </div>
        </div>
    )
}
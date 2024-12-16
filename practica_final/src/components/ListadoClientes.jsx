

import Link from 'next/link'
import { patchLogoCliente } from '@/utils/httpRequests.js'
import { useRouter } from 'next/navigation'

export default function ListadoClientes({clients}){
    const router = useRouter()

    console.log(clients)
    return(
        <div className="space-y-4">
            {clients.map((item, index) => {
                console.log(item.logo)
                const fecha = new Date(item.createdAt)
                const anio = fecha.getFullYear()
                const mes = String(fecha.getMonth() + 1).padStart(2, "0")
                const dia = String(fecha.getDate()).padStart(2, "0")
                //const res = patchLogoCliente(`https://bildy-rpmaya.koyeb.app/api/client/logo/${item._id}`, defaultLogo)
                return(
                    <Link key={index} href={`/clientes/${item._id}`} className="flex items-center justify-between space-x-4 p-2 border-2 border-white rounded transition-transform transform hover:scale-105">
                        <div className="flex items-center space-x-4">
                            {!item.logo ? <img src='/images/default_logo.png' alt='Sin logo' width={48} className="rounded-full"></img> : <img src={item.logo} alt="logo" width={48} className="rounded-full"></img>}
                            <h1 href={`/clientes/${item._id}`} className="text-gray-800 text-white font-medium hover:underline">{item.name}</h1>
                        </div>
                        <h1 className="ml-auto text-sm text-white">Fecha de creación: {anio}/{mes}/{dia}</h1>
                    </Link>
                )}
            )}
            <div className="flex justify-end">
                <button onClick={() => router.push('/clientes/addClient')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300">
                    Crear cliente
                </button>
            </div>
        </div>
    )
}
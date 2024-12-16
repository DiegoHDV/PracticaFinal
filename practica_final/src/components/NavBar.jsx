
import Link from 'next/link'

export default function NavBar(){
    return(
        <div className="bg-gray-800 text-white h-screen w-50 p-6 flex flex-col space-y-4 shadow-lg">
            <Link href='/clientes' className="hover:bg-gray-700 p-2 rounded-md transition duration-300">Clientes</Link>
            <Link href='/proyectos' className="hover:bg-gray-700 p-2 rounded-md transition duration-300">Proyectos</Link>
            <Link href='/albaranes' className="hover:bg-gray-700 p-2 rounded-md transition duration-300">Albaranes</Link>
            <h1 className="hover:bg-gray-700 p-2 rounded-md transition duration-300">Proveedores</h1>
            <h1 className="hover:bg-gray-700 p-2 rounded-md transition duration-300">Ajustes</h1>
        </div>
    )
}
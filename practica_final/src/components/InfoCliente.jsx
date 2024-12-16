'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getDatos, deleteClient, patchLogoCliente } from '@/utils/httpRequests.js'
import ListarProyectosCliente from './ListarProyectosCliente.jsx'

async function getProjects(idCliente, setProjects){
    const url = `https://bildy-rpmaya.koyeb.app/api/project/${idCliente}`

    const res = await getDatos(url)

    
    setProjects(res)
    
}

export default function InfoCliente({cliente}){
    const router = useRouter()
    const [projects, setProjects] = useState(null)
    useEffect(() => {getProjects(cliente._id, setProjects)}, [])
    
    function redirigirEditar(){
        router.push(`/clientes/${cliente._id}/editClient`)
    }
    function deleteCliente(){
        const url = `https://bildy-rpmaya.koyeb.app/api/client/${cliente._id}`;
        deleteClient(url)
        
        router.push('/clientes')
    }
    return(
        
        <div className="space-y-4">
            <h1 className="text-xl font-bold text-white text-center m-2">Información del Cliente</h1>
            
            {cliente&& 
                <div>
                    <div className="flex items-center space-x-4 m-2">
                        {!cliente.logo ? <img src='/images/default_logo.png' alt='Sin logo' width={148}></img> : <img src={cliente.logo} alt="logo" width={148}></img>}
                        <div className="text-center p-4">
                            <p className="text-2xl text-white">{cliente.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 m-4 ">
                        <h1 className="font-semibold text-xl text-white text-center m-2">Dirección:</h1>
                        <p className="text-white text-l">{cliente.address.street}</p>
                    </div>
                    <div className="flex space-x-2 justify-center p-4">
                        <button className="bg-green-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition duration-300" onClick={redirigirEditar}>Editar cliente</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={deleteCliente}>Eliminar cliente</button>
                    </div>
                </div>
            }
            {projects!=null ? <ListarProyectosCliente projects={projects}></ListarProyectosCliente> : <h1>No hay proyectos para este cliente</h1>}
            
        </div>
    )
}

/*


*/
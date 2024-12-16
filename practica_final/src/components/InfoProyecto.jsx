'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { deleteClient, getDatos } from '@/utils/httpRequests.js'

async function datos(url, setClient){
    const datos = await getDatos(url)

    setClient(datos)
}


export default function InfoProyecto({project}){
    const router = useRouter()
    const [client, setClient] = useState(null)
    const urlClient = `https://bildy-rpmaya.koyeb.app/api/client/${project.clientId}`
    useEffect(() => {datos(urlClient, setClient)}, [])

    const fecha = new Date(project.createdAt)
    const anio = fecha.getFullYear()
    const mes = String(fecha.getMonth() + 1).padStart(2, "0")
    const dia = String(fecha.getDate()).padStart(2, "0")

    function redirigirEditar(){
        router.push(`/proyectos/${project._id}/editProject`)
    }
    function deleteProject(){
        const url = `https://bildy-rpmaya.koyeb.app/api/project/${project._id}`;
        deleteClient(url)
        
        router.push('/proyectos')
    }
    return(
        
        <div className="space-y-4">
            <h1 className="text-xl font-bold text-white text-center m-2">Proyecto: {project.name}</h1>
            
            {project&& 
                
                <div>
                    <div className="flex items-center space-x-4 m-4 ">
                        <div className="block">
                            <h1 className=" font-semibold text-xl text-white text-center m-2">Nombre del proyecto:</h1>
                        </div>
                        <p className="text-white text-l">{project.name}</p>
                    </div>
                    <div className="flex items-center space-x-4 m-4 ">
                        <h1 className="font-semibold text-xl text-white text-center m-2">Código interno:</h1>
                        <p className="text-white text-l">{project.projectCode}</p>
                    </div>
                    <div className="flex items-center space-x-4 m-4 ">
                        <h1 className="font-semibold text-xl text-white text-center m-2">Estado:</h1>
                        <p className="text-white text-l">{project.notes ? project.notes : 'Sin estado'}</p>
                        
                    </div>
                    <div className="flex items-center space-x-4 m-4 ">
                        <h1 className="font-semibold text-xl text-white text-center m-2">Fecha de creación:</h1>
                        <p className="text-white text-l">{anio}/{mes}/{dia}</p>
                    </div>
                    <div className="flex space-x-2 justify-center p-4">
                        <button className="bg-green-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition duration-300" onClick={redirigirEditar}>Editar proyecto</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={deleteProject}>Eliminar proyecto</button>
                    </div>
                </div>
            }
            {client&&
                
                <div className="flex flex-col space-x-4 mt-8 ">
                    <h1 className="text-white text-xl m-4">Proyecto asociado al cliente</h1>
                    <div className="flex items-center space-x-4 m-2 rounded transition-transform transform hover:scale-105 hover:border-2" onClick={() => router.push(`/clientes/${client._id}`)}>
                        {!client.logo ? <img src='/images/default_logo.png' alt='Sin logo' width={80}></img> : <img src={client.logo} alt="logo" width={80}></img>}
                        <div className="text-center p-4">
                            <p className="text-2xl text-white">{client.name}</p>
                        </div>
                    </div>
                </div>
            }           
        </div>
    )
}

'use client'


import { putDatos } from "@/utils/httpRequests.js";
import { useRouter } from "next/navigation";
import { useState } from "react";


async function editProyecto(router, body, url){
    

    const res = putDatos(url, body)

    router.push('/proyectos')
}

export default function EditProject({project, clients}){
    console.log("Clientes en editProject: ", clients)
    const router = useRouter()
    const [name, setName] = useState(project.name)
    const [clientId, setClientId] = useState(project.clientId)
    const [projectCode, setProjectCode] = useState(project.projectCode)
    const [notes, setNotes] = useState('')

    const estados = ["En proceso", "Aprobado", "Completado", "Cancelado"];

    const url = `https://bildy-rpmaya.koyeb.app/api/project/${project._id}`

    function handleSubmit(values){
        values.preventDefault()
        
        const object = {
            notes: notes,
            name: name,
            clientId: clientId,
            projectCode: projectCode
            
        }
        
        editProyecto(router, object, url)
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md border-2 p-6 rounded-lg shadow-lg shadow-purple-700">
                <h1 className="text-2xl text-white font-bold text-center mb-6">Editar Proyecto {project.name}</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white text-xl mb-1">
                            Introduce el nombre del proyecto:
                        </label>
                        <input type="text" value={name} onChange={(values) => setName(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
                    </div>
                    <div>
                        <label className="block text-white text-xl mb-1">
                            Selecciona un cliente:
                        </label>
                        <select value={clientId} onChange={(values) => setClientId(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700">
                            <option value="">-- Selecciona una opción --</option>
                                {clients.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                                ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-white text-xl mb-1">
                            Código del proyecto:
                        </label>
                        <input type="text" value={projectCode} onChange={(values) => setProjectCode(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
                    </div>
                    <div>
                        <label>
                            Marca el estado del proyecto:
                        </label>
                        <select value={notes} onChange={(values) => setNotes(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700">
                            <option value="">-- Selecciona una opción --</option>
                                {estados.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                                ))}
                        </select>
                    </div>
                    <button type='submit' className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

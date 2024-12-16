'use client'


import { postDatosWithToken } from "@/utils/httpRequests.js";
import { useRouter } from "next/navigation";
import { useState } from "react";


async function addAlbaran(router, body){
    const url = 'https://bildy-rpmaya.koyeb.app/api/deliverynote'

    const res = postDatosWithToken(url, body)

    router.push('/albaranes')
    
}


export default function CrearAlbaran(projects){
    const router = useRouter()
    const [description, setDescription] = useState('')
    const [projectId, setProjectId] = useState('')
    const [format, setFormat] = useState('hours')
    const [material, setMaterial] = useState('')
    const [hours, setHours] = useState(0)

    const formatos = ["material", "hours"]

    function handleSubmit(values){
        values.preventDefault()
        if (!description || !projectId || !format) {
            alert("Por favor completa todos los campos.")
            return
        }
        if(format == "material"){
            if(!material){
                alert("Por favor completa todos los campos.")
            }
            else{
                const project = projects.projects.find((item) => projectId==item._id)
                console.log("Projecto: ", project)
                const object = {
                    description: description,
                    projectId: projectId,
                    clientId: project.clientId,
                    format: format,
                    material: material,
                    hours: 0
                }
                addAlbaran(router, object)
            }
        }
        else{
            if(!hours){
                alert("Por favor completa todos los campos.")
            }
            else{
                const project = projects.projects.find((item) => projectId==item._id)
                const object = {
                    description: description,
                    projectId: projectId,
                    clientId: project.clientId,
                    format: format,
                    material: '',
                    hours: hours
                }
                addAlbaran(router, object)
            }
        }
        
        
    }
    console.log(projects)
    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md border-2 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl text-white font-bold text-center mb-6">Crear Proyecto</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-white text-xl mb-1">
                            Selecciona el proyecto asociado:
                        </label>
                        <select value={projectId} onChange={(values) => setProjectId(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700">
                            <option value="">-- Selecciona un proyecto --</option>
                            {projects.projects.map((item, index) => (
                            <option key={index} value={item._id}>
                                {item.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-white text-xl mb-1">
                            Descripción:
                        </label>
                        <input type="text" value={description} onChange={(values) => setDescription(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
                    </div>
                    
                    <div>
                        <label className="block text-white text-xl mb-1">
                            Formato:
                        </label>
                        <select value={format} onChange={(values) => setFormat(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700">
                            <option value="">-- Selecciona una opción --</option>
                            {formatos.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                            ))}
                        </select>
                    </div>
                    {format=="material" ? 
                        <div>
                            <label className="block text-white text-xl mb-1">Materiales: </label>
                            <input type="text" value={material} onChange={(values) => setMaterial(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
                        </div>
                        :
                        <div>
                            <label className="block text-white text-xl mb-1">Horas: </label>
                            <input type="number" value={hours} onChange={(values) => setHours(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
                        </div>
                    }
                    <button type='submit' className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-green-500 transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
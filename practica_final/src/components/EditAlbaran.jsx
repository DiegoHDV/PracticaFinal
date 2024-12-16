'use client'


import { putDatos } from "@/utils/httpRequests.js";
import { useRouter } from "next/navigation";
import { useState } from "react";


async function editAlbaran(router, body, url){
    
    const res = putDatos(url, body)

    router.push('/albaranes')
}

export default function EditAlbaran({albaran, projects}){
    const router = useRouter()
    const [description, setDescription] = useState(albaran.description)
    const [format, setFormat] = useState(albaran.format)
    const [material, setMaterial] = useState(albaran.material)
    const [hours, setHours] = useState(albaran.hours)
    const formatos = ["material", "hours"]
    console.log("Albaran ", albaran)
    const url = `https://bildy-rpmaya.koyeb.app/api/deliverynote/${albaran._id}`
    console.log(projects)
    function handleSubmit(values){
        values.preventDefault()
        
        const project = projects.find((item) => albaran.projectName == item.name && albaran.projectCode == item.projectCode)
        console.log("Project ", project)
        if(format == "material"){
            if(!material){
                alert("Por favor completa todos los campos.")
            }
            else{
                
                const object = {
                    projectId: project._id,
                    clientId: project.clientId,
                    description: description,
                    format: format,
                    material: ''
                }
                editAlbaran(router, object, url)
            }
        }
        else{
            if(!hours){
                alert("Por favor completa todos los campos.")
            }
            else{
                const object = {
                    projectId: project._id,
                    clientId: project.clientId,
                    description: description,
                    format: format,
                    hours: 0
                }
                editAlbaran(router, object, url)
            }
        }
        
        
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md border-2 p-6 rounded-lg shadow-lg shadow-purple-700">
                <h1 className="text-2xl text-white font-bold text-center mb-6">Albarán asociado al proyecto: {albaran.projectName}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button type="submit">  Enviar </button>
                </form>
            </div>
        </div>
    )
}

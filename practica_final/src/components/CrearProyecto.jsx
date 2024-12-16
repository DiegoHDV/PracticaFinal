'use client'


import { postDatosWithToken } from "@/utils/httpRequests.js";
import { useRouter } from "next/navigation";
import { useState } from "react";


async function addProject(router, body){
    const url = 'https://bildy-rpmaya.koyeb.app/api/project'

    const res = postDatosWithToken(url, body)

    if(!res.ok){
        console.log(`ERROR: ${res.status}`)
    }
    else{
        router.push('/proyectos')
    }
}


export default function CrearProyecto(clients){
  const router = useRouter()
  const [name, setName] = useState('')
  const [clientId, setClientId] = useState('')
  const [projectCode, setProjectCode] = useState('')

  function handleSubmit(values){
    values.preventDefault()
    if (!name || !clientId || !projectCode) {
      alert("Por favor completa todos los campos.")
      return
    }
    
    const object = {
        name: name,
        clientId: clientId,
        projectCode: projectCode
    }
    
    addProject(router, object)
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-md border-2 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-white font-bold text-center mb-6">Crear Proyecto</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-xl mb-1">
              Introduce el nombre del proyecto
            </label>
            <input type="text" value={name} onChange={(values) => setName(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
          </div>

          <div>
            <label className="block text-white text-xl mb-1">
              Selecciona el cliente asociado
            </label>
            <select value={clientId} onChange={(values) => setClientId(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700">
              <option value="">-- Selecciona un cliente --</option>
              {clients.clients.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-white text-xl mb-1">
              Código del proyecto
            </label>
            <input type="text" value={projectCode} onChange={(values) => setProjectCode(values.target.value)} className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
          </div>

          <button type='submit' className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-green-500 transition duration-300">
              Submit
          </button>
        </form>
      </div>
    </div>
  )
}

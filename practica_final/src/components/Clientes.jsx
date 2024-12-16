'use client'

import { useState, useEffect } from "react"
import ListadoClientes from "./ListadoClientes.jsx"
import { getDatos } from "@/utils/httpRequests.js"

async function datos(setClients){
    const datos = await getDatos("https://bildy-rpmaya.koyeb.app/api/client")

    setClients(datos)
}

export default function Clientes(){
    const [clients, setClients] = useState(null)
    
    useEffect(() => {datos(setClients)}, [])

    
    return(
        <div className="space-y-4">
            <div className=" p-4 h-screen">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Clientes</h2>
                <div className="space-y-6">
                    {clients && <ListadoClientes clients={clients} />}
                </div>
            </div>
            
        </div>
    )
}
'use client'

import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import EditClient from "@/components/EditClient.jsx"
import NavBar from "@/components/NavBar.jsx"

async function datos(idCliente, setClient){
    const datos = await getDatos(`https://bildy-rpmaya.koyeb.app/api/client/${idCliente}`)

    setClient(datos)
}

export default function editClientPage({params}){
    const id = params.id
    const [client, setClient] = useState(null)
    useEffect(() => {datos(id, setClient)}, [])
    //console.log('Cliente ', cliente)

    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                {client&& <EditClient client={client}></EditClient>} 
            </div>
        </div>
    )
}
'use client'


import InfoCliente from "@/components/InfoCliente.jsx"
import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import Clientes from "@/components/Clientes.jsx"
import NavBar from "@/components/NavBar.jsx"

async function datos(idCliente, setCliente){
    const datos = await getDatos(`https://bildy-rpmaya.koyeb.app/api/client/${idCliente}`)

    setCliente(datos)
}


export default function infoClientePage({params}){
    
    const id = params.id
    const [cliente, setCliente] = useState(null)
    useEffect(() => {datos(id, setCliente)}, [])
    console.log('Cliente ', cliente)

    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="w-1/2 m-2">
                <Clientes></Clientes> 
            </div>
            <div className="m-5 w-2/5">
                {cliente&& <InfoCliente cliente={cliente}></InfoCliente>}
            </div>
        </div>
    )
}
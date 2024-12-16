'use client'

import CrearProyecto from "@/components/CrearProyecto.jsx";
import { getDatos } from "@/utils/httpRequests.js";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar.jsx";

async function getClients(setClients){
    const datos = await getDatos("https://bildy-rpmaya.koyeb.app/api/client")

    setClients(datos)
}

export default function addProjectPage(){
    const [clients, setClients] = useState(null)
        
    useEffect(() => {getClients(setClients)}, [])

    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
            {clients&& <CrearProyecto clients={clients}></CrearProyecto>}
            </div>
        </div>
    )
}
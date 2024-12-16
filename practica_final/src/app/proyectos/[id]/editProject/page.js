'use client'

import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import EditProject from "@/components/EditProject"
import NavBar from "@/components/NavBar.jsx"

async function datos(url, set){
    const datos = await getDatos(url)

    set(datos)
}

export default function editProjectPage({params}){
    const id = params.id
    const [project, setProject] = useState(null)
    const [clients, setClients] = useState(null)
    
    const urlClients = "https://bildy-rpmaya.koyeb.app/api/client"
    useEffect(() => {datos(urlClients, setClients)}, [])

    const urlProject = `https://bildy-rpmaya.koyeb.app/api/project/one/${id}`
    useEffect(() => {datos(urlProject, setProject)}, [])
    console.log("Clientes: ", clients)
    console.log("Proyecto: ", project)
    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                {project&& clients&& <EditProject project={project} clients={clients}></EditProject>}
            </div>
        </div>
    )
}
'use client'


import InfoProyecto from "@/components/InfoProyecto.jsx"
import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import Proyectos from "@/components/Proyectos.jsx"
import NavBar from "@/components/NavBar.jsx"

async function datos(url, setProject){
    const datos = await getDatos(url)

    setProject(datos)
}


export default function infoProyectoPage({params}){
    
    const id = params.id
    const [project, setProject] = useState(null)
    const urlProject = `https://bildy-rpmaya.koyeb.app/api/project/one/${id}`
    useEffect(() => {datos(urlProject, setProject)}, [])

    return(
        
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="w-1/2 m-2">
                <Proyectos></Proyectos>
            </div>
            <div className="m-5 w-2/5">
                {project&& <InfoProyecto project={project}></InfoProyecto>}
            </div>
        </div>
    )
}
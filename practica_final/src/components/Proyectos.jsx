'use client'

import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import ListadoProyectos from "./ListadoProyectos.jsx"

async function datos(setProjects){
    const datos = await getDatos("https://bildy-rpmaya.koyeb.app/api/project")

    setProjects(datos)
}

export default function Proyectos(){
    const [projects, setProjects] = useState(null)
    
    useEffect(() => {datos(setProjects)}, [])

    
    return(
        <div className="space-y-4">
            <div className=" p-4 h-screen">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Proyectos</h2>
                <div className="space-y-6">
                    {projects&& <ListadoProyectos projects={projects}></ListadoProyectos>}
                </div>
            </div>
        </div>
    )
}
'use client'

import CrearAlbaran from "@/components/CrearAlbaran.jsx";
import { getDatos } from "@/utils/httpRequests.js";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar.jsx";

async function getProjects(setProjects){
    const datos = await getDatos("https://bildy-rpmaya.koyeb.app/api/project")

    setProjects(datos)
}

export default function addAlbaranPage(){
    const [projects, setProjects] = useState(null)
    
    useEffect(() => {getProjects(setProjects)}, [])

    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                {projects&& <CrearAlbaran projects={projects}></CrearAlbaran>} 
            </div>
        </div>
    )
}
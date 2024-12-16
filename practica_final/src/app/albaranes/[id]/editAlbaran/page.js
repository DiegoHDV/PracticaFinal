'use client'

import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import EditAlbaran from "@/components/EditAlbaran.jsx"
import NavBar from "@/components/NavBar.jsx"

async function datos(url, set){
    const datos = await getDatos(url)

    set(datos)
}

export default function editAlbaranPage({params}){
    const id = params.id
    const [projects, setProjects] = useState(null)
    const [albaran, setAlbaran] = useState(null)
    
    const urlAlbaran = `https://bildy-rpmaya.koyeb.app/api/deliverynote/${id}`
    useEffect(() => {datos(urlAlbaran, setAlbaran)}, [])

    const urlProject = "https://bildy-rpmaya.koyeb.app/api/project"
    useEffect(() => {datos(urlProject, setProjects)}, [])
    
    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                {albaran&& projects&& <EditAlbaran albaran={albaran} projects={projects}></EditAlbaran>}
            </div>
        </div>
    )
}
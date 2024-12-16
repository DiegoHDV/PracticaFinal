'use client'


import InfoAlbaran from "@/components/InfoAlbaran.jsx"
import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import Albaranes from "@/components/Albaranes.jsx"
import NavBar from "@/components/NavBar.jsx"

async function datos(id, setAlbaran){
    const datos = await getDatos(`https://bildy-rpmaya.koyeb.app/api/deliverynote/${id}`)

    setAlbaran(datos)
}


export default function infoAlabaranPage({params}){
    
    const id = params.id
    const [albaran, setAlbaran] = useState(null)
    useEffect(() => {datos(id, setAlbaran)}, [])
    console.log('albaran ', albaran)

    return(
        
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="w-1/2 m-2">
                <Albaranes></Albaranes>
            </div>
            <div className="m-5 w-2/5">
                {albaran&& <InfoAlbaran albaran={albaran}></InfoAlbaran>}
            </div>
        </div>
    )
}
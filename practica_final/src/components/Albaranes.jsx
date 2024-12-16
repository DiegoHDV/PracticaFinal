'use client'

import { useState, useEffect } from "react"
import { getDatos } from "@/utils/httpRequests.js"
import ListadoAlbaranes from "./ListadoAlbaranes.jsx"

async function datos(url, setAlbaranes){
    const datos = await getDatos(url)

    setAlbaranes(datos)
}

export default function Albaranes(){
    const [albaranes, setAlbaranes] = useState(null)
    
    const urlAlbaranes = "https://bildy-rpmaya.koyeb.app/api/deliverynote"

    useEffect(() => {datos(urlAlbaranes, setAlbaranes)}, [])
    
    return(
        <div className="space-y-4">
            <div className=" p-4 h-screen">
                <h2 className="text-white text-xl font-bold mb-4 text-center">Albaranes</h2>
                <div className="space-y-6">
                    {albaranes&& <ListadoAlbaranes albaranes={albaranes}></ListadoAlbaranes>}
                </div>
            </div>
        </div>
    )
}
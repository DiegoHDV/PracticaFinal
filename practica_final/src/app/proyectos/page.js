import Proyectos from "@/components/Proyectos.jsx";
import NavBar from "@/components/NavBar.jsx"

export default function proyectosPage(){


    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                <Proyectos></Proyectos>
            </div>
        </div>
    )
}
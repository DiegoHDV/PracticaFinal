import CrearCliente from "@/components/CrearCliente.jsx";
import NavBar from "@/components/NavBar.jsx"


export default function addClientPage(){
    

    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                <CrearCliente></CrearCliente> 
            </div>
        </div>
    )
}
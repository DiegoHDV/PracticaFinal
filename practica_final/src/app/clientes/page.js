

import Clientes from "@/components/Clientes.jsx";
import NavBar from "@/components/NavBar.jsx";



export default function ClientesPage(){
    
    
    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                <Clientes></Clientes>
            </div>
        </div>
        
    )
}
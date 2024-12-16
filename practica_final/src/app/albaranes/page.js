import Albaranes from "@/components/Albaranes.jsx";
import NavBar from "@/components/NavBar.jsx";


export default function albaranesPage(){
    return(
        <div className="flex h-screen">
            <NavBar></NavBar>
            <div className="flex-1 p-6">
                <Albaranes></Albaranes>
            </div>
        </div>
    )
}
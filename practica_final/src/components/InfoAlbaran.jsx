'use client'

import { useRouter } from 'next/navigation'
import { deleteClient, downloadPDF } from '@/utils/httpRequests.js'


async function descargarAlbaran(url, albaran){
    downloadPDF(url)
    .then((res) => res.blob())
    .then((blob) => {
        console.log(blob)
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `albaran_${albaran._id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    })
        .catch((error) => {
        console.error('Error downloading PDF:', error);
    })
    
}

export default function InfoAlbaran({albaran}){
    const router = useRouter()

    function redirigirEditar(){
        router.push(`/albaranes/${albaran._id}/editAlbaran`)
    }
    function deleteAlbaran(){
        const url = `https://bildy-rpmaya.koyeb.app/api/deliverynote/${albaran._id}`;
        deleteClient(url)
        
        router.push('/albaranes')
    }

    function handleDownloadPDF(){
        descargarAlbaran(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${albaran._id}`, albaran)
    }

    console.log(albaran)
    return(
        
        <div className="space-y-4">
            <h1 className="text-xl font-bold text-white text-center m-2">Albarán asociado al proyecto: {albaran.projectName}</h1>
            
            {albaran&& 
                
                <div>
                    <div className="flex items-center space-x-4 m-4 ">
                        <div className="block">
                            <h1 className=" font-semibold text-xl text-white text-center m-2">Descripción del albarán:</h1>
                        </div>
                        <p className="text-white text-l">{albaran.description}</p>
                    </div>
                    <div className="flex items-center space-x-4 m-4 ">
                        <div className="block">
                            <h1 className=" font-semibold text-xl text-white text-center m-2">Formato:</h1>
                        </div>
                        <p className="text-white text-l">{albaran.format}</p>
                    </div>
                    
                    {albaran.format=='hours' ?
                        <div className="flex items-center space-x-4 m-4 ">
                            <div className="block">
                                <h1 className=" font-semibold text-xl text-white text-center m-2">Hours:</h1>
                            </div>
                            <p className="text-white text-l">{albaran.hours}</p>
                        </div>
                        :
                        <div className="flex items-center space-x-4 m-4 ">
                            <div className="block">
                                <h1 className=" font-semibold text-xl text-white text-center m-2">Material:</h1>
                            </div>
                            <p className="text-white text-l">{albaran.material}</p>
                        </div>
                    }
                    <div className="flex items-center space-x-4 m-4 ">
                        <div className="block">
                            <h1 className=" font-semibold text-xl text-white text-center m-2">Asociado al cliente:</h1>
                        </div>
                        <p className="text-white text-l">{albaran.client.name}</p>
                    </div>   
                    
                    <div className="flex space-x-2 justify-center p-4">
                        <button className="bg-green-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition duration-300" onClick={redirigirEditar}>Editar albarán</button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={deleteAlbaran}>Eliminar albarán</button>
                        <button className="bg-blue-600 hover:bg-green-500 text-white px-4 py-2 rounded" onClick={handleDownloadPDF}>Descargar PDF</button>
                    </div>
                </div>
            }            
        </div>
    )
}
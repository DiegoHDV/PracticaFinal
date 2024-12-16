'use client'

import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { putDatos } from '@/utils/httpRequests.js'

async function edit(idCliente, values, router){
    
    const url = `https://bildy-rpmaya.koyeb.app/api/client/${idCliente}`
    const res = await putDatos(url, values)
    
    if(res.ok){
        console.log(res.body)
        
        router.push(`/clientes/${idCliente}`)
    }
    else{
        console.log(`ERROR: ${res.status}`)
    }
}


export default function EditClient(client){
    const router = useRouter()

    const SignSquema = Yup.object({
        name: Yup.string(),
        cif: Yup.string().min(9).max(9),
        address: Yup.string()
    })
    function handleSubmit(values, setSubmitting){
        
        const address = {street: values.address}
        values.address = address
        
        edit(client.client._id, values, router)

    }
    console.log(client.client.name)

    return(
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md border-2 p-6 rounded-lg shadow-lg shadow-purple-700">
                <h1 className="text-2xl text-white font-bold text-center mb-6">Editar Cliente {client.client.name}</h1>
                <Formik 
                    initialValues={{name: client.client.name, cif: client.client.cif, address: client.client.address.street}}
                    onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
                    validationSchema={SignSquema}
                >{
                    ({isSubmitting}) => (
                        <Form className="space-y-4">
                            <div className='form-group'>
                                <label className="block text-white text-xl mb-1">Name</label>
                                <Field type='name' name='name' className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
                            </div>
                            <div className='form-group'>
                                <label className="block text-white text-xl mb-1">CIF</label>
                                <Field type='cif' name='cif' className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/> 
                            </div>
                            <div className='form-group'>
                                <label className="block text-white text-xl mb-1">Address</label>
                                <Field type='address' name='address' className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/> 
                            </div>
                            <button type='submit' disabled={isSubmitting} className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                Submit
                            </button>
                        </Form>
                    )
                }</Formik>
            </div>
        </div>
    )
}
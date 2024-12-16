'use client'

import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { postDatosWithToken } from '@/utils/httpRequests.js'

async function addClient(values, router){
    
    const url = 'https://bildy-rpmaya.koyeb.app/api/client'
    const res = await postDatosWithToken(url, values)
    
    if(res.ok){
        console.log(res.body)
        
        router.push("/clientes")
    }
    else{
        console.log(`ERROR: ${res.status}`)
    }
}

export default function CrearCliente(){
    const router = useRouter()

    const SignSquema = Yup.object({
        name: Yup.string().required(),
        cif: Yup.string().min(9).max(9).required(),
        address: Yup.string().required()
    })
    function handleSubmit(values, setSubmitting){
        
        const address = {street: values.address}
        values.address = address
        
        addClient(values, router)

    }
    

    return(
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md border-2 p-6 rounded-lg shadow-md">
                <h1 className="text-2xl text-white font-bold text-center mb-6">Crear Cliente</h1>
                <Formik 
                    initialValues={{name: '', cif: '', address: ''}}
                    onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
                    validationSchema={SignSquema}
                >{
                    ({isSubmitting}) => (
                        <Form className="space-y-4">
                            <div className='form-group'>
                                <label className="block text-white text-xl mb-1">Name</label>
                                <Field type='name' name='name' className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/>
                                <ErrorMessage name='name' component='div' className="text-purple-800 text-m mt-1"></ErrorMessage>
                            </div>
                            <div className='form-group'>
                                <label className="block text-white text-xl mb-1">CIF</label>
                                <Field type='cif' name='cif' className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/> 
                                <ErrorMessage name='cif' component='div' className="text-purple-800 text-m mt-1"></ErrorMessage>
                            </div>
                            <div className='form-group'>
                                <label className="block text-white text-xl mb-1">Address</label>
                                <Field type='address' name='address' className="w-full border-2 rounded-lg p-2 focus:outline-none focus:border-purple-700"/> 
                                <ErrorMessage name='address' component='div' className="text-purple-800 text-m mt-1"></ErrorMessage>
                            </div>
                            <button type='submit' disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-green-500 transition duration-300">
                                Submit
                            </button>
                        </Form>
                    )
                }</Formik>
            </div>
        </div>
    )
}
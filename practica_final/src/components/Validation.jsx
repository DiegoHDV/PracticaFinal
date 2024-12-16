'use client'

import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { putDatos } from '@/utils/httpRequests.js'


export default function Validation(){
    const router = useRouter()

    const SignSquema = Yup.object({
        code: Yup.string().min(6).max(6).required('Required file'),
    })
    
    function handleSubmit(values, setSubmitting){
        setSubmitting(values)
        
        validar(values)
    }

    async function validar(values){
        console.log(JSON.stringify(values))
        const url = "https://bildy-rpmaya.koyeb.app/api/user/validation"

        const res = await putDatos(url, values)

        if(res.ok){
            router.push("/clientes")
        }
        else{
            console.log(`ERROR: ${res.status}`)
        }
        
    }

    return(
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h1 className="text-xl font-bold text-center text-gray-700 mb-4">
                Compruebe su correo e introduzca el código recibido
            </h1>
            <Formik 
                initialValues={{code: ''}}
                onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
                validationSchema={SignSquema}
            >{
                ({isSubmitting}) => (
                    <Form className="space-y-4">
                        <div className='form-group flex flex-col items-center'>
                            <label htmlFor='code'></label>
                            <Field type='code' name='code' className="border border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name='code' component='div' className="text-red-500 text-sm mt-1"></ErrorMessage>
                        </div>
                        <button type='submit' disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-green-600 transition duration-300">
                            Validar
                        </button>
                    </Form>
                )
            }</Formik>
        </div>
    )
}
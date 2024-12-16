'use client'

import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function Login(){
    const router = useRouter()

    const SignSquema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })
    
    function handleSubmit(values, setSubmitting){
        setSubmitting(values)
        
        redirigir(values)
    }

    async function redirigir(values){
        console.log(JSON.stringify(values))
        const res = await fetch("https://bildy-rpmaya.koyeb.app/api/user/login", {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if(res.ok){
            const user = await res.json()
            localStorage.setItem('jwt', user.token)
            router.push("/clientes")
        }
        else{
            console.log(`ERROR: ${res.status}`)
        }
        
    }

    return(
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Iniciar Sesión
            </h1>
            <Formik 
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
                validationSchema={SignSquema}
            >{
                ({isSubmitting}) => (
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor='email' className="font-medium">Email</label>
                            <Field type='email' name='email' className="border border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name='email' component='div' className="text-sm text-red-500"></ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Password</label>
                            <Field type='password' name='password' className="border border-gray-300 rounded-md p-2"/> 
                            <ErrorMessage name='password' component='div' className="text-sm text-red-500"></ErrorMessage>
                        </div>
                        <button type='submit' disabled={isSubmitting} className="bg-blue-600 text-white rounded-md p-2 hover:bg-green-600 transition duration-300">
                            Submit
                        </button>
                    </Form>
                )
            }</Formik>
            <div>
                <Link href='/signIn' className="font-semibold text-green-600 hover:text-blue-600 transition duration-200">Crear cuenta nueva</Link>
            </div>
        </div>
    )
}
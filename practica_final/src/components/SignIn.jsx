'use client'

import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import { postDatosWithoutToken } from '@/utils/httpRequests.js'
import Link from 'next/link'


export default function SignIn(){
    const router = useRouter()

    const SignSquema = Yup.object({
        name: Yup.string().required(),
        surname: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6).required()
    })
    
    function handleSubmit(values, setSubmitting){
        setSubmitting(values)
        
        registrar(values)
    }

    async function registrar(values){
        console.log(JSON.stringify(values))
        const url = "https://bildy-rpmaya.koyeb.app/api/user/register"

        const res = await postDatosWithoutToken(url, values)

        if(res.ok){
            const user = await res.json()
            localStorage.setItem('jwt', user.token)
            router.push("/signIn/validation")
        }
        else{
            console.log(`ERROR: ${res.status}`)
        }
        
    }

    return(
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Registrarse
            </h1>
            <Formik 
                initialValues={{name: '', surname: '', email: '', password: ''}}
                onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
                validationSchema={SignSquema}
            >{
                ({isSubmitting}) => (
                    <Form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Name</label>
                            <Field type='name' name='name' className="border border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name='name' component='div' className="text-sm text-red-500"></ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-medium">Surname</label>
                            <Field type='surname' name='surname' className="border border-gray-300 rounded-md p-2"/>
                            <ErrorMessage name='surname' component='div' className="text-sm text-red-500"></ErrorMessage>
                        </div>
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
                <Link href='/login' className="font-semibold text-green-600 hover:text-blue-600 transition duration-200">Ya tengo una cuenta</Link>
            </div>
        </div>
    )
}
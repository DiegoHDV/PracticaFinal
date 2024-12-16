import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-m rounded-md">
        <div className="flex flex-col gap-4">

          <Link href="/login" className="text-black-600 hover:text-blue-400 transition duration-300">
            Ya tengo una cuenta
          </Link>

          <Link href="/signIn" className="text-black-600 hover:text-green-400 transition duration-300">
            Crear cuenta nueva
          </Link>
          
        </div>
      </div>
    </div>
  )
}

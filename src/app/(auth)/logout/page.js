"use client"

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()
  const handleLogout = async (e) => {
    e.preventDefault()
    signOut({
      provider: "credentials",
      callbackUrl: "/",
      redirect: true,
    })
  }

  return (
    <div className="flex min-h-screen bg-black justify-center items-center">
      <div className="flex flex-col gap-3 p-6 rounded-xl bg-indigo-700 text-white">
        <h1 className="font-baloo text-white text-center">
          Anda yakin akan logout?
        </h1>
        <div className="flex justify-between gap-5 items-center">
          <button
            onClick={router.back}
            className="text-center p-2 px-4 bg-green-500 rounded-md cursor-pointer"
          >
            Kembali
          </button>
          <button
            onClick={handleLogout}
            className="text-center p-2 px-4 bg-red-600 rounded-md cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page

"use client"

import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const session = useSession()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    signIn("credentials", {
      username: username,
      password: password,
      redirect: true,
      callbackUrl: "/dashboard",
    })
  }

  if (session.status === "authenticated") return window.location.replace("/")
  else {
    return (
      <div className="flex min-h-screen justify-center bg-black items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center gap-3 p-5 bg-blue-700 shadow-2xl shadow-blue-700/70 rounded-xl font-baloo px-6">
            <h1 className="text-2xl text-white">Silakan Masuk</h1>
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              className="border-1 border-white text-white p-2 px-3 rounded-md"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            ></input>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              className="border-1 border-white text-white p-2 px-3 rounded-md"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></input>
            <button
              type="submit"
              className="w-full p-2 px-3 rounded-md bg-amber-600 text-white cursor-pointer"
            >
              Login
            </button>
            <Link
              href={"/"}
              className="w-full p-2 px-3 text-center rounded-md bg-lime-600 text-white"
            >
              Kembali
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default Page

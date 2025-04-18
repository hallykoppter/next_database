"use client"

import { useRef, useState } from "react"
import bcrypt from "bcryptjs"
import { Toast } from "primereact/toast"
import { useRouter } from "next/navigation"

const Register = () => {
  const [name, setName] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const toast = useRef()
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    const hashedPassword = await bcrypt.hash(password, 10)
    const data = { name, username, hashedPassword }
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/users`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    )
    const res = await req.json()
    if (res.status == 200) {
      toast.current.show({
        severity: "success",
        summary: "Berhasil",
        detail: "Akun berhasil dibuat",
        life: 3000,
      })
    } else return console.log(res)
  }
  const handleHide = () => {
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen bg-black  justify-center items-center">
      <form onSubmit={handleRegister}>
        <div className="flex flex-col items-center bg-fuchsia-600 p-7 shadow-fuchsia-600/60 shadow-2xl rounded-xl justify-center gap-5">
          <div className="text-center text-white">Register</div>
          <input
            className="p-2 px-4 border-2 rounded-md  text-white"
            type="text"
            placeholder="Nama Lengkap"
            onChange={(e) => {
              setName(e.target.value)
            }}
          ></input>
          <input
            className="p-2 px-4 border-2 rounded-md  text-white"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          ></input>
          <input
            className="p-2 px-4 border-2 rounded-md text-white"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></input>
          <button className="text-center text-white p-2 w-full rounded-md bg-green-700">
            Submit
          </button>
        </div>
      </form>
      <Toast ref={toast} onHide={handleHide} />
    </div>
  )
}

export default Register

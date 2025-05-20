"use client"

import Countdown from "@/components/Countdown"
import InputText from "@/components/InputText"
import { signIn, useSession } from "next-auth/react"
import { useState } from "react"

const Page = () => {
  const [done, setDone] = useState("hidden")
  const [hidden, setHidden] = useState("")
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const { data: session } = useSession()
  let UserAktif

  const handleComplete = () => {
    setDone()
    setHidden("hidden")
  }

  const handleLogin = (e) => {
    e.preventDefault()
    signIn("credentials", {
      username: username,
      password: password,
      role: "siswa",
      redirect: true,
      callbackUrl: "/",
    })
  }

  const Tittle = () => {}

  const Show = () => {
    return (
      <h1 className={"text-white text-5xl font-titan " + done}>
        Its Show Time
      </h1>
    )
  }

  if (session?.user.role == "admin") {
    UserAktif = (
      <a
        href="/dashboard"
        className="flex p-2 px-4 rounded-md bg-primary font-baloo text-xl"
      >
        Dashboard
      </a>
    )
  } else if (session?.user.role == "siswa") {
    UserAktif = (
      <a
        href="/pd/pengumuman"
        className="flex p-2 px-4 rounded-md bg-primary font-baloo text-xl"
      >
        Pengumuman
      </a>
    )
  } else {
    UserAktif = (
      <form className="flex flex-col font-baloo gap-3" onSubmit={handleLogin}>
        <input type="hidden" name="role" id="role" value="siswa" />
        <InputText
          type={"number"}
          id="nisn"
          label="NISN"
          onchange={(e) => setUsername(e.target.value)}
        />
        <InputText
          type={"password"}
          id="password"
          label="Password"
          onchange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-lime-600 rounded-md p-2 cursor-pointer">
          Masuk
        </button>
      </form>
    )
  }

  return (
    <div className="flex min-h-screen md:flex-row flex-col justify-center gap-2 md:gap-20 items-center">
      <div className="flex flex-col gap-10 md:gap-6 justify-center p-10 rounded-md items-center scale-[70%] md:scale-100">
        <h1
          className={
            "text-2xl md:text-3xl text-center font-titan text-white " + hidden
          }
        >
          Pengumuman dibuka dalam:
        </h1>
        <Show />
        <Countdown oncomplete={handleComplete} />
      </div>
      <div className="flex p-3 rounded-md ring-3 ring-red-500">{UserAktif}</div>
    </div>
  )
}

export default Page

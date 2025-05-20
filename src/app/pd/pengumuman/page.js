"use client"

import Countdown from "@/components/Countdown"
import { useSession } from "next-auth/react"
import { useState } from "react"

const Page = () => {
  const [show, setShow] = useState("")
  const { data: session } = useSession()
  let pengumuman
  const handleComplete = () => {
    setShow("hidden")
    pengumuman = (
      <div className="flex justify-center items-center text-4xl text-center font-baloo">
        Ini Pengumuman
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col gap-5 justify-center items-center">
      <h1>Hallo {session?.user.name}</h1>
      {pengumuman}
      <div
        className={
          "flex gap-4 justify-center font-baloo flex-col items-center scale-75 md:scale-100 " +
          show
        }
      >
        <h1 className="text-2xl">Pengumuman dibuka dalam: </h1>
        <Countdown oncomplete={handleComplete} />
      </div>
      <a
        href="/logout"
        className="bg-red-600 cursor-pointer p-2 px-4 rounded-md text-center text-wihte"
      >
        Logout
      </a>
    </div>
  )
}

export default Page

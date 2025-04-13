"use client"

import Countdown from "@/components/Countdown"
import InputText from "@/components/InputText"
import { useState } from "react"

const Page = () => {
  const [done, setDone] = useState("hidden")

  const handleComplete = () => {
    setDone()
  }

  const Show = () => {
    return (
      <h1 className={"text-white text-5xl font-titan " + done}>
        Its Show Time
      </h1>
    )
  }

  return (
    <div className="flex min-h-screen md:flex-row flex-col justify-center gap-2 md:gap-20 items-center">
      <div className="flex flex-col gap-10 md:gap-6 justify-center p-10 rounded-md items-center scale-[70%] md:scale-100">
        <h1 className="text-2xl md:text-3xl text-center font-titan text-white">
          Pengumuman dibuka dalam:
        </h1>
        <Show />
        <Countdown oncomplete={handleComplete} />
      </div>
      <div className="flex p-3 rounded-md ring-3 ring-red-500">
        <form className="flex flex-col font-baloo gap-3">
          <input type="hidden" name="role" id="role" value="siswa" />
          <InputText type={"number"} id="nisn" label="NISN" />
          <InputText type={"text"} id="password" label="PASSWORD" />
          <button className="bg-lime-600 rounded-md p-2 cursor-pointer">
            Masuk
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page

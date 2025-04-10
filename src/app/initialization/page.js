"use client"
import InputText from "@/components/InputText"
import InputTextArea from "@/components/InputTextArea"
import { useState } from "react"
import { addYears } from "date-fns"

const Page = () => {
  const [nama_sekolah, setNamaSekolah] = useState()
  const [npsn, setNpsn] = useState()
  const [email_sekolah, setEmailSekolah] = useState()
  const [nama_kepsek, setNamaKepsek] = useState()
  const [nip_kepsek, setNipKepsek] = useState()
  const [alamat_sekolah, setAlamatSekolah] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const logo_sekolah = "default.jpg"
    const semester = "2024/2025"
    const izin_login = 0
    const aktif_pengumuman = 0
    const waktu_pengumuman = addYears(new Date(), 1)

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/settings`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application.json",
        },
        body: JSON.stringify({
          nama_sekolah,
          npsn,
          email_sekolah,
          nama_kepsek,
          nip_kepsek,
          alamat_sekolah,
          logo_sekolah,
          semester,
          izin_login,
          aktif_pengumuman,
          waktu_pengumuman,
        }),
      }
    )

    const res = await req.json()

    console.log(res)
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-black">
      <div className="bg-gray-300 max-w-[90vw] md:max-w-[50vw] shadow shadow-gray-400/85 p-5 rounded-md flex flex-col">
        <h1 className="flex text-xl md:mb-5 mb-3 text-black font-baloo font-bold justify-center items-center">
          Inisialisasi Data Sekolah
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex justify-between flex-nowrap flex-col md:flex-row md:flex-wrap font-baloo gap-3">
            <InputText
              type={"text"}
              id={"nama_sekolah"}
              grow={"grow"}
              label={"Nama Sekolah"}
              onchange={(e) => setNamaSekolah(e.target.value)}
            />
            <InputText
              type={"number"}
              id={"npsn"}
              grow={"grow"}
              label={"NPSN Sekolah"}
              onchange={(e) => setNpsn(e.target.value)}
            />
            <InputText
              type={"email"}
              id={"email_sekolah"}
              grow={"flex-2/2"}
              label={"Email Sekolah"}
              onchange={(e) => setEmailSekolah(e.target.value)}
            />
            <InputText
              type={"text"}
              id={"nama_kepsek"}
              grow={"grow"}
              label={"Nama Kepala Sekolah"}
              onchange={(e) => setNamaKepsek(e.target.value)}
            />
            <InputText
              type={"number"}
              id={"nip_kepsek"}
              grow={"grow"}
              label={"NIP Kepala Sekolah"}
              onchange={(e) => setNipKepsek(e.target.value)}
            />
            <InputTextArea
              id={"alamat_sekolah"}
              label={"Alamat Sekolah"}
              grow={"flex-2/2"}
              onchange={(e) => {
                setAlamatSekolah(e.target.value)
              }}
            />
          </div>
          <button
            className="flex grow ring-1 ring-secondary text-white bg-primary rounded-sm w-full p-2 justify-center items-center cursor-pointer"
            type="submit"
          >
            Inisialisasi
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page

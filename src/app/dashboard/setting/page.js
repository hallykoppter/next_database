"use client"

import InputDatetime from "@/components/InputDatetime"
import InputSelect from "@/components/InputSelect"
import InputText from "@/components/InputText"
import InputTextArea from "@/components/InputTextArea"
import { getSetting } from "@/libs/SettingsService"
import { addHours } from "date-fns"
import { Toast } from "primereact/toast"
import { useEffect, useRef, useState } from "react"

const Page = () => {
  const toast = useRef(null)
  const [data, setSetting] = useState()
  const [semester, setSemester] = useState()
  const [izin_login, setIzinLogin] = useState()
  const [aktif_pengumuman, setAktifPengumuman] = useState()
  const setting = data?.setting
  useEffect(() => {
    async function fetch() {
      const req = await getSetting()
      setSetting(req)
    }
    fetch()
  }, [])

  const handleChange = async (event) => {
    event.preventDefault()
    let data = Object.fromEntries(new FormData(event.target))
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/settings`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(data),
      }
    )
    const res = await req.json()
    if (res.status == 200) {
      toast.current.show({
        severity: "success",
        Summary: "Berhasil",
        detail: "Berhasil update data",
        life: 2000,
      })
    } else {
      toast.current.show({
        severity: "error",
        Summary: "Error",
        detail: "Update gagal",
        life: 2000,
      })
    }
  }

  let w
  function checkVariable() {
    if (setting?.waktu_pengumuman != undefined) {
      const waktu_awal = new Date(setting?.waktu_pengumuman)
      const waktu = addHours(waktu_awal, 7)
      w = waktu
    }
  }

  checkVariable()

  // console.log({ waktu_awal, waktu })

  const option = {
    semester: [
      { value: "2024/2025", label: "2024/2025" },
      { value: "2023/2024", label: "2023/2024" },
    ],
    aktif_pengumuman: [
      { value: "0", label: "tidak diizinkan" },
      { value: "1", label: "diizinkan" },
    ],
    izin_login: [
      { value: "0", label: "tidak diizinkan" },
      { value: "1", label: "diizinkan" },
    ],
  }

  return (
    <div className="flex font-baloo flex-col mx-auto gap-5 justify-center items-center mt-5 p-5 rounded-md bg-gray-500 shadow-2xl shadow-gray-500/50 w-[80vw]">
      <h1 className="flex justify-center text-center ring-2 ring-white bg-lime-500/35 p-2 w-[60%] px-4 rounded-md">
        Lakukan Pengaturan di bawah ini
      </h1>
      <form
        id="edit"
        name="edit"
        onSubmit={handleChange}
        className="flex rounded-md ring-2 ring-white bg-gray-800  p-8 flex-col md:flex-wrap flex-nowrap md:flex-row md:max-w-[60vw] w-full gap-4 justify-between"
      >
        <InputText
          type="number"
          id="npsn"
          label="NPSN Sekolah"
          grow={"grow"}
          defvalue={setting?.npsn}
        />
        <InputText
          type="text"
          id="nama_sekolah"
          label="Nama Sekolah"
          grow={"grow"}
          defvalue={setting?.nama_sekolah}
        />
        <InputText
          type="email"
          id="email_sekolah"
          label="Email Sekolah"
          grow={"grow"}
          defvalue={setting?.email_sekolah}
        />
        <InputText
          type="text"
          id="nama_kepsek"
          label="Nama Kepala Sekolah"
          grow={"grow"}
          defvalue={setting?.nama_kepsek}
        />
        <InputText
          type="number"
          id="nip_kepsek"
          label="NIP Kepala Sekolah"
          grow={"grow"}
          defvalue={setting?.nip_kepsek}
        />
        <div className="break"></div>
        <InputSelect
          id={"semester"}
          label={"Semester"}
          grow={"grow"}
          option={option.semester}
          defvalue={setting?.semester}
        />
        <InputSelect
          id={"izin_login"}
          label={"Izinkan Login"}
          grow={"grow"}
          option={option.izin_login}
          defvalue={setting?.izin_login}
        />
        <InputSelect
          id={"aktif_pengumuman"}
          label={"Izinkan Pengumuman"}
          grow={"grow"}
          option={option.aktif_pengumuman}
          defvalue={setting?.aktif_pengumuman}
        />
        <InputDatetime
          id={"waktu_pengumuman"}
          label={"Waktu Pengumuman"}
          grow={"flex-2/2"}
          defvalue={w}
        />
        <InputTextArea
          id={"alamat_sekolah"}
          label={"Alamat Sekolah"}
          grow={"grow"}
          defvalue={setting?.alamat_sekolah}
        />
        <button className="flex flex-3/3 justify-center items-center bg-primary rounded-md p-2">
          Save
        </button>
      </form>
      <Toast ref={toast} />
    </div>
  )
}

export default Page

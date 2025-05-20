"use client"

import Table from "@/components/Table"
import bcrypt from "bcryptjs"
import { useEffect, useRef, useState } from "react"
import * as XLSX from "xlsx"
import { Toast } from "primereact/toast"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { turncateSiswa } from "@/app/api/db/siswa/siswaService"

const Page = () => {
  const toast = useRef()
  let [jsonData, setJsonData] = useState()
  const [siswa, setSiswa] = useState()
  const [visible, setVisible] = useState(false)

  //get data siswa from database
  useEffect(() => {
    async function getSiswa() {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/siswa`,
        {
          method: "GET",
        }
      )
      const res = await req.json()
      setSiswa(res)
    }
    getSiswa()
  }, [])

  // get file excel
  function getFileExcel(e) {
    e.preventDefault()
    const excel = e.target.files[0]
    if (excel) {
      let reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" })
          const sheetName = workbook.SheetNames[0]
          const workSheet = workbook.Sheets[sheetName]
          const json = XLSX.utils.sheet_to_json(workSheet)
          setJsonData(json)
        }
      }
      reader.readAsArrayBuffer(excel)
    }
  }

  //import excel to database
  async function handleSubmit() {
    if (jsonData) {
      for (let i = 0; i < jsonData?.length; i++) {
        jsonData[i].password = await bcrypt.hash(
          jsonData[i].password.toString(),
          10
        )
        jsonData[i].nis = jsonData[i].nis.toString()
        jsonData[i].nisn = jsonData[i].nisn.toString()
      }
    }
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/siswa`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      }
    )
    const res = await req.json()
    if (res.status == 200)
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Import data siswa berhasil",
        life: 2000,
      })
    else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Import data siswa gagal",
        life: 2000,
      })
    }
  }

  const accept = async () => {
    const req = await turncateSiswa()
    if (req.status == 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Hapus data siswa berhasil",
        life: 2000,
      })
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Hapus data siswa gagal",
        life: 2000,
      })
    }
  }
  const reject = () => {
    toast.current.show({
      severity: "warning",
      summary: "Warning",
      detail: "Hapus data siswa dibatalkan",
      life: 2000,
    })
  }

  return (
    <div className="flex justify-between overflow-x-hidden md:flex-row flex-col p-2">
      <Toast ref={toast} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Apakah yakin akan menghapus seluruh data peserta didik?"
        header="Hapus data peserta didik"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
        style={{ width: "50vw" }}
        breakpoints={{ "1100px": "75vw", "960px": "100vw" }}
      />
      <div className="flex justify-center p-2 mt-2">
        <Table data={siswa?.data} toast={toast} />
      </div>
      <div className="flex gap-5 flex-col">
        <div className="flex flex-col max-w-[30vw] rounded-md gap-3 bg-gray-300 p-2  text-black font-baloo mt-3 text-left">
          <h1 className="font-bold">Import Data Siswa</h1>
          <form action={handleSubmit} className="flex gap-1">
            <input
              type="file"
              name="data_siswa"
              id="data_siswa"
              accept=".xlsx,"
              className="file:border-2 file:border-green-400 file:px-2 file:rounded-md border-1 p-1 rounded-md border-lime-700 w-50"
              onChange={getFileExcel}
            />
            <button className="flex justify-center items-center bg-green-500 p-2 rounded-md">
              Import
            </button>
          </form>
          <div>
            <p className="w-90">
              Silakan import data siswa dengan format xlsx. gunakan template di
              bawah ini untuk mengimport data.
            </p>
          </div>
        </div>
        <div className="flex p-3 font-baloo bg-red-500 rounded-md justify-between">
          <p className="text-white">Hapus seluruh data siswa</p>
          <button
            onClick={() => setVisible(true)}
            className="cursor-pointer bg-red-700 px-2 rounded-md"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page

import { useState } from "react"

const Table = ({ data, toast }) => {
  const [dataTable, setTable] = useState()
  const [isLoading, setLoading] = useState(true)

  const handleLulus = async ({ id, keterangan }) => {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/siswa`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, keterangan: keterangan }),
      }
    )
    const res = await req.json()
    if (res.status == 200) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Berhasil Diluluskan",
        life: 2000,
      })
      window.location.reload()
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Gagal Diluluskan",
        life: 2000,
      })
    }
  }

  function checkVariable() {
    if (data != undefined) {
      const set = data?.map((siswa, key) => {
        return (
          <tr
            key={key}
            className="bg-white border-b py-3 border-gray-700k border-gray-200 hover:bg-gray-50"
          >
            <td scope="col" className="px-6 py-4">
              {key + 1}
            </td>
            <td scope="col" className="text-left px-6 py-4">
              {siswa.nama}
            </td>
            <td scope="col" className="px-6 py-4">
              {siswa.nis}
            </td>
            <td scope="col" className="px-6 py-4">
              {siswa.nisn}
            </td>
            <td scope="col" className="px-6 py-4">
              {siswa.kelas}
            </td>
            <td scope="col" className="px-6 py-4">
              {siswa.keterangan == 0 ? "tidak lulus" : "lulus"}
            </td>
            <td scope="col" className="px-6 py-4">
              <button
                onClick={() =>
                  handleLulus({
                    id: siswa.id,
                    keterangan: siswa.keterangan == 0 ? 1 : 0,
                  })
                }
                className="bg-green-500 rounded-md text-xs p-1 cursor-pointer"
              >
                Luluskan Siswa
              </button>
            </td>
          </tr>
        )
      })
      setLoading(false)
      setTable(set)
    }
  }

  setTimeout(checkVariable, 1000)

  if (isLoading) return <span className="page-loading"></span>

  return (
    <table className="w-full font-baloo text-sm text-left rtl:text-right text-black">
      <thead className="text-xs text-center text-black uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            #
          </th>
          <th scope="col" className="px-6 py-3">
            Nama
          </th>
          <th scope="col" className="px-6 py-3">
            NIS
          </th>
          <th scope="col" className="px-6 py-3">
            NISN
          </th>
          <th scope="col" className="px-6 py-3">
            Kelas
          </th>
          <th scope="col" className="px-6 py-3">
            Keterangan
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="text-center">{dataTable}</tbody>
    </table>
  )
}

export default Table

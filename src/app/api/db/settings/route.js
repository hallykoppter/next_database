import prisma from "@/libs/prisma"

export async function GET() {
  const setting = await prisma.settings.findUnique({
    where: {
      id: 1,
    },
  })

  return Response.json({ setting: setting })
}

export async function POST(request) {
  const data = await request.json()
  const setting = await prisma.settings.upsert({
    where: {
      id: 1,
    },
    update: {
      aktif_pengumuman: data.aktif_pengumuman,
      alamat_sekolah: data.alamat_sekolah,
      email_sekolah: data.email_sekolah,
      izin_login: data.izin_login,
      logo_sekolah: data.logo_sekolah,
      nama_kepsek: data.nama_kepsek,
      nama_sekolah: data.nama_sekolah,
      nip_kepsek: data.nip_kepsek,
      npsn: data.npsn,
      semester: data.semester,
      waktu_pengumuman: data.waktu_pengumuman,
    },
    create: {
      aktif_pengumuman: data.aktif_pengumuman,
      alamat_sekolah: data.alamat_sekolah,
      email_sekolah: data.email_sekolah,
      izin_login: data.izin_login,
      logo_sekolah: data.logo_sekolah,
      nama_kepsek: data.nama_kepsek,
      nama_sekolah: data.nama_sekolah,
      nip_kepsek: data.nip_kepsek,
      npsn: data.npsn,
      semester: data.semester,
      waktu_pengumuman: data.waktu_pengumuman,
    },
  })

  if (!setting)
    return Response.json({ status: 500, message: "something went wrong" })
  else return Response.json({ status: 200 })
}

export async function PUT(request) {
  let data = await request.json()
  data.izin_login = Number(data.izin_login)
  data.aktif_pengumuman = Number(data.aktif_pengumuman)
  console.log()
  const req = await prisma.settings.update({
    where: {
      id: 1,
    },
    data: data,
  })
  if (!req)
    return Response.json({ status: 400, message: "something went wrong" })
  else return Response.json({ status: 200 })
}

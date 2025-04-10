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
  console.log(data)
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

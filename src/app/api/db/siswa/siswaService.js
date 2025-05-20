"use server"

import prisma from "@/libs/prisma"

export async function turncateSiswa() {
  const req = await prisma.$queryRawUnsafe`TRUNCATE TABLE siswa;`
  if (req) return Response.json({ status: 200 })
  else return Response.json({ status: 400 })
}

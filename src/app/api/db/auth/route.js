import prisma from "@/libs/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(request) {
  const { username, password, role } = await request.json()
  let req
  if (role == "admin") {
    req = await prisma.users.findUnique({
      where: {
        username: username,
      },
    })
  } else if (role == "siswa") {
    req = await prisma.siswa.findUnique({
      where: {
        nisn: username,
      },
    })
  }

  const verifyPassword = await bcrypt.compare(
    password,
    req?.password.toString()
  )

  const user = {
    name: req.name || req.nama,
    username: req.username || req.nisn,
    role: role,
  }
  if (!verifyPassword) return Response.json(null)
  else return NextResponse.json(user)
}

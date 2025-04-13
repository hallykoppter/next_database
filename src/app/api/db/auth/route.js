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

  const verifyPassword = await bcrypt.compare(password, req?.password)

  const user = {
    name: req.name,
    username: req.username,
    role: role,
  }
  if (!verifyPassword) return Response.json(null)
  else return NextResponse.json(user)

  //   const verifyPassword = await bcrypt.compare(password, req.password)
  //   const user = {
  //     name: req.name,
  //     username: req.username,
  //     token: "admin/".username,
  //   }
  //   if (!verifyPassword) {
  //     return NextResponse.json({ status: 403 })
  //   } else {
  //     return NextResponse.json({ status: 200 })
  //   }
  //   bcrypt.compare(password, req.password, (err, res) => {
  //     if (res == true) {
  //       const user = {
  //         name: req.name,
  //         username: req.username,
  //         token: "admin".username,
  //       }
  //       return Response.json({ status: 200, user: user })
  //     } else {
  //       console.log(err)
  //       return Response.json({ statu: 404 })
  //     }
  //   })
}

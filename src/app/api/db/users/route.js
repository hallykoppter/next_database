import prisma from "@/libs/prisma"

export async function POST(request) {
  const { name, username, hashedPassword } = await request.json()
  const password = hashedPassword
  const data = { name, username, password }

  const createUser = await prisma.users.create({ data })

  if (!createUser) return Response.json({ status: 403, isCreated: false })
  else return Response.json({ status: 200, isCreated: true })
}

export async function GET(request) {
  const { id } = await request.json()
  const req = await prisma.users.findUnique({
    omit: {
      password: false,
    },
    where: {
      id: id,
    },
  })

  if (!req) return Response.json({ status: 404 })
  else return Response.json({ status: 200, data: req })
}

export async function DELETE(request) {
  const { id } = await request.json()
  const req = await prisma.users.delete({
    where: {
      id: id,
    },
  })
  if (!req) return Response.json({ status: 404 })
  else return Response.json({ status: 200 })
}

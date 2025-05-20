export async function POST(request) {
  let data = await request.json()

  const req = await prisma.siswa.createMany({
    data: data,
    skipDuplicates: true,
  })
  if (req) return Response.json({ status: 200 })
  else return Response.json({ status: 400 })
}

export async function GET() {
  const siswa = await prisma.siswa.findMany()
  if (siswa) return Response.json({ status: 200, data: siswa })
  else return Response.json({ status: 400 })
}

export async function PUT(request) {
  const data = await request.json()
  console.log(data)
  const req = await prisma.siswa.update({
    where: {
      id: data.id,
    },
    data: {
      keterangan: data.keterangan,
    },
  })
  if (req) return Response.json({ status: 200 })
  else return Response.json({ status: 400 })
}

export async function TURNCATE() {
  const req = await prisma.siswa.$queryRaw`TURNCATE TABLE siswa;`
  if (req) return Response.json({ status: 200 })
  else return Response.json({ status: 400 })
}

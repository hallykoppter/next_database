const getSetting = async () => {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/settings`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )

  const res = await req.json()
  return res
}

export { getSetting }

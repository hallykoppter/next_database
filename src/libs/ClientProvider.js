"use client"

import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/navigation"

const ClientProvider = ({ children }) => {
  const router = useRouter()

  const init = async () => {
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
    if (res.setting.id != 1) {
      router.push("/initialization")
    }
  }
  init()

  return <SessionProvider>{children}</SessionProvider>
}

export default ClientProvider

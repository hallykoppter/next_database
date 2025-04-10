"use client"

import { getSetting } from "@/libs/SettingsService"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "primereact/button"
import { Menu } from "primereact/menu"
import { useEffect, useRef, useState } from "react"

const NavDashboard = () => {
  const [data, setSetting] = useState()
  const router = useRouter()
  const setting = data?.setting
  const { data: session } = useSession()
  const menu = useRef(null)
  const items = [
    {
      label: "Options",
      items: [
        {
          label: "Profile",
          icon: "pi pi-user",
          command: () => {
            router.push("/dashboard/profile")
          },
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            router.push("/logout")
          },
        },
      ],
    },
  ]

  useEffect(() => {
    async function res() {
      const req = await getSetting()
      setSetting(req)
    }
    res()
  }, [])

  return (
    <div className="flex justify-between p-3 flex-row w-full from-blue-800 via-fuchsia-800 to-purple-800 bg-linear-to-r">
      <div className="flex text-white font-bold">{setting?.nama_sekolah}</div>
      <Menu
        model={items}
        popup
        ref={menu}
        id="popup_profile"
        popupAlignment="right"
        pt={{
          label: {
            className: "font-baloo",
          },
          submenuHeader: {
            className: "font-baloo",
          },
        }}
      />
      <Button
        label={session?.user.name}
        aria-controls="popup_profile"
        aria-haspopup
        className="flex text-white items-center gap-2 cursor-pointer"
        onClick={(e) => menu.current.toggle(e)}
        pt={{
          root: {
            className: "font-baloo",
          },
        }}
        unstyled
      />
    </div>
  )
}

export default NavDashboard

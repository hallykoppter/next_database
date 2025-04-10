"use client"

import { useRouter } from "next/navigation"
import { TabMenu } from "primereact/tabmenu"
import { useState } from "react"

const MenuDashboard = () => {
  const [activeIndex, setActiveIndex] = useState()
  const router = useRouter()
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => {
        router.push("/dashboard")
      },
    },
    {
      label: "Daftar Siswa",
      icon: "pi pi-users",
      command: () => {
        router.push("/dashboard/siswa")
      },
    },
    {
      label: "Setting",
      icon: "pi pi-cog",
      command: () => {
        router.push("/dashboard/setting")
      },
    },
  ]

  return (
    <div className="card flex min-w-screen justify-center">
      <TabMenu
        model={items}
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index)
        }}
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  )
}

export default MenuDashboard

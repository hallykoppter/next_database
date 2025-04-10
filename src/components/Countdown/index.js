"use client"

import { getSetting } from "@/libs/SettingsService"
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown"
import "@leenguyen/react-flip-clock-countdown/dist/index.css"
import { useEffect, useState } from "react"

const Countdown = () => {
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)
  const setting = data?.setting

  useEffect(() => {
    async function fetch() {
      const req = await getSetting()
      setData(req)
      setLoading(false)
    }
    fetch()
  }, [])

  if (isLoading) return <span className="loader"></span>

  const style = {
    label: {
      fontFamily: "Baloo Bhai 2",
      color: "white",
    },
    block: {
      fontFamily: "Aldrich",
      backgroundColor: "white",
      color: "black",
    },
    separator: {
      color: "white",
    },
    divider: {
      backgroundColor: "transparent",
    },
  }
  const label = ["Hari", "Jam", "Menit", "Detik"]

  const handleComplete = () => {
    console.log("The time is over")
  }

  return (
    <FlipClockCountdown
      to={new Date(setting.waktu_pengumuman)}
      renderOnServer
      suppressHydrationWarning={true}
      digitBlockStyle={style.block}
      labelStyle={style.label}
      dividerStyle={style.divider}
      separatorStyle={style.separator}
      labels={label}
      renderMap={[true, true, true, true]}
      className="flex flex-wrap justify-center px-10 md:px-0"
      onComplete={handleComplete}
      hideOnComplete
      stopOnHiddenVisibility
    />
  )
}

export default Countdown

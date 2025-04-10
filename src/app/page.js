import Countdown from "@/components/Countdown"
import { getSetting } from "@/libs/SettingsService"

const Page = async () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-black flex-col">
      <div className="flex justify-center p-10 rounded-md items-center">
        <Countdown />
      </div>
    </div>
  )
}

export default Page

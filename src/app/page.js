import { getServerSession } from "next-auth/next"
const Page = async () => {
  const session = await getServerSession()
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex justify-between items-center bg-blue-700 gap-8 rounded-xl p-8"></div>
    </div>
  )
}

export default Page

import MenuDashboard from "@/components/MenuDashboard"
import NavDashboard from "@/components/NavDashboard"
import ClientProvider from "@/libs/ClientProvider"
import { PrimeReactProvider } from "primereact/api"

export default async function dahsboardLayout({ children }) {
  return (
    <ClientProvider>
      <PrimeReactProvider>
        <NavDashboard />
        <MenuDashboard />
        {children}
      </PrimeReactProvider>
    </ClientProvider>
  )
}

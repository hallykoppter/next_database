import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/dashboard") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse("Siswa tidak diizinkan mengakses halaman ini!")
    }
    if (
      req.nextUrl.pathname.startsWith("/pd") &&
      req.nextauth.token?.role !== "siswa"
    ) {
      return new NextResponse("Admin tidak diizinkan mengakses halaman ini!")
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/siswa/:path*"],
}

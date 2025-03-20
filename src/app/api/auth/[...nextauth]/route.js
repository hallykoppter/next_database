import nextAuth from "next-auth"
import CretdentialsProvider from "next-auth/providers/credentials"
import { signIn } from "next-auth/react"

export const authOptions = {
  providers: [
    CretdentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "username", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/db/auth`,
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          }
        )
        const user = await res.json()
        if (!user) return null
        else return user
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      return { ...token, ...user, ...account }
    },
    async session({ session, token, user }) {
      session.user = token
      return session
    },
  },
}

const handler = nextAuth(authOptions)

export { handler as GET, handler as POST }

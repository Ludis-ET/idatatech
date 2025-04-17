import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Sign Up | NexLearn",
  description: "Create a new NexLearn account",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-center text-3xl font-bold mb-8">Create an Account</h1>
          <AuthForm mode="signup" />
        </div>
      </main>
      <Footer />
    </div>
  )
}

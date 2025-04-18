"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { toast } from "@/components/ui/use-toast"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    async function handleLogout() {
      try {
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        router.push("/")

        // Small delay to ensure the toast appears after navigation
        setTimeout(() => {
          toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
          })
        }, 500)
      } catch (error: any) {
        console.error("Error logging out:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to log out. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard")
      }
    }

    handleLogout()
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-4 text-lg">Logging out...</p>
    </div>
  )
}

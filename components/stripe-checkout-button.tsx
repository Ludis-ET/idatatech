"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { createStripeCheckoutSession } from "@/actions/stripe"

interface StripeCheckoutButtonProps {
  courseId: number
  courseTitle: string
  price: number
}

export function StripeCheckoutButton({ courseId, courseTitle, price }: StripeCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const { url, error } = await createStripeCheckoutSession({
        courseId,
        courseTitle,
        price,
      })

      if (error) {
        throw new Error(error)
      }

      if (url) {
        window.location.href = url
      } else {
        throw new Error("Could not create checkout session")
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error)
      toast({
        title: "Error",
        description: error.message || "There was a problem initiating checkout. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Button className="w-full" onClick={handleCheckout} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Checkout with Stripe"
      )}
    </Button>
  )
}

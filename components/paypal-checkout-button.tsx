"use client"

import { useState } from "react"
import { PayPalButtons } from "@paypal/react-paypal-js"
import { useRouter } from "next/navigation"
import { processPayment } from "@/actions/payment"
import { toast } from "@/components/ui/use-toast"

interface PayPalCheckoutButtonProps {
  amount: number
  courseId: number
  courseTitle: string
}

export function PayPalCheckoutButton({ amount, courseId, courseTitle }: PayPalCheckoutButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleCreateOrder = async () => {
    try {
      // Create order with PayPal
      return Promise.resolve().then(() => {
        // This would typically call your backend to create an order
        // For now, we'll just return a random order ID
        return `${Math.random().toString(36).substring(2, 15)}`
      })
    } catch (error) {
      console.error("Error creating PayPal order:", error)
      toast({
        title: "Error",
        description: "There was a problem creating your order. Please try again.",
        variant: "destructive",
      })
      return null
    }
  }

  const handleApprove = async (data: any) => {
    setIsPending(true)
    try {
      // Process the payment on the server
      const result = await processPayment({
        orderId: data.orderID,
        courseId,
        amount,
      })

      if (result.success) {
        toast({
          title: "Payment Successful",
          description: `You have successfully purchased ${courseTitle}`,
        })
        // Redirect to success page
        router.push(`/payment/success?courseId=${courseId}`)
      } else {
        toast({
          title: "Payment Failed",
          description: result.message || "There was a problem processing your payment. Please try again.",
          variant: "destructive",
        })
        router.push(`/payment/cancel?courseId=${courseId}`)
      }
    } catch (error) {
      console.error("Error processing payment:", error)
      toast({
        title: "Payment Error",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      })
      router.push(`/payment/cancel?courseId=${courseId}`)
    } finally {
      setIsPending(false)
    }
  }

  const handleError = (err: Record<string, unknown>) => {
    console.error("PayPal Checkout Error:", err)
    toast({
      title: "Payment Error",
      description: "There was a problem with PayPal. Please try again later.",
      variant: "destructive",
    })
  }

  const handleCancel = () => {
    toast({
      title: "Payment Cancelled",
      description: "You have cancelled the payment process.",
    })
  }

  return (
    <div className="w-full">
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect" }}
        disabled={isPending}
        forceReRender={[amount, courseId]}
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onError={handleError}
        onCancel={handleCancel}
      />
    </div>
  )
}

"use server"

import { createServerActionSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface PaymentData {
  orderId: string
  courseId: number
  amount: number
  userId?: string
}

export async function processPayment(data: PaymentData) {
  try {
    const supabase = createServerActionSupabaseClient()

    // Get the current user if not provided
    let userId = data.userId
    if (!userId) {
      const { data: authData } = await supabase.auth.getUser()
      userId = authData.user?.id

      if (!userId) {
        return {
          success: false,
          message: "User not authenticated",
        }
      }
    }

    // Verify the payment with PayPal (simplified for demo)
    const verificationResult = await verifyPayPalPayment(data.orderId)

    if (!verificationResult.verified) {
      return {
        success: false,
        message: "Payment verification failed",
      }
    }

    // Record the payment in the database
    const { error: paymentError } = await supabase.from("payments").insert({
      user_id: userId,
      course_id: data.courseId,
      amount: data.amount,
      payment_method: "paypal",
      payment_id: data.orderId,
      status: "completed",
    })

    if (paymentError) throw paymentError

    // Create an enrollment for the user
    const { error: enrollmentError } = await supabase.from("enrollments").insert({
      user_id: userId,
      course_id: data.courseId,
      completed: false,
    })

    if (enrollmentError) throw enrollmentError

    // Revalidate the course page to reflect the purchase
    revalidatePath(`/courses/${data.courseId}`)

    return {
      success: true,
      message: "Payment processed successfully",
    }
  } catch (error: any) {
    console.error("Error processing payment:", error)
    return {
      success: false,
      message: error.message || "Failed to process payment",
    }
  }
}

export async function verifyPayPalPayment(orderId: string) {
  try {
    // In a real application, you would call PayPal's API to verify the payment
    // Using the PayPal SDK or REST API with your client ID and secret

    const paypalApiUrl =
      process.env.NODE_ENV === "production" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com"

    // This is a simplified example - in production, you'd use proper authentication
    // For demo purposes, we'll simulate a successful verification
    // In a real app, you would make an actual API call to PayPal

    // Simulate API verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      verified: true,
      data: {
        id: orderId,
        status: "COMPLETED",
      },
    }
  } catch (error: any) {
    console.error("Error verifying PayPal payment:", error)
    return {
      verified: false,
      error: error.message || "Failed to verify payment",
    }
  }
}

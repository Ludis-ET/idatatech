"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function createStripeCheckoutSession({
  courseId,
  courseTitle,
  price,
}: {
  courseId: number
  courseTitle: string
  price: number
}) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient({ cookies: () => cookieStore })

    // Get the current user
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) {
      return { url: null, error: "Not authenticated" }
    }

    // Get user profile to get their email and name
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: courseTitle,
              description: `Enrollment for ${courseTitle}`,
            },
            unit_amount: Math.round(price * 100), // Stripe requires amount in cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId: courseId.toString(),
        userId: userData.user.id,
      },
      customer_email: userData.user.email,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?courseId=${courseId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel?courseId=${courseId}`,
    })

    return { url: session.url, error: null }
  } catch (error: any) {
    console.error("Error creating Stripe checkout session:", error)
    return { url: null, error: error.message || "Failed to create checkout session" }
  }
}

export async function handleStripeWebhook(payload: any, signature: string) {
  try {
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Extract metadata from the session
      const courseId = session.metadata?.courseId
      const userId = session.metadata?.userId

      if (!courseId || !userId) {
        throw new Error("Missing metadata in Stripe session")
      }

      const cookieStore = cookies()
      const supabase = createServerActionClient({ cookies: () => cookieStore })

      // Record the payment in the database
      const { error: paymentError } = await supabase.from("payments").insert({
        user_id: userId,
        course_id: Number.parseInt(courseId),
        amount: session.amount_total! / 100, // Convert from cents back to dollars
        currency: session.currency || "usd",
        payment_method: "stripe",
        payment_id: session.id,
        status: "completed",
      })

      if (paymentError) throw paymentError

      // Create an enrollment for the user
      const { error: enrollmentError } = await supabase.from("enrollments").insert({
        user_id: userId,
        course_id: Number.parseInt(courseId),
        completed: false,
      })

      if (enrollmentError) throw enrollmentError

      // Revalidate the course page to reflect the purchase
      revalidatePath(`/courses/${courseId}`)

      return { success: true, message: "Payment processed successfully" }
    }

    return { success: true, message: "Webhook received" }
  } catch (error: any) {
    console.error("Error processing Stripe webhook:", error)
    return {
      success: false,
      message: error.message || "Failed to process webhook",
    }
  }
}

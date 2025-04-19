import { type NextRequest, NextResponse } from "next/server"
import { handleStripeWebhook } from "@/actions/stripe"

export async function POST(req: NextRequest) {
  try {
    // const payload = await req.text()
    // const signature = req.headers.get("stripe-signature") || ""

    // const result = await handleStripeWebhook(payload, signature)

    // if (!result.success) {
    //   return NextResponse.json({ error: result.message }, { status: 400 })
    // }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Error handling Stripe webhook:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}

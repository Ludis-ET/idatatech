"use server"

import { createServerActionSupabaseClient } from "@/lib/supabase/server"
import { z } from "zod"

// Define a schema for contact form validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData)

    // Create a Supabase client
    const supabase = createServerActionSupabaseClient()

    // Insert the contact message into the database
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
        status: "unread",
      })
      .select()

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)

    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }))

      return {
        success: false,
        message: "Please check the form for errors.",
        fieldErrors,
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.",
    }
  }
}

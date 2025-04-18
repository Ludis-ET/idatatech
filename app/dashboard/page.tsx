import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { EnrolledCourses } from "@/components/dashboard/enrolled-courses"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?redirectTo=/dashboard")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Get enrolled courses
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select(`
      *,
      courses:course_id (
        id,
        title,
        slug,
        description,
        image_url,
        level,
        duration
      )
    `)
    .eq("user_id", session.user.id)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <DashboardHeader user={profile} />
        <section className="py-12">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            <EnrolledCourses enrollments={enrollments || []} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

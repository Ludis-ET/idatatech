import Link from "next/link"
import { getPopularCourses } from "@/lib/actions/data-actions"
import { CourseCard } from "@/components/course-card"
import { Button } from "@/components/ui/button"

export async function PopularCourses() {
  const { courses } = await getPopularCourses(3)

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Popular Courses</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Explore our most popular courses and start your learning journey today.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild>
            <Link href="/courses">View All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

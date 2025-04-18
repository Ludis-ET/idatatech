import type { Metadata } from "next";
import { getCourses, getCategories } from "@/lib/actions/data-actions";
import { CourseCard } from "@/components/course-card";
import { CourseFilters } from "@/components/course-filters";
import { CourseSort } from "@/components/course-sort";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Courses | IdataTech",
  description: "Browse our comprehensive collection of courses",
};

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category =
    typeof searchParams.category === "string" ? searchParams.category : null;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : null;

  const { courses } = await getCourses({
    limit: 20,
    category,
    search,
  });

  const { categories } = await getCategories();
  console.log(courses, categories)
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Courses
            </h1>
            <p className="text-muted-foreground">
              Browse our comprehensive collection of courses designed to help
              you learn and grow.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            <div className="hidden md:block">
              <CourseFilters
                categories={categories}
                selectedCategory={category}
              />
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {courses.length}
                  </span>{" "}
                  courses
                </p>
                <CourseSort />
              </div>

              {courses.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 text-4xl">🔍</div>
                  <h3 className="mb-2 text-xl font-semibold">
                    No courses found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

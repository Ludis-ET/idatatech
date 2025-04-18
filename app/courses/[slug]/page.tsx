import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Clock, BarChart, Users, CheckCircle, Play } from "lucide-react"
import { getCourseBySlug, getRelatedCourses } from "@/lib/actions/data-actions"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CourseCard } from "@/components/course-card"
import { PayPalCheckoutButton } from "@/components/paypal-checkout-button"
import { StripeCheckoutButton } from "@/components/stripe-checkout-button"
import {PayPalProvider} from "@/components/paypal-provider"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { course } = await getCourseBySlug(params.slug)

  if (!course) {
    return {
      title: "Course Not Found | NexLearn",
      description: "The requested course could not be found",
    }
  }

  return {
    title: `${course.title} | NexLearn`,
    description: course.description,
  }
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const { course, error } = await getCourseBySlug(params.slug)

  if (!course || error) {
    notFound()
  }

  const { courses: relatedCourses } = await getRelatedCourses(course.id, course.category_id)

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted/50">
          <div className="container py-8 md:py-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    {course.categories && <Badge variant="outline">{course.categories.name}</Badge>}
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{course.title}</h1>
                  <p className="mt-4 text-muted-foreground">{course.description}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart className="h-4 w-4" />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.language}</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                  {course.original_price && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${course.original_price.toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <StripeCheckoutButton courseId={course.id} courseTitle={course.title} price={course.price} />
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-muted"></div>
                    </div>
                    <div className="relative bg-background px-3 text-sm text-muted-foreground">Or pay with</div>
                  </div>
                  <PayPalProvider>
                  <PayPalCheckoutButton courseId={course.id} amount={course.price} courseTitle={course.title} />
                </PayPalProvider>
                </div>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={
                    course.image_url || `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(course.title)}`
                  }
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8 md:py-12">
          <Tabs defaultValue="overview">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">About This Course</h2>
                    <p className="mt-4 text-muted-foreground">{course.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">What You'll Learn</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {course.course_details?.what_you_will_learn?.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {course.course_details?.requirements?.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-6">
              <h2 className="text-2xl font-bold">Course Curriculum</h2>
              <div className="space-y-4">
                {course.course_sections
                  ?.sort((a: any, b: any) => a.position - b.position)
                  .map((section: any) => (
                    <Accordion key={section.id} type="single" collapsible className="border rounded-md">
                      <AccordionItem value={`section-${section.id}`} className="border-0">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex flex-1 items-center justify-between">
                            <span className="font-medium">{section.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {section.course_lessons?.length || 0} lessons
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <ul className="space-y-2">
                            {section.course_lessons
                              ?.sort((a: any, b: any) => a.position - b.position)
                              .map((lesson: any) => (
                                <li
                                  key={lesson.id}
                                  className="flex items-center justify-between rounded-md p-2 hover:bg-muted"
                                >
                                  <div className="flex items-center gap-2">
                                    <Play className="h-4 w-4 text-primary" />
                                    <span>{lesson.title}</span>
                                    {lesson.is_free && (
                                      <Badge variant="secondary" className="ml-2">
                                        Free
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </li>
                              ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="instructor" className="space-y-6">
              <h2 className="text-2xl font-bold">Instructor</h2>
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=96&width=96&text=Instructor"
                    alt="Instructor"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Instructor Name</h3>
                  <p className="mt-2 text-muted-foreground">
                    {course.course_details?.instructor_bio ||
                      "Experienced instructor with a passion for teaching and helping students achieve their learning goals."}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <h2 className="text-2xl font-bold">Student Reviews</h2>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this course!</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {relatedCourses.length > 0 && (
          <div className="bg-muted/30 py-8 md:py-12">
            <div className="container">
              <h2 className="mb-6 text-2xl font-bold">Related Courses</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

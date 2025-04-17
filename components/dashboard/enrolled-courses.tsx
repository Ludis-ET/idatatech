import Link from "next/link"
import Image from "next/image"
import { BookOpen, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface EnrolledCoursesProps {
  enrollments: any[]
}

export function EnrolledCourses({ enrollments }: EnrolledCoursesProps) {
  if (!enrollments.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">You haven't enrolled in any courses yet</h3>
        <p className="text-muted-foreground mb-6">Browse our courses and start learning today!</p>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {enrollments.map((enrollment) => (
        <Card key={enrollment.id} className="overflow-hidden">
          <div className="relative aspect-video">
            <Image
              src={enrollment.courses.image_url || "/placeholder.svg?height=400&width=600"}
              alt={enrollment.courses.title}
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{enrollment.courses.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>{enrollment.courses.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4" />
                <span>{enrollment.courses.level}</span>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{enrollment.completed ? "100%" : "0%"}</span>
              </div>
              <Progress value={enrollment.completed ? 100 : 0} />
            </div>
            <Button asChild className="w-full">
              <Link href={`/courses/${enrollment.courses.slug}`}>
                {enrollment.completed ? "Review Course" : "Continue Learning"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

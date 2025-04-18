import Link from "next/link"
import Image from "next/image"
import { Clock, BarChart, Users } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CourseCard({ course }: { course: any }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image_url || `/placeholder.svg?height=225&width=400&text=${encodeURIComponent(course.title)}`}
          alt={course.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className="px-2 py-0 text-xs">
            {course.level}
          </Badge>
          {course.categories?.name && (
            <Badge variant="outline" className="px-2 py-0 text-xs">
              {course.categories.name}
            </Badge>
          )}
        </div>
        <Link href={`/courses/${course.slug}`}>
          <h3 className="line-clamp-2 text-xl font-semibold hover:text-primary">{course.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart className="h-3 w-3" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{course.language}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t bg-muted/50 p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">${course.price.toFixed(2)}</span>
          {course.original_price && (
            <span className="text-sm text-muted-foreground line-through">${course.original_price.toFixed(2)}</span>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

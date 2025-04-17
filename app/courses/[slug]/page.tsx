import { CourseDetail } from "@/components/course-detail"

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  return <CourseDetail slug={params.slug} />
}

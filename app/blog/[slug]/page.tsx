import { BlogPost } from "@/components/blog-post"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPost slug={params.slug} />
}

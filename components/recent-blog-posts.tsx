import Link from "next/link"
import Image from "next/image"
import { getRecentBlogPosts } from "@/lib/actions/data-actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export async function RecentBlogPosts() {
  const { posts } = await getRecentBlogPosts(3)

  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Latest Articles</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Stay updated with our latest articles, tutorials, and resources.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image_url || `/placeholder.svg?height=225&width=400&text=${encodeURIComponent(post.title)}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{formatDate(post.created_at)}</span>
                </div>
                <CardTitle className="line-clamp-2 text-xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

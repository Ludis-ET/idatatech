import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getBlogPostBySlug, getRecentBlogPosts } from "@/lib/actions/data-actions"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { post } = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found | NexLearn",
      description: "The requested blog post could not be found",
    }
  }

  return {
    title: `${post.title} | NexLearn Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { post, error } = await getBlogPostBySlug(params.slug)

  if (!post || error) {
    notFound()
  }

  const { posts: recentPosts } = await getRecentBlogPosts(3)

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="container py-8 md:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">{formatDate(post.created_at)}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
              <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            </div>

            {post.image_url && (
              <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
                <Image
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {post.blog_post_tags?.map((postTag: any) => (
                  <Link key={postTag.blog_tags.id} href={`/blog?tag=${postTag.blog_tags.slug}`}>
                    <Badge variant="outline" className="hover:bg-secondary">
                      {postTag.blog_tags.name}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className="bg-muted/30 py-8 md:py-12">
          <div className="container">
            <h2 className="mb-6 text-2xl font-bold">Recent Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts
                .filter((p) => p.id !== post.id)
                .map((recentPost) => (
                  <Card key={recentPost.id} className="overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={
                          recentPost.image_url ||
                          `/placeholder.svg?height=225&width=400&text=${encodeURIComponent(recentPost.title)}`
                        }
                        alt={recentPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{recentPost.category}</Badge>
                        <span className="text-xs text-muted-foreground">{formatDate(recentPost.created_at)}</span>
                      </div>
                      <CardTitle className="line-clamp-2 text-xl">
                        <Link href={`/blog/${recentPost.slug}`} className="hover:text-primary">
                          {recentPost.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="line-clamp-2">{recentPost.excerpt}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

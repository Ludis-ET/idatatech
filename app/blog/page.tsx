import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, getBlogTags } from "@/lib/actions/data-actions";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog | NexLearn",
  description: "Latest articles, tutorials, and resources",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category =
    typeof searchParams.category === "string" ? searchParams.category : null;
  const tag = typeof searchParams.tag === "string" ? searchParams.tag : null;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : null;

  const { posts } = await getBlogPosts({
    limit: 20,
    category,
    search,
  });

  const { tags } = await getBlogTags();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Blog
            </h1>
            <p className="text-muted-foreground">
              Latest articles, tutorials, and resources to help you learn and
              grow.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_240px]">
            <div className="space-y-8">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
                      <div className="relative aspect-video overflow-hidden md:aspect-square">
                        <Image
                          src={
                            post.image_url ||
                            `/placeholder.svg?height=300&width=300&text=${
                              encodeURIComponent(post.title) ||
                              "/placeholder.svg"
                            }`
                          }
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-col justify-between p-4 md:p-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Badge variant="secondary">{post.category}</Badge>
                            <h2 className="text-2xl font-bold">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-primary"
                              >
                                {post.title}
                              </Link>
                            </h2>
                          </div>
                          <p className="text-muted-foreground">
                            {post.excerpt}
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {formatDate(post.created_at)}
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 text-4xl">📝</div>
                  <h3 className="mb-2 text-xl font-semibold">
                    No blog posts found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link
                    href="/blog?category=Technology"
                    className="block text-sm hover:text-primary"
                  >
                    Technology
                  </Link>
                  <Link
                    href="/blog?category=Learning+Tips"
                    className="block text-sm hover:text-primary"
                  >
                    Learning Tips
                  </Link>
                  <Link
                    href="/blog?category=Data+Science"
                    className="block text-sm hover:text-primary"
                  >
                    Data Science
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Link key={tag.id} href={`/blog?tag=${tag.slug}`}>
                        <Badge variant="outline" className="hover:bg-secondary">
                          {tag.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

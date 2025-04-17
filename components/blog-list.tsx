"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Sample blog data
const blogPosts = [
  {
    id: 1,
    slug: "future-of-ai-education",
    title: "The Future of AI in Education",
    excerpt: "Exploring how artificial intelligence is transforming the learning experience for students worldwide.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    date: "Apr 10, 2025",
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
    author: "Dr. Sarah Chen",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    slug: "mastering-data-science",
    title: "5 Steps to Mastering Data Science",
    excerpt: "A comprehensive guide to building your skills in one of the most in-demand fields in tech.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    date: "Apr 5, 2025",
    image: "/placeholder.svg?height=400&width=600",
    category: "Data Science",
    author: "Michael Rodriguez",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 3,
    slug: "remote-learning-tips",
    title: "Effective Remote Learning Strategies",
    excerpt: "Tips and techniques to maximize productivity and engagement when learning from home.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    date: "Mar 28, 2025",
    image: "/placeholder.svg?height=400&width=600",
    category: "Learning Tips",
    author: "Emma Thompson",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    slug: "blockchain-education",
    title: "How Blockchain is Revolutionizing Education Credentials",
    excerpt: "Exploring the impact of blockchain technology on academic credentials and certification.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    date: "Mar 20, 2025",
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
    author: "James Wilson",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    slug: "future-skills-2025",
    title: "Top 10 Skills You Need to Master by 2025",
    excerpt: "A look at the most in-demand skills that will shape the future job market.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    date: "Mar 15, 2025",
    image: "/placeholder.svg?height=400&width=600",
    category: "Career",
    author: "Jessica Lee",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    slug: "gamification-learning",
    title: "Gamification: Making Learning Fun and Effective",
    excerpt: "How game mechanics are being used to increase engagement and retention in education.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.",
    date: "Mar 10, 2025",
    image: "/placeholder.svg?height=400&width=600",
    category: "Education",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    readTime: "5 min read",
    featured: false,
  },
]

// Get unique categories
const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

export function BlogList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || post.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Get featured posts
  const featuredPosts = blogPosts.filter((post) => post.featured)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">NexLearn Blog</h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Insights, tips, and resources to help you succeed in your learning journey.
              </p>
              <div className="mt-6 flex justify-center">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12">
            <div className="container px-4">
              <h2 className="mb-8 text-2xl font-bold">Featured Articles</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="relative aspect-video overflow-hidden md:aspect-square">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                            {post.category}
                          </div>
                        </div>
                        <CardContent className="flex flex-col justify-center p-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p className="text-muted-foreground">{post.excerpt}</p>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src={post.authorImage || "/placeholder.svg"}
                                alt={post.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-12">
          <div className="container px-4">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold">All Articles</h2>
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full sm:w-auto">
                <TabsList className="w-full justify-start overflow-auto sm:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {filteredPosts.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredPosts.map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="group overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                            {post.category}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                          <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                          <div className="mt-4 flex items-center gap-2">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src={post.authorImage || "/placeholder.svg"}
                                alt={post.author}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-6">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-xl font-bold">No articles found</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-sm">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
                <p className="mt-2 text-muted-foreground">
                  Get the latest articles, tutorials, and updates delivered straight to your inbox.
                </p>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Input type="email" placeholder="Enter your email" className="flex-1" />
                  <Button>Subscribe</Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

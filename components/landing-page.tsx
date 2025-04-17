"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle, ChevronRight, Sparkles, Star, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TestimonialCarousel } from "@/components/testimonial-carousel"

export function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Cutting-Edge Courses",
      description: "Access the latest technology and business courses taught by industry experts",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Interactive Learning",
      description: "Engage with immersive content designed for maximum knowledge retention",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Support",
      description: "Join a global community of learners and instructors for collaborative growth",
    },
  ]

  const popularCourses = [
    {
      id: 1,
      slug: "advanced-ai-development",
      title: "Advanced AI Development",
      instructor: "Dr. Sarah Chen",
      price: 129.99,
      rating: 4.9,
      students: 3240,
      image: "/placeholder.svg?height=400&width=600",
      category: "Technology",
    },
    {
      id: 2,
      slug: "blockchain-fundamentals",
      title: "Blockchain Fundamentals",
      instructor: "Michael Rodriguez",
      price: 89.99,
      rating: 4.7,
      students: 2180,
      image: "/placeholder.svg?height=400&width=600",
      category: "Technology",
    },
    {
      id: 3,
      slug: "digital-marketing-mastery",
      title: "Digital Marketing Mastery",
      instructor: "Emma Thompson",
      price: 99.99,
      rating: 4.8,
      students: 4560,
      image: "/placeholder.svg?height=400&width=600",
      category: "Marketing",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/80">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
          <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              className="grid gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>The future of learning is here</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Master New Skills in</span>
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    The Digital Age
                  </span>
                </h1>
                <p className="max-w-[600px] text-xl text-muted-foreground">
                  Unlock your potential with our cutting-edge courses designed for the future workforce. Learn from
                  industry experts and join a global community.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/courses">
                      Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>10,000+ Students</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>200+ Courses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>Lifetime Access</span>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="relative flex items-center justify-center">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl"></div>
                <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-1 backdrop-blur">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Future Learning Platform"
                    width={600}
                    height={600}
                    className="h-full w-full rounded-xl object-cover"
                    priority
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute -right-6 -top-6 rounded-lg border border-border/40 bg-background/90 p-4 backdrop-blur"
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Active Students</p>
                        <p className="text-lg font-bold">10,000+</p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="absolute -bottom-6 -left-6 rounded-lg border border-border/40 bg-background/90 p-4 backdrop-blur"
                  >
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/20 p-2">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">Course Rating</p>
                        <p className="text-lg font-bold">4.9/5.0</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Trusted By Section */}
        <section className="border-y bg-muted/30">
          <div className="container py-12">
            <div className="text-center">
              <h2 className="mb-8 text-xl font-medium text-muted-foreground">Trusted by leading companies worldwide</h2>
              <div className="flex flex-wrap items-center justify-center gap-8 grayscale opacity-70">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 w-32">
                    <Image
                      src={`/placeholder.svg?height=32&width=128&text=LOGO ${i}`}
                      alt={`Company ${i}`}
                      width={128}
                      height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Why Choose NexLearn</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Revolutionizing Online Education
                </h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Our platform combines cutting-edge technology with expert instruction to deliver an unparalleled
                  learning experience.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-16 grid gap-8 md:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-8 transition-all hover:shadow-lg"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:scale-150"></div>
                  <div className="relative z-10">
                    {feature.icon}
                    <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-24 grid gap-12 lg:grid-cols-2"
            >
              <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Immersive Learning</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Interactive Courses Designed for the Future
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our courses feature interactive elements, real-world projects, and cutting-edge content to prepare you
                  for tomorrow's challenges.
                </p>
                <ul className="space-y-3">
                  {[
                    "Hands-on projects with real-world applications",
                    "Live coding sessions and interactive workshops",
                    "Personalized learning paths based on your goals",
                    "Direct feedback from industry experts",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="w-fit" asChild>
                  <Link href="/courses">
                    Explore Our Methodology <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} className="relative flex items-center justify-center">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl"></div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-1 backdrop-blur">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Interactive Learning"
                    width={600}
                    height={400}
                    className="h-full w-full rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-background/80 p-4 backdrop-blur-sm">
                      <div className="h-16 w-16 rounded-full bg-primary p-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-full w-full text-primary-foreground"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="bg-muted/30 py-24">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Featured Courses</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Most Popular Courses</h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Discover our highest-rated and most enrolled courses across various disciplines.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {popularCourses.map((course) => (
                <motion.div key={course.id} variants={itemVariants}>
                  <Link href={`/courses/${course.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                          {course.category}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">By {course.instructor}</p>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <h3 className="mt-2 text-xl font-bold">{course.title}</h3>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-lg font-bold">${course.price}</p>
                          <p className="text-sm text-muted-foreground">{course.students.toLocaleString()} students</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16 text-center">
              <Button size="lg" asChild>
                <Link href="/courses">
                  View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Student Success Stories</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  What Our Students Say
                </h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Hear from our community of learners who have transformed their careers through our platform.
                </p>
              </motion.div>
            </motion.div>

            <div className="mt-16">
              <TestimonialCarousel />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-24">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 text-center sm:p-12"
            >
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Limited Time Offer</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Start Your Learning Journey Today
                </h2>
                <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                  Get 20% off on all courses for a limited time. Invest in your future and join thousands of successful
                  students.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/courses">
                      Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  *Offer valid until April 30, 2025. Terms and conditions apply.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="py-24">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Latest Articles</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">From Our Blog</h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Stay updated with the latest trends, insights, and educational resources.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  id: 1,
                  slug: "future-of-ai-education",
                  title: "The Future of AI in Education",
                  excerpt:
                    "Exploring how artificial intelligence is transforming the learning experience for students worldwide.",
                  date: "Apr 10, 2025",
                  image: "/placeholder.svg?height=400&width=600",
                  category: "Technology",
                },
                {
                  id: 2,
                  slug: "mastering-data-science",
                  title: "5 Steps to Mastering Data Science",
                  excerpt: "A comprehensive guide to building your skills in one of the most in-demand fields in tech.",
                  date: "Apr 5, 2025",
                  image: "/placeholder.svg?height=400&width=600",
                  category: "Data Science",
                },
                {
                  id: 3,
                  slug: "remote-learning-tips",
                  title: "Effective Remote Learning Strategies",
                  excerpt: "Tips and techniques to maximize productivity and engagement when learning from home.",
                  date: "Mar 28, 2025",
                  image: "/placeholder.svg?height=400&width=600",
                  category: "Learning Tips",
                },
              ].map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                          {post.category}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                        <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                        <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                        <div className="mt-4 flex items-center text-sm font-medium text-primary">
                          Read More <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">
                  View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

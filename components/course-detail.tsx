"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  Globe,
  Heart,
  Lock,
  Play,
  Share2,
  ShoppingCart,
  Star,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PayPalProvider } from "@/components/paypal-provider"
import { PayPalCheckoutButton } from "@/components/paypal-checkout-button"

// Sample course data
const coursesData = {
  "advanced-ai-development": {
    id: 1,
    title: "Advanced AI Development",
    slug: "advanced-ai-development",
    instructor: "Dr. Sarah Chen",
    instructorTitle: "AI Research Scientist",
    instructorImage: "/placeholder.svg?height=200&width=200",
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviewCount: 342,
    students: 3240,
    lastUpdated: "March 2025",
    language: "English",
    level: "Advanced",
    duration: "10 weeks",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Technology",
    tags: ["AI", "Machine Learning", "Python", "Deep Learning", "Neural Networks"],
    description:
      "Master the advanced concepts of artificial intelligence and machine learning. This comprehensive course covers deep learning, neural networks, natural language processing, and more. By the end, you'll be able to build sophisticated AI systems for real-world applications.",
    whatYouWillLearn: [
      "Design and implement advanced neural network architectures",
      "Build and deploy natural language processing systems",
      "Create computer vision applications using deep learning",
      "Optimize AI models for production environments",
      "Implement reinforcement learning algorithms",
      "Understand ethical considerations in AI development",
    ],
    requirements: [
      "Intermediate knowledge of Python programming",
      "Basic understanding of machine learning concepts",
      "Familiarity with linear algebra and statistics",
      "A computer with at least 8GB RAM and a modern CPU",
    ],
    curriculum: [
      {
        title: "Introduction to Advanced AI",
        lessons: [
          { title: "Course Overview", duration: "10:15", free: true },
          { title: "Setting Up Your Development Environment", duration: "15:30", free: true },
          { title: "Review of Machine Learning Fundamentals", duration: "25:45", free: false },
        ],
      },
      {
        title: "Deep Neural Networks",
        lessons: [
          { title: "Architecture of Deep Networks", duration: "28:20", free: false },
          { title: "Backpropagation in Depth", duration: "32:15", free: false },
          { title: "Activation Functions and Their Impact", duration: "22:10", free: false },
          { title: "Hands-on: Building Your First Deep Network", duration: "45:30", free: false },
        ],
      },
      {
        title: "Convolutional Neural Networks",
        lessons: [
          { title: "CNN Architecture and Applications", duration: "30:45", free: false },
          { title: "Image Classification with CNNs", duration: "38:20", free: false },
          { title: "Transfer Learning with Pre-trained Models", duration: "42:15", free: false },
          { title: "Project: Building an Image Recognition System", duration: "55:30", free: false },
        ],
      },
      {
        title: "Natural Language Processing",
        lessons: [
          { title: "Text Processing and Embeddings", duration: "35:10", free: false },
          { title: "Recurrent Neural Networks for NLP", duration: "40:25", free: false },
          { title: "Transformer Models and Attention", duration: "48:30", free: false },
          { title: "Building a Sentiment Analysis System", duration: "50:15", free: false },
        ],
      },
      {
        title: "Reinforcement Learning",
        lessons: [
          { title: "Introduction to RL", duration: "25:40", free: false },
          { title: "Q-Learning and Deep Q Networks", duration: "38:15", free: false },
          { title: "Policy Gradient Methods", duration: "42:30", free: false },
          { title: "Project: Training an Agent for Game Playing", duration: "60:00", free: false },
        ],
      },
      {
        title: "Deploying AI Systems",
        lessons: [
          { title: "Model Optimization Techniques", duration: "28:45", free: false },
          { title: "Scaling AI in Production", duration: "35:20", free: false },
          { title: "Monitoring and Maintaining AI Systems", duration: "30:10", free: false },
          { title: "Final Project: End-to-End AI Application", duration: "90:00", free: false },
        ],
      },
    ],
    instructorBio:
      "Dr. Sarah Chen is an AI Research Scientist with over 10 years of experience in the field. She has published numerous papers on deep learning and has worked at leading tech companies including Google AI and OpenAI. Dr. Chen is passionate about making advanced AI concepts accessible to students worldwide.",
  },
  "blockchain-fundamentals": {
    id: 2,
    title: "Blockchain Fundamentals",
    slug: "blockchain-fundamentals",
    instructor: "Michael Rodriguez",
    instructorTitle: "Blockchain Developer",
    instructorImage: "/placeholder.svg?height=200&width=200",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 218,
    students: 2180,
    lastUpdated: "February 2025",
    language: "English",
    level: "Beginner",
    duration: "8 weeks",
    image: "/placeholder.svg?height=600&width=1000",
    category: "Technology",
    tags: ["Blockchain", "Cryptocurrency", "Web3", "Smart Contracts", "Ethereum"],
    description:
      "Learn the fundamentals of blockchain technology and cryptocurrency. This course covers the core concepts of distributed ledgers, consensus mechanisms, smart contracts, and decentralized applications. Perfect for beginners looking to enter the exciting world of Web3.",
    whatYouWillLearn: [
      "Understand the fundamental concepts of blockchain technology",
      "Create and deploy smart contracts on Ethereum",
      "Build decentralized applications (dApps)",
      "Implement secure cryptocurrency transactions",
      "Explore different consensus mechanisms",
      "Understand the Web3 ecosystem",
    ],
    requirements: [
      "Basic programming knowledge (JavaScript preferred)",
      "Understanding of web technologies",
      "No prior blockchain experience required",
      "A computer with internet connection",
    ],
    curriculum: [
      {
        title: "Introduction to Blockchain",
        lessons: [
          { title: "What is Blockchain Technology?", duration: "15:20", free: true },
          { title: "History of Blockchain and Bitcoin", duration: "20:15", free: true },
          { title: "Distributed Ledger Technology Explained", duration: "25:30", free: false },
        ],
      },
      {
        title: "Blockchain Architecture",
        lessons: [
          { title: "Blocks, Chains, and Hashing", duration: "30:10", free: false },
          { title: "Consensus Mechanisms", duration: "35:25", free: false },
          { title: "Public vs Private Blockchains", duration: "22:40", free: false },
          { title: "Hands-on: Creating a Simple Blockchain", duration: "45:15", free: false },
        ],
      },
      {
        title: "Cryptocurrencies",
        lessons: [
          { title: "Understanding Digital Currencies", duration: "28:30", free: false },
          { title: "Wallets and Transactions", duration: "32:15", free: false },
          { title: "Mining and Tokenomics", duration: "38:20", free: false },
          { title: "Project: Creating Your Own Token", duration: "50:45", free: false },
        ],
      },
      {
        title: "Smart Contracts",
        lessons: [
          { title: "Introduction to Smart Contracts", duration: "25:10", free: false },
          { title: "Solidity Programming Language", duration: "40:30", free: false },
          { title: "Testing and Deploying Smart Contracts", duration: "35:45", free: false },
          { title: "Building a Decentralized Marketplace", duration: "55:20", free: false },
        ],
      },
      {
        title: "Decentralized Applications",
        lessons: [
          { title: "Web3 and dApp Architecture", duration: "30:15", free: false },
          { title: "Connecting to Blockchain Networks", duration: "28:40", free: false },
          { title: "User Authentication in dApps", duration: "32:25", free: false },
          { title: "Project: Building a Complete dApp", duration: "60:00", free: false },
        ],
      },
      {
        title: "The Future of Blockchain",
        lessons: [
          { title: "Scaling Solutions and Layer 2", duration: "35:30", free: false },
          { title: "Interoperability Between Blockchains", duration: "30:15", free: false },
          { title: "Blockchain in Enterprise", duration: "25:40", free: false },
          { title: "Final Project: Blockchain Implementation", duration: "75:00", free: false },
        ],
      },
    ],
    instructorBio:
      "Michael Rodriguez is a blockchain developer and consultant with expertise in Ethereum, Solana, and other leading blockchain platforms. He has helped numerous startups launch successful Web3 projects and has been teaching blockchain technology for over 5 years. Michael is committed to making blockchain concepts accessible to developers of all skill levels.",
  },
}

export function CourseDetail({ slug }: { slug: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Get course data based on slug
  const course = coursesData[slug as keyof typeof coursesData]

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <p className="mt-2 text-muted-foreground">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
        {/* Course Header */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid gap-8 lg:grid-cols-2"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Link href="/courses" className="text-sm font-medium text-muted-foreground hover:text-primary">
                    Courses
                  </Link>
                  <span className="text-sm text-muted-foreground">/</span>
                  <span className="text-sm font-medium">{course.category}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{course.title}</h1>
                <p className="text-xl text-muted-foreground">{course.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <Star className="mr-1 h-5 w-5 fill-primary text-primary" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="ml-1 text-muted-foreground">({course.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-5 w-5 text-muted-foreground" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-5 w-5 text-muted-foreground" />
                    <span>Last updated {course.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={course.instructorImage || "/placeholder.svg"}
                      alt={course.instructor}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Created by {course.instructor}</p>
                    <p className="text-sm text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="relative">
                <div className="relative aspect-video overflow-hidden rounded-xl border shadow-lg">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <button
                      className="group flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <div className="h-5 w-5 rounded bg-primary-foreground" />
                      ) : (
                        <Play className="h-6 w-6 fill-primary-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                <Card className="absolute -bottom-6 right-6 w-64 shadow-lg">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold">${course.price}</span>
                        <span className="text-sm line-through text-muted-foreground">${course.originalPrice}</span>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full gap-2" onClick={() => setIsCheckoutOpen(true)}>
                          <ShoppingCart className="h-4 w-4" />
                          Buy Now
                        </Button>
                        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Complete Your Purchase</DialogTitle>
                              <DialogDescription>
                                You're about to purchase {course.title} for ${course.price}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="rounded-lg border p-4">
                                <div className="flex justify-between">
                                  <span className="font-medium">{course.title}</span>
                                  <span className="font-bold">${course.price}</span>
                                </div>
                                <div className="mt-2 text-sm text-muted-foreground">
                                  <p>Instructor: {course.instructor}</p>
                                  <p>Duration: {course.duration}</p>
                                </div>
                              </div>
                              <PayPalProvider>
                                <PayPalCheckoutButton
                                  amount={course.price}
                                  courseId={course.id}
                                  courseTitle={course.title}
                                />
                              </PayPalProvider>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-center text-xs text-muted-foreground">30-Day Money-Back Guarantee</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-8 grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-8">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">What You'll Learn</h2>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {course.whatYouWillLearn.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">Requirements</h2>
                      <ul className="list-inside list-disc space-y-2 pl-5">
                        {course.requirements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold">Description</h2>
                      <div className="prose max-w-none dark:prose-invert">
                        <p>{course.description}</p>
                        <p>
                          This comprehensive course is designed for {course.level.toLowerCase()} learners who want to
                          master {course.title.toLowerCase()}. With over{" "}
                          {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons and{" "}
                          {course.duration} of content, you'll gain both theoretical knowledge and practical skills.
                        </p>
                        <p>
                          By the end of this course, you'll be able to apply your skills to real-world projects and
                          advance your career in this exciting field.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="curriculum" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Course Content</h2>
                      <div className="text-sm text-muted-foreground">
                        <span>
                          {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons
                        </span>
                        <span className="mx-2">•</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {course.curriculum.map((section, sectionIndex) => (
                        <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex flex-1 items-center justify-between pr-4 text-left">
                              <span>{section.title}</span>
                              <span className="text-sm text-muted-foreground">{section.lessons.length} lessons</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <li
                                  key={lessonIndex}
                                  className="flex items-center justify-between rounded-lg p-2 hover:bg-muted/50"
                                >
                                  <div className="flex items-center">
                                    {lesson.free ? (
                                      <Play className="mr-2 h-4 w-4 text-primary" />
                                    ) : (
                                      <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className={lesson.free ? "" : "text-muted-foreground"}>
                                      {lesson.title}
                                      {lesson.free && (
                                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                          Free
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                  <TabsContent value="instructor" className="space-y-6">
                    <div className="flex flex-col items-start gap-6 sm:flex-row">
                      <div className="relative h-32 w-32 overflow-hidden rounded-full">
                        <Image
                          src={course.instructorImage || "/placeholder.svg"}
                          alt={course.instructor}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold">{course.instructor}</h2>
                        <p className="text-muted-foreground">{course.instructorTitle}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm">{course.rating} Instructor Rating</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.reviewCount} Reviews</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{course.students} Students</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="prose max-w-none dark:prose-invert">
                      <p>{course.instructorBio}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="space-y-6 lg:mt-16">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">This course includes:</h3>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>
                          {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)} lessons
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>{course.duration} of content</span>
                      </li>
                      <li className="flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>{course.language}</span>
                      </li>
                      <li className="flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Downloadable resources</span>
                      </li>
                      <li className="flex items-center">
                        <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-center">
                        <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                        <span>Lifetime access</span>
                      </li>
                    </ul>
                    <div className="mt-6 space-y-2">
                      <Button className="w-full gap-2" onClick={() => setIsCheckoutOpen(true)}>
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now
                      </Button>
                    </div>
                    <p className="mt-4 text-center text-xs text-muted-foreground">30-Day Money-Back Guarantee</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold">Training 5 or more people?</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Get your team access to thousands of top courses anytime, anywhere.
                    </p>
                    <Button variant="outline" className="mt-4 w-full">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
                <div className="flex items-center justify-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Courses */}
        <section className="bg-muted/30 py-16">
          <div className="container px-4">
            <h2 className="mb-8 text-2xl font-bold">Students Also Bought</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(coursesData)
                .filter((c) => c.id !== course.id)
                .map((relatedCourse) => (
                  <Link key={relatedCourse.id} href={`/courses/${relatedCourse.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={relatedCourse.image || "/placeholder.svg"}
                          alt={relatedCourse.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                          {relatedCourse.category}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">By {relatedCourse.instructor}</p>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{relatedCourse.rating}</span>
                          </div>
                        </div>
                        <h3 className="mt-2 text-xl font-bold">{relatedCourse.title}</h3>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-lg font-bold">${relatedCourse.price}</p>
                          <p className="text-sm text-muted-foreground">
                            {relatedCourse.students.toLocaleString()} students
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

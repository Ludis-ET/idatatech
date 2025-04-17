"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Filter, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Sample course data
const courses = [
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
    level: "Advanced",
    duration: "10 weeks",
    tags: ["AI", "Machine Learning", "Python"],
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
    level: "Beginner",
    duration: "8 weeks",
    tags: ["Blockchain", "Cryptocurrency", "Web3"],
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
    level: "Intermediate",
    duration: "6 weeks",
    tags: ["SEO", "Social Media", "Content Marketing"],
  },
  {
    id: 4,
    slug: "ux-design-principles",
    title: "UX Design Principles",
    instructor: "Alex Johnson",
    price: 79.99,
    rating: 4.6,
    students: 1890,
    image: "/placeholder.svg?height=400&width=600",
    category: "Design",
    level: "Beginner",
    duration: "5 weeks",
    tags: ["UI/UX", "Figma", "Design Thinking"],
  },
  {
    id: 5,
    slug: "data-science-bootcamp",
    title: "Data Science Bootcamp",
    instructor: "Dr. James Wilson",
    price: 149.99,
    rating: 4.9,
    students: 2760,
    image: "/placeholder.svg?height=400&width=600",
    category: "Data Science",
    level: "Intermediate",
    duration: "12 weeks",
    tags: ["Python", "Statistics", "Machine Learning"],
  },
  {
    id: 6,
    slug: "full-stack-web-development",
    title: "Full Stack Web Development",
    instructor: "Jessica Lee",
    price: 129.99,
    rating: 4.8,
    students: 3120,
    image: "/placeholder.svg?height=400&width=600",
    category: "Technology",
    level: "Intermediate",
    duration: "14 weeks",
    tags: ["JavaScript", "React", "Node.js"],
  },
]

export function CourseList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popularity")

  // Get unique categories and levels
  const categories = Array.from(new Set(courses.map((course) => course.category)))
  const levels = Array.from(new Set(courses.map((course) => course.level)))

  // Filter courses based on search, price, categories, and levels
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1]

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category)

    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level)

    return matchesSearch && matchesPrice && matchesCategory && matchesLevel
  })

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "popularity":
      default:
        return b.students - a.students
    }
  })

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
        <section className="bg-muted/30 py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Explore Our Courses</h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Discover a wide range of courses designed to help you master new skills and advance your career.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="border-b py-6">
          <div className="container flex flex-wrap items-center justify-between gap-4 px-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses, instructors, or topics..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Sort by:</p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filter Courses</SheetTitle>
                    <SheetDescription>Narrow down courses based on your preferences.</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Price Range</h3>
                      <div className="space-y-2">
                        <Slider
                          defaultValue={[0, 200]}
                          max={200}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-sm">${priceRange[0]}</p>
                          <p className="text-sm">${priceRange[1]}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([...selectedCategories, category])
                                } else {
                                  setSelectedCategories(selectedCategories.filter((c) => c !== category))
                                }
                              }}
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-medium">Level</h3>
                      <div className="space-y-2">
                        {levels.map((level) => (
                          <div key={level} className="flex items-center space-x-2">
                            <Checkbox
                              id={`level-${level}`}
                              checked={selectedLevels.includes(level)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedLevels([...selectedLevels, level])
                                } else {
                                  setSelectedLevels(selectedLevels.filter((l) => l !== level))
                                }
                              }}
                            />
                            <label
                              htmlFor={`level-${level}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCategories([])
                          setSelectedLevels([])
                          setPriceRange([0, 200])
                        }}
                      >
                        Reset
                      </Button>
                      <Button>Apply Filters</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="py-12">
          <div className="container px-4">
            {sortedCourses.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {sortedCourses.map((course) => (
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
                          <div className="mt-2 flex items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {course.level}
                            </span>
                            <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                              {course.duration}
                            </span>
                          </div>
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
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-muted p-6">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-xl font-bold">No courses found</h3>
                <p className="mt-2 text-center text-muted-foreground">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategories([])
                    setSelectedLevels([])
                    setPriceRange([0, 200])
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Star,
  Users,
  Zap,
  BookOpen,
  Award,
  Globe,
  Clock,
  Play,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { cn } from "@/lib/utils";

export function LandingPage({courses}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const howItWorksInView = useInView(howItWorksRef, {
    once: true,
    amount: 0.3,
  });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });
  const partnersRef = useRef<HTMLDivElement>(null);
  const partnersInView = useInView(partnersRef, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const statsControls = useAnimation();
  const featuresControls = useAnimation();

  useEffect(() => {
    if (statsInView) {
      statsControls.start("visible");
    }
    if (featuresInView) {
      featuresControls.start("visible");
    }
  }, [statsInView, featuresInView, statsControls, featuresControls]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const playVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275], // Custom spring-like easing
      },
    }),
  };

  const fadeInUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "Cutting-Edge Courses",
      description:
        "Access the latest technology and business courses taught by industry experts",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Interactive Learning",
      description:
        "Engage with immersive content designed for maximum knowledge retention",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Support",
      description:
        "Join a global community of learners and instructors for collaborative growth",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      title: "Comprehensive Library",
      description:
        "Access thousands of courses across dozens of categories and disciplines",
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Recognized Certificates",
      description:
        "Earn industry-recognized certificates to showcase your new skills",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Learn at Your Pace",
      description:
        "Flexible learning schedules that adapt to your busy lifestyle",
    },
  ];

  
  console.log(courses)
  const stats = [
    {
      value: "10M+",
      label: "Students Worldwide",
      icon: <Globe className="h-6 w-6 text-primary" />,
    },
    {
      value: "200+",
      label: "Expert Instructors",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      value: "15k+",
      label: "Courses Available",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
    },
    {
      value: "4.8",
      label: "Average Rating",
      icon: <Star className="h-6 w-6 text-primary" />,
    },
  ];

  const howItWorks = [
    {
      title: "Browse Courses",
      description:
        "Explore our extensive library of courses across various categories and skill levels.",
      icon: <Search className="h-10 w-10 text-primary" />,
    },
    {
      title: "Enroll & Learn",
      description:
        "Join courses that match your interests and learn at your own pace with flexible schedules.",
      icon: <BookOpen className="h-10 w-10 text-primary" />,
    },
    {
      title: "Practice Skills",
      description:
        "Apply your knowledge through hands-on projects, quizzes, and interactive exercises.",
      icon: <Zap className="h-10 w-10 text-primary" />,
    },
    {
      title: "Earn Certificate",
      description:
        "Complete your course to receive a certificate that validates your new skills.",
      icon: <Award className="h-10 w-10 text-primary" />,
    },
  ];

  const tabContent = [
    {
      title: "For Students",
      content:
        "Access thousands of courses taught by industry experts. Learn at your own pace and earn certificates to showcase your skills.",
      features: [
        "Personalized learning paths",
        "Interactive exercises and quizzes",
        "Mobile learning on any device",
        "Course completion certificates",
        "24/7 access to course materials",
      ],
      image: "/placeholder.svg?height=400&width=600&text=Student+Learning",
    },
    {
      title: "For Instructors",
      content:
        "Share your expertise with millions of students worldwide. Create engaging courses and build your teaching reputation.",
      features: [
        "Intuitive course creation tools",
        "Analytics to track student progress",
        "Global teaching platform",
        "Marketing support for your courses",
        "Community of fellow educators",
      ],
      image: "/placeholder.svg?height=400&width=600&text=Instructor+Teaching",
    },
    {
      title: "For Businesses",
      content:
        "Upskill your workforce with enterprise-grade learning solutions. Track progress and measure ROI on your learning investments.",
      features: [
        "Custom learning portals",
        "Team progress tracking",
        "Bulk enrollment options",
        "API integration with your systems",
        "Dedicated customer success manager",
      ],
      image: "/placeholder.svg?height=400&width=600&text=Business+Training",
    },
  ];

  const partners = [
    {
      name: "Microsoft",
      logo: "/placeholder.svg?height=60&width=180&text=Microsoft",
    },
    {
      name: "Google",
      logo: "/placeholder.svg?height=60&width=180&text=Google",
    },
    {
      name: "Amazon",
      logo: "/placeholder.svg?height=60&width=180&text=Amazon",
    },
    { name: "IBM", logo: "/placeholder.svg?height=60&width=180&text=IBM" },
    { name: "Meta", logo: "/placeholder.svg?height=60&width=180&text=Meta" },
    {
      name: "Oracle",
      logo: "/placeholder.svg?height=60&width=180&text=Oracle",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/80"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
          <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={containerVariants}
              className="grid gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-center space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary"
                >
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Transform your future with online learning</span>
                </motion.div>
                <motion.h1
                  className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        ease: "easeOut",
                      },
                    },
                  }}
                >
                  <span className="block">Unlock Your Potential</span>
                  <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Master New Skills Today
                  </span>
                </motion.h1>
                <motion.p
                  className="max-w-[800px] text-xl text-muted-foreground"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: 0.2,
                        ease: "easeOut",
                      },
                    },
                  }}
                >
                  Join millions of learners worldwide and discover courses
                  taught by industry experts. Advance your career, learn a new
                  skill, or pursue your passions.
                </motion.p>
                <motion.div
                  className="flex flex-col gap-4 sm:flex-row"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.7,
                        delay: 0.3,
                        ease: "easeOut",
                      },
                    },
                  }}
                >
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  >
                    <Link href="/courses">
                      Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#how-it-works">
                      How It Works <ChevronDown className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.7,
                        delay: 0.4,
                        ease: "easeOut",
                      },
                    },
                  }}
                >
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>10M+ Students</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>15K+ Courses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>Lifetime Access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>Certificate of Completion</span>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="relative flex items-center justify-center"
              >
                <motion.div
                  className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <div className="relative aspect-video w-full max-w-[10000px] overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-1 backdrop-blur">
                  <div className="relative h-full w-full rounded-xl overflow-hidden">
                    <Image
                      src="/landing.png"
                      alt="Learn with IdataTech"
                      width={800}
                      height={400}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                </div>
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
                      <p className="text-lg font-bold">10M+</p>
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
                      <p className="text-lg font-bold">4.8/5.0</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Floating Scroll Indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1.5,
                  duration: 0.5,
                },
              }}
            >
              <motion.div
                className="flex flex-col items-center"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              >
                <p className="mb-2 text-sm text-muted-foreground">
                  Scroll to explore
                </p>
                <ChevronDown className="h-6 w-6 text-muted-foreground" />
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </motion.section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-16 bg-muted/30">
          <div className="container px-4">
            <motion.div
              className="grid grid-cols-2 gap-6 md:grid-cols-4"
              variants={staggerContainerVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statsVariants}
                  className="flex flex-col items-center justify-center rounded-lg bg-background p-6 text-center shadow-sm"
                >
                  <div className="mb-3 rounded-full bg-primary/10 p-3">
                    {stat.icon}
                  </div>
                  <motion.h3
                    className="text-3xl font-bold md:text-4xl"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      statsInView
                        ? {
                            opacity: 1,
                            scale: 1,
                            transition: {
                              delay: 0.3 + index * 0.1,
                              duration: 0.5,
                              ease: "easeOut",
                            },
                          }
                        : { opacity: 0, scale: 0.5 }
                    }
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Partners Section */}
        <section ref={partnersRef} className="border-y bg-background py-12">
          <div className="container">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={
                partnersInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-8 text-xl font-medium text-muted-foreground">
                Trusted by leading companies worldwide
              </h2>
              <motion.div
                className="flex flex-wrap items-center justify-center gap-8 grayscale opacity-70"
                variants={staggerContainerVariants}
                initial="hidden"
                animate={partnersInView ? "visible" : "hidden"}
              >
                {partners.map((partner, i) => (
                  <motion.div
                    key={i}
                    className="h-12 w-32 md:h-15 md:w-40"
                    variants={fadeInUpVariants}
                    whileHover={{
                      scale: 1.05,
                      grayscale: 0,
                      opacity: 1,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      width={160}
                      height={60}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" ref={howItWorksRef} className="py-24">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                howItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Simple Process</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How IdataTech Works
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Our platform makes learning new skills simple and accessible for
                everyone.
              </p>
            </motion.div>

            <motion.div
              className="mt-16 grid gap-8 md:grid-cols-4"
              variants={staggerContainerVariants}
              initial="hidden"
              animate={howItWorksInView ? "visible" : "hidden"}
            >
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUpVariants}
                  className="relative"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      {step.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    {index < howItWorks.length - 1 && (
                      <div
                        className="absolute right-0 top-10 hidden h-0.5 w-full translate-x-1/2 bg-gradient-to-r from-primary/50 to-transparent md:block"
                        style={{ width: "50%" }}
                      ></div>
                    )}

                    <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="bg-muted/30 py-24">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>Why Choose IdataTech</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Revolutionizing Online Education
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Our platform combines cutting-edge technology with expert
                instruction to deliver an unparalleled learning experience.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              initial="hidden"
              animate={featuresControls}
              className="mt-16 grid gap-8 md:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                  className="group relative overflow-hidden rounded-2xl border bg-background p-8 transition-all hover:shadow-lg"
                >
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 transition-all group-hover:scale-150"></div>
                  <div className="relative z-10">
                    {feature.icon}
                    <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
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
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-center space-y-6"
              >
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  <span>Immersive Learning</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Interactive Courses Designed for the Future
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our courses feature interactive elements, real-world projects,
                  and cutting-edge content to prepare you for tomorrow's
                  challenges.
                </p>
                <ul className="space-y-3">
                  {[
                    "Hands-on projects with real-world applications",
                    "Live coding sessions and interactive workshops",
                    "Personalized learning paths based on your goals",
                    "Direct feedback from industry experts",
                    "Community forums for peer collaboration",
                    "Regular content updates to stay current",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="w-fit" asChild>
                  <Link href="/courses">
                    Explore Our Methodology{" "}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="relative flex items-center justify-center"
              >
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl"></div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-1 backdrop-blur">
                  <Image
                    src="/placeholder.svg?height=400&width=600&text=Interactive+Learning"
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

        {/* Tabs Section */}
        <section className="py-24">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                <Sparkles className="mr-1 h-3.5 w-3.5" />
                <span>For Everyone</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Learning Solutions for All
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Whether you're a student, instructor, or business, IdataTech has
                the perfect solution for you.
              </p>
            </motion.div>

            <div className="mt-12">
              <div className="flex flex-wrap justify-center gap-4">
                {tabContent.map((tab, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={cn(
                      "rounded-full px-6 py-2 text-sm font-medium transition-all",
                      activeTab === index
                        ? "bg-primary text-white shadow-md"
                        : "bg-muted hover:bg-muted/80"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.title}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-12 grid gap-8 lg:grid-cols-2"
                >
                  <div className="flex flex-col justify-center space-y-6">
                    <h3 className="text-2xl font-bold">
                      {tabContent[activeTab].title}
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      {tabContent[activeTab].content}
                    </p>
                    <ul className="space-y-3">
                      {tabContent[activeTab].features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" className="w-fit" asChild>
                      <Link href="/courses">
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/20 blur-xl"></div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-1 backdrop-blur">
                      <Image
                        src={tabContent[activeTab].image || "/placeholder.svg"}
                        alt={tabContent[activeTab].title}
                        width={600}
                        height={400}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
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
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Most Popular Courses
                </h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Discover our highest-rated and most enrolled courses across
                  various disciplines.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {courses.length > 0 && courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Link href={`/courses/${course.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={course.image_url || "/placeholder.svg"}
                          alt={course.title}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute right-3 top-3 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                          {course.level}
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                             {course.duration}
                          </p>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">
                              4.8
                            </span>
                          </div>
                        </div>
                        <h3 className="mt-2 text-xl font-bold">
                          {course.title}
                        </h3>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-lg font-bold">${course.price}</p>
                          <p className="text-sm text-muted-foreground">
                            100+ students
                          </p>
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
                  Hear from our community of learners who have transformed their
                  careers through our platform.
                </p>
              </motion.div>
            </motion.div>

            <div className="mt-16">
              <TestimonialCarousel />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="bg-muted/30 py-24">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
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
                  Get 20% off on all courses for a limited time. Invest in your
                  future and join thousands of successful students.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  >
                    <Link href="/courses">
                      Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/signup">Sign Up Now</Link>
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
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  From Our Blog
                </h2>
                <p className="mt-4 text-xl text-muted-foreground">
                  Stay updated with the latest trends, insights, and educational
                  resources.
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
                  image:
                    "/placeholder.svg?height=400&width=600&text=AI+in+Education",
                  category: "Technology",
                },
                {
                  id: 2,
                  slug: "mastering-data-science",
                  title: "5 Steps to Mastering Data Science",
                  excerpt:
                    "A comprehensive guide to building your skills in one of the most in-demand fields in tech.",
                  date: "Apr 5, 2025",
                  image:
                    "/placeholder.svg?height=400&width=600&text=Data+Science",
                  category: "Data Science",
                },
                {
                  id: 3,
                  slug: "remote-learning-tips",
                  title: "Effective Remote Learning Strategies",
                  excerpt:
                    "Tips and techniques to maximize productivity and engagement when learning from home.",
                  date: "Mar 28, 2025",
                  image:
                    "/placeholder.svg?height=400&width=600&text=Remote+Learning",
                  category: "Learning Tips",
                },
              ].map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                >
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
                        <p className="text-sm text-muted-foreground">
                          {post.date}
                        </p>
                        <h3 className="mt-2 text-xl font-bold">{post.title}</h3>
                        <p className="mt-2 text-muted-foreground">
                          {post.excerpt}
                        </p>
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

        {/* Newsletter Section */}
        <section className="bg-primary text-primary-foreground py-24">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Join Our Learning Community
              </h2>
              <p className="mt-4 text-xl text-primary-foreground/90">
                Subscribe to our newsletter for the latest courses, articles,
                and educational resources.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full max-w-md rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 sm:w-80"
                />
                <Button size="lg" variant="secondary">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-sm text-primary-foreground/80">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

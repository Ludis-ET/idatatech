"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    content:
      "IdataTech completely transformed my career. The AI Development course helped me land a job at a top tech company within months of completion.",
    author: "Sarah Johnson",
    role: "AI Engineer at TechCorp",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    content:
      "The interactive learning approach and real-world projects made complex concepts easy to understand. I've tried many platforms, but IdataTech is by far the best.",
    author: "Michael Chen",
    role: "Data Scientist",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    content:
      "As someone transitioning careers, IdataTech provided exactly what I needed - practical skills that employers actually value. Worth every penny!",
    author: "Jessica Williams",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="relative mx-auto max-w-4xl overflow-hidden py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="px-4"
        >
          <Card className="border-none bg-muted/50 shadow-none">
            <CardContent className="flex flex-col items-center p-6 text-center sm:p-10">
              <Quote className="h-12 w-12 text-primary/20" />
              <p className="mt-4 text-xl font-medium leading-relaxed md:text-2xl">
                "{testimonials[current].content}"
              </p>
              <div className="mt-6 flex flex-col items-center">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={testimonials[current].avatar || "/placeholder.svg"}
                    alt={testimonials[current].author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold">
                    {testimonials[current].author}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={prev}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous testimonial</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next testimonial</span>
        </Button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current ? "w-6 bg-primary" : "bg-primary/30"
            }`}
            onClick={() => {
              setAutoplay(false);
              setCurrent(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

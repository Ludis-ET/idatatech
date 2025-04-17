"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Sample blog data
const blogPostsData = {
  "future-of-ai-education": {
    id: 1,
    slug: "future-of-ai-education",
    title: "The Future of AI in Education",
    excerpt: "Exploring how artificial intelligence is transforming the learning experience for students worldwide.",
    content: `
      <p>Artificial Intelligence (AI) is revolutionizing education in ways we could only imagine a decade ago. From personalized learning experiences to automated administrative tasks, AI is transforming how we teach and learn.</p>
      
      <h2>Personalized Learning Paths</h2>
      <p>One of the most significant impacts of AI in education is the ability to create truly personalized learning experiences. AI systems can analyze a student's performance, identify strengths and weaknesses, and tailor content to meet their specific needs.</p>
      <p>These adaptive learning platforms use sophisticated algorithms to adjust the difficulty level, pacing, and content format based on real-time feedback from the student. This ensures that each learner receives the right challenge at the right time, maximizing engagement and knowledge retention.</p>
      
      <h2>Intelligent Tutoring Systems</h2>
      <p>AI-powered tutoring systems are becoming increasingly sophisticated, providing students with one-on-one guidance that was previously only available through human tutors. These systems can:</p>
      <ul>
        <li>Answer questions in natural language</li>
        <li>Provide step-by-step explanations for complex problems</li>
        <li>Offer feedback on assignments and projects</li>
        <li>Suggest additional resources based on the student's learning style</li>
      </ul>
      <p>As these systems continue to evolve, they're becoming more intuitive and responsive to the nuanced needs of learners.</p>
      
      <h2>Automating Administrative Tasks</h2>
      <p>Teachers spend a significant portion of their time on administrative tasks like grading, attendance tracking, and scheduling. AI can automate many of these processes, freeing up educators to focus on what they do best: teaching and mentoring students.</p>
      <p>Automated grading systems can now evaluate not just multiple-choice questions but also essays and open-ended responses, providing consistent and objective feedback. This not only saves time but also ensures that students receive prompt feedback on their work.</p>
      
      <h2>Challenges and Ethical Considerations</h2>
      <p>Despite its potential, the integration of AI in education raises important questions about privacy, data security, and the role of human teachers. As we collect more data on students' learning behaviors, we must ensure that this information is protected and used responsibly.</p>
      <p>There's also the risk of over-reliance on technology, potentially diminishing the crucial human elements of education: empathy, creativity, and critical thinking. The most effective educational approaches will likely combine AI tools with human guidance, leveraging the strengths of both.</p>
      
      <h2>The Future Landscape</h2>
      <p>Looking ahead, we can expect AI to become even more integrated into the educational experience. Virtual reality and augmented reality, powered by AI, will create immersive learning environments that make abstract concepts tangible and engaging.</p>
      <p>AI will also play a crucial role in addressing global educational challenges, such as teacher shortages and access to quality education in remote areas. By providing scalable, accessible learning resources, AI has the potential to democratize education on an unprecedented scale.</p>
      
      <h2>Conclusion</h2>
      <p>The future of AI in education is not about replacing teachers but enhancing their capabilities and extending their reach. By embracing these technologies thoughtfully and ethically, we can create learning experiences that are more personalized, engaging, and effective than ever before.</p>
      <p>As educators, students, and policymakers, we have the opportunity to shape how AI is integrated into our educational systems, ensuring that it serves our broader goals of fostering curiosity, creativity, and lifelong learning.</p>
    `,
    date: "Apr 10, 2025",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Technology",
    author: "Dr. Sarah Chen",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio:
      "Dr. Sarah Chen is an AI Research Scientist with over 10 years of experience in the field. She has published numerous papers on deep learning and has worked at leading tech companies including Google AI and OpenAI.",
    readTime: "5 min read",
    tags: ["AI", "Education", "Technology", "Future", "Learning"],
    relatedPosts: [2, 3, 4],
  },
  "mastering-data-science": {
    id: 2,
    slug: "mastering-data-science",
    title: "5 Steps to Mastering Data Science",
    excerpt: "A comprehensive guide to building your skills in one of the most in-demand fields in tech.",
    content: `
      <p>Data Science continues to be one of the most sought-after skills in the tech industry. Whether you're just starting your journey or looking to level up your existing skills, this guide will help you navigate the path to becoming a proficient data scientist.</p>
      
      <h2>Step 1: Build a Strong Foundation in Mathematics and Statistics</h2>
      <p>Data Science is built on a foundation of mathematics and statistics. To truly excel in this field, you need to understand:</p>
      <ul>
        <li>Linear algebra and calculus</li>
        <li>Probability theory</li>
        <li>Statistical methods and hypothesis testing</li>
        <li>Bayesian thinking</li>
      </ul>
      <p>Don't be intimidated if your math skills are rusty. Many online resources can help you build or refresh these fundamentals at your own pace.</p>
      
      <h2>Step 2: Learn Programming and Data Manipulation</h2>
      <p>Python and R are the two most popular programming languages for data science. While either is a good choice, Python has emerged as the industry standard due to its versatility and extensive libraries.</p>
      <p>Focus on mastering these essential libraries:</p>
      <ul>
        <li>NumPy and Pandas for data manipulation</li>
        <li>Matplotlib and Seaborn for data visualization</li>
        <li>Scikit-learn for machine learning</li>
        <li>TensorFlow or PyTorch for deep learning</li>
      </ul>
      <p>Practice by working with real datasets to develop your data cleaning, transformation, and analysis skills.</p>
      
      <h2>Step 3: Master Machine Learning Algorithms</h2>
      <p>Machine learning is at the heart of data science. Start with understanding the fundamental algorithms:</p>
      <ul>
        <li>Supervised learning: regression, classification, decision trees</li>
        <li>Unsupervised learning: clustering, dimensionality reduction</li>
        <li>Ensemble methods: random forests, gradient boosting</li>
      </ul>
      <p>Once you're comfortable with these, you can explore more advanced topics like deep learning and reinforcement learning.</p>
      
      <h2>Step 4: Work on Real Projects</h2>
      <p>Theory alone won't make you a data scientist. You need to apply your knowledge to real-world problems:</p>
      <ul>
        <li>Participate in Kaggle competitions</li>
        <li>Contribute to open-source projects</li>
        <li>Build a portfolio of personal projects that demonstrate your skills</li>
        <li>Work on interdisciplinary projects that combine data science with domain expertise</li>
      </ul>
      <p>These projects will not only strengthen your technical skills but also help you develop the critical thinking and problem-solving abilities that employers value.</p>
      
      <h2>Step 5: Develop Domain Expertise and Communication Skills</h2>
      <p>The most effective data scientists combine technical prowess with domain knowledge and communication skills. To stand out in the field:</p>
      <ul>
        <li>Develop expertise in a specific industry or domain</li>
        <li>Practice explaining complex concepts in simple terms</li>
        <li>Learn to create compelling data visualizations</li>
        <li>Understand the business implications of your analyses</li>
      </ul>
      <p>Remember that your ultimate goal is to provide insights that drive decisions, not just to build models.</p>
      
      <h2>Continuous Learning and Community Engagement</h2>
      <p>Data science is an ever-evolving field. Stay current by:</p>
      <ul>
        <li>Following research papers and industry blogs</li>
        <li>Attending conferences and meetups</li>
        <li>Participating in online communities</li>
        <li>Taking advanced courses in specialized areas</li>
      </ul>
      <p>Engaging with the data science community will expose you to new ideas, tools, and approaches that can enhance your skills and career opportunities.</p>
      
      <h2>Conclusion</h2>
      <p>Mastering data science is a journey, not a destination. By following these five steps and committing to continuous learning, you'll build a strong foundation for a rewarding career in this dynamic field.</p>
      <p>Remember that everyone's path is different. Focus on developing a unique combination of skills that align with your interests and career goals, and don't be afraid to specialize in areas that excite you the most.</p>
    `,
    date: "Apr 5, 2025",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Data Science",
    author: "Michael Rodriguez",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio:
      "Michael Rodriguez is a data scientist with over 8 years of experience working with startups and Fortune 500 companies. He specializes in machine learning and has helped businesses across various industries leverage data for strategic decision-making.",
    readTime: "8 min read",
    tags: ["Data Science", "Machine Learning", "Programming", "Career", "Education"],
    relatedPosts: [1, 3, 5],
  },
  "remote-learning-tips": {
    id: 3,
    slug: "remote-learning-tips",
    title: "Effective Remote Learning Strategies",
    excerpt: "Tips and techniques to maximize productivity and engagement when learning from home.",
    content: `
      <p>Remote learning has become a permanent fixture in education, offering flexibility and accessibility that traditional classroom settings cannot match. However, it also presents unique challenges that can impact your learning experience. This article shares proven strategies to help you thrive in a remote learning environment.</p>
      
      <h2>Create a Dedicated Learning Space</h2>
      <p>Your environment significantly impacts your ability to focus and retain information. To optimize your remote learning experience:</p>
      <ul>
        <li>Designate a specific area solely for studying</li>
        <li>Ensure good lighting and comfortable seating</li>
        <li>Minimize distractions and noise</li>
        <li>Keep your learning materials organized and accessible</li>
      </ul>
      <p>This dedicated space helps create a psychological boundary between "study time" and "relaxation time," making it easier to focus when you're in your learning environment.</p>
      
      <h2>Establish a Consistent Routine</h2>
      <p>Without the structure of in-person classes, creating your own routine becomes essential:</p>
      <ul>
        <li>Set regular study hours that align with your peak productivity times</li>
        <li>Create a weekly schedule that includes specific goals for each session</li>
        <li>Build in breaks using techniques like the Pomodoro method (25 minutes of focused work followed by a 5-minute break)</li>
        <li>Maintain consistent sleep patterns to support cognitive function</li>
      </ul>
      <p>A well-structured routine reduces decision fatigue and helps you maintain momentum in your learning journey.</p>
      
      <h2>Actively Engage with the Material</h2>
      <p>Passive consumption of lectures and readings is rarely effective. Instead:</p>
      <ul>
        <li>Take comprehensive notes using techniques like the Cornell method</li>
        <li>Participate actively in online discussions and forums</li>
        <li>Teach concepts to others (even if it's explaining to an imaginary student)</li>
        <li>Create mind maps or visual summaries of complex topics</li>
      </ul>
      <p>Active engagement forces your brain to process information more deeply, leading to better understanding and retention.</p>
      
      <h2>Leverage Technology Effectively</h2>
      <p>The right digital tools can enhance your remote learning experience:</p>
      <ul>
        <li>Use productivity apps like Notion or Trello to organize your tasks and deadlines</li>
        <li>Try spaced repetition software like Anki for memorization-heavy subjects</li>
        <li>Explore browser extensions that block distracting websites during study sessions</li>
        <li>Utilize collaborative tools for group projects and peer learning</li>
      </ul>
      <p>However, be selective about the tools you adopt—too many can become overwhelming and counterproductive.</p>
      
      <h2>Prioritize Connection and Collaboration</h2>
      <p>Remote learning doesn't have to be solitary. In fact, social learning can significantly enhance your experience:</p>
      <ul>
        <li>Form virtual study groups with classmates</li>
        <li>Schedule regular check-ins with instructors or mentors</li>
        <li>Participate in online communities related to your field of study</li>
        <li>Consider accountability partnerships to help stay motivated</li>
      </ul>
      <p>These connections not only combat isolation but also expose you to different perspectives and approaches to the material.</p>
      
      <h2>Practice Self-Care and Mindfulness</h2>
      <p>Effective learning requires a healthy mind and body:</p>
      <ul>
        <li>Incorporate physical activity into your daily routine</li>
        <li>Practice mindfulness or meditation to improve focus</li>
        <li>Maintain proper nutrition and hydration</li>
        <li>Set boundaries between study time and personal time</li>
      </ul>
      <p>Remember that sustainable learning is a marathon, not a sprint—taking care of your wellbeing is essential for long-term success.</p>
      
      <h2>Reflect and Adapt Regularly</h2>
      <p>What works for others may not work for you. Develop a practice of regular reflection:</p>
      <ul>
        <li>Keep a learning journal to track what's working and what isn't</li>
        <li>Experiment with different study techniques and environments</li>
        <li>Seek feedback from instructors and peers</li>
        <li>Be willing to adjust your approach based on results</li>
      </ul>
      <p>This iterative process helps you develop a personalized learning strategy that aligns with your unique needs and preferences.</p>
      
      <h2>Conclusion</h2>
      <p>Remote learning offers unprecedented flexibility and access to educational opportunities, but it requires intentionality and self-discipline to be truly effective. By implementing these strategies, you can create a remote learning experience that is not just adequate but potentially superior to traditional methods.</p>
      <p>Remember that becoming an effective remote learner is itself a valuable skill that will serve you well in an increasingly digital world. Embrace the journey of discovering how you learn best in this environment, and don't hesitate to adapt these strategies to suit your individual circumstances.</p>
    `,
    date: "Mar 28, 2025",
    image: "/placeholder.svg?height=600&width=1200",
    category: "Learning Tips",
    author: "Emma Thompson",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio:
      "Emma Thompson is an educational psychologist specializing in online learning environments. With a background in cognitive science, she helps students and educators optimize their remote learning experiences through evidence-based strategies.",
    readTime: "6 min read",
    tags: ["Learning", "Productivity", "Education", "Remote Work", "Study Tips"],
    relatedPosts: [1, 2, 5],
  },
}

export function BlogPost({ slug }: { slug: string }) {
  const [isLoading, setIsLoading] = useState(true)

  // Get blog post data based on slug
  const post = blogPostsData[slug as keyof typeof blogPostsData]

  // Simulate loading
  useState(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  })

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Article not found</h1>
            <p className="mt-2 text-muted-foreground">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Get related posts
  const relatedPosts = post.relatedPosts
    .map((id) => Object.values(blogPostsData).find((p) => p.id === id))
    .filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {post.category}
                  </span>
                  <span>•</span>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>
                <p className="text-xl text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container px-4">
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8">
          <div className="container px-4">
            <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_250px]">
              <div>
                <article className="prose max-w-none dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${tag}`}
                      className="rounded-full bg-muted px-3 py-1 text-sm font-medium hover:bg-muted/80"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-between border-t pt-8">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">Author</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <h3 className="mb-4 text-lg font-bold">About the Author</h3>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{post.authorBio}</p>
                </div>
                {relatedPosts.length > 0 && (
                  <div className="rounded-xl border bg-card p-6">
                    <h3 className="mb-4 text-lg font-bold">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost?.id} href={`/blog/${relatedPost?.slug}`}>
                          <div className="group flex gap-3">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={relatedPost?.image || ""}
                                alt={relatedPost?.title || ""}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium group-hover:text-primary">{relatedPost?.title}</h4>
                              <p className="text-xs text-muted-foreground">{relatedPost?.date}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-muted/30 py-12">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl rounded-xl border bg-card p-8 shadow-sm">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Enjoyed this article?</h2>
                <p className="mt-2 text-muted-foreground">
                  Subscribe to our newsletter to get the latest articles, tutorials, and updates delivered straight to
                  your inbox.
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

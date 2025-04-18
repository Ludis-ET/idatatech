"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

// Courses
export async function getCourses({
  limit = 10,
  offset = 0,
  category = null,
  featured = null,
  search = null,
}: {
  limit?: number
  offset?: number
  category?: string | null
  featured?: boolean | null
  search?: string | null
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("courses")
    .select(`
      *,
      categories(name, slug),
      course_details(*)
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    query = query.eq("categories.slug", category)
  }

  if (featured !== null) {
    query = query.eq("featured", featured)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching courses:", error)
    return { courses: [], error: error.message }
  }

  return { courses: data, error: null }
}

export async function getCourseBySlug(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      categories(name, slug),
      course_details(*),
      course_sections(
        id, title, position,
        course_lessons(id, title, duration, is_free, position)
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    console.error("Error fetching course:", error)
    return { course: null, error: error.message }
  }

  return { course: data, error: null }
}

export async function getPopularCourses(limit = 4) {
  const supabase = createServerSupabaseClient()

  // In a real application, you might determine popularity based on enrollments or reviews
  // For now, we'll just use featured courses as "popular"
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      categories(name, slug)
    `)
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching popular courses:", error)
    return { courses: [], error: error.message }
  }

  return { courses: data, error: null }
}

export async function getRelatedCourses(courseId: number, categoryId: number | null, limit = 3) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("courses")
    .select(`
      *,
      categories(name, slug)
    `)
    .eq("published", true)
    .neq("id", courseId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching related courses:", error)
    return { courses: [], error: error.message }
  }

  return { courses: data, error: null }
}

// Blogs
export async function getBlogPosts({
  limit = 10,
  offset = 0,
  category = null,
  featured = null,
  search = null,
}: {
  limit?: number
  offset?: number
  category?: string | null
  featured?: boolean | null
  search?: string | null
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags(
        blog_tags(id, name, slug)
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (category) {
    query = query.eq("category", category)
  }

  if (featured !== null) {
    query = query.eq("featured", featured)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching blog posts:", error)
    return { posts: [], error: error.message }
  }

  return { posts: data, error: null }
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags(
        blog_tags(id, name, slug)
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return { post: null, error: error.message }
  }

  return { post: data, error: null }
}

export async function getRecentBlogPosts(limit = 3) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags(
        blog_tags(id, name, slug)
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent blog posts:", error)
    return { posts: [], error: error.message }
  }

  return { posts: data, error: null }
}

export async function getCategories() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    return { categories: [], error: error.message }
  }

  return { categories: data, error: null }
}

export async function getBlogTags() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("blog_tags").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching blog tags:", error)
    return { tags: [], error: error.message }
  }

  return { tags: data, error: null }
}

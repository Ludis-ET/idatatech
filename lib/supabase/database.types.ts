export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: number
          title: string
          slug: string
          description: string
          price: number
          original_price: number | null
          instructor_id: string | null
          category_id: number | null
          level: string
          duration: string
          language: string
          image_url: string | null
          featured: boolean
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          description: string
          price: number
          original_price?: number | null
          instructor_id?: string | null
          category_id?: number | null
          level: string
          duration: string
          language?: string
          image_url?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          description?: string
          price?: number
          original_price?: number | null
          instructor_id?: string | null
          category_id?: number | null
          level?: string
          duration?: string
          language?: string
          image_url?: string | null
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      course_details: {
        Row: {
          id: number
          course_id: number
          what_you_will_learn: string[]
          requirements: string[]
          instructor_bio: string | null
          last_updated: string
        }
        Insert: {
          id?: number
          course_id: number
          what_you_will_learn: string[]
          requirements: string[]
          instructor_bio?: string | null
          last_updated?: string
        }
        Update: {
          id?: number
          course_id?: number
          what_you_will_learn?: string[]
          requirements?: string[]
          instructor_bio?: string | null
          last_updated?: string
        }
      }
      course_sections: {
        Row: {
          id: number
          course_id: number
          title: string
          position: number
          created_at: string
        }
        Insert: {
          id?: number
          course_id: number
          title: string
          position: number
          created_at?: string
        }
        Update: {
          id?: number
          course_id?: number
          title?: string
          position?: number
          created_at?: string
        }
      }
      course_lessons: {
        Row: {
          id: number
          section_id: number
          title: string
          duration: string
          is_free: boolean
          video_url: string | null
          content: string | null
          position: number
          created_at: string
        }
        Insert: {
          id?: number
          section_id: number
          title: string
          duration: string
          is_free?: boolean
          video_url?: string | null
          content?: string | null
          position: number
          created_at?: string
        }
        Update: {
          id?: number
          section_id?: number
          title?: string
          duration?: string
          is_free?: boolean
          video_url?: string | null
          content?: string | null
          position?: number
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: number
          user_id: string
          course_id: number
          enrolled_at: string
          completed: boolean
          completed_at: string | null
        }
        Insert: {
          id?: number
          user_id: string
          course_id: number
          enrolled_at?: string
          completed?: boolean
          completed_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          course_id?: number
          enrolled_at?: string
          completed?: boolean
          completed_at?: string | null
        }
      }
      reviews: {
        Row: {
          id: number
          user_id: string
          course_id: number
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          course_id: number
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          course_id?: number
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string
          content: string
          author_id: string | null
          image_url: string | null
          category: string
          featured: boolean
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          excerpt: string
          content: string
          author_id?: string | null
          image_url?: string | null
          category: string
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          author_id?: string | null
          image_url?: string | null
          category?: string
          featured?: boolean
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_tags: {
        Row: {
          id: number
          name: string
          slug: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
        }
      }
      blog_post_tags: {
        Row: {
          post_id: number
          tag_id: number
        }
        Insert: {
          post_id: number
          tag_id: number
        }
        Update: {
          post_id?: number
          tag_id?: number
        }
      }
      payments: {
        Row: {
          id: number
          user_id: string
          course_id: number
          amount: number
          currency: string
          payment_method: string
          payment_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          user_id: string
          course_id: number
          amount: number
          currency?: string
          payment_method: string
          payment_id: string
          status: string
          created_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          course_id?: number
          amount?: number
          currency?: string
          payment_method?: string
          payment_id?: string
          status?: string
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: number
          name: string
          email: string
          subject: string
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          subject: string
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          subject?: string
          message?: string
          status?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

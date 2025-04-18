"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"

type AuthMode = "signin" | "signup"

const signinSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
})

export function AuthForm({ mode = "signin" }: { mode?: AuthMode }) {
  const [authMode, setAuthMode] = useState<AuthMode>(mode)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/dashboard"
  const { signIn, signUp } = useAuth()

  const formSchema = authMode === "signin" ? signinSchema : signupSchema

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(authMode === "signup" && { fullName: "" }),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      if (authMode === "signin") {
        const { error, success } = await signIn(values.email, values.password)

        if (error) throw error

        if (success) {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          })
          router.push(redirectTo)
        }
      } else {
        const { error, success } = await signUp(
          values.email,
          values.password,
          (values as z.infer<typeof signupSchema>).fullName,
        )

        if (error) throw error

        if (success) {
          toast({
            title: "Account created!",
            description: "Please check your email to confirm your account.",
          })
          // Optionally redirect to a confirmation page
          router.push("/signup/confirmation")
        }
      }
    } catch (error: any) {
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAuthMode = () => {
    form.reset()
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{authMode === "signin" ? "Sign In" : "Create an Account"}</CardTitle>
        <CardDescription>
          {authMode === "signin"
            ? "Enter your credentials to access your account"
            : "Fill in the information to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {authMode === "signup" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {authMode === "signin" && (
                      <Button variant="link" className="p-0 h-auto text-xs" asChild>
                        <Link href="/forgot-password">Forgot password?</Link>
                      </Button>
                    )}
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {authMode === "signin" ? "Signing in..." : "Creating account..."}
                </>
              ) : authMode === "signin" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          {authMode === "signin" ? "Don't have an account?" : "Already have an account?"}
          <Button variant="link" className="pl-1" onClick={toggleAuthMode}>
            {authMode === "signin" ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

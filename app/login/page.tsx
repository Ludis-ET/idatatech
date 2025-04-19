import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login | IdataTech",
  description: "Login to your IdataTech account",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-center text-3xl font-bold mb-8">Welcome Back</h1>
          <AuthForm mode="signin" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

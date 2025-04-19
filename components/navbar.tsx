"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "@/components/ui/use-toast";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { user, profile, isLoading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const userInitials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                I
              </div>
            </div>
            <span className="text-xl font-bold">IdataTech</span>
          </Link>

          <nav className="hidden md:flex md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isSearchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="relative hidden sm:flex items-center"
            >
              <Input
                type="search"
                placeholder="Search courses..."
                className="w-full max-w-[200px]"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex"
            >
              <Search className="h-4 w-4" />
            </Button>
          )}


          <ModeToggle />

          {!isLoading && (
            <div className="hidden sm:flex">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={profile?.avatar_url || "/placeholder.svg"}
                          alt={profile?.full_name || "User"}
                        />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" asChild className="mr-2">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-primary-foreground">
                      N
                    </div>
                  </div>
                  <span className="text-xl font-bold">IdataTech</span>
                </Link>

                <div className="relative flex items-center">
                  <Input
                    type="search"
                    placeholder="Search courses..."
                    className="w-full pr-8"
                  />
                  <Search className="absolute right-3 h-4 w-4 text-muted-foreground" />
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        pathname === link.href
                          ? "text-primary"
                          : "text-foreground/80"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/cart">
                      <ShoppingCart className="h-4 w-4" />
                      <span className="sr-only">Shopping Cart</span>
                    </Link>
                  </Button>
                </div>

                {!isLoading && (
                  <div className="flex flex-col gap-2">
                    {user ? (
                      <>
                        <div className="flex items-center gap-2 py-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={profile?.avatar_url || "/placeholder.svg"}
                              alt={profile?.full_name || "User"}
                            />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {profile?.full_name || user.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" asChild className="w-full">
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild className="w-full">
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

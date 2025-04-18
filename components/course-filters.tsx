"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function CourseFilters({
  categories,
  selectedCategory,
}: {
  categories: any[]
  selectedCategory: string | null
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    return params.toString()
  }

  const handleCategoryClick = (slug: string) => {
    const newCategory = selectedCategory === slug ? null : slug
    router.push(`${pathname}?${createQueryString("category", newCategory || "")}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 font-normal",
                selectedCategory === category.slug && "bg-muted font-medium",
              )}
              onClick={() => handleCategoryClick(category.slug)}
            >
              {selectedCategory === category.slug && <Check className="h-4 w-4" />}
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <Separator />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between font-normal">
            <span>Level</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          <Button variant="ghost" className="w-full justify-start font-normal">
            Beginner
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            Intermediate
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            Advanced
          </Button>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between font-normal">
            <span>Duration</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          <Button variant="ghost" className="w-full justify-start font-normal">
            0-5 hours
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            5-10 hours
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            10+ hours
          </Button>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between font-normal">
            <span>Language</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          <Button variant="ghost" className="w-full justify-start font-normal">
            English
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            Spanish
          </Button>
          <Button variant="ghost" className="w-full justify-start font-normal">
            French
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

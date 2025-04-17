import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProps {
  user: any
}

export function User({ user }: UserProps) {
  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
    : "U"

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={user?.avatar_url || "/placeholder.svg"} alt={user?.full_name || "User"} />
        <AvatarFallback className="text-lg">{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{user?.full_name || "Anonymous User"}</p>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  )
}

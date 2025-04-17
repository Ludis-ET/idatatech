import { User } from "@/components/dashboard/user"

interface DashboardHeaderProps {
  user: any
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <section className="bg-muted/30 py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user?.full_name || "Learner"}</p>
          </div>
          <User user={user} />
        </div>
      </div>
    </section>
  )
}

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Login to your ERP</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your QId and Password to login to your ERP
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="QId">QId</Label>
          <Input id="QId" type="number" placeholder="eg. 2403XXXX" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="https://qums.quantumuniversity.edu.in/Account/ForgotPassword"
              target="_blank"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
       
      </div>
      <div className="text-center text-sm text-gray-600">
        *This is a custom made ERP (frontend) and is not affiliated with Quantum University.
        <br />
        100% safe and secure. Open source on <a href="https://github.com/24kaushik/qums" className="text-blue-600 underline">Github</a>.
      </div>
    </form>
  )
}

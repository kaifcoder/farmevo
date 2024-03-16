import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export function Register() {
  return (
    <div className="grid w-full min-h-screen px-4 py-2 place-items-center">
      <div className="grid grid-rows-[auto 1fr] w-full max-w-sm gap-4">
        <div className="space-y-1">
          <div className="aspect-[2/1] rounded-lg overflow-hidden">
            <img
              alt="FarmEvo"
              height="200"
              src="/Farmevo.png"
              className="object-cover w-full"
              width="400"
            />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Welcome!</h1>
            <p className="text-sm font-medium leading-none text-gray-500">
              Let's get started with FarmEvo
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="space-y-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>

              <Input id="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>

              <Input id="phone" placeholder="Enter your phone" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </div>
          </div>
          <div className="">
            <Button className="w-full" type="submit">
              Register
            </Button>
            <a className="block w-full" href="/">
              <Button className="w-full" variant="link">
                Already have an account? Sign in
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

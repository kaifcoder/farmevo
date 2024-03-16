/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/mGlg57HwNzt
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/home/product");
  };

  return (
    <div className="grid w-full min-h-screen px-4 place-items-center">
      <div className="grid grid-rows-[auto 1fr] w-full max-w-sm gap-4">
        <div className="space-y-2">
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
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-sm font-medium leading-none text-gray-500">
              Enter your account information to access FarmEvo
            </p>
          </div>
        </div>
        <div className="space-y-4">
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
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </div>
          </div>
          <Button onClick={handleLogin} className="w-full" type="submit">
            Sign in
          </Button>
          <a className="block w-full" href="/register">
            <Button className="w-full" variant="outline">
              Create an account
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

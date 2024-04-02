import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import axios from "@/api/axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useAuth from "@/hooks/useAuth";

export function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home/product";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log({ email, password });
      const { data } = await axios.post(
        "/users/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      const user = data?.data?.user;
      const role = user?.role;
      const accessToken = data?.data?.accessToken;
      console.log("user in login", user);
      setUser({ user, role, accessToken });
      navigate(from, { replace: true });

      setLoading(false);
      toast.success(data?.message || "Login successful");
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status === 401) {
        return toast.error("Invalid email or password");
      }
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }
  };

  return (
    <div
      className="grid w-full min-h-screen px-4 place-items-center "
      style={{
        backgroundImage: "url(background.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="grid grid-rows-[auto 1fr] w-full max-w-sm gap-4 bg-white py-8 px-4 shadow-lg rounded-xl">
        <form onSubmit={handleLogin}>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  placeholder="Enter your password"
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button disabled={loading} className="w-full" type="submit">
              Sign in
            </Button>
            <a className="block w-full" href="/register">
              <Button className="w-full" variant="outline" type="button">
                Create an account
              </Button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

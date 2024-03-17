import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { toast } from "sonner";
import axios from "@/api/axios";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectChange = (value: any) => {
    setRole(value);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log({ name, email, password, phone, role });
      const { data } = await axios.post(
        "/users/register",
        {
          fullName: name,
          email: email,
          password: password,
          phoneNumber: phone,
          role: role,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);

      navigate("/");
      toast.success(data.message);

      setLoading(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "An error occurred");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="grid w-full min-h-screen px-4 py-2 place-items-center"
      style={{
        backgroundImage: "url(background.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="grid grid-rows-[auto 1fr] w-full max-w-sm bg-white px-4 py-4 rounded-xl shadow-lg gap-4">
        <form onSubmit={handleRegister}>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  placeholder="Enter your name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>

                <Input
                  id="phone"
                  placeholder="Enter your phone"
                  required
                  onChange={(e) => setPhone(e.target.value)}
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
              <div className="flex items-center justify-between space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  onChange={(e) => handleSelectChange(e.target.value)}
                  className="p-1  w-[250px] text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  name="role"
                  title="role"
                  required
                >
                  <option value="farmer">Farmer</option>
                  <option value="industry">Industry</option>
                </select>
              </div>
            </div>
            <div className="">
              <Button disabled={loading} className="w-full" type="submit">
                Register
              </Button>
              <a className="block w-full" href="/">
                <Button className="w-full" variant="link" type="button">
                  Already have an account? Sign in
                </Button>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

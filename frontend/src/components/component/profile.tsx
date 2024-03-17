import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { axiosWithAuth } from "@/api/axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState<any>({});

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const { data } = await axiosWithAuth.get("/users");
      setUser(data.data);
      console.log(data);
    } catch (error: any) {
      console.log(error);
      // navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className="w-full h-screen px-4 py-2 place-items-center"
      style={{
        backgroundImage: "url(/background.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Card className="w-full max-w-sm m-16 mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="relative">
            <img
              alt="User"
              className="rounded-full"
              height="96"
              src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
              style={{
                aspectRatio: "96/96",
                objectFit: "cover",
              }}
              width="96"
            />
          </div>
          <CardTitle className="text-center">{user.fullName}</CardTitle>
          <CardDescription className="text-center">
            {user.role === "farmer" ? "Farmer" : "Industry"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <h1 id="email">{user.email}</h1>
            <div />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <h1 id="phone">{user?.phoneNumber || "Not provided"}</h1>
            <div />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

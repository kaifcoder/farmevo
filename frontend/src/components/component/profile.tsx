import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function Profile() {
  return (
    <Card className="w-full max-w-sm m-16 mx-auto">
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
        <CardTitle className="text-center">Cory Tran</CardTitle>
        <CardDescription className="text-center">Industry User</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <h1 id="email">email@gmail.com</h1>
          <div />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <h1 id="phone">123-456-7890</h1>
          <div />
        </div>
      </CardContent>
    </Card>
  );
}

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

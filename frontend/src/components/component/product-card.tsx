import { CardContent, Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function ProductCard() {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate("123");
      }}
      className="w-full max-w-sm overflow-hidden border shadow-sm cursor-pointer rounded-xl"
    >
      <div className="">
        <img
          alt="Product"
          className="object-cover w-full"
          src="https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width="400"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">Classic Tote</h2>
        <p className="text-sm font-medium flex items-center gap-1.5">
          <span className="text-gray-500 dark:text-gray-400">$250.00</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The Classic Tote is the perfect everyday carry. Spacious, durable, and
          stylish.
        </p>
      </CardContent>
    </Card>
  );
}

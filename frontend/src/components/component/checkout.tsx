import {
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Checkout() {
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    // Place order logic
    navigate("/home/order");
  };
  return (
    <div className="grid items-start gap-6 pb-6 m-8">
      <div className="container grid items-start max-w-5xl gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium leading-none">
              Shipping Information
            </h3>
            <p className="text-sm leading-none text-neutral-500">
              Enter your shipping address
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Street St" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="City" required />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="State" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal-code">Postal code</Label>
                <Input id="postal-code" placeholder="Postal code" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button className="ml-auto" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

import {
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosWithAuth } from "@/api/axios";

export function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  if (!location.state) navigate("/home/product");
  const { product, qty } = location && location.state;
  console.log(product._id, qty);
  console.log("price", product.price * qty);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const deliveryAddress = `${address}, ${city}, ${state}, ${pin}`;
  const productId = location.state.product._id;
  const quantity = location.state.qty;

  const handlePlaceOrder = async (e: any) => {
    e.preventDefault();
    try {
      console.log("Placing order");
      console.log("Product", productId);
      console.log("Quantity", quantity);
      console.log("Delivery Address", deliveryAddress);
      const { data } = await axiosWithAuth.post("/orders", {
        product: productId,
        quantity: quantity,
        price: product.price * quantity,
        deliveryAddress: deliveryAddress,
      });

      console.log(data);
      navigate("/home/order");
    } catch (error: any) {
      console.log(error);
    }
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
          <form onSubmit={handlePlaceOrder}>
            <CardContent className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Street St"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    required
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal code</Label>
                  <Input
                    id="postal-code"
                    placeholder="Postal code"
                    required
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex">
              <Button className="ml-auto" type="submit">
                Place Order
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

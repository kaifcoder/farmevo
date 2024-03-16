import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";

export function AddProduct() {
  return (
    <Card className="w-full max-w-xl m-8 mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Add Product</CardTitle>
        <CardDescription>Fill out the information below.</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <div className="grid w-full gap-6">
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm" htmlFor="image">
              Image
            </Label>
            <div className="flex items-center justify-center w-full h-24 border border-gray-300 border-dashed rounded-lg">
              <div className="flex items-center gap-2 text-gray-500">
                <UploadIcon className="w-6 h-6" />
                <span>Drag and drop your image here</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm" htmlFor="name">
              Name
            </Label>
            <Input id="name" placeholder="Enter the product name." />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter the product description."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm" htmlFor="price">
              Price
            </Label>
            <Input
              id="price"
              placeholder="Enter the product price."
              type="number"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm" htmlFor="quantity">
              Stock Quantity
            </Label>
            <Input
              id="quantity"
              placeholder="Enter the stock quantity."
              type="number"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm" htmlFor="category">
              Category
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button className="flex-1" variant="outline">
          Cancel
        </Button>
        <Button className="flex-1">Save</Button>
      </CardFooter>
    </Card>
  );
}

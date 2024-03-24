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

import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "@/api/axios";

export function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "farmer") {
      navigate("/home/product");
    }
  }, [user]);

  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null) as any;
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]) as any;
  const [category, setCategory] = useState(
    categories.length > 0 ? categories[0]._id : ""
  );
  const [type, setType] = useState("product");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    // fetch categories
    try {
      const { data } = await axiosWithAuth.get("/categories/all");

      setCategories(data && data?.message.reverse());
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch categories
    fetchCategories();
  }, []);

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    try {
      console.log({
        name,
        thumbnail,
        price,
        description,
        stock,
        category,
        type,
      });
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("type", type);

      setLoading(true);
      const { data } = await axiosWithAuth.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log(data);
      navigate("/home/product");
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-xl m-8 mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Add Product</CardTitle>
        <CardDescription>Fill out the information below.</CardDescription>
      </CardHeader>
      <form onSubmit={handleAddProduct}>
        <CardContent className="flex">
          <div className="grid w-full gap-6">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="image">
                Image
              </Label>
              <>
                <Input
                  type="file"
                  className=""
                  accept="image/*"
                  id="image"
                  onChange={(e: any) => setThumbnail(e.target.files[0])}
                />
              </>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="name">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter the product name."
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter the product description."
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="category">
                Type
              </Label>
              <select
                id="type"
                onChange={(e) => setType(e.target.value)}
                name="type"
                title="select a type"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="product">Product</option>
                <option value="byproduct">By Product</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm" htmlFor="category">
                Category
              </Label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                title="select a categoy"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {categories.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            onClick={() => navigate("/home/product")}
            className="flex-1"
            variant="outline"
          >
            Cancel
          </Button>
          <Button className="flex-1" type="submit">
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

import { CardContent, Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useAuth from "@/hooks/useAuth";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { axiosWithAuth } from "@/api/axios";

export function ProductCard({
  product,
  setProduct,
}: {
  product: any;
  setProduct: any;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;
  const userId = user?.user?._id;

  const handleDelete = async () => {
    try {
      console.log("DELETING", product._id);
      const { data } = await axiosWithAuth.delete(`/products/${product._id}`);
      console.log(data);
      setProduct((prev: any) => prev.filter((p: any) => p._id !== product._id));
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Card
      className="w-full max-h-[450px] max-w-sm overflow-hidden transition-all border shadow-sm cursor-pointer hover:shadow-xl *:
      hover:scale-105
      rounded-xl"
    >
      <div>
        <img
          alt="Product"
          className="object-cover w-full h-60"
          src={
            product.thumbnail ||
            "https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width="400"
          onClick={() => {
            navigate(product._id);
          }}
        />

        <CardContent
          onClick={() => {
            navigate(product._id);
          }}
          className="p-4"
        >
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm font-medium flex items-center gap-1.5">
            <span className="text-lg text-gray-900 dark:text-gray-400">
              ₹ {product.price}
            </span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          <p>
            {product.stock > 0 ? (
              <p className="text-sm text-green-500">
                In stock {product.quantity}
              </p>
            ) : (
              <p className="text-sm text-red-500">Out of stock</p>
            )}
          </p>
          <div className="flex items-center justify-end space-x-4">
            <p className="text-sm font-semibold">Owner</p>
            <h2 className="font-bold text-md">{product.createdBy.fullName}</h2>
          </div>
        </CardContent>
        {role === "farmer" && product.createdBy?._id === userId && (
          <div className="flex items-center mb-4 ml-3 space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"destructive"}>Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Product</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Are you sure you want to delete this product?
                </DialogDescription>
                <DialogFooter>
                  <DialogClose>
                    <Button onClick={handleDelete} variant={"destructive"}>
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </Card>
  );
}

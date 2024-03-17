import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "@/api/axios";

export function CategoriesCrud() {
  const { user } = useAuth();

  const [categories, setCategories] = useState([]) as any;
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "farmer") {
      navigate("/home/product");
    }
  }, [user]);

  const fetchCategories = async () => {
    // fetch categories
    try {
      const { data } = await axiosWithAuth.get("/categories");

      setCategories(data && data?.message.reverse());
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch categories
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axiosWithAuth.post("/categories", {
        name,
      });

      setCategories(data && data?.message);
      setName("");
      // add category

      // close dialog
    } catch (error: any) {
      if (error.response?.status === 401) {
        return navigate("/login");
      }
      if (error.response?.status === 403) {
        return navigate("/home/product");
      }

      console.log(error);
    }
  };

  return (
    <div>
      <div className="px-4 my-2">
        <Card>
          <CardHeader className="">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-medium">Existing Categories</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="">
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogDescription>Add Category</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddCategory}>
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input
                          id="name"
                          className="col-span-3"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <div>Category</div>
                <div />
              </TableHead>
              <TableBody>
                {categories.map((c: any, i: any) => (
                  <TableRow key={i}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>Edit Category</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid items-center grid-cols-4 gap-4">
                              <Label htmlFor="name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="name"
                                defaultValue={c.name}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Delete</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delete Category</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this category?
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose>
                              <Button variant="outline">Cancel</Button>
                              <Button variant="destructive">Confirm</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

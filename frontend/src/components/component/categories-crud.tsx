import {
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
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

export function CategoriesCrud() {
  return (
    <div>
      <div className="px-4">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Existing Categories</h2>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <div>Category</div>
                <div />
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Electronics</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Books</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Home Decor</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Apparel</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Beauty</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Delete</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <div>
          <div>
            <h2 className="text-lg font-medium">Edit Category</h2>
            <p className="text-sm text-gray-500">
              Enter the new category name below.
            </p>
          </div>
          <div>
            <div className="grid gap-4">
              <Label className="sr-only" htmlFor="edit-category">
                Category
              </Label>
              <Input id="edit-category" placeholder="Category" />
            </div>
          </div>
          <div>
            <Button>Update</Button>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <h2 className="text-lg font-medium">Delete Category</h2>
          </div>
          <div>
            <p className="text-sm">
              Are you sure you want to delete this category? This action cannot
              be undone.
            </p>
          </div>
          <div>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Confirm</Button>
          </div>
        </div>
      </div>
      <div className="max-w-sm mx-auto">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">Create New Category</h2>
            <p className="text-sm text-gray-500">
              Enter the new category name below.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Label className="sr-only" htmlFor="new-category">
                Category
              </Label>
              <Input id="new-category" placeholder="Category" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

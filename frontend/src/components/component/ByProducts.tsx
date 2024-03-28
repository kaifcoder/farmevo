import { ProductCard } from "./product-card";
import { axiosWithAuth } from "@/api/axios";
import { useContext, useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useAuth from "@/hooks/useAuth";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { SearchContext } from "@/provider/searchProvider";

export default function ByProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { searchTerm } = useContext(SearchContext);

  useEffect(() => {
    if (searchTerm) {
      setProducts(
        products.filter((product: any) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    if (!searchTerm) fetchProducts();
  }, [searchTerm]);

  const { user } = useAuth();

  const filters = ["all", "price low to high", "price high to low"];

  const role = user?.role;

  const product_endpoint = role === "farmer" ? "/products/" : "/products/all";
  const fetchProducts = async () => {
    try {
      const { data } = await axiosWithAuth.get(product_endpoint);
      setProducts(data && data?.message);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  const sortProducts = (filter: string) => {
    console.log("sortProductCalled", filter);
    if (filter === "price low to high") {
      setProducts((prev) =>
        [...prev].sort((a: any, b: any) => a.price - b.price)
      );
    } else if (filter === "price high to low") {
      setProducts((prev) =>
        [...prev].sort((a: any, b: any) => b.price - a.price)
      );
    } else {
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(filter);
    sortProducts(filter);
  }, [filter]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center h-96">
          <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex items-center justify-end mt-4 mr-4">
        <p>
          <strong>Sort by:</strong>
        </p>
        <div className="ml-3 min-w-8">
          <select
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            title="filter"
            className="w-full p-2 border rounded-md"
          >
            {filters.map((f, idx) => (
              <option key={idx} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product: any, idx) => {
          if (product.type == "byproduct") {
            return (
              <ProductCard
                key={idx}
                product={product}
                setProduct={setProducts}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

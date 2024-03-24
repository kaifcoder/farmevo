import { ProductCard } from "./product-card";
import { axiosWithAuth } from "@/api/axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useAuth from "@/hooks/useAuth";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all" as string);

  const { user } = useAuth();

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center h-96">
          <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((product, idx) => {
          if (product.type !== "byproduct") {
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

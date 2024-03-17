import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { axiosWithAuth } from "@/api/axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useAuth from "@/hooks/useAuth";

const ProductInformation = () => {
  const navigate = useNavigate();
  const handleOrderNow = () => {
    navigate("/home/checkout");
  };

  const { productId } = useParams();

  const [productInfo, setProductInfo] = useState({}) as any;
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const role = user?.role;

  const fetchProductInfo = async (productId: any) => {
    try {
      const { data } = await axiosWithAuth.get("/products/" + productId);
      setProductInfo(data && data?.message);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetching product info", productId);
    fetchProductInfo(productId);
  }, []);

  return (
    <div className="grid items-start grid-cols-1 gap-4 p-8 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <img
          alt="Honeycrisp Apples"
          className="rounded-xl"
          height="400"
          src={
            productInfo?.thumbnail ||
            "https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          style={{
            aspectRatio: "400/400",
            objectFit: "cover",
          }}
          width="400"
        />
      </div>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg ">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {productInfo.name}
          </h1>
          <p className="text-sm leading-none text-gray-500">
            {productInfo?.createdBy?.fullName}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold text-gray-900">
            ₹ {productInfo.price}
          </p>
          <p className="text-sm leading-none text-gray-500">Per kg</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-none text-green-500">
            In stock {productInfo?.stock}
          </p>
        </div>

        {role === "industry" && (
          <>
            {/* qty */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="w-1/2 p-2 text-sm border border-gray-300 rounded-lg"
                id="quantity"
                type="number"
                value="1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                onClick={handleOrderNow}
                className="items-center gap-2 px-6 text-white bg-green-500 rounded-lg"
              >
                <div className="w-4 h-4" />
                Order Now
              </Button>
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Description</h2>
          <p className="text-sm leading-snug text-gray-500">
            {productInfo?.description ||
              "This is a product description. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;

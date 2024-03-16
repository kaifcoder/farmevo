import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ProductInformation = () => {
  const navigate = useNavigate();
  const handleOrderNow = () => {
    navigate("/home/checkout");
  };
  return (
    <div className="grid items-start grid-cols-1 gap-4 p-8 md:grid-cols-2">
      <div className="flex items-center justify-center">
        <img
          alt="Honeycrisp Apples"
          className="rounded-xl"
          height="400"
          src="https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            {"Product Name"}
          </h1>
          <p className="text-sm leading-none text-gray-500">Farmer's Name</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold text-gray-900">₹ 4.99</p>
          <p className="text-sm leading-none text-gray-500">Per kg</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm leading-none text-green-500">
            In stock {"QTY"}
          </p>
        </div>
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
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900">Description</h2>
          <p className="text-sm leading-snug text-gray-500">
            {
              "Honeycrisp is a variety of apple that is sweet and juicy. It is perfect for snacking and makes a great addition to salads."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;

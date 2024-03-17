import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "@/api/axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import useAuth from "@/hooks/useAuth";
export function OrderTable() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]) as any[];
  const { user } = useAuth();

  const role = user?.role;

  const fetchOrders = async () => {
    try {
      const { data } = await axiosWithAuth.get(
        "/orders" + (role === "farmer" ? `/get/farmer` : "")
      );
      setOrders(data && data?.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full mx-auto mt-8 max-w-7xl">
      <header className="pb-4 space-y-1">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm font-medium leading-none text-neutral-500 dark:text-neutral-400">
            Here are all your orders.
          </p>
        </div>
      </header>
      <div className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="p-6">
          <div className="overflow-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800">
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Product
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Farmer
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Total Price
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {orders.map((o: any, i: any) => (
                  <tr
                    className="hover:bg-neutral-100 dark:hover:bg-neutral-900 "
                    key={i}
                  >
                    <td className="p-4 text-sm">{o.product?.name}</td>
                    <td className="p-4 text-sm">{o.quantity}</td>
                    <td className="p-4 text-sm">
                      {o.product?.createdBy?.fullName}
                    </td>
                    <td className="p-4 text-sm">₹ {o.price}</td>
                    <td className="p-4">
                      <Button
                        variant={"link"}
                        onClick={() =>
                          navigate(o._id, { replace: true, state: o })
                        }
                        className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

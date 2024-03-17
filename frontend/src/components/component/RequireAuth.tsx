import { useLocation, Navigate, Outlet } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import useAuth from "@/hooks/useAuth";

const RequireAuth = () => {
  const { user } = useAuth();
  console.log(user);
  const location = useLocation();

  return user?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;

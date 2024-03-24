import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line
// @ts-ignore
import useRefreshToken from "../../hooks/useRefreshToken.js";
// eslint-disable-next-line
// @ts-ignore
import useAuth from "../../hooks/useAuth.js";

const Persistlogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useAuth();

  useEffect(() => {
    const verifyReferesh = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    !user?.accessToken ? verifyReferesh() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log("loading", loading);
    console.log("aT", user?.accessToken);
  }, [loading]);

  return <>{loading ? <h1>Loading...</h1> : <Outlet />}</>;
};

export default Persistlogin;

import { axiosWithAuth } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { user } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosWithAuth.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosWithAuth.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosWithAuth(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosWithAuth.interceptors.request.eject(requestIntercept);
            axiosWithAuth.interceptors.response.eject(responseIntercept);
        }
    }, [user, refresh])

    return axiosWithAuth;
}

export default useAxiosPrivate;
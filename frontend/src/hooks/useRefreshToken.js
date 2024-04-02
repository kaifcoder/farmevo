import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { user, setUser } = useAuth()

    const refresh = async () => {
        try {
            const response = await axios.get('/users/refresh', {
                withCredentials: true,

            })
            console.log("response in use refresh token", response)
            console.log("user state in use refresh token", user)
            const { data } = await axios.get('/users', {
                withCredentials: true
            })
            console.log("user info with accesstoken", data?.data)
            setUser(prev => {

                return {
                    ...prev,
                    user: data?.data,
                    role: data?.data?.role,
                    accessToken: response?.data?.data?.accessToken
                }
            })
            return response?.data?.data?.accessToken

        } catch (error) {
            console.log("error in use refresh token hook", error)
        }
    }
    return refresh;
}

export default useRefreshToken
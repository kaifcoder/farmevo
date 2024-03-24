import axiosWithAuth from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { user, setUser } = useAuth()

    const refresh = async () => {
        try {
            const response = await axiosWithAuth.get('/users/refresh')
            setUser(prev => {
                console.log(response.data.toString())
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return {
                    ...prev,
                    accessToken: response?.data?.accessToken
                }
            })
            return response?.data?.accessToken

        } catch (error) {
            console.log(error)
        }
    }
    return refresh;
}

export default useRefreshToken
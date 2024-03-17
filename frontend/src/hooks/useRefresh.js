import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { setUser } = useAuth()
    const refresh = async () => {
        try {
            const response = await axios.post('/users/refresh',
                {
                    withCredentials: true
                }
            )
            setUser(prev => {
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
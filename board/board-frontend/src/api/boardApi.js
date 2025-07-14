import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

export const registerMember = async (memberData) => {
   try {
      console.log('memberData: ', memberData)
      const response = await boardApi.post('/auth/join', memberData)

      console.log('response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

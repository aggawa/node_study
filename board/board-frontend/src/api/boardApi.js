import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

// 회원가입
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

// 로그인
export const loginMember = async (credential) => {
   try {
      console.log('credential: ', credential)
      const response = await boardApi.post('/auth/login', credential)

      console.log('response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 로그아웃
export const logoutMember = async () => {
   try {
      const response = await boardApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 마이페이지
// 여기에요 여기
export const getMyPage = async (id, memberData) => {
   try {
      console.log(response)
      const response = await boardApi.get(`/my/:id`, memberData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
// 전체 포스트 페이징
// export const getBoards = async (page) => {
//    try {
//       const response = await boardApi.get(`/board?page=${page}`)
//       console.log('페이징 response: ', response)
//       return response
//    } catch (error) {
//       console.error(`API Request 오류: ${error}`)
//       throw error
//    }
// }

// 로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 등록
export const createPost = async (boardData) => {
   try {
      console.log('boardData: ', boardData)

      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }

      const response = await boardApi.post('/board', boardData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 전체 포스트 페이징
export const getBoards = async (page) => {
   try {
      const response = await boardApi.get(`/board?page=${page}`)
      console.log('페이징 response: ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 특정 포스트
export const getBoardById = async (id) => {
   try {
      const response = await boardApi.get(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 포스트 수정
export const updateBoard = async (id, boardData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }

      const response = await boardApi.put(`/board/${id}`, boardData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

// 포스트 삭제
export const deleteBoard = async (id) => {
   try {
      const response = await boardApi.delete(`/board/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}

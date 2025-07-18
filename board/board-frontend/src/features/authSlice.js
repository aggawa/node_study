import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerMember, loginMember, logoutMember, checkAuthStatus } from '../api/boardApi'

// 회원가입
export const registerMemberThunk = createAsyncThunk('auth/registerMember', async (memberData, { rejectWithValue }) => {
   try {
      console.log('memberData: ', memberData)
      const response = await registerMember(memberData)
      return response.data.member
   } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그인
export const loginMemberThunk = createAsyncThunk('auth/loginMember', async (credentials, { rejectWithValue }) => {
   try {
      const response = await loginMember(credentials)
      return response.data.member
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그아웃
export const logoutMemberThunk = createAsyncThunk('auth/logoutMember', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutMember()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

// 로그인 상태확인
export const checkAuthStatusThunk = createAsyncThunk('auth/checkAuthStatus', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthStatus()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      member: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {
      clearAuthError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         // 회원가입
         .addCase(registerMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.member = action.payload
         })
         .addCase(registerMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그인
         .addCase(loginMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
            state.member = action.payload
         })
         .addCase(loginMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그아웃
         .addCase(logoutMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutMemberThunk.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
            state.member = null
         })
         .addCase(logoutMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 로그인 상태확인
         .addCase(checkAuthStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkAuthStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.member = action.payload.member || null
         })
         .addCase(checkAuthStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.isAuthenticated = false
            state.member = null
         })
   },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer

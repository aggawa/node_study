import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerMember } from '../api/boardApi'

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
            state.user = action.payload
         })
         .addCase(registerMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer

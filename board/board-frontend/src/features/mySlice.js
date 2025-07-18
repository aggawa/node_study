import { MyPageThunk } from '@reduxjs/toolkit'
import { getMyPage } from '../api/boardApi'

export const MyPageThunk = createAsyncThunk(`/my/:id`, async (id, memberData, { rejectWithvalue }) => {
   try {
      const response = await getMyPage(memberData, id)
      console.log('memberData: ', memberData)
      console.log('respoans: ', response)
      return response.data
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

const mySlice = createSlice({
   name: 'myPage',
   initialState: {
      myData: [],
      myData: null,
      pagination: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(MyPageThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(MyPageThunk.fulfilled, (state, action) => {
            state.loading = false
            state.member = action.payload
         })
         .addCase(MyPageThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default mySlice.reducers

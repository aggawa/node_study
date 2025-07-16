import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost } from '../api/boardApi'

// 게시물 등록
export const createPostThunk = createAsyncThunk('post/createPost', async (boardData, { rejectWithvalue }) => {
   try {
      console.log('boardData: ', boardData)
      const response = await createPost(boardData)

      console.log('response: ', response)
      return response.data.board
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

const postSlice = createSlice({
   name: 'boards',
   initialState: {
      board: null,
      // boards: [], 리스트만들거
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 등록
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer

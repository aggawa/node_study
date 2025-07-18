import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, deleteBoard, getBoards, updateBoard, getBoardById } from '../api/boardApi'

// 게시물 등록
export const createPostThunk = createAsyncThunk('board/createPost', async (boardData, { rejectWithvalue }) => {
   try {
      console.log('boardData: ', boardData)
      const response = await createPost(boardData)

      console.log('response: ', response)
      return response.data.board
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// 수정
export const updateBoardThunk = createAsyncThunk('board/updateBoard', async (data, { rejectWithvalue }) => {
   try {
      const { id, boardData } = data
      console.log('data: ', data)
      const response = await updateBoard(id, boardData)
      console.log('response: ', response)
      return response.data.board
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// 삭제
export const deleteBoardThunk = createAsyncThunk('board/deleteBoard', async (id, { rejectWithvalue }) => {
   try {
      console.log('포스트 id: ', id)
      const response = await deleteBoard(id)
      console.log('resonse: ', response)
      return response.data
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// 전체 불러오기 페이징
export const fetchBoardsThunk = createAsyncThunk('board/fetchBoards', async (page, { rejectWithvalue }) => {
   try {
      console.log('page: ', page)
      const response = await getBoards(page)

      console.log('response: ', response)
      return response.data
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// 특정 게시물
export const fetchBoardByIdThunk = createAsyncThunk('board/fetchPostById', async (id, { rejectWithvalue }) => {
   try {
      console.log('id: ', id)
      const response = await getBoardById(id)

      console.log(response)
      return response.data
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

const postSlice = createSlice({
   name: 'boards',
   initialState: {
      board: null,
      boards: [],
      pagination: null,
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
         // 리스트
         .addCase(fetchBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.boards = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 특정 게시물 불러오기
         .addCase(fetchBoardByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload.board
         })
         .addCase(fetchBoardByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 수정
         .addCase(updateBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.board = action.payload
         })
         .addCase(updateBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 삭제
         .addCase(deleteBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBoardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer

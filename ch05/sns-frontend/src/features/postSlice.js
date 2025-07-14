import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost } from '../api/snsApi'

// 게시물 등록
export const createPostThunk = createAsyncThunk('post/createPost', async (postData, { rejectWithvalue }) => {
   try {
      console.log('postData: ', postData)
      const response = await createPost(postData)

      console.log('response: ', response)
      return response.data.post // 데이터
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// // 게시물 수정
// export const updatePostThunk = createAsyncThunk('post/updatePost', async (Data, { rejectWithvalue }) => {
//    try {
//    } catch (error) {
//       return rejectWithvalue(error.response?.data?.message)
//    }
// })

// // 게시물 삭제
// export const deletePostThunk = createAsyncThunk('post/deletePost', async (id, { rejectWithvalue }) => {
//    try {
//    } catch (error) {
//       return rejectWithvalue(error.response?.data?.message)
//    }
// })

// // 특정 게시물 가져오기
// export const fetchPostByIdThunk = createAsyncThunk('post/fetchPostById', async (id, { rejectWithvalue }) => {
//    try {
//    } catch (error) {
//       return rejectWithvalue(error.response?.data?.message)
//    }
// })

// // 전체 게시물 리스트 가져오기
// export const fetchPostsThunk = createAsyncThunk('post/fetchPosts', async (page, { rejectWithvalue }) => {
//    try {
//    } catch (error) {
//       return rejectWithvalue(error.response?.data?.message)
//    }
// })

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      post: null, // 게시글 데이터
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         // 게시물 등록
         .addCase(createPostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createPostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.pasyload // 등록한 게시물 데이터를 받아옴
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer

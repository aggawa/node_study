import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../api/snsApi'

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

// 게시물 수정
export const updatePostThunk = createAsyncThunk('post/updatePost', async (data, { rejectWithvalue }) => {
   try {
      const { id, postData } = data
      console.log('data: ', data)
      const response = await updatePost(id, postData)

      console.log('reponse: ', response)
      return response.data.post
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// 게시물 삭제
export const deletePostThunk = createAsyncThunk('post/deletePost', async (id, { rejectWithvalue }) => {
   try {
      console.log('포스트 id: ', id)
      const response = await deletePost(id)

      console.log('response: ', response)
      return response.data
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// 특정 게시물 가져오기
export const fetchPostByIdThunk = createAsyncThunk('post/fetchPostById', async (id, { rejectWithvalue }) => {
   try {
      console.log('id: ', id)
      const response = await getPostById(id)

      console.log(response)
      return response.data
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

// 전체 게시물 리스트 가져오기
export const fetchPostsThunk = createAsyncThunk('post/fetchPosts', async (page, { rejectWithvalue }) => {
   try {
      console.log('page: ', page)
      const response = await getPosts(page)

      console.log(response)
      return response.data
   } catch (error) {
      return rejectWithvalue(error.response?.data?.message)
   }
})

const postSlice = createSlice({
   name: 'posts',
   initialState: {
      post: null, // 게시글 데이터
      posts: [], // 게시글 리스트 데이터
      pagination: null, // 페이징 객체 데이터
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
            state.post = action.payload // 등록한 게시물 데이터를 받아옴
         })
         .addCase(createPostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 게시물 리스트 불러오기
         .addCase(fetchPostsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.pagination = action.payload.pagination
         })
         .addCase(fetchPostsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 특정 게시물 불러오기
         .addCase(fetchPostByIdThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchPostByIdThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
         })
         .addCase(fetchPostByIdThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 게시물 수정하기
         .addCase(updatePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updatePostThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload // 수정한 게시물 데이터
         })
         .addCase(updatePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
         // 게시물 삭제
         .addCase(deletePostThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deletePostThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deletePostThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

// action.payload.posts -> post.js에 json객체.posts 데이터

export default postSlice.reducer

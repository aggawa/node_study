import { Container } from '@mui/material'
import PostEditForm from '../components/post/PostEditForm'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardByIdThunk, updateBoardThunk } from '../features/postSlice'

function PostEditPage() {
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { id } = useParams()
   const { board, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardByIdThunk(id))
   }, [dispatch, id])

   const onPostEdit = (boardData) => {
      dispatch(updateBoardThunk({ id, boardData }))
         .unwrap()
         .then(() => {
            navigate('/')
         })
         .catch((error) => {
            console.error('게시물 수정 중 오류 발생: ', error)
            alert('게시물 수정에 실패했습니다.' + error)
         })
   }
   if (loading) return <p>로딩 중...</p>

   return (
      <Container maxWidth="md">
         <h1>게시물 수정</h1>
         {board && <PostEditForm onPostEdit={onPostEdit} initialValues={board} />}
      </Container>
   )
}

export default PostEditPage

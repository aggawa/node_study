import { Container, Typography, Pagination, Stack } from '@mui/material'
import PostItem from '../components/post/PostItem'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardsThunk } from '../features/postSlice'

function Home({ isAuthenticated, member }) {
   const [page, setPage] = useState(1)
   const dispatch = useDispatch()
   const { boards, pagination, loading, error } = useSelector((state) => state.boards)

   useEffect(() => {
      dispatch(fetchBoardsThunk(page))
   }, [dispatch, page])

   const handlePageChange = (event, value) => {
      setPage(value)
   }

   return (
      <Container maxWidth="xs">
         <Typography variant="h4" align="center" gutterBottom>
            게시판
         </Typography>

         {loading && (
            <Typography variant="body1" align="center">
               로딩 중...
            </Typography>
         )}

         {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생: {error}
            </Typography>
         )}

         {boards.length > 0 ? (
            <>
               {boards.map((board) => (
                  <PostItem key={board.id} board={board} isAuthenticated={isAuthenticated} member={member} />
               ))}
               <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                  <Pagination
                     count={pagination.totalPages} // 총 페이지 수
                     page={page} // 현재 페이지
                     onChange={handlePageChange} // 페이지를 변경할 함수
                  />
               </Stack>
            </>
         ) : (
            // posts 데이터가 0개 이면서 로딩중이 아닐때
            !loading && (
               <Typography variant="body1" align="center">
                  게시물이 없습니다.
               </Typography>
            )
         )}
      </Container>
   )
}

export default Home

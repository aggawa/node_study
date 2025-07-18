import { Card, CardMedia, CardContent, Typography, Box, CardActions, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteBoardThunk } from '../../features/postSlice'

function PostItem({ board, isAuthenticated, member }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   // ↓ 삭제
   const onClickDelete = (id) => {
      const result = confirm('정말로 삭제하시겠습니까?')

      if (result) {
         dispatch(deleteBoardThunk(id))
            .unwrap()
            .then(() => {
               navigate('/')
            })
            .catch((error) => {
               console.error('게시물 삭제 중 오류 발생: ', error)
               alert('게시물 삭제에 실패했습니다.' + error)
            })
      }
   }

   return (
      <Card style={{ margin: '20px 0' }}>
         <CardMedia sx={{ height: 300 }} image={`${import.meta.env.VITE_APP_API_URL}${board.img}`} title={board.content} style={{ backgroundSize: '250px 250px' }} />
         <CardContent style={{ display: 'inline-block' }}>
            <Link to={`/my/${board.Member.id}`} style={{ textDecoration: 'none' }}>
               <Typography sx={{ color: 'primary.main' }}>{board.Member.name} 님</Typography>
            </Link>
            <Typography>{dayjs(board.createdAt).format('YYYY-MM-DD / HH:mm')}</Typography>
            <Typography>{board.title}</Typography>
         </CardContent>
         <CardActions style={{ display: 'inline-block', float: 'right' }}>
            {isAuthenticated && board.Member.id === member.id && (
               <Box sx={{ p: 2 }}>
                  <Link to={`/board/edit/${board.id}`}>
                     <IconButton aria-label="edit" size="small">
                        <EditIcon fontSize="small" />
                     </IconButton>
                  </Link>
                  <IconButton aria-label="delete" size="small" onClick={() => onClickDelete(board.id)}>
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </Box>
            )}
         </CardActions>
      </Card>
   )
}

export default PostItem

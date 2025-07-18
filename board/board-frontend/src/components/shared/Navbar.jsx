import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CreateIcon from '@mui/icons-material/Create'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutMemberThunk } from '../../features/authSlice'

function Navbar({ isAuthenticated, member }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   // 로그아웃 버튼을 눌렀을 때 로그아웃
   const handleLogout = () => {
      dispatch(logoutMemberThunk())
         .unwrap()
         .then(() => {
            navigate('/') // 로그아웃 완료 후 메인 페이지로 이동
         })
         .catch((error) => {
            alert('로그아웃 실패:', error)
         })
   }

   return (
      <AppBar position="static" style={{ backgroundColor: '#fff', marginBottom: 50 }}>
         <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
               <Link to="/">
                  <img src="/images/ezen.jpg" alt="로고" width="55" style={{ display: 'inline-block', marginTop: '15px' }} />
               </Link>
            </Typography>
            {isAuthenticated ? (
               // 로그아웃 버튼 보여주기
               <>
                  <Link to="/board/create">
                     <IconButton aria-label="글쓰기">
                        <CreateIcon />
                     </IconButton>
                  </Link>
                  <Link to={`/my/${member.id}`} style={{ textDecoration: 'none' }}>
                     <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
                        {member.name}님
                     </Typography>
                  </Link>
                  <Button onClick={handleLogout} variant="outlined">
                     로그아웃
                  </Button>
               </>
            ) : (
               <Link to="/login">
                  <Button variant="contained">로그인</Button>
               </Link>
            )}
         </Toolbar>
      </AppBar>
   )
}

export default Navbar

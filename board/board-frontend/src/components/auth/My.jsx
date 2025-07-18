import { Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MyPageThunk } from '../../features/mySlice'

function My(memberData) {
   // dispatch 해주고
   const dispatch = useDispatch()
   const { id } = useParams()
   // const { myPage, loading, error } = useSelector((state) => state.myPage)

   useEffect(() => {
      dispatch(MyPageThunk(id))
   }, [dispatch, id])

   console.log(memberData)
   return (
      <Container>
         <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
            회원 이름: {memberData.name}
         </Typography>

         <Typography variant="body1" style={{ marginRight: '20px', color: 'black' }}>
            회원 이메일: {memberData.email}
         </Typography>
      </Container>
   )
}

export default My

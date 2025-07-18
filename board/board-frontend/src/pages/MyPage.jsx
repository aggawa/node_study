import { Container, Typography } from '@mui/material'
import My from '../components/auth/My'

function LoginPage() {
   return (
      <Container maxWidth="md">
         <Typography variant="h4" align="center" gutterBottom>
            회원정보
         </Typography>
         <My />
      </Container>
   )
}

export default LoginPage

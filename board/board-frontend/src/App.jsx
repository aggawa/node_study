import './styles/common.css'
import Navbar from './components/shared/Navbar'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'

import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, member } = useSelector((state) => state.auth)

   const location = useLocation()
   console.log('lacation.key: ', location.key)

   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])
   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} member={member} />
         <Routes>
            <Route path="/" element={<Home isAuthenticated={isAuthenticated} member={member} key={location.key} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/board/create" element={<PostCreatePage />} />
            <Route path="/board/edit/:id" element={<PostEditPage />} />
         </Routes>
      </>
   )
}

export default App

import { TextField, Button, Box } from '@mui/material'
import { useState } from 'react'

function PostCreateForm({ onPostCreate }) {
   const [imgUrl, setImgUrl] = useState('')
   const [imgFile, setImgFile] = useState(null)
   const [title, setTitle] = useState('')
   const [content, setContent] = useState('')

   const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      setImgFile(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
         setImgUrl(event.target.result)
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()

      if (!title.trim()) {
         alert('제목을 입력하세요.')
         return
      }
      if (!content.trim()) {
         alert('내용을 입력하세요.')
         return
      }
      if (!imgFile) {
         alert('이미지 파일을 추가하세요.')
         return
      }

      const formData = new FormData()
      formData.append('content', content)
      formData.append('title', title)

      const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
      formData.append('img', encodedFile)

      onPostCreate(formData)
   }

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         <TextField label="제목 입력" variant="outlined" fullWidth multiline rows={1} value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 2 }} placeholder="제목을 입력하세요" />

         <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} placeholder="내용을 입력하세요" />

         <Button variant="contained" component="label" color="primary" sx={{ mt: 2 }} style={{ paddingRight: '20px' }}>
            {/* 이 버튼 style 이거 손 좀 봐요 */}
            이미지 업로드
            <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
         </Button>

         {imgUrl && (
            <Box mt={2}>
               <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
            </Box>
         )}

         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            등록하기
         </Button>
      </Box>
   )
}

export default PostCreateForm

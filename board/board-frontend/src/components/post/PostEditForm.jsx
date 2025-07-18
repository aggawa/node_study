import { TextField, Button, Box } from '@mui/material'
import { useState } from 'react'

function PostEditForm({ onPostEdit, initialValues = {} }) {
   const [imgUrl, setImgURL] = useState(import.meta.env.VITE_APP_API_URL + initialValues.img)
   const [imgFile, setImgFile] = useState(null)
   const [title, setTitle] = useState(initialValues.title)
   const [content, setContent] = useState(initialValues.content)

   const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      setImgFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (event) => {
         setImgURL(event.target.result)
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

      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)

      if (imgFile) {
         const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })
         formData.append('img', encodedFile)
      }

      onPostEdit(formData)
   }

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         <TextField label="제목 입력" variant="outlined" fullWidth multiline rows={1} value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 2 }} placeholder="제목을 입력하세요" />

         <TextField label="게시물 내용" variant="outlined" fullWidth multiline rows={4} value={content} onChange={(e) => setContent(e.target.value)} sx={{ mt: 2 }} placeholder="내용을 입력하세요" />

         <Box style={{ width: '70%', display: 'inline-block' }}>
            <Button variant="contained" component="label" color="primary" sx={{ mt: 2 }}>
               {/* 이 버튼 style 이거 손 좀 봐요 */}
               이미지 업로드
               <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
            </Button>

            {imgUrl && (
               <Box mt={2}>
                  <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
               </Box>
            )}
         </Box>

         <Box style={{ display: 'inline', float: 'top' }}>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} style={{ float: 'right' }}>
               수정하기
            </Button>
         </Box>
      </Box>
   )
}

export default PostEditForm

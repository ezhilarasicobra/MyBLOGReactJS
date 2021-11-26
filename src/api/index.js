import axios from 'axios'
const API = axios.create({baseURL:"https://mybloogg.herokuapp.com"})
API.interceptors.request.use((req)=>{
if(localStorage.getItem('profile')){
  req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
}
return req;
})

export const fetchPosts =()=> API.get('/posts')
export const createpost=(newPost)=>API.post('/posts',newPost)
export const updatepost=(id,updatedpost)=>API.patch(`/posts/${id}`,updatedpost)
export const deletepost=(id)=>API.delete(`/posts/${id}`)
export const likepost=(id)=>API.patch(`/posts/${id}/likepost`)
export const signIn =(formData)=>API.post('/user/signin',formData)
export const signUp =(formData)=>API.post('/user/signup',formData)
import * as api from '../api/index'
import {FETCH_ALL,CREATE_POST,UPDATE,DELETE,LIKEPOST} from '../constants/actionTypes'

//create action creators
export const  getposts=()=>async (dispatch)=>{
  try {
    const {data}=await api.fetchPosts()
    dispatch({
      type:FETCH_ALL,
      payload:data
    })
  } catch (error) {
    console.log(error.message)
  }

}
export const createpost =(post)=>async (dispatch)=>{
try {
  const {data}= await api.createpost(post)
  dispatch({
    type: CREATE_POST,
    payload:data
  })
} catch (error) {
  console.log(error.message)
}
}
export const updatepost=(id,post)=>async (dispatch)=>{
try {
  const {data}=await api.updatepost(id,post)
  dispatch({type:UPDATE,payload:data})
} catch (error) {
  console.log(error.message)
}
}
export const deletepost=(id)=>async(dispatch)=>{
  try {
    await api.deletepost(id)
    dispatch({type:DELETE,payload:id})
  } catch (error) {
    console.log(error)
  }
}
export const likepost=(id)=>async(dispatch)=>{
  try {
    const {data}=await api.likepost(id)
  dispatch({type:LIKEPOST,payload:data})
  } catch (error) {
  console.log(error)  
  }
}
import { FETCH_ALL,CREATE_POST,UPDATE, DELETE,LIKEPOST } from "../constants/actionTypes"
const reducer=(posts=[],action)=>{
switch(action.type){
  case FETCH_ALL:
    return action.payload
    case CREATE_POST:
      return [...posts,action.payload]
case UPDATE:
  return posts.map((post)=>post._id===action.payload._id ?action.payload:post)
      default:
        return posts
case DELETE:
  return posts.filter((post)=>post._id!==action.payload)
  case LIKEPOST:
    return posts.map((post)=>post._id===action.payload._id ?action.payload:post)
}

}
export default reducer

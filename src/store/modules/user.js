import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken,getToken } from "@/utils";
const useStore=createSlice({
  name:"user",
  initialState:{
    token:getToken()||''
  },
  reducers:{
    //同步修改方法
    serToken(state,action){
      state.token=action.payload
      //本地localstorage也存一份
      _setToken(action.payload)
    }
  }
})

const {serToken}=useStore.actions
const useReducer=useStore.reducer
//异步方法 完成登录获取token
const fetchLogin=(loginForm)=>{
  return async(dispatch)=>{
    //1.发送异步请求，2.提交同步action进行token的传入
   const res= await request.post('/authorizations', loginForm)
   dispatch(serToken(res.data.token))
  }
}
export {fetchLogin ,serToken}
export default useReducer
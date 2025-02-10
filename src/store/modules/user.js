import { createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils";
import { setToken as _setToken,getToken } from "@/utils";
import { loginAPI,getProfileAPI } from "@/apis/user";
const useStore=createSlice({
  name:"user",
  initialState:{
    token:getToken()||'',
    userInfo: {}
  },
  reducers:{
    //同步修改方法
    serToken(state,action){
      state.token=action.payload
      //本地localstorage也存一份
      _setToken(action.payload)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    },
    clearUserInfo (state) {
      state.token = ''
      state.userInfo = {}
      removeToken()
    }
  }
})

const {serToken,setUserInfo,clearUserInfo}=useStore.actions
const useReducer=useStore.reducer
//异步方法 完成登录获取token
const fetchLogin=(loginForm)=>{
  return async(dispatch)=>{
    //1.发送异步请求，2.提交同步action进行token的传入
    //const res= await request.post('/authorizations', loginForm)
      const res= await loginAPI(loginForm) 
  dispatch(serToken(res.data.token))
  }
}
//获取个人信息异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    // const res = await request.get('/user/profile')
       const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
  }
}
export {fetchLogin ,fetchUserInfo,serToken,clearUserInfo}
export default useReducer
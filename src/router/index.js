import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import {createBrowserRouter} from 'react-router-dom'
 //配置路由实例
const router=createBrowserRouter([
  {
    path:"/",
    element:<Layout/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])
export default router
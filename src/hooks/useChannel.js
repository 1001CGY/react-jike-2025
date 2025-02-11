import { useState,useEffect } from "react"
import { getChannelAPI } from "@/apis/article"
//封装获取频道列表的逻辑
function useChannel(){
  //1.获取频道所有的逻辑
const [channelList,setchannelList]=useState([])
   useEffect(()=>{
    //1.封装函数 在函数体外调用接口
    const getchannelList= async ()=>{
     const res=await getChannelAPI()
     console.log(res.data.channels);
     
     setchannelList(res.data.channels)
    }
    //2.调用函数
    getchannelList()
   },[])
  //2.把组件中要用到的数据return出去
  return {
    channelList
  }
}

export {useChannel}
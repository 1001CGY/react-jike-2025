//封装和文章相关的接口函数

import { request } from "@/utils";
//1.获取频道列表
export function getChannelAPI(){
  return request({
    url:'/channels',
    method:'GET',
   })
}

//2.提交文章表单  新增文章
export function createArticleAPI(data){
  return request({
    url:'/mp/articles?draft=false',
    method:'POST',
    data
  })
}

//3.获取文章列表
export function getArticleListAPI(params){
  return request({
    url:'/mp/articles',
    method:'GET',
    params
  })
}

//删除文章
export function deleArticleAPI(id){
  return request({
    url:`mp/articles/${id}`,
    method:'DELETE'
  })
}

//获取文章详情
export function getArticleByIdAPI(id){
  return request({
    url:`mp/articles/${id}`,
    method:'GET'
  })
}

//更新（编辑）文章
export function updateArticleAPI(data){
  return request({
    url:`/mp/articles/${data.id}?draft=false`,
    method:'PUT',
    data 
  })
}
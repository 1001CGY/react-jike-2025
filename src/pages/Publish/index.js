import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { getChannelAPI } from '@/apis/article'
import { createArticleAPI } from '@/apis/article'
import { useChannel } from '@/hooks/useChannel'
import { getArticleByIdAPI } from '@/apis/article'
import { updateArticleAPI } from '@/apis/article'
const { Option } = Select

const Publish = () => {
  const {channelList}=useChannel()
   const onFinish=(formValue)=>{
     console.log(formValue);
     //校验封面类型imageType是否和实际的图片列表imageList数量是相等的
     if(imageList.length!=imageType) return message.warning('封面类型和图片数量不匹配')
     const {title,content, channel_id}=formValue
     //按照接口文档处理收集到的表单数据
     const reqData={
      title,
      content,
      cover:{
      type:imageType,//上传的图片类型
      //这里url处理逻辑是在新增时候的逻辑
      images:imageList.map(item=>{
        if(item.response){
          return item.response.data.url
        }else{
          return item.url
        }
      })      //上传的图片列表
      //编辑的时候也需要再处理
      },
      channel_id
     }
     //调用接口提交
     //处理调用不同的接口 新增-新增接口  编辑-更新接口
     if(articleId){
      //更新接口
      updateArticleAPI({...reqData,id:articleId})
     }else{
     createArticleAPI(reqData)
     }
     //弹窗发布成功
   }
 //上传回调
   const [imageList,setImageList]=useState([]) 
   const onChange=(value)=>{
    console.log(value);
   setImageList(value.fileList)
   }

     // 控制图片Type 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    console.log(e)
    setImageType(e.target.value)
  }

    //回填数据
    const [searchParams]=useSearchParams()
    const articleId=searchParams.get('id')
    //获取实例
    const [form]=Form.useForm()
    useEffect(()=>{
      //1.通过id获取数据
       async function getArticleDetail(){
         const res = await getArticleByIdAPI(articleId)
         const data=res.data
         const {cover}=data
         console.log(res);
         form.setFieldsValue({
          ...res.data,
          type:cover.type,
         })
         //回显图片列表
         setImageType(cover.type)
         //将图片显示出来
         setImageList(cover.images.map(url=>{
          return {url}
         }))
        }
        //只有有Id的时候才能调用此函数回填
        if(articleId){
        getArticleDetail()
        }
      //2.调用实例方法 完成回填

    },[articleId,form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId  ? '编辑文章' : '发布文章'}` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value属性用户选中后会自动收集起来作为接口的提交字段 */}
            {channelList.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
             </Form.Item>
             {/*listType决定选择文件框的外观样式
             showUploadList控制显示上传列表
                 */}
            {imageType>0 && <Upload
             name='image'
             listType="picture-card"
             showUploadList
             action={'http://geek.itheima.net/v1_0/upload'}
             onChange={onChange}
             maxCount={imageType}
             fileList={imageList}
           >
                  <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                    </div>
                 </Upload>}
            </Form.Item>

          {/* 富文本编辑器 */}
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
         <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      
    </div>
  )
}

export default Publish
//柱状图组件
import * as echarts from 'echarts';
import { useEffect ,useRef} from 'react';
//把功能代码都放到这个组件中
//把可变的部分抽象为prop参数
const BarChart=({tittle})=>{
   const chartRef = useRef(null)
    useEffect(()=>{
      //保证渲染之后执行，dom可用,才进行图表的渲染
  
  //获取dom
  const myChart = echarts.init(chartRef.current)
  //准备图表参数
  const option = {
    title:{
      text:tittle
    },
    xAxis: {
      type: 'category',
      data: ['vue','react','angular']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [110,10,10],
        type: 'bar'
      }
    ]
  };
  //使用图表参数完成对图表的渲染
  option && myChart.setOption(option);
    },[])
    return <div ref={chartRef} id='main' style={{ width: '400px', height: '300px' }}></div>
}
export default BarChart
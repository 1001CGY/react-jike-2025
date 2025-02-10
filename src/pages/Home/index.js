import * as echarts from 'echarts';
import { useEffect ,useRef} from 'react';
import BarChart from './compents/BarChart';
const Home=()=>{
 
  return <div><BarChart tittle={'三大框架满意度'}/>
              <BarChart tittle={'三大框架使用度'}/></div>
}
export default Home 
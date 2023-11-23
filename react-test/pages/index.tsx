import React, { useState,useRef,useEffect } from 'react';
import styles from './index.less';
import Son from './component/son';
import { useCount } from './hooks/useCount';

//- 普通变量是不会变化的
//- useState 是一个hook, 他会返回一个数组, 数组的第一个元素是当前的state, 第二个元素是更新state的方法
//- useRef 是一个hook, 他会返回一个ref对象, 这个ref对象可以获取到dom元素。不会导致页面渲染
//- useEffect 是一个hook, 他会返回一个函数, 这个函数可以用来监听dom元素的变化


//- 頁面渲染邏輯
//1. state的改變會導致組件重新渲染【組件函數執行】
//2. 父組件的重新渲染，必然導致子組件重新渲染

//- 部分場景使用useRef 可以減少渲染次數


const data = {};
export default function Page() {
  let a = 1;
  const [count, setCount] = useState(0)
  const ref = useRef(0)
 
  a++;
  console.log(a, count, 'Page組件 render', ref.current)
  //- hooks不能在普通函數裏面直接調用
  // const {count1} = test(1)

  //- 邏輯的復用
  const { count1, add1, add2 } = useCount(3)

  //- 一般用於處理請求 或者數據的初始化
  useEffect(() => {
    console.log('useEffect first render', ref)
  },[])

  useEffect(() => {
    console.log('useEffect count render', ref)
  },[count])

 // const data = {} useEffect的比較，基本類型和複雜類型
  useEffect(() => {
    console.log('useEffect count render data', ref)
  },[data])
  return (
    <div >
      <h1 className={styles.title}>Page index {count} </h1>
      <div onClick={() => setCount(count + 1)}>useState count: {count}</div>
      <div onClick={() => ref.current++}>useRef: {ref.current}</div>
      {/* 邏輯復用 */}
      <div>count1: {count1}</div>
      <div onClick={() => add1()}>add1</div>
      <div onClick={() => add2()}>add2</div>
      <Son count={count} number={ref.current} setCount={(v) => setCount(v)}></Son>
    </div>
  );
}

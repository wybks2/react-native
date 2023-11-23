// 用react-hooks写一个空组件
import React, { useState, useEffect } from 'react';
import { useCount } from '../hooks/useCount';
import '../index.less'

const Son = (props) => {
    const { count, number, setCount } = props;
    //- 子組件渲染
    console.log('render son', count, number)
    //- 邏輯復用
    // const { count1, add1, add2 } = useCount(3)
 
    return (<div>
        <div className={'title'}>data from Page</div>
        <div onClick={() => setCount(count + 1)}>count:{count}</div>
        <div>ref:{number}</div>
        <div className={'title'}> data from son</div>
        {/* <div>count1:{count1}</div>
        <div onClick={() => add1()}>add1</div>
        <div onClick={() => add2()}>add2</div> */}
    </div>)
}

export default Son
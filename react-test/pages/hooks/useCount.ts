import { useState } from'react'

export const useCount = (init) => {
    const [count1, setCount1] = useState(init);
    const add1 = () => {
        setCount1(count1 + 1);
    }
    const add2 =() => [
        setCount1(count1 + 2),
    ]

    return {count1, add1, add2}
}
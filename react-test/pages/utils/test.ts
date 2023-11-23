import { useCount } from "../hooks/useCount"

export const test = () => {
    const { count1, add1, add2 } = useCount(3)
    return {
        count1,
        add1,
        add2,
        add3: () => {
            add1()
            add2()
        },
    }
}
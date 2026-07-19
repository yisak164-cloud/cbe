import { useReducer, useState } from 'react'

function Counter() {
    function counterReducer(currentState, action) {
        console.log(action)
        // if (action.type == "DECREMENT") {
        //     return { count: currentState.count - 1 }
        // }
        // return { count: currentState.count + 1 }
        switch (action.type) {
            case "DECREMENT":
                return { count: currentState.count - 1 }
            case "INCREMENT":
                return { count: currentState.count + 1 }
            default:
                return currentState
        }
    }
    const [state, dispatch] = useReducer(counterReducer, { count: 0 })
    return (
        <div>
            <button onClick={() => dispatch({ type: "DECREMENT", payload: 3 })}>-</button>
            <span>{state.count}</span>
            <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
        </div>
    )
}

export default Counter

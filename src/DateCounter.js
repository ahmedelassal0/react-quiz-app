import { useReducer, useState } from "react";
function reduce(state, action) {
  console.log(state, action)
  return { count: 0, step: 1 };
    // if (action.type === "inc") return state + action.payload;
    // if (action.type === "dec") return state - action.payload;
    // if (action.type === "setCounter") return action.payload;
}

function DateCounter() {
    // const [count, setCount] = useState(0);
    const initialState = { count: 0, step: 1 };
    const [state, dispatch] = useReducer(reduce, initialState);
    const { count, step } = state;
    // const [step, setStep] = useState(1);

    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: "dec", payload: step });
        // setCount((count) => count - 1);
        // setCount((count) => count - step);
    };

    const inc = function () {
        dispatch({ type: "inc", payload: step });
        // setCount((count) => count + 1);
        // setCount((count) => count + step);
    };

    const defineCount = function (e) {
        dispatch({ type: "setCounter", payload: Number(e.target.value) });
    };

    const defineStep = function (e) {
        // setStep(Number(e.target.value));
    };

    const reset = function () {
        // setCount(0);
        // setStep(1);
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;

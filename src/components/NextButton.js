function NextButton({ answer, dispatch, questionIndex, maxIndex }) {
    if (answer === null) return null;

    const lastQuestion = questionIndex === maxIndex;

    return (
        <button
            className="btn btn-ui"
            onClick={() =>
                dispatch({
                    type: lastQuestion ? "finish" : "nextQuestion",
                })
            }
        >
            {lastQuestion ? "Finish" : "Next"}
        </button>
    );

    // if (questionIndex === maxIndex)
    //     return (
    //         <button
    //             className="btn btn-ui"
    //             onClick={() => dispatch({ type: "finish" })}
    //         >
    //             Finish
    //         </button>
    //     );
}

export default NextButton;

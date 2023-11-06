function Options({ question, answer, dispatch }) {
    return (
        <div className="options">
            {question.options.map((option, index) => (
                <Option
                    key={option}
                    option={option}
                    index={index}
                    answer={answer}
                    dispatch={dispatch}
                    correctAnswer={question.correctOption}
                />
            ))}
        </div>
    );
}

function Option({ option, answer, dispatch, index, correctAnswer }) {
    const haveAnswerd = answer !== null;
    console.log(correctAnswer, answer);
    return (
        <button
            onClick={() => dispatch({ type: "sendAnswer", payload: index })}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
                haveAnswerd && (index === correctAnswer ? "correct" : "wrong")
            }`}
            disabled={haveAnswerd}
        >
            {option}
        </button>
    );
}
export default Options;

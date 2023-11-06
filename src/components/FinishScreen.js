function FinishScreen({ result, maxrating, highScore, maxRating, dispatch }) {
    const percentage = (result * 100) / maxrating;
    return (
        <>
            <p className="result">
                You scored <strong>{result}</strong> out of {maxrating} (
                {Math.ceil(percentage)}%)
            </p>
            <p className="highscore">
                High score: <strong>{highScore}</strong> of {maxRating}
            </p>
            <button className='btn btn-ui' onClick={() => dispatch({type: 'restart'})}>Restart</button>
        </>
    );
}

export default FinishScreen;

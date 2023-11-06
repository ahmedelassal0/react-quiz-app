function Progress({ questionIndex, questionsNum, points, maxPoints, answer }) {
    return (
        <header className="progress">
            <progress
                max={questionsNum}
                value={questionIndex + Number(answer !== null)}
            />
            <p>
                Question <strong>{questionIndex + 1}</strong>/ {questionsNum}
            </p>
            <p>
                {points}/ {maxPoints}
            </p>
        </header>
    );
}

export default Progress;

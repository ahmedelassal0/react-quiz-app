import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
    questions: [],
    // loading - error - ready - active - finished
    status: "loading",
    currentQuestionIndex: 0,
    answer: null,
    points: 0,
    highScore: 0,
    timer: null,
};

const SECOUNDS_FOR_QUESTION = 1;
const reducer = function (state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...initialState,
                questions: state.questions,
                status: "active",
                timer: state.questions.length * SECOUNDS_FOR_QUESTION,
            };
        case "sendAnswer":
            // check if answer is correct
            // 1) get curent question
            const currentQuestionIndex =
                state.questions[state.currentQuestionIndex];

            // 2) get current question correct answer and points
            const correctAnswer = currentQuestionIndex.correctOption;

            return {
                ...state,
                answer: action.payload,
                points:
                    // 3) check if answer is correct
                    action.payload === correctAnswer
                        ? (state.points += currentQuestionIndex.points)
                        : state.points,
            };
        case "nextQuestion":
            return {
                ...state,
                currentQuestionIndex: state.currentQuestionIndex + 1,
                answer: null,
            };
        case "finish":
            return {
                ...state,
                status: "finished",
                highScore:
                    state.points > state.highScore
                        ? state.points
                        : state.highScore,
            };
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };
        case "tick":
            return {
                ...state,
                timer: state.timer - 1,
                status: state.timer > 0 ? "active" : "finished",
            };

        default:
            return new Error("Invalid action");
    }
};
export default function App() {
    const [
        {
            status,
            questions,
            currentQuestionIndex,
            answer,
            points,
            highScore,
            timer,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const maxPossiblePoints = questions.reduce(
        (prev, curr) => prev + curr.points,
        0
    );
    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) =>
                dispatch({
                    type: "dataReceived",
                    payload: data,
                })
            )
            .catch((err) => dispatch({ type: "dataFailed" }));
    }, []);
    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        questionsNo={questions.length}
                        dispatch={dispatch}
                    />
                )}

                {status === "active" && (
                    <>
                        <Progress
                            questionIndex={currentQuestionIndex}
                            questionsNum={questions.length}
                            points={points}
                            maxPoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Questions
                            question={questions[currentQuestionIndex]}
                            answer={answer}
                            dispatch={dispatch}
                        />
                        <Footer>
                            <NextButton
                                answer={answer}
                                dispatch={dispatch}
                                questionIndex={currentQuestionIndex}
                                maxIndex={questions.length - 1}
                            />
                            <Timer timer={timer} dispatch={dispatch} />
                        </Footer>
                    </>
                )}

                {status === "finished" && (
                    <FinishScreen
                        result={points}
                        maxrating={maxPossiblePoints}
                        highScore={highScore}
                        maxRating={maxPossiblePoints}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}

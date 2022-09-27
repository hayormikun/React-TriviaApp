import React, { useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'

const TOTAL_QUESTIONS = 10

function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setuserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [finishedQuiz, setFinishedQuiz] = useState(true)

  const startQuiz = async () => {}

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {}

  const nextQuestion = () => {}

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={startQuiz}>
        Take Quiz
      </button>
      <p className="">Score: {}</p>

      <p className="spinner">Loading questions...</p>
      {/* <QuestionCard
        questionNo={questionNumber + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[questionNumber].question}
        answers={questions[questionNumber].answer}
        userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
        callback={checkAnswer}
      /> */}

      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>
  )
}

export default App

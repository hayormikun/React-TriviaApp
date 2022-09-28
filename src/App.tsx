import React, { useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'
import { fetchQuestions } from './api/api'
import { iQuestionState, Difficulty } from './api/api'

export interface iAnswers {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<iQuestionState[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setuserAnswers] = useState<iAnswers[]>([])
  const [score, setScore] = useState(0)
  const [finishedQuiz, setFinishedQuiz] = useState(true)

  console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
  const startTrivia = async () => {
    setLoading(true)
    setFinishedQuiz(false)

    try {
      const newQuestions  = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
      setQuestions(newQuestions)
    } catch (err) {
      alert(`${err}`)     
    } 

    setScore(0)
    setuserAnswers([])
    setQuestionNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {}

  const nextQuestion = () => {}

  return (
    <div className="bg-gray-700">
      <h1>React Quiz</h1>
      { finishedQuiz || userAnswers.length === TOTAL_QUESTIONS }
      <button className="start" onClick={startTrivia}>
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

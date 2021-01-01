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
  const [userAnswers, setUserAnswers] = useState<iAnswers[]>([])
  const [score, setScore] = useState(0)
  const [finishedQuiz, setFinishedQuiz] = useState(true)

  console.log(fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
  const startTrivia = async () => {
    setLoading(true)
    setFinishedQuiz(false)

    // try {
      const newQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY,
      )

      
      setQuestions(newQuestions)
    // } catch (err) {
    //   alert(`${err}`)
    // }

    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    setLoading(false)
  }

  console.log(questions)

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!finishedQuiz) {
      const answer = e.currentTarget.value

      const correct = questions[questionNumber].correct_answer === answer

      if (correct) setScore((pre) => pre + 1)

      const answerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      }

      setUserAnswers((pre) => [...pre, answerObject])
    }
  }

  const nextQuestion = () => {
    const next = questionNumber + 1

    if (next === TOTAL_QUESTIONS) setFinishedQuiz(true)
    else setQuestionNumber(next)
  }

  return (
    <div className="bg-gray-700">
      <h1>React Quiz</h1>
      {finishedQuiz || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start New Trivia
        </button>
      ) : null}

      {!finishedQuiz && !loading ? <p className="">Score: {}</p> : null}
      {loading && <p className="spinner">Loading questions...</p>}

      {!loading && !finishedQuiz && (
        <QuestionCard
          questionNo={questionNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[questionNumber].question}
          answers={questions[questionNumber].answers}
          userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
          callback={checkAnswer}
        />
      )}

      {!finishedQuiz &&
        !loading &&
        userAnswers.length === questionNumber + 1 &&
        questionNumber !== TOTAL_QUESTIONS - 1 && (
          <button className="" onClick={nextQuestion}>
            Next
          </button>
        )}
    </div>
  )
}

export default App

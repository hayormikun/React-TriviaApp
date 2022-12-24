import React, { useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'

import { fetchQuestions } from './api/api'
import { iQuestionState, Difficulty } from './api/api'
import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

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

  const startTrivia = async () => {
    setLoading(true)
    setFinishedQuiz(false)

    try {
      const newQuestions = await fetchQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY,
      )

      setQuestions(newQuestions)
    } catch (err) {
      alert(`${err}`)
    }

    setScore(0)
    setUserAnswers([])
    setQuestionNumber(0)
    setLoading(false)
  }

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
    <div className="wrap">
      <Center>
        <VStack my={'2%'} gap={"5"}>
          <Heading as={'h1'} fontSize={'5.5em'} fontWeight={'500'}>
            Trivia Quest
          </Heading>
          {finishedQuiz || userAnswers.length === TOTAL_QUESTIONS ? (
            <Button
              variant={'solid'}
              textAlign={'center'}
              bgColor={'blue.500'}
              color={'white'}
              size={'lg'}
              fontSize={'xl'}
              fontWeight={'bold'}
              boxShadow={'dark-lg'}
              onClick={startTrivia}
            >
              Start Trivia
            </Button>
          ) : null}

          {!finishedQuiz && !loading ? (
            <Text color={'white'} fontSize={'24px'} fontWeight={'semibold'}>
              Score: {score}
            </Text>
          ) : null}
          {loading && <Text my={"40%"}>Loading questions...</Text>}

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
              <Button className="" onClick={nextQuestion}>
                Next
              </Button>
            )}
        </VStack>
      </Center>
    </div>
  )
}

export default App

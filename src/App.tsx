import React, { useState } from 'react'
import './App.css'
import QuestionCard from './components/QuestionCard'

import { fetchQuestions } from './api/api'
import { iQuestionState, Difficulty } from './api/api'
import {
  Button,
  Center,
  HStack,
  Text,
  VStack,
  Icon,
  Box,
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
      <Center mx={'2'}>
        <VStack my={'2%'} gap={'5'}>
          <Box fontSize={'5em'}>
            <h1>Random Trivia</h1>
          </Box>

          {finishedQuiz || userAnswers.length === TOTAL_QUESTIONS ? (
            <Button
              variant={'solid'}
              textAlign={'center'}
              bgColor={'blue.800'}
              color={'white'}
              size={'lg'}
              fontSize={'xl'}
              fontWeight={'bold'}
              boxShadow={'dark-md'}
              _hover={{
                bgColor: 'blue.800',
                opacity: '0.8',
                boxShadow: 'dark-lg',
              }}
              _active={{
                bgColor: 'blue.800',
                opacity: '0.8',
                boxShadow: 'dark-lg',
              }}
              onClick={startTrivia}
            >
              New Trivia
            </Button>
          ) : null}

          {loading && (
            <Text fontSize={'lg'} fontWeight={'500'} my={'40%'}>
              Loading questions...
            </Text>
          )}

          {!finishedQuiz && !loading ? (
            <HStack gap={1} alignItems={'center'}>
              {score < 5 && (
                <Icon
                  viewBox="0 0 200 200"
                  color="red.500"
                  height="7"
                  width="7"
                >
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
              )}

              {score >= 5 && (
                <Icon
                  viewBox="0 0 200 200"
                  color="green.500"
                  height="7"
                  width="7"
                >
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
              )}

              <Text
                color={'white'}
                fontSize={'1.3em'}
                textShadow={'lg'}
                fontWeight={'semibold'}
              >
                Score: {score}
              </Text>
            </HStack>
          ) : null}

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
              <Button
                variant={'solid'}
                textAlign={'center'}
                bgColor={'blue.800'}
                color={'white'}
                size={'lg'}
                fontSize={'xl'}
                fontWeight={'bold'}
                boxShadow={'dark-md'}
                _hover={{
                  bgColor: 'blue.800',
                  opacity: '0.8',
                  boxShadow: 'dark-lg',
                }}
                _active={{
                  bgColor: 'blue.800',
                  opacity: '0.8',
                  boxShadow: 'dark-lg',
                }}
                onClick={nextQuestion}
              >
                Next Question
              </Button>
            )}
        </VStack>
      </Center>
    </div>
  )
}

export default App

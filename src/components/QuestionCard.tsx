import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { iAnswers } from '../App'
import { ButtonWrapper } from '../Answers.styles'

interface iQuestions {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: iAnswers | undefined
  questionNo: number
  totalQuestions: number
}

const QuestionCard: React.FC<iQuestions> = ({
  question,
  answers,
  callback,
  userAnswer,
  totalQuestions,
  questionNo,
}: iQuestions) => {
  return (
    <Box
      w={'fit-content'}
      p={'10'}
      h={'auto'}
      bgColor={'white'}
      boxShadow={'md'}
      rounded={'md'}
    >
      <Text color={'gray.700'} fontSize={'18px'} fontWeight={'semibold'}>
        Question: {questionNo} / {totalQuestions}
      </Text>
      <Text
        my={'2'}
        color={'gray.700'}
        fontSize={'18px'}
        fontWeight={'semibold'}
        userSelect={"none"}
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <Box>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            clickedAnswer={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </Box>
    </Box>
  )
}

export default QuestionCard

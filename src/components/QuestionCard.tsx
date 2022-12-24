import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { iAnswers } from '../App'

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
    <Box w={'fit-content'} p={"10"} h={'auto'} bgColor={'slategray'} rounded={'md'}>
      <Text color={'white'} fontSize={'18px'} fontWeight={'semibold'}>
        Question: {questionNo} / {totalQuestions}
      </Text>
      <Text my={"2"} color={'white'} fontSize={'18px'} fontWeight={'semibold'} dangerouslySetInnerHTML={{ __html: question }} />

      <Box>
        {answers.map((answer) => (
          <Box key={answer}>
            <Button
              variant={'solid'}
              disabled={userAnswer ? true : false}
              value={answer}
              bgColor={"blue.500"}
              color={"white"}
              textAlign={"center"}
              w={"full"}
              my={"2"}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default QuestionCard

import React from 'react'
import { iAnswers } from '../App'

interface iQuestions {
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>)=>void
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
    <div>
      <p className="number">
        Question: {questionNo} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />

      <div>
        {answers.map(answer => (
          <div key={answer}>
            <button disabled={userAnswer ? true :  false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard

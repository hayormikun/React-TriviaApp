import React from 'react'

interface iQuestions {
  question: string
  answers: string[]
  callback: any
  userAnswer: any
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
          <div key={questionNo}>
            <button disabled={userAnswer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard

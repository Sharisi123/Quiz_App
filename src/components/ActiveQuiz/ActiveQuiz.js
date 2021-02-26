import React from 'react'
import './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

let ActiveQuiz = (props) => {
  return (
    <>
      <div className="ActiveQuiz">
        <p className="Question">
          <span>
            <strong>{props.activeQuestion} </strong>
            {props.question}
          </span>
          <small>
            {props.activeQuestion} из {props.quizLength}
          </small>
        </p>
        <AnswersList
          answers={props.answers}
          onAnswerClick={props.onAnswerClick}
          answerState={props.answerState}
        />
      </div>
    </>
  )
}

export default ActiveQuiz

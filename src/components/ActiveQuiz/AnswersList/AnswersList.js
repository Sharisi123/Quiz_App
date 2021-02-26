import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'
import './AnswersList.css'

let AnswersList = (props) => {
  return (
    <>
      <ul className="AnswersList">
        {props.answers.map((answer) => {
          return (
            <AnswerItem
              key={answer.id}
              answer={answer}
              onAnswerClick={props.onAnswerClick}
              answerState={
                props.answerState ? props.answerState[answer.id] : null
              }
            />
          )
        })}
      </ul>
    </>
  )
}

export default AnswersList

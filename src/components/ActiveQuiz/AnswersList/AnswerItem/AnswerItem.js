import React from 'react'
import './AnswerItem.css'

let AnswerItem = (props) => {
  let cls = ['AnswerItem']

  if (props.answerState) {
    cls.push(props.answerState)
  }

  return (
    <>
      <li
        className={cls.join(' ')}
        onClick={() => props.onAnswerClick(props.answer.id)}>
        {props.answer.text}
      </li>
    </>
  )
}

export default AnswerItem

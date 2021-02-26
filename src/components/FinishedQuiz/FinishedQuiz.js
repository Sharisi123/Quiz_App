import React from 'react'
import { Link } from 'react-router-dom'
import './FinishedQuiz.css'

let FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)
  return (
    <>
      <div className="FinishedQuiz">
        <ul>
          {props.quiz.map((quizItem, index) => {
            const cls = [
              'fa',
              props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
              props.results[quizItem.id],
            ]

            return (
              <li key={index}>
                <strong>{index + 1}</strong>. &nbsp;
                {quizItem.question}
                <i className={cls.join(' ')} />
              </li>
            )
          })}
        </ul>
        <p>
          Правильно {successCount} из {props.quiz.length}
        </p>
        <div>
          <button onClick={props.onRetry} className="button">
            Повторить
          </button>
          <Link to={'/'} onClick={props.onRetry} className="button link">
            Перейти в список тестов
          </Link>
        </div>
      </div>
    </>
  )
}

export default FinishedQuiz

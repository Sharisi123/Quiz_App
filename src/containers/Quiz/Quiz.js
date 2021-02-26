import React from 'react'
import { connect } from 'react-redux'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import {
  fetchQuizById,
  onRetryHandler,
  quizAnswerClick,
} from '../../store/actions/quizAC'
import './Quiz.css'

class Quiz extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id
    this.props.fetchQuizById(id) // делаем запрос на сервак по ID
  }
  componentWillUnmount() {
    this.props.onRetryHandler() // при удалении компонента обнуляем state
  }

  render() {
    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>Ответьте на все вопросы</h1>

          {this.props.loading || this.props.quiz.length === 0 ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.onRetryHandler} // кнопка повторить в конце опроса
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick} // сдесь обработка клика
              quizLength={this.props.quiz.length}
              activeQuestion={this.props.activeQuestion + 1}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (props) => ({
  results: props.quiz.results,
  isFinished: props.quiz.isFinished,
  activeQuestion: props.quiz.activeQuestion,
  answerState: props.quiz.answerState,
  quiz: props.quiz.quiz,
  loading: props.quiz.loading,
})
const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
  onRetryHandler: () => dispatch(onRetryHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

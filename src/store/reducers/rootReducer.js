import { combineReducers } from 'redux'
import quizListReduser from './quizListReducer'
import quizReduser from './quizReducer'

export default combineReducers({
  quizList: quizListReduser,
  quiz: quizReduser,
})

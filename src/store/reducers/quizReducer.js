import {
  CHANGE_QUESTION,
  ON_RETRY,
  SET_ANSWER_STATE,
  SET_FETCH_DATA,
  SET_IS_FINICHED,
} from '../actions/quizAC'

const initialState = {
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: [],
  loading: true,
}
export default function quizReduser(state = initialState, action) {
  switch (action.type) {
    case SET_FETCH_DATA:
      return {
        ...state,
        loading: action.loading,
        quiz: action.quiz,
      }
    case SET_ANSWER_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      }
    case SET_IS_FINICHED:
      return {
        ...state,
        isFinished: true,
      }
    case CHANGE_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: null,
      }
    case ON_RETRY:
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
      }

    default:
      return state
  }
}

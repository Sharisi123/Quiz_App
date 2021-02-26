import axios from 'axios'

export const SET_FETCH_DATA = 'SET_FETCH_DATA'
export const SET_ANSWER_STATE = 'SET_ANSWER_STATE'
export const SET_IS_FINICHED = 'SET_IS_FINICHED'
export const CHANGE_QUESTION = 'CHANGE_QUESTION'
export const ON_RETRY = 'ON_RETRY'

export function fetchQuizById(id) {
  return async (dispatch) => {
    let response = await axios.get(
      `https://quiz-c8b91-default-rtdb.europe-west1.firebasedatabase.app/Quiz/${id}.json`
    )
    let quiz = response.data
    dispatch(setFetchData(quiz, false))
  }
}
export function setFetchData(quiz, loading) {
  return {
    type: SET_FETCH_DATA,
    quiz,
    loading,
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    let state = getState().quiz
    if (state.answerState) {
      let key = Object.keys(state.answerState)

      if (state.answerState[key] === 'success') {
        return
      }
    }

    let question = state.quiz[state.activeQuestion]
    let results = state.results
    console.log(state)

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(setAnswerState({ [answerId]: 'success' }, results))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state.activeQuestion, state.quiz.length)) {
          dispatch({ type: SET_IS_FINICHED })
        } else {
          dispatch(changeQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(setAnswerState({ [answerId]: 'error' }, results))
      console.log('Wrong answer')
    }
  }
}

let isQuizFinished = (activeQuestion, length) => {
  return activeQuestion + 1 === length ? true : false
}

export function setAnswerState(answerState, results) {
  return {
    type: SET_ANSWER_STATE,
    answerState,
    results,
  }
}
export function changeQuestion(activeQuestion) {
  return {
    type: CHANGE_QUESTION,
    activeQuestion,
  }
}
export function onRetryHandler() {
  return {
    type: ON_RETRY,
  }
}

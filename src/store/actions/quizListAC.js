import axios from 'axios'

export const FETCH_QUIZES_START = 'FETCH_QUIZES_START'
export const FETCH_QUIZES_SUCCESS = 'FETCH_QUIZES_SUCCESS'

export function fetchQuizesAC() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())

    try {
      let response = await axios.get(
        'https://quiz-c8b91-default-rtdb.europe-west1.firebasedatabase.app/Quiz.json'
      )
      let quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test №${index + 1}`,
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (error) {
      console.log(error)
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  }
}
export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  }
}

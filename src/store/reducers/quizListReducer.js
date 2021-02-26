import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS } from '../actions/quizListAC'

const initialState = {
  quizes: [],
  loading: false,
}

export default function quizListReduser(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_QUIZES_SUCCESS: {
      return {
        loading: false,
        quizes: action.quizes,
      }
    }

    default:
      return state
  }
}

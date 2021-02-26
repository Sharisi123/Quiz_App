import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { fetchQuizesAC } from '../../store/actions/quizListAC'
import './QuizList.css'

class QuizList extends React.Component {
  componentDidMount() {
    this.props.fetchQuizes()
  }

  renderQuizList() {
    return this.props.quizes.map((item) => {
      return (
        <li key={item.id}>
          <NavLink to={'/quiz/' + item.id}>{item.name}</NavLink>
        </li>
      )
    })
  }
  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>Список тестов</h1>

          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizList()}</ul>
          )}
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    quizes: state.quizList.quizes,
    loading: state.quizList.loading,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizesAC()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)

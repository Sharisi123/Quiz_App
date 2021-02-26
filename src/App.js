import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import './App.css'
import Auth from './containers/Auth/Auth'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import Layout from './hoc/Layout/Layout'
import rootReducer from './store/reducers/rootReducer'

let store = createStore(rootReducer, applyMiddleware(thunk))

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/quiz-creator" component={QuizCreator} />
              <Route path="/quiz/:id" component={Quiz} />
              <Route path="/" component={QuizList} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App

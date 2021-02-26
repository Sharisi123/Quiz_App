import axios from 'axios'
import React from 'react'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import { createControl, validate, validateForm } from '../../form/formFramework'
import './QuizCreator.css'

function createOptionControl(label, errorMessage) {
  return createControl(
    {
      label,
      errorMessage,
    },
    { required: true }
  )
}

function createFormControls() {
  return {
    question: createOptionControl('Введите вопрос', 'Вопрос обязателен!!'),
    option1: createOptionControl('Вариант №1', 'Обязательно'),
    option2: createOptionControl('Вариант №2', 'Обязательно'),
    option3: createOptionControl('Вариант №3', 'Обязательно'),
    option4: createOptionControl('Вариант №4', 'Обязательно'),
  }
}

class QuizCreator extends React.Component {
  state = {
    quiz: [],
    isFormValide: false,
    rightAnswerId: 1,
    formControl: createFormControls(),
  }

  componentDidMount() {
    axios
      .get(
        'https://quiz-c8b91-default-rtdb.europe-west1.firebasedatabase.app/Quiz.json'
      )
      .then((response) => console.log(response))
  }

  submitHandler(e) {
    e.preventDefault()
  }
  addQuestionHandler = (e) => {
    e.preventDefault()

    const quiz = this.state.quiz.concat()
    let index = quiz.length + 1
    let {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControl

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: 1 },
        { text: option2.value, id: 2 },
        { text: option3.value, id: 3 },
        { text: option4.value, id: 4 },
      ],
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      isFormValide: false,
      rightAnswerId: 1,
      formControl: createFormControls(),
    })
  }
  createQuizHandler = async (e) => {
    e.preventDefault()
    try {
      let response = await axios.post(
        'https://quiz-c8b91-default-rtdb.europe-west1.firebasedatabase.app/Quiz.json',
        this.state.quiz
      )
      this.setState({
        quiz: [],
        isFormValide: false,
        rightAnswerId: 1,
        formControl: createFormControls(),
      })
    } catch (error) {
      console.log(error)
    }
  }

  changeHandler = (value, controlName) => {
    const formControl = { ...this.state.formControl }
    const control = { ...formControl[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControl[controlName] = control

    this.setState({
      formControl,
      isFormValide: validateForm(formControl),
    })
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value,
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControl).map((controlName, index) => {
      let control = this.state.formControl[controlName]
      return (
        <>
          <Input
            key={index}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!control.validation}
            touched={control.touched}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </>
      )
    })
  }

  render() {
    const select = (
      <Select
        label="Выбирите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: '1', value: '1' },
          { text: '2', value: '2' },
          { text: '3', value: '3' },
          { text: '4', value: '4' },
        ]}
      />
    )

    return (
      <div className="QuizCreator">
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}

            {select}
            <div>
              <button
                className="button"
                onClick={this.addQuestionHandler}
                disabled={!this.state.isFormValide}>
                Добавить вопрос
              </button>
              <button
                className="button"
                onClick={this.createQuizHandler}
                disabled={this.state.quiz.length === 0}>
                Создать тест
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizCreator

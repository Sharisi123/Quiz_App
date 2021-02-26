import axios from 'axios'
import React from 'react'
import Input from '../../components/UI/Input/Input'
import './Auth.css'

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

class Auth extends React.Component {
  state = {
    isFormValide: false,
    formControl: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный Email',
        valide: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Введите корректный Password',
        valide: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  }

  loginHandler = async () => {
    let authData = {
      email: this.state.formControl.email.value,
      password: this.state.formControl.password.value,
      returnSecureToken: true,
    }
    try {
      let response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC3Gih1th0f-1BhR1UY96bLsNlZkR1tW5A',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  regHandler = async () => {
    let authData = {
      email: this.state.formControl.email.value,
      password: this.state.formControl.password.value,
      returnSecureToken: true,
    }
    try {
      let response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC3Gih1th0f-1BhR1UY96bLsNlZkR1tW5A',
        authData
      )
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  submitHandler(event) {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  handleChange = (event, controlName) => {
    const formControl = { ...this.state.formControl }
    const control = { ...formControl[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valide = this.validateControl(control.value, control.validation)

    formControl[controlName] = control

    let isFormValide = true

    Object.keys(formControl).forEach((item) => {
      isFormValide = formControl[item].valide && isFormValide
    })

    this.setState({
      isFormValide,
      formControl,
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControl).map((controlName, index) => {
      let control = this.state.formControl[controlName]
      return (
        <Input
          key={index}
          label={control.label}
          errorMessage={control.errorMessage}
          type={control.type}
          value={control.value}
          valide={control.valide}
          touched={control.touched}
          shouldValidate={!!control.validation}
          onChange={(event) => this.handleChange(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <button
              className="button"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValide}>
              Войти
            </button>
            <button
              className="button"
              onClick={this.regHandler}
              disabled={!this.state.isFormValide}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth

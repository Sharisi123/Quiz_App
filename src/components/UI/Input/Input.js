import React from 'react'
import './Input.css'

function isInvalide({ valide, touched, shouldValidate }) {
  return !valide && touched && shouldValidate
}

let Input = (props) => {
  let htmlFor = `${props.type}-${Math.round(Math.random() * 100)}`
  const cls = ['Input']

  if (isInvalide(props)) {
    cls.push('invalid')
  }
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={props.type || 'text'}
        placeholder={props.placeholder}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalide(props) ? <span>{props.errorMessage}</span> : null}
    </div>
  )
}

export default Input

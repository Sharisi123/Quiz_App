export function createControl(config, validation) {
  return {
    ...config,
    validation,
    valid: !validation,
    touched: false,
    value: '',
  }
}
export function validate(value, validation = null) {
  if (!validation) {
    return true
  }

  let isValide = true

  if (validation.required) {
    isValide = value.trim() !== '' && isValide
  }

  return isValide
}
export function validateForm(formControl) {
  let isFormValide = true

  for (let control in formControl) {
    if (formControl.hasOwnProperty(control)) {
      isFormValide = formControl[control].valid && isFormValide
    }
  }

  return isFormValide
}

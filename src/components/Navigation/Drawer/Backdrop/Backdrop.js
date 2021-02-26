import React from 'react'
import './Backdrop.css'

let Backdrop = (props) => {
  return (
    <>
      <div className="Backdrop" onClick={props.onBackdropClick}></div>
    </>
  )
}

export default Backdrop

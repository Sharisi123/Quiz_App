import React from 'react'
import { NavLink } from 'react-router-dom'
import Backdrop from './Backdrop/Backdrop'
import './Drawer.css'

let links = [
  { to: '/', text: 'Список тестов', exact: true, id: 1 },
  { to: '/auth', text: 'Регистрация', exact: false, id: 2 },
  { to: '/quiz-creator', text: 'Создать тест', exact: false, id: 3 },
]

class Drawer extends React.Component {
  drawer = () => {
    return links.map((item) => {
      return (
        <li key={item.id}>
          <NavLink
            to={item.to}
            exact={item.exact}
            activeClassName={'active'}
            onClick={this.props.onBackdropClick}>
            {item.text}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    let cls = ['Drawer']

    if (!this.props.isOpen) {
      cls.push('close')
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.drawer()}</ul>
        </nav>
        {this.props.isOpen ? (
          <Backdrop onBackdropClick={this.props.onBackdropClick} />
        ) : null}
      </>
    )
  }
}

export default Drawer

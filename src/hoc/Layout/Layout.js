import React from 'react'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import './Layout.css'

class Layout extends React.Component {
  state = {
    isOpen: false,
  }
  onToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  onBackdropClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <div className="Layout">
        <Drawer
          isOpen={this.state.isOpen}
          onBackdropClick={this.onBackdropClick}
        />
        <MenuToggle onToggle={this.onToggle} isOpen={this.state.isOpen} />
        <main>{this.props.children}</main>
      </div>
    )
  }
}

export default Layout

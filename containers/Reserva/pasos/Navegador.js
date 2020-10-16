import React, { Component } from 'react'
import { Button } from 'antd'
import { NavegadorContainer } from './styles'

export default class NavegadorComponent extends Component {
  render () {
    const { step } = this.props
    return (
      <NavegadorContainer>
        <Button onClick={this.props.prev} disabled={this.props.step <= 0}>
          Anterior
        </Button>
        <Button onClick={this.props.next} disabled={this.props.step >= 4}>
          {step === 3 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </NavegadorContainer>
    )
  }
}

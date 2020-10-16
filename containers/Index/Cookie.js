import React, { Component } from 'react'
import styled from 'styled-components'
import {Button} from 'antd'
import {brandColor, secondaryColor} from './../../components/utils'
import { parseCookies, setCookie } from 'nookies'

const CookieDiv = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgb(	255, 97, 8);
  padding: 1rem 2rem;
  text-align: center;
  a{
    color: ${brandColor};
    &:visited, &:hover, &:clicked, &:active{
      color: ${brandColor};
    }
  }
  span{
    color: white;
    font-size: 16px;
  }
  .ant-btn{
    position: absolute;
    top: -16px;
    right: 8px;
    color: ${secondaryColor};
    border-color: ${secondaryColor};
    transition: all 1s;
    &:hover{
      transform: scale(1.25);
      color: ${brandColor};
      border-color: ${brandColor};
    }
  }
`

export default class Cookie extends Component {
  state = {
    show: false
  }

  componentDidMount(){
    const cookie = parseCookies()
    // console.log({cookie})
    if(cookie.token)
      this.setState({ show: cookie.token === "true" })
    else
      this.setState({ show: true })
  }

  handleHide = () => {
    this.setState({show: false})
    setCookie('','token', false, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }

  render() {
    return (
      this.state.show &&
      <CookieDiv>
        <span>
          "Utilizamos cookies para mejorar tu experiencia. Consulta <a href='/ayuda#politica'>nuestra Política</a> para más información. Si continúas navegando, entenderemos que aceptas nuestra Política."
        </span>
          <Button shape='circle' icon='close' onClick={this.handleHide}/>
      </CookieDiv>
    )
  }
}
import { Drawer, Icon, Layout, Menu } from 'antd'
import Header from './Header'
import Footer from './Footer'
import React, { Component, Fragment } from 'react'
import { withRouter } from 'next/router'
import { brandColor, darkGray, secondaryColor } from '../utils'
import styled, { createGlobalStyle } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF'

const { Content } = Layout

const GlobalStyle = createGlobalStyle`
   *,
  *::after,
  *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }
  
  * {
     font-family: 'Lato', sans-serif !important;
  }
  
  html {
      // This defines what 1rem is
      font-size: 62.5%; //1 rem = 10px; 10px/16px = 62.5%
      // tablet
      @media only screen and (max-width: 75em) {
        font-size: 56.25%; //1 rem = 9px, 9/16 = 50%
      }
      // phone
      @media only screen and (max-width: 56.25em) {
        font-size: 50%; //1 rem = 8px, 8/16 = 50%
      }
      // large screen
      @media only screen and (min-width: 112.5em) {
        font-size: 75%; //1rem = 12, 12/16
      }
  }
  
  body {
      box-sizing: border-box;
      padding: 0;
      font-weight: 400;
      line-height: 1.7;
      margin: 0;
      font-family: 'Lato', sans-serif !important;
  }
  
  ::-webkit-scrollbar {
      width: 6px;
  } 
  ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  } 
  ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  }
`

const ActiveLink = withRouter(({ children, router, href }) => {
  const style = {
    marginRight: 10,
    color: router.pathname === href ? `${secondaryColor}` : 'black'
  }

  const handleClick = e => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
})

const CustomDrawer = styled(Drawer)`
  & .ant-drawer-body {
    padding: 0;
  }
  & .drawer-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
    padding: 1.7rem 1rem;
    background-color: ${brandColor};
    & .logo {
      margin-left: 1.6rem;
    }
    svg {
      color: white;
      font-size: 2.5rem;
    }
  }
  & .drawer-footer {
    background-color: ${darkGray};
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    & .final {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    & .footer-title {
      color: white;
    }
    & .social-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      border-radius: 10px;
          padding: 0.5rem 1.2rem;
      svg {
        color: #3b5998;
        font-size: 2rem;
      }
    }
    & .contact-info {
      width: 100%;
    }
  }
`

export default class LayoutWrapper extends Component {
  state = { visible: false }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  render () {
    const { children } = this.props
    return (
      <Fragment>
        <GlobalStyle/>
        <Layout className="layout">
          <Header showDrawer={this.showDrawer}/>
          <Content>
            <div style={{ background: '#fff', minHeight: 'calc(100vh - 144px)' }}>
              {children}
            </div>
          </Content>
          <Footer/>
        </Layout>
        <CustomDrawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div className="drawer-header">
            <img className={'logo'} src="https://s3.amazonaws.com/cdn-eduexpress/logo-square.png" alt="logo"/>
            <Icon type="close" onClick={this.onClose}/>
          </div>
          <div>
            <Menu
              className="menu-header"
              mode="vertical"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                <ActiveLink href='/'>
                  Inicio
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="2">
                <ActiveLink href='/rutas'>
                  Rutas
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="3">
                <ActiveLink href='/destinos'>
                  Destinos
                </ActiveLink>
              </Menu.Item>
              <Menu.Item key="4">
                <ActiveLink href='/ayuda'>
                  Centro de ayuda
                </ActiveLink>
              </Menu.Item>
            </Menu>
          </div>
          <div className="drawer-footer">
            <div className={'final'}>
              <span className='footer-title'>Redes sociales</span>
              <span className='social-icon'>
                <a
                  href={'https://www.facebook.com/EduExpress-267815570514944/'}
                  target='_blank'
                >
                  <FontAwesomeIcon icon={faFacebookF}/>
                </a>
              </span>
            </div>
          </div>
        </CustomDrawer>
      </Fragment>
    )
  }
}

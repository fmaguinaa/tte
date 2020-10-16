import { Icon, Menu } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { brandColor } from '../utils';
import ActiveLink from './Link';

const CustomHeader = styled.header`
  height: 64px;
  padding: 0 50px;
  line-height: 64px;
  background-color: ${brandColor};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 3;
  width: 100%;
  & .logo {
    height: 100%;
    width: 150px;
    text-align: center;
    cursor: pointer;
    img {
      height: 100%;
      width: auto;
      padding: 15px;
      @media only screen and (max-width: 56.25em) {
        height: 85%;
      }
    }
  }
  & .ant-menu {
    background-color: ${brandColor};
    display: flex;
    justify-content: flex-end;
    color: white;
    border: none !important;
    & .ant-menu-item {
      border: none !important;
    }
    & a {
      color: white;
      text-decoration: none;
      font-size: 16px;
    }
    & .ant-menu-item:hover {
      background: rgba(0, 0, 0, 0.15);
    }
  }
  & .menu-mobile {
    color: white;
    display: none;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
    font-size: 3rem;
  }
   @media only screen and (max-width: 56.25em) {
      padding: 0;
      & .menu-header {
        display: none;
      }
      & .menu-mobile {
        display: flex;
      }
    }
`

export default (props) => (
  <CustomHeader>
    <Link href="/">
      <div className="logo">
        <img src="https://s3.amazonaws.com/cdn-eduexpress/name_horizontal_white.png" alt="gg"/>
      </div>
    </Link>
    <Menu
      className="menu-header"
      mode="horizontal"
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="0">
        <ActiveLink href='/'>
          Inicio
        </ActiveLink>
      </Menu.Item>
      <Menu.Item key="1">
        <ActiveLink href='/rutas'>
          Rutas
        </ActiveLink>
      </Menu.Item>
      <Menu.Item key="2">
        <ActiveLink href='/destinos'>
          Destinos
        </ActiveLink>
      </Menu.Item>
      <Menu.Item key="3">
        <ActiveLink href='/ayuda'>
          Centro de Ayuda
        </ActiveLink>
      </Menu.Item>
    </Menu>
    <Icon onClick={props.showDrawer} className="menu-mobile" type="menu-unfold"/>
  </CustomHeader>
)

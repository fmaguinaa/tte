import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Input } from 'antd';

import headImage from '../../layout/images/tte.png'
import headImageM from '../../layout/images/tte.png'

import NavBar from './NavBar'

import * as paths from '../../routes/paths'

const { Search } = Input;

const onSearch = value => console.log(value);

export default function Header() {
  return (
    <Fragment>
      <header>
        <div className="main__header">
          <div className='main__header__brand'>
            <Link to={paths.landing} className='brand__desktop'>
              <img src={headImage} alt='logo'/>
              <span className='font-selima'>TTE</span>
            </Link>
            <Link to={paths.landing} className='brand__mobile'>
              <img src={headImageM} alt='logo-mobile'/>
              <span className='font-selima'>TTE</span>
            </Link>
          </div>
          <Search className='main__header__search' placeholder="Busca tu planta" onSearch={onSearch} enterButton />
          <div className='main__header__links'>
            <Link to={paths.landing}>
              Inicio
              </Link>
            <Link to={paths.nosotros}>
              Nosotros
              </Link>
            <Link to={paths.galeria}>
              Galería
              </Link>
            <Link to={paths.contactenos}>
              Contáctenos
              </Link>
          </div>
          <NavBar />
        </div>
      </header>
    </Fragment>
  )
}
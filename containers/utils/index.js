import React from 'react'
import { Icon, Spin } from 'antd'

const loadingIcon = <Icon type='loading' style={{ fontSize: 24 }} spin/>

const NotFound = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <h1 style={{ color: 'black' }}>No hay datos disponibles.</h1>
  </div>
)

const Loading = () => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Spin indicator={loadingIcon}/>
  </div>
)

const LoadingPage = () => (
  <div
    style={{
      height: 'calc(100vh - 64px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Spin indicator={loadingIcon}/>
  </div>
)

const NotFound404 = () => (
  <div
    style={{
      background: '#FFF',
      height: 'calc(100vh - 64px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <h1 style={{ color: 'black' }}>Página no encontrada :(</h1>
  </div>
)

export { NotFound, Loading, NotFound404, LoadingPage }

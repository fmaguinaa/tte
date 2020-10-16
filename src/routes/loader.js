import React from 'react'
import Loadable from 'react-loadable'
import { LoadingPage } from '../components/utils'

export const Landing = Loadable({
  loader: () => import('../components/Landing/Landing'),
  loading () {
    return <LoadingPage/>
  }
})

export const Nosotros = Loadable({
  loader: () => import('../components/Nosotros/Nosotros'),
  loading(){
    return <LoadingPage />
  }
})

export const Galeria = Loadable({
  loader: () => import('../components/Galeria/Galeria'),
  loading(){
    return <LoadingPage />
  }
})

export const Contactenos = Loadable({
  loader: () => import('../components/Contactenos/Contactenos'),
  loading(){
    return <LoadingPage />
  }
})
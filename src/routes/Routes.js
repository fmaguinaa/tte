import React, { Component } from 'react'
import * as paths from './paths'
import { Route, Switch } from 'react-router-dom'
// import { Redirect } from 'react-router'
//import { ApolloConsumer } from 'react-apollo'
//import { AuthUserContext } from '../components/Session'
//import { hasUserPermissions } from '../utils/utils'
// import Authorization from '../components/authorization/index'
import {
  Contactenos,
  Galeria,
  Landing,
  Nosotros,
} from './loader'
import { NotFound404 } from '../components/utils'

export default class Routes extends Component {
  render () {
    return (
      // <AuthUserContext.Consumer>
        // {authUser => (
          // <ApolloConsumer>
          //   {client => (
              <Switch>
                {/* <Route
                  exact
                  path={paths.home}
                  render={() => <Redirect to={paths.dashboard} />}
                /> */}
                {/* <Route
                  exact
                  path={paths.dashboard}
                  render={() => <Dashboard client={client} />}
                /> */}
                <Route
                  exact
                  path={paths.contactenos}
                  render={() => <Contactenos />}
                />
                <Route
                  exact
                  path={paths.galeria}
                  render={() => <Galeria />}
                />
                <Route
                  exact
                  path={paths.landing}
                  render={() => <Landing />}
                />
                <Route
                  exact
                  path={paths.nosotros}
                  render={() => <Nosotros />}
                />
                {/* <Route
                  exact
                  path={paths.login}
                  render={() => <Authorization />}
                /> */}
                {/* <Route
                  exact
                  path={paths.encomiendas}
                  render={() => <Encomiendas />}
                />
                <Route exact path={paths.viajes} render={() => <Viajes />} />
                {hasUserPermissions(
                  ['ADMINISTRADOR', 'SUPERVISOR', 'VENDEDOR', 'CONTROLADOR'],
                  authUser.role
                ) && (
                  <Route
                    exact
                    path={paths.solicitudes}
                    render={() => <Solicitudes />}
                  />
                )}
                {hasUserPermissions(['ADMINISTRADOR'], authUser.role) && (
                  <Route
                    exact
                    path={paths.cupones}
                    render={() => <Cupones />}
                  />
                )}
                <Route
                  exact
                  path={paths.clientes}
                  render={() => <Clientes />}
                />
                <Route
                  exact
                  path={paths.sucursales}
                  render={() => <Sucursales />}
                />
                {hasUserPermissions(
                  ['ADMINISTRADOR', 'CONTROLADOR'],
                  authUser.role
                ) && (
                  <Route
                    exact
                    path={paths.usuarios}
                    render={() => <Usuarios />}
                  />
                )}
                {hasUserPermissions(
                  ['ADMINISTRADOR', 'CONTROLADOR'],
                  authUser.role
                ) && (
                  <Route
                    exact
                    path={paths.embarcaciones}
                    render={() => <Embarcaciones client={client} />}
                  />
                )}
                <Route exact path={paths.paradas} render={() => <Paradas />} />
                <Route
                  exact
                  path={paths.rutas}
                  render={() => <Rutas client={client} />}
                />
                <Route exact path={paths.tarifas} render={() => <Tarifas />} />
                <Route
                  exact
                  path={paths.multiple}
                  render={() => <MultipleReservation client={client} />}
                />
                <Route
                  exact
                  path={paths.detalleboleto}
                  render={() => <Boleto client={client} />}
                />
                <Route
                  exact
                  path={paths.detalleencomienda}
                  render={() => <EncomiendaDetail client={client} />}
                />
                <Route
                  exact
                  path={paths.account}
                  render={() => <Account client={client} user={authUser} />}
                /> */}
                <Route render={() => <NotFound404 />} />
              </Switch>
          //   )}
          // </ApolloConsumer>
        // )}
      // </AuthUserContext.Consumer>
    )
  }
}

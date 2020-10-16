import React from 'react'
import { AsientosContainer, NavegadorContainer } from './styles'
import SeatPicker from 'react-seat-picker'
import { Button, Col, Collapse, Icon, Row } from 'antd'
import styled from 'styled-components'
import moment from 'moment'
import { Query } from 'react-apollo'
// import uuid from 'uuid/v4'
import { getAsientosDisponibles } from '../../../graphQL/queries/dashboard'
import { Loading, NotFound } from '../../utils'
import { brandColor } from '../../../components/utils'

const Panel = Collapse.Panel

const ColT = styled(Col)`
  padding-right: 32px;
  @media only screen and (max-width: 56.25em) {
    padding-right: 0;
  }
`

const SeatLoader = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  background: rgba(240,240,240,0.9);
  z-index: ${props => props.loading ? "2" : "-1"};;
  justify-content: center;
  align-items: center;
`

export default class Asientos extends React.Component {
  state = {
    // token: uuid(),
    asientosIda: [],
    asientosVuelta: [],
  }

  static getDerivedStateFromProps (prevProps, prevState) {
    if (prevProps.asientosIda !== prevState.asientosIda || prevProps.asientosVuelta !== prevState.asientosVuelta) {
      return {
        asientosIda: prevProps.asientosIda,
        asientosVuelta: prevProps.asientosVuelta
      }
    } else {
      return {
        asientosIda: prevState.asientosIda,
        asientosVuelta: prevState.asientosVuelta
      }
    }
  }

  asientosTransform = data => {
    let asientos = []
    let fila
    let actual = 0
    data.forEach((asiento, index) => {
      if (asiento.Y !== actual) {
        if (fila) asientos.push(fila)
        fila = []
        actual = asiento.Y
      }
      if (asiento.codigo)
        fila.push({
          id: Number(asiento.id_asiento),
          number: asiento.codigo,
          orientation: asiento.orientacion,
          isReserved: asiento.reservado
        })
      else fila.push(null)
    })
    asientos.push(fila)
    return asientos
  }

  render () {
    const { data } = this.props.pasajeros
    const { origen, destino, id_ida, id_vuelta, numeroPasajeros, loadingSeatVuelta, loadingSeatIda } = this.props
    //console.log("LOADING IDA", loadingSeatIda)
    const { asientosIda, asientosVuelta } = this.state
    // console.log('asientosIda', asientosIda)
    // console.log('asientosVuelta', asientosVuelta)
    const { fec_ida, fec_vuelta } = this.props
    const variablesIda = {
      origen: Number(origen),
      destino: Number(destino),
      id_viaje: Number(id_ida)
    }
    const variablesVuelta = {
      origen: Number(destino),
      destino: Number(origen),
      id_viaje: Number(id_vuelta)
    }
    return (
      <AsientosContainer>
        <div className='seat'>
          <Row>
            <ColT span={24}>
              <div className='seat-info'>
                <div className='seat-date'>
                  <span>Ida</span>
                  <Icon type='arrow-right' style={{ margin: '0 1rem' }}/>
                  <span className='seat-calendar'>
                    {moment(fec_ida, 'YYYY-MM-DD').format('DD/MM/YYYY')} <Icon type="calendar"/>
                  </span>
                </div>
                <div className='seat-detail'>
                  <div className='detail-title'>
                    <Row>
                      <Col span={16}>
                        <span>Pasajeros:</span>
                      </Col>
                      <Col span={8} style={{ textAlign: 'right' }}>
                        <span>Asientos:</span>
                      </Col>
                    </Row>
                  </div>
                  <div className="pasajeros-seat">
                    <Row>
                      <Col span={16}>
                        {(data || []).map((person,index) => (
                          <div key={index}>{`${person.nombres} ${person.apellidos}`}</div>
                        ))}
                      </Col>
                      <Col span={8}
                           style={{ textAlign: 'right' }}
                      >
                        {(asientosIda || []).map((asiento) => {
                            if (asiento)
                              return <div>{`${asiento.codigo}`}</div>
                            else
                              return <div>#</div>
                          }
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </ColT>
            <Col span={24}>
              <Collapse 
              // defaultActiveKey={['1']}
              >
                <Panel header="Seleccione su asiento" key="1">
                  <div className='seat-display'>
                    <div className='seat-content'>
                      <div className='seat-head'/>
                      <SeatLoader loading={loadingSeatIda}>
                        <Icon style={{fontSize: '3rem', color: `${brandColor}`}} type="loading"/>
                      </SeatLoader>
                      <div className='seat-body'>
                        <Query
                          query={getAsientosDisponibles}
                          variables={variablesIda}
                          fetchPolicy={'network-only'}
                          pollInterval={240000}
                          notifyOnNetworkStatusChange
                        >
                          {({ loading, error, data, refetch, networkStatus }) => {
                            if (networkStatus === 6) return <Loading />
                            if (loading) return <Loading/>
                            if (error) return <NotFound/>

                            const asientos = data.AsientosDisponibles
                              ? data.AsientosDisponibles
                              : []
                            let distribucion = this.asientosTransform(asientos)
                            return (
                              <SeatPicker
                                rows={distribucion}
                                addSeatCallback={this.props.addSeatIda}
                                removeSeatCallback={this.props.removeSeatIda}
                                maxReservableSeats={Number(numeroPasajeros)}
                                // seatWidth={27}
                              />
                            )
                          }}
                        </Query>
                      </div>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
        {fec_vuelta && (
          <div className='seat'>
            <Row>
              <ColT span={24}>
                <div className='seat-info'>
                  <div className='seat-date'>
                    <span>Vuelta</span>
                    <Icon type='arrow-right' style={{ margin: '0 1rem' }}/>
                    <span className='seat-calendar'>
                    {moment(fec_vuelta, 'YYYY-MM-DD').format('DD/MM/YYYY')} <Icon type="calendar"/>
                  </span>
                  </div>
                  <div className='seat-detail'>
                    <div className='detail-title'>
                      <Row>
                        <Col span={16}>
                          <span>Pasajeros:</span>
                        </Col>
                        <Col span={8} style={{ textAlign: 'right' }}>
                          <span>Asientos:</span>
                        </Col>
                      </Row>
                    </div>
                    <div className="pasajeros-seat">
                      <Row>
                        <Col span={16}>
                          {(data || []).map(person => (
                            <div>{`${person.nombres} ${person.apellidos}`}</div>
                          ))}
                        </Col>
                        <Col span={8}
                             style={{ textAlign: 'right' }}
                        >
                          {(asientosVuelta || []).map((asiento) => {
                              if (asiento)
                                return <div>{`${asiento.codigo}`}</div>
                              else
                                return <div>#</div>
                            }
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </ColT>
              <Col span={24}>
                <Collapse>
                  <Panel header="Seleccione su asiento" key="2">
                    <div className='seat-display'>
                      <div className='seat-content'>
                        <div className='seat-head'/>
                        <SeatLoader loading={loadingSeatVuelta}>
                          <Icon style={{fontSize: '3rem', color: `${brandColor}`}} type="loading"/>
                        </SeatLoader>
                        <div className='seat-body'>
                          <Query
                            query={getAsientosDisponibles}
                            variables={variablesVuelta}
                            fetchPolicy={'network-only'}
                            pollInterval={240000}
                            notifyOnNetworkStatusChange
                          >
                            {({ loading, error, data, refetch, networkStatus }) => {
                              if (networkStatus === 6) return <Loading />
                              if (loading) return <Loading/>
                              if (error) return <NotFound/>

                              const asientos = data.AsientosDisponibles
                                ? data.AsientosDisponibles
                                : []

                              let distribucion = this.asientosTransform(asientos)
                              return (
                                <SeatPicker
                                  rows={distribucion}
                                  addSeatCallback={this.props.addSeatVuelta}
                                  removeSeatCallback={this.props.removeSeatVuelta}
                                  maxReservableSeats={Number(numeroPasajeros)}
                                  // seatWidth={27}
                                />
                              )
                            }}
                          </Query>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </div>
        )}
        <NavegadorContainer>
          <Button onClick={this.props.next} disabled={!this.props.siguiente}>
            Continuar
          </Button>
        </NavegadorContainer>
      </AsientosContainer>
    )
  }
}


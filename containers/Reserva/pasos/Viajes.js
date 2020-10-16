import React from 'react'
import { NavegadorContainer, ViajeContainer } from './styles'
import { Button, Form, Icon, Row } from 'antd'
import moment from 'moment'
import { Query } from 'react-apollo'
import { Loading, NotFound } from '../../utils'

import { getViajesWithOrigenAndDestino } from '../../../graphQL/queries/viajes'
import RowTravel from '../../../components/ReservaComponents/RowTravel'

class ViajeWrapper extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0)    
  }

  render () {
    const {
      origen, destino, id_ruta, fec_ida, fec_vuelta, getViajeIda, getViajeVuelta, id_ida, id_vuelta
    } = this.props
    // console.log("fec ida",fec_ida)
    // console.log("fec ida beginning",moment(new Date(fec_ida)).startOf('day'))
    // console.log("fec ida final",moment(new Date(fec_ida)).endOf('day'))
    const variablesIda = {
      origen: Number(origen),
      destino: Number(destino),
      id_ruta: Number(id_ruta),
      beginningDay: moment(new Date(fec_ida)).startOf('day'),
      finalDay: moment(new Date(fec_ida)).endOf('day')
    }
    const variablesVuelta = {
      origen: Number(destino),
      destino: Number(origen),
      id_ruta: Number(id_ruta),
      beginningDay: moment(new Date(fec_vuelta)).startOf('day'),
      finalDay: moment(new Date(fec_vuelta)).endOf('day')
    }
    return (
      <div>
        <ViajeContainer>
          <Row>
            <div className='viaje-header'>
              <span>Ida</span>
              <Icon type='arrow-right' style={{ margin: '0 1rem' }}/>
              <span className='viaje-date'>
                {moment(fec_ida, 'YYYY-MM-DD').format('DD/MM/YYYY')} <Icon type="calendar"/>
              </span>
            </div>
          </Row>
          <Query query={getViajesWithOrigenAndDestino} variables={variablesIda}>
            {({ loading, error, data }) => {
              if (loading) return <Loading/>
              if (error) return <NotFound/>
              const dataViajes = data.Viajes ? data.Viajes : []
              if (!dataViajes.length) {
                return <NotFound/>
              }
              return dataViajes.map(viaje => (
                <RowTravel key={viaje.id_viaje} viaje={viaje} setViaje={getViajeIda} viajeSelected={id_ida}/>
              ))
            }}
          </Query>
        </ViajeContainer>
        {fec_vuelta && (
          <ViajeContainer>
            <Row>
              <div className='viaje-header'>
                <span>Vuelta</span>
                <Icon type='arrow-right' style={{ margin: '0 1rem' }}/>
                <span className='viaje-date'>
                {moment(fec_vuelta, 'YYYY-MM-DD').format('DD/MM/YYYY')} <Icon type="calendar"/>
              </span>
              </div>
            </Row>
            <Query
              query={getViajesWithOrigenAndDestino}
              variables={variablesVuelta}
            >
              {({ loading, error, data }) => {
                if (loading) return <Loading/>
                if (error) return <NotFound/>
                const dataViajes = data.Viajes ? data.Viajes : []
                if (!dataViajes.length) {
                  return <NotFound/>
                }
                return dataViajes.map(viaje => (
                  <RowTravel key={viaje.id_viaje} viaje={viaje} setViaje={getViajeVuelta}
                             viajeSelected={id_vuelta}/>
                ))
              }}
            </Query>
          </ViajeContainer>
        )}
        <NavegadorContainer>
          <Button onClick={this.props.next} disabled={(!id_vuelta ^ !fec_vuelta) || !id_ida}>
            Continuar
          </Button>
        </NavegadorContainer>
      </div>
    )
  }
}

const Viajes = Form.create()(ViajeWrapper)

export default Viajes

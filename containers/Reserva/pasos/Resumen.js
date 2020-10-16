import React, { Component } from 'react'
import { ResumenContainer, StateContainer } from './styles'
import { Divider, Icon } from 'antd'
import moment from 'moment'

export default class ResumenComponent extends Component {
  render () {
    const { origen, destino, fec_ida, fec_vuelta, numeroPasajeros, montoVuelta, montoIda, precio } = this.props
    return (
      <div>
        <ResumenContainer>
          <div className='resumen-header'>
            <div className='left'>{origen ? origen.nombre : ''}</div>
            <Icon type='arrow-right'/>
            <div className='right'>{destino ? destino.nombre : ''}</div>
          </div>
          <Divider/>
          <div className='resumen-content'>
            <div>
              <div className='left'>Ida:</div>
              <div className='right'>
                {moment(fec_ida, 'YYYY-MM-DD').format('DD/MM/YYYY')}
              </div>
            </div>
            {
              fec_vuelta &&
                <div>
                  <div className='left'>Vuelta:</div>
                  <div className='right'>{moment(fec_vuelta, 'YYYY-MM-DD').format('DD/MM/YYYY')}</div>
                </div>
            }
            <div>
              <div className='left'>Número de pasajeros:</div>
              <div className='right'>{numeroPasajeros}</div>
            </div>
          </div>
          <Divider/>
          <div className='resumen-tip'>
            <div className='left'>Monto Total:</div>
            <div className='right'>S/. {precio}</div>
          </div>
        </ResumenContainer>
        {this.props.step === 4 && (
          <StateContainer>
            Estado: <b>Pagado</b>
          </StateContainer>
        )}
      </div>
    )
  }
}

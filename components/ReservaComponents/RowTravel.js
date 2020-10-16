import React from 'react'
import { Col, Icon, Row } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import { secondaryColor } from '../utils'

const diffDates = (initialDate, finalDate) => {
  let initial = moment(initialDate)
  let final = moment(finalDate)
  const hours = final.diff(initial, 'hours')
  return hours + 'h ' + (final.diff(initial, 'minutes') - 60 * hours) + 'm'
}

const RowTime = styled.div`
  border: 1px solid ${props => Number(props.viajeId) === Number(props.viajeSelected) ? secondaryColor : '#d9d9d9'};
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;
  &:hover {
    border: 1px solid ${secondaryColor};
    cursor: pointer;
  }
  & .ant-row-flex > .ant-col:nth-child(1) {
    @media only screen and (max-width: 56.25em) {
      margin-bottom: 1rem;
    }
  }
`

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  span {
    font-size: 2.25rem;
  }
  .title {
    font-size: 1rem;
  }
  .subtitle {
    font-size: 2rem;
  }
  .price {
    font-size: 2.25rem;
  }
`

export default (props) => {
  const { viaje, setViaje, viajeSelected, disabled } = props
  return (
    <RowTime
      viajeId={!disabled ? viaje.id_viaje : 0}
      viajeSelected={!disabled ? viajeSelected : 1}
      onClick={() => {
        if (!disabled) {
          setViaje(
            viaje.id_viaje,
            viaje.monto,
            viaje.fec_hora_partida,
            viaje.fec_hora_llegada
          )
        }
      }}
    >
      <Row gutter={16} align="middle" type="flex">
        <Col xs={{ span: 24 }} lg={{ span: 14 }}>
          <CenteredBox row>
            <span>
              {moment(viaje.fec_hora_partida).format('HH:mm a')}
            </span>
            <Icon style={{ color: `${secondaryColor}`, fontSize: '2.5rem', margin: '0 2rem' }} type='right'/>
            <span>
              {moment(viaje.fec_hora_llegada).format('HH:mm a')}
            </span>
          </CenteredBox>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 10 }}>
          <Row gutter={16}>
            <Col span={12} style={{ borderRight: `1px solid #d9d9d9` }}>
              <CenteredBox>
                <div className="title">Duración aprox.*</div>
                <div className="subtitle">
                  {diffDates(
                    viaje.fec_hora_partida,
                    viaje.fec_hora_llegada
                  )}
                </div>
              </CenteredBox>
            </Col>
            <Col span={12}>
              <CenteredBox>
                <div className="title">Precio desde</div>
                <div className="price">{`S/. ${viaje.monto || 0}`}</div>
              </CenteredBox>
            </Col>
          </Row>
        </Col>
      </Row>
    </RowTime>
  )
}

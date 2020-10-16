import React from 'react'
import styled from 'styled-components'
import { Button, Col, DatePicker, Form, Icon, InputNumber, message, Row, Select } from 'antd'
import { brandColor, secondaryColor } from '../../components/utils'
import { searchRutasBy } from '../../graphQL/queries/rutas'
import { mpWebCheckout } from '../../graphQL/queries/mercadopago'
import Router from 'next/router'
import moment from 'moment'
import { reduce } from '../../utils'

message.config({
  duration: 3,
  maxCount: 3
})

const { Option } = Select
const { Item } = Form

const FormSellerContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  @media (min-width: 576px) and (max-width: 1200px) {
    height: 100px;
  }
`

const CustomButton = styled(Button)`
  background: #f7af00;
  color: white;
  height: 50px;
  font-size: 18px;
  text-transform: uppercase;
  border: none;
  box-shadow: none;
  border-radius: 10px;
  &:hover,
  &:active,
  &:focus {
    background: #ff6108;
    color: white;
  }
`

const FormSeller = styled.div`
  width: 90%;
  position: absolute;
  top: -25rem;
  border-radius: 20px;
  z-index: 2;
  background: rgba(41, 43, 115, 0.8);
  & .form-title {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px 0;
    display: block;
    text-align: left;
    @media (max-width: 576px) {
      text-align: center;
    }
  }
  & .ant-form {
    background: rgba(${brandColor}, 0.6);
    padding: 2rem;
    display: flex;
    margin: 0;
    justify-content: center;
    align-items: center;
    .ant-row {
      width: 100%;
      & > div {
        padding: 0 !important;
      }
    }
    .ant-form-item {
      width: 100%;
      padding: 0;
      @media (min-width: 1200px){
        margin: 0;
      }
      & .ant-select-selection {
        border-radius: 0;
        box-shadow: none;
        border-color: #d9d9d9 !important;
        svg {
          color: black;
        }
        .placeholder-icon {
          margin-right: 10px;
        }
        &:focus,
        &:active,
        &:hover {
          border-color: ${secondaryColor} !important;
        }
      }
    }
    .custom-select-radius-left .ant-select-selection {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .ant-calendar-picker {
      width: 100%;
      text-align: center;
      .ant-input {
        background: white !important;
        border: 1px solid #d9d9d9;
        border-radius: 0;
        height: 50px;
        padding-left: 40px;
        font-size: 18px;
        box-shadow: none;
      }
      i {
        left: 12px;
        width: 18px;
        height: 18px;
      }
      svg {
        color: black;
        font-size: 18px;
      }

      &:hover,
      &:active,
      &:focus {
        border-color: ${secondaryColor};
      }
    }
  }
  & .ant-form-item-control-wrapper {
    width: 100%;
  }
  & .search {
    .send-btn, .send-btn-row {
      background: ${secondaryColor};
      border: none;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
  @media (min-width: 576px) and (max-width: 1200px) {
    .radius-left {
      .ant-select-selection,
      .ant-calendar-picker .ant-input {
        border-top-left-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
      }
    }
    .radius-right {
      .ant-select-selection,
      .ant-calendar-picker .ant-input {
        border-top-right-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
      }
    }
    .send-btn {
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
      &-row{
        border-radius: 10px !important;
      }
    }
  }
  @media (max-width: 576px) {
    position: relative;
    margin: 0 auto;
    top: -8rem;
    left: 0;
    .ant-select-selection,
    .ant-calendar-picker .ant-input,
    .send-btn, .send-btn-row {
      border-radius: 10px !important;
    }
    .ant-calendar-picker .ant-input {
      padding-left: 40px;
      font-size: 18px;
    }
  }
  .ant-col{
    max-height: 74px;
  }
`

const CustomSelect = styled(Select)`
  font-size: 18px;
  & .ant-select-selection {
    background: white;
    border-radius: 10px;
    height: 50px;
    box-shadow: none;
    & .ant-select-selection__rendered {
      line-height: 50px;
    }
    svg {
      color: black;
    }
  }
`

const CustomInputButton = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 24px;
  width: 100%;
  @media (min-width: 1200px){
    margin: 0;
  }
  .label{
    display: flex;
    background: white;
    color: #bfbfbf;
    font-size: 18px;
    padding: 0 0 0 11px;
    line-height: 50px;
    width: 30% !important; 
    span{
      display: flex;
    }
    i{
      margin-right: 10px;
      margin-top: 16px;
      color: black;
    }
    @media (min-width: 1200px){
      width: 50% !important;
    }
    @media (max-width: 576px) {
      border-top-left-radius: 10px !important;
      border-bottom-left-radius: 10px !important;
    }
  }
  .ant-btn{
    height: 100%;
    border-radius: 0px;
    border: 0;
    font-size: 2rem;
    width: 23% !important;
    padding: 0 1rem !important;
    box-shadow: none;
    color: ${brandColor};
    &:hover,
    &:active,
    &:focus {
      color: ${secondaryColor};
      box-shadow: none !important;
    }
    @media (max-width: 1200px) {
      padding: 0 2rem !important;
    }
    @media (min-width: 1200px) {
      padding: 0 !important;
      width: 15% !important;
    }
  }
  @media (max-width: 1200px) {
    .right{
      border-top-right-radius: 10px !important;
      border-bottom-right-radius: 10px !important;
    }
  }
  .ant-form-item{
    width: 24% !important;
    @media (min-width: 1200px) {
      width: 20% !important;
    }
  }
  .ant-form-item-control-wrapper{
    .ant-form-item-control{
      line-height: 0;
      .ant-input-number{
        width: 100%;
        height: 50px;
        border: 0;
        box-shadow: none;
        border-radius: 0px;
        .ant-input-number-input{
          height: 50px;
          text-align: center;
        }
      }
      .ant-input-number-handler-wrap{
        display: none;
      }
    }
  }
  
`

class FormSellerWrapper extends React.Component {
  state = {
    asientos: [],
    paradas: [],
    origenID: null,
    numPasajeros: 1,
    loading: false,
    viajesDisabled: true,
    paraderosDisabled: true,
    fecVueltaDisabled: true,
    destinoDisabled: true,
    tipoViaje: false
  }

  selectRuta = async value => {
    this.props.form.setFieldsValue({ origen: undefined, destino: undefined })
    try {
      if (value) {
        const paradas = await this.props.client.query({
          query: searchRutasBy,
          variables: {
            ruta: Number(value)
          } // ,
        })
        this.setState({
          paradas: paradas.data.Paradas,
          destinoDisabled: true,
          paraderosDisabled: false,
          selectionAsiento: false
        })
      } else {
        message.error('No se pudo encontrar las paradas de esta ruta')
      }
    } catch (e) {
      console.log('error on selectRuta', e)
      message.error('Hubo un error en el sistema')
    }
  }

  changeFechaDeViaje = value => {
    this.setState({
      fec_ida: value ? value.startOf('day') : undefined,
      fecVueltaDisabled: !value
    })
    this.props.form.setFieldsValue({
      fec_vuelta: undefined
    })
  }

  disabledDate = current => {
    let dates = (this.props.availablesDates.getFutureDayViajes || []).map(
      i => i.date
    )
    let currentFormated = current.format('YYYY-MM-DD')
    let isCurrentAvailable = !!dates.find(
      d => currentFormated === moment(d).format('YYYY-MM-DD')
    )
    return (
      current &&
      (current <
        moment()
          .subtract(1, 'days')
          .endOf('day') ||
        !isCurrentAvailable)
    )
  }
  disabledDateDestino = current => {
    let dates = (this.props.availablesDates.getFutureDayViajes || []).map(
      i => i.date
    )
    let currentFormated = current.format('YYYY-MM-DD')
    let isCurrentAvailable = !!dates.find(
      d => currentFormated === moment(d).format('YYYY-MM-DD')
    )
    return (
      current &&
      (current < this.state.fec_ida.endOf('day') || !isCurrentAvailable)
    )
  }
  test = async () => {
    const test = await this.props.client.query({
      query: mpWebCheckout,
      variables: {
        email: 'ch.richard22@gmail.com',
        amount: 1.0,
        description: 'Ticket Tangamandapio - Lima C9',
        installments: 1,
        token: 'test',
        payment_method_id: 'visa',
        issuer_id: '1000'
      }
    })
    console.log('test', test)
  }
  verifyForm = () => {
    this.setState({
      loading: true
    })

    const form = this.props.form
    form.validateFields((err, values) => {
      if (err) {
        this.setState({ loading: false })
      } else {
        const reduceValues = reduce(values)
        Router.push(
          {
            pathname: '/reserva',
            query: {
              id_ruta: reduceValues.ruta,
              origen: reduceValues.origen,
              destino: reduceValues.destino,
              numeroPasajeros: reduceValues.numeroPasajeros,
              fec_ida: reduceValues.fec_ida.format('YYYY-MM-DD HH:mm:ss'),
              fec_vuelta: reduceValues.fec_vuelta
                ? reduceValues.fec_vuelta.format('YYYY-MM-DD HH:mm:ss')
                : null
            }
          },
          '/reserva'
        )
      }
    })
  }

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form
    const { rutas } = this.props
    const {
      fecVueltaDisabled,
      paraderosDisabled,
      numPasajeros,
      paradas,
      origenID,
      destinoDisabled,
      loading,
      tipoViaje
    } = this.state
    const optionsRutas = (rutas.Rutas || []).map(ruta => (
      <Option key={ruta.id_subtipo} value={ruta.id_subtipo}>
        {ruta.subclase}
      </Option>
    ))

    // let lastParada = paradas.length - 1
    const optionsParadasOrigen = (paradas || []).map((parada, index) => {
      return (
        <Option key={parada.parada} value={parada.parada}>
          {parada.Parada.nombre}
        </Option>
      )
    })

    const optionsParadasDestino = (paradas || []).map((parada, index) => {
      if (
        origenID !== parada.parada
      ) {
        return (
          <Option
            key={parada.parada}
            value={parada.parada}
            disabled={parada.Parada.estado !== 5}
          >
            {parada.Parada.nombre}
          </Option>
        )
      } else {
        return null
      }
    })

    return (
      <FormSellerContainer>
        <FormSeller>
          <Form hideRequiredMark onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 3 }}>
                <Item className='custom-select-radius-left'>
                  {getFieldDecorator('ruta', {
                    rules: [
                      {
                        required: true,
                        message: 'Por favor, seleccione una ruta'
                      }
                    ]
                  })(
                    <CustomSelect
                      onChange={this.selectRuta}
                      placeholder={
                        <span>
                          <Icon className='placeholder-icon' type='branches' />
                          <span>Rutas</span>
                        </span>
                      }
                    >
                      {optionsRutas}
                    </CustomSelect>
                  )}
                </Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 3 }}>
                <Item className='radius-right'>
                  {getFieldDecorator('origen', {
                    rules: [
                      {
                        required: true,
                        message: 'Seleccione una parada'
                      }
                    ]
                  })(
                    <CustomSelect
                      onChange={e => {
                        this.props.form.setFieldsValue({
                          destino: undefined
                        })
                        this.setState({
                          destinoDisabled: false,
                          origenID: e
                        })
                      }}
                      disabled={paraderosDisabled || paradas.length === 0}
                      placeholder={
                        <span>
                          <Icon
                            className='placeholder-icon'
                            type='environment'
                          />
                          <span>Origen</span>
                        </span>
                      }
                    >
                      {optionsParadasOrigen}
                    </CustomSelect>
                  )}
                </Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 3 }}>
                <Item className='radius-left'>
                  {getFieldDecorator('destino', {
                    rules: [
                      { required: true, message: 'Seleccione una parada' }
                    ]
                  })(
                    <CustomSelect
                      disabled={
                        paraderosDisabled ||
                        paradas.length === 0 ||
                        destinoDisabled
                      }
                      placeholder={
                        <span>
                          <Icon
                            className='placeholder-icon'
                            type='environment'
                          />
                          <span>Destino</span>
                        </span>
                      }
                    >
                      {optionsParadasDestino}
                    </CustomSelect>
                  )}
                </Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 4 }}>
                <CustomInputButton>
                  <div className='label'>
                    <span>
                      <Icon type='user' />
                      {numPasajeros === 1 ? 'Pasajero' : 'Pasajeros'}
                    </span>
                  </div>
                  <Button
                    icon='minus-circle'
                    onClick={() => {
                      if (numPasajeros > 1) {
                        this.setState({ numPasajeros: numPasajeros - 1 })
                        setFieldsValue({
                          numeroPasajeros: numPasajeros - 1,
                        });
                      }
                    }}
                  />
                  <Item>
                    {getFieldDecorator('numeroPasajeros', {
                      initialValue: numPasajeros,
                      rules: [
                        {
                          type: 'number',
                          message: 'Ingrese una cantidad de pasajeros válida'
                        },
                        {
                          required: true,
                          message: 'Por favor, ingrese la cantidad de pasajeros'
                        }
                      ]
                    })(
                      <InputNumber
                        min={1}
                        max={10}
                        placeholder='Pasajeros'
                      />
                    )}
                  </Item>
                  <Button
                    className='right'
                    icon='plus-circle'
                    onClick={() => {
                      if (numPasajeros <= 10) {
                        this.setState({ numPasajeros: numPasajeros + 1 })
                        setFieldsValue({
                          numeroPasajeros: numPasajeros + 1,
                        });
                      }
                    }}
                  />
                </CustomInputButton>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 3 }}>
                <Item className='radius-left'>
                  {getFieldDecorator('tipo_viaje', {
                    initialValue: "1",
                    rules: [
                      { required: true, message: 'Seleccione un tipo de viaje' }
                    ]
                  })(
                    <CustomSelect
                      placeholder={
                        <span>
                          <Icon
                            className='placeholder-icon'
                            type='swap'
                          />
                          <span>Tipo de Viaje</span>
                        </span>
                      }
                      onChange={(value) => {
                        this.setState({ tipoViaje: value === '0' })
                      }}
                    >
                      <Option value="0">Ida y Vuelta</Option>
                      <Option value="1">Solo Ida</Option>
                    </CustomSelect>
                  )}
                </Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: tipoViaje ? 3 : 6 }}>
                <Item className='radius-right'>
                  {getFieldDecorator('fec_ida', {
                    initialValue: undefined,
                    rules: [
                      {
                        type: 'object',
                        required: true,
                        message: 'Ingrese una fecha válida'
                      }
                    ]
                  })(
                    <DatePicker
                      disabledDate={this.disabledDate}
                      placeholder={'Ida'}
                      onChange={this.changeFechaDeViaje}
                      format={'DD/MM/YYYY'}
                    />
                  )}
                </Item>
              </Col>
              {
                tipoViaje &&
                <Col xs={{ span: 24 }} sm={{ span: 12 }} xl={{ span: 3 }}>
                  <Item className='radius-left'>
                    {getFieldDecorator('fec_vuelta', {
                      rules: [
                        {
                          type: 'object'
                        }
                      ]
                    })(
                      <DatePicker
                        disabledDate={this.disabledDateDestino}
                        disabled={fecVueltaDisabled}
                        placeholder={'Vuelta'}
                        format={'DD/MM/YYYY'}
                      />
                    )}
                  </Item>
                </Col>
              }
              <Col xs={{ span: 24 }} sm={{ span: tipoViaje ? 12 : 24 }} xl={{ span: 2 }}>
                <Item className='search' style={{ marginBottom: 0 }}>
                  <CustomButton
                    className={tipoViaje ? 'send-btn' : 'send-btn-row'}
                    block
                    loading={loading}
                    onClick={this.verifyForm}
                  >
                    {!loading && <Icon type='search' />}
                  </CustomButton>
                  {/* <CustomButton onClick={this.test}> */}
                  {/* <Icon type='search' /> */}
                  {/* </CustomButton> */}
                </Item>
              </Col>
            </Row>
          </Form>
        </FormSeller>
      </FormSellerContainer>
    )
  }
}

const Booking = Form.create()(FormSellerWrapper)

export default Booking

// export default compose(
//   graphql(getFutureDayViajes, {
//     name: 'availablesDates',
//     options: props => {
//       return {
//         notifyOnNetworkStatusChange: true
//       }
//     }
//   }),
//   graphql(getAllRutasNames, {
//     name: 'rutas',
//     options: props => {
//       return {
//         notifyOnNetworkStatusChange: true
//       }
//     }
//   }),
//   withApollo
// )(Booking)

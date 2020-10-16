import React, { Component } from 'react'
import { PagoContainer } from './styles'
import {
  Input,
  Form,
  Button,
  Radio,
  Row,
  Col,
  Icon
} from 'antd'

class PagoWrapper extends Component {

  state = {
    isFactura: false,
    mp_token: '',             //Token tarjeta
    mp_installments: 0,       //numero de cuotas
    mp_issuer_id: '',         //ID entidad financiera
    mp_payment_method_id: '',  //Metodo de pago, visa, mastercard
    doSubmit: false,
    mp_payment_type_id: '',
    mp_email: '',
    urlTarjeta: ''
  }

  componentDidMount () {
    window.Mercadopago.setPublishableKey('TEST-754da173-5d78-4e01-a1e5-309b1a6e98d9')
    window.Mercadopago.getIdentificationTypes()

  }

  setPaymentMethodInfo = (status, response) => {
    this.setState({
      mp_issuer_id: response[0].id,
      mp_payment_method_id: response[0].payment_type_id,
      urlTarjeta: response[0].thumbnail
    })
    if (status === 200) {
      let form = document.querySelector('#pay')
      if (document.querySelector('input[name=paymentMethodId]') == null) {
        let paymentMethod = document.createElement('input')
        paymentMethod.setAttribute('name', 'paymentMethodId')
        paymentMethod.setAttribute('type', 'hidden')
        paymentMethod.setAttribute('value', response[0].id)
        form.appendChild(paymentMethod)
      } else {
        document.querySelector('input[name=paymentMethodId]').value = response[0].id
      }
    }
  }

  addEvent = (el, eventName, handler) => {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler)
    } else {
      el.attachEvent('on' + eventName, function () {
        handler.call(el)
      })
    }
  }

  doPay = (event) => {
    this.setState({
      mp_email: document.querySelector('#email').value
    })
    event.preventDefault()
    if (!this.state.doSubmit) {
      var $form = document.querySelector('#pay')
      window.Mercadopago.createToken($form, this.ResponseHandler) // The function "sdkResponseHandler" is defined below
      return false
    }
  }

  ResponseHandler = (status, response) => {
    console.log(response)
    if (status !== 200 && status !== 201) {
      // 205 	parameter cardNumber can not be null/empty 	Enter your card number.
      // 208 	parameter cardExpirationMonth can not be null/empty 	Select a month.
      // 209 	parameter cardExpirationYear can not be null/empty 	Select a year.
      // 212 	parameter docType can not be null/empty 	Enter your identification type.
      // 213 	The parameter cardholder.document.subtype can not be null or empty 	Enter your identification subtype.
      // 214 	parameter docNumber can not be null/empty 	Enter your identification number.
      // 220 	parameter cardIssuerId can not be null/empty 	Enter your issuing bank.
      // 221 	parameter cardholderName can not be null/empty 	Enter your full name.
      // 224 	parameter securityCode can not be null/empty 	Enter the security code.
      //   E301 	invalid parameter cardNumber 	There is something wrong with that number. Please reenter.
      //   E302 	invalid parameter securityCode 	Check the security code.
      // 316 	invalid parameter cardholderName 	Enter a valid name.
      // 322 	invalid parameter docType 	Check your identification type.
      // 323 	invalid parameter cardholder.document.subtype 	Enter your identification subtype.
      // 324 	invalid parameter docNumber 	Enter your identification number.
      // 325 	invalid parameter cardExpirationMonth 	Check the date.
      // 326 	invalid parameter cardExpirationYear 	Check the date.
      if (status === 205 || status === 324 || status === 'E301') {
        alert('Ha ingresado un número de tarjeta inválido')
      } else {
        if (status === 208 || status === 209 || status === 325 || status === 326) {
          alert('Ha ingresado una fecha de expiración inválida')
        } else {
          if (status === 214 || status === 324) {
            alert('Ha ingresado un documento de identidad inválido')
          } else {
            if (status === 212 || status === 322) {
              alert('Ha ingresado un tipo de documento de identidad inválido')
            } else {
              if (status === 316 || status === 'E302') {
                alert('Ha ingresado un CCV inválido')
              } else {
                alert('Hubo un error con los datos ingresados para el pago')
              }
            }
          }
        }
      }
    } else {
      let form = document.querySelector('#pay')
      let card = document.createElement('input')
      card.setAttribute('name', 'token')
      card.setAttribute('type', 'hidden')
      card.setAttribute('value', response.id)
      form.appendChild(card)
      this.setState({ doSubmit: true })
      this.goNext(response)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { ruc, razonSocial, direccion, tip_comprobante } = values
        this.props.saveEmpresa({
          ruc: Number(ruc),
          razon_social: razonSocial,
          direccion
        }, tip_comprobante, this.props.next)
      }
    })
  }

  goNext = (mercadoPagoResponse) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { ruc, razonSocial, direccion, tip_comprobante } = values
        this.props.saveEmpresa({
            ruc: Number(ruc),
            razon_social: razonSocial,
            direccion
          }, tip_comprobante,
          mercadoPagoResponse,
          this.state.mp_issuer_id,
          this.state.mp_email,
          this.props.next)
      }
    })
  }

  rucFieldsRequired = e => {
    this.setState(
      {
        isFactura: e.target.value === '34'
      },
      () => {
        this.props.form.validateFields(
          ['ruc', 'razonSocial', 'direccion'],
          { force: true }
        )
      }
    )
  }

  render () {
    const {
      getFieldDecorator
    } = this.props.form

    const {isFactura}=this.state
    return (
      <PagoContainer>
        <div>
          <h2>Tipo de pago</h2>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Form.Item style={{ padding: 0 }}>
              {getFieldDecorator('tip_comprobante', {
                initialValue: '33',
                rules: [{ required: false, message: 'Escoja el tipo de comprobante' }]
              })(
                <Radio.Group onChange={this.rucFieldsRequired}>
                  <Radio value='33'>BOLETA</Radio>
                  <Radio value='34'>FACTURA</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <div style={{ padding: 0, paddingBottom: '24px', textAlign: 'justify', fontStyle: 'oblique' }}>
              Si a continuación no ingresa los siguientes datos, se utilizará la información del primer viajero para generar su boleta de pago.
            </div>
            <Form.Item label={'RUC '+(isFactura?'(Obligatorio)':'(Opcional)')}>
              {getFieldDecorator('ruc', {
                rules: [{ required: isFactura,
                  //message: 'Ingrese el RUC'
                  //message: '  '
                }],
              })(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label={'Nombre o Razón social '+(isFactura?'(Obligatorio)':'(Opcional)')}>
              {getFieldDecorator('razonSocial', {

                rules: [{
                  required: isFactura,
                  //message: 'Ingrese la razón social'
                  //message: '  '
                }],
              })(
                <Input/>
              )}
            </Form.Item>
            <Form.Item label={'Dirección '+(isFactura?'(Obligatorio)':'(Opcional)')}>
              {getFieldDecorator('direccion', {
                rules: [{ required: isFactura,
                  //message: 'Ingrese la dirección'
                  //message: '  '
                }],
              })(
                <Input/>
              )}
            </Form.Item>
          </Form>
          <h2>Datos de la Tarjeta</h2>
          <Form id='pay' name='pay' onSubmit={this.doPay}>
            <Form.Item name="email" label={'Email'}>
              {getFieldDecorator('email', {
                initialValue: 'asd@gmail.com',
                rules: [{ type: 'email', required: true }],
              })(
                <Input placeholder='Correo electrónico'/>
              )}
            </Form.Item>
            <Row gutter={16}>
              <Col xs={{span: 24}} sm={{span:20}}>
                <Form.Item label={'Número de Tarjeta de Crédito o Débito'}>
                  {getFieldDecorator('cardNumber', {
                    initialValue: '4009 1753 3280 6176',
                    rules: [{ required: true, message: 'Ingrese su número de Tarjeta de Crédito o Débito' }],
                    onChange: e => {
                      let bin = e.target.value.replace(/[ .-]/g, '').slice(0, 6)
                      setTimeout(() => {
                        if (bin.length >= 6) {
                          console.log('bin', bin)
                          window.Mercadopago.getPaymentMethod({
                            'bin': bin
                          }, this.setPaymentMethodInfo)
                        }
                      }, 100)
                    }
                  })(
                    <Input
                      placeholder='xxxx xxxx xxxx xxxx'
                      data-checkout="cardNumber"
                      addonAfter={
                        this.state.urlTarjeta ? 
                          <img src={this.state.urlTarjeta}/> :
                          <Icon type="credit-card" theme="filled" />
                      }
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xs={{span: 24}} sm={{span:4}}>
                <Form.Item label={'CCV'}>
                  {getFieldDecorator('securityCode', {
                    initialValue: '123',
                    rules: [{ required: true, message: 'Ingrese su número de seguridad' }],
                  })(
                    <Input placeholder='xxx' data-checkout="securityCode"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label={'Mes de Vencimiento'}>
                  {getFieldDecorator('cardExpirationMonth', {
                    initialValue: '12',
                    rules: [{ required: true, message: 'Ingrese mes de vencimiento' }],
                  })(
                    <Input placeholder='12' data-checkout="cardExpirationMonth"/>
                  )}
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label={'Año de Vencimiento'}>
                  {getFieldDecorator('cardExpirationYear', {
                    initialValue: '2020',
                    rules: [{ required: true, message: 'Ingrese año de vencimiento' }],
                  })(
                    <Input placeholder='2020' data-checkout="cardExpirationYear"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label={'Titular de la tarjeta'}>
              {getFieldDecorator('cardholderName', {
                initialValue: 'PADO',
                rules: [{ required: true, message: 'Ingrese el nombre del titular de la tarjeta' }],
              })(
                <Input placeholder='APRO' data-checkout="cardholderName"/>
              )}
            </Form.Item>
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 8 }}>
                <Form.Item label={'Tipo de Documento'}>
                  {getFieldDecorator('docType', {
                    initialValue: 'DNI',
                    rules: [{ required: true, message: 'Seleccione un tipo de documento' }],
                  })(
                    <select className="pay-select" id="docType" data-checkout="docType"></select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 16 }}>
                <Form.Item label={'Número de Documento'}>
                  {getFieldDecorator('docNumber', {
                    initialValue: '12345678',
                    rules: [{ required: true, message: 'Ingrese su número de documento' }],
                  })(
                    <Input data-checkout="docNumber"/>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <div className='pay-btn'>
                <Button
                  htmlType="submit"
                >
                  Pagar
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
        {
        }
      </PagoContainer>
    )
  }
}

const PagoComponent = Form.create()(PagoWrapper)

export default PagoComponent

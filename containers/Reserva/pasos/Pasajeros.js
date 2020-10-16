import React, { Component } from 'react'
import { NavegadorContainer, PasajerosContainer } from './styles'
import { Button, Col, Form, Input, InputNumber, Row, Select, } from 'antd'
import { getAllDocumentosIdentidad } from '../../../graphQL/queries/tiposGenerales'
import { getAllNacionalidades } from '../../../graphQL/queries/nacionalidades'
import { compose, graphql, Query } from 'react-apollo'
import { range } from 'lodash'
import moment from 'moment'

const { Option } = Select

class PasajeroComponent extends Component {
  state = {
    reservaInfo: {},
    idForm: 0
  }

  form = React.createRef()

  getAge = dateString => moment().diff(moment(dateString, 'YYYY-MM-DD'), 'years')

  enviarPasajerosInfo = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          keys, apellidos, nombres, contactName, contactPhone, correo, direccion, docs, edad, genero, nacionalidad, telefono, tip_documento
        } = values
        // console.log('DATOS DE PASAJEROS', values);
        const data = keys.map(key => {
          const person = {
            apellidos: apellidos[key],
            nombres: nombres[key],
            correo: correo[key],
            direccion: direccion[key],
            docs: docs[key],
            edad: edad[key],
            genero: genero[key],
            nacionalidad: nacionalidad[key],
            telefono: telefono[key],
            tip_documento: tip_documento[key],
          }
          return person
        })
        this.props.saveData({ data, contactName, contactPhone }, this.props.next)
      }
    })
  }

  goNext = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          keys, apellidos, nombres, contactName, contactPhone, correo, direccion, docs, edad, genero, nacionalidad, telefono, tip_documento
        } = values
        // console.log('DATOS DE PASAJEROS', values);
        const data = keys.map(key => {
          const person = {
            apellidos: apellidos[key],
            nombres: nombres[key],
            correo: correo[key],
            direccion: direccion[key],
            docs: docs[key],
            edad: edad[key],
            genero: genero[key],
            nacionalidad: nacionalidad[key],
            telefono: telefono[key],
            tip_documento: tip_documento[key],
          }
          return person
        })
        this.props.saveData({ data, contactName, contactPhone }, this.props.next)
      }
    })
  }

  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { numeroPasajeros } = this.props

    const optionsPaises = (this.props.nacionalidades.Nacionalidades || []).map(
      nacionalidad => (
        <Option key={nacionalidad.codigo} value={nacionalidad.codigo}>
          {nacionalidad.gentilicia}
        </Option>
      )
    )

    getFieldDecorator('keys', { initialValue: range(numeroPasajeros) })
    const keys = getFieldValue('keys')

    const formItems = keys.map((k, index) => (
      <div className='pasajero' key={k}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ display: 'inline' }}>Pasajero #{index + 1}</h4>
        </div>
        <Row gutter={32}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Tipo de documento'>
              <Query query={getAllDocumentosIdentidad}>
                {({ loading, error, data }) => {
                  let tipoDocs = data.DocsIdentidad
                    ? data.DocsIdentidad
                    : []
                  return getFieldDecorator(`tip_documento[${k}]`, {
                    initialValue: '29',
                    rules: [
                      {
                        required: false,
                        message: 'Seleccione un tipo de documento'
                      }
                    ]
                  })(
                    <Select>
                      {!loading &&
                        tipoDocs.length > 0 &&
                        tipoDocs.map(tipoDoc => (
                          <Option
                            key={tipoDoc.id_subtipo}
                            value={tipoDoc.id_subtipo}
                          >
                            {tipoDoc.subclase}
                          </Option>
                        ))}
                    </Select>
                  )
                }}
              </Query>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Nro de documento'>
              {getFieldDecorator(`docs[${k}]`, {
                initialValue: undefined,
                // initialValue: '72756084',
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese un número de documento válido.'
                  }
                ]
              })(
                <Input
                placeholder={'Documento de identidad'} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Nacionalidad'>
              {getFieldDecorator(`nacionalidad[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: 'PE',
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese un país válido.'
                  }
                ]
              })(
                <Select
                  optionFilterProp='children'
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {optionsPaises}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Nombres'>
              {getFieldDecorator(`nombres[${k}]`, {
                // initialValue: 'Rogger',
                initialValue: undefined,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: 'Por favor ingrese un nombre válido.'
                  }
                ]
              })(<Input
                placeholder={'Nombres'}
                />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Apellidos'>
              {getFieldDecorator(`apellidos[${k}]`, {
                // initialValue: 'Valverde',
                initialValue: undefined,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: 'Por favor ingrese un apellido válido.'
                  }
                ]
              })(<Input
                placeholder={'Apellidos'}
                />)}
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Edad'>
              {getFieldDecorator(`edad[${k}]`, {
                // initialValue: 30,
                initialValue: undefined,
                validateTrigger: ['onChange'],
                rules: [
                  {
                    required: true,
                    message: 'Por favor ingrese una edad válida.',
                    min: 0,
                    max: 150,
                    type: 'number'
                  }
                ]
              })(<InputNumber
                placeholder={'Edad'}
              />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Género'>
              {getFieldDecorator(`genero[${k}]`, {
                initialValue: 'M',
                rules: [{ required: true, message: 'Seleccione un género' }]
              })(
                <Select>
                  <Option value='M'>Masculino</Option>
                  <Option value='F'>Femenino</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='E-mail'>
              {getFieldDecorator(`correo[${k}]`, {
                //initialValue: 'rogger@uni.pe',
                initialValue: undefined,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    type: 'email',
                    required: true,
                    message: 'Ingrese un correo válido'
                  }
                ]
              })(<Input
                placeholder={'Correo electrónico'}
              />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Teléfono / Celular'>
              {getFieldDecorator(`telefono[${k}]`, {
                //initialValue: '999999999',
                initialValue: undefined,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: false,
                    message: 'Por favor ingrese un numero de teléfono válido.'
                  }
                ]
              })(<Input 
                placeholder={'Nro. de télefono'}
                />)}
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} sm={{ span: 12 }}>
            <Form.Item label='Dirección'>
              {getFieldDecorator(`direccion[${k}]`, {
                initialValue: undefined,
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  { required: false, message: 'Ingrese una dirección válida' }
                ]
              })(<Input
                placeholder={'Dirección'}
              />)}
            </Form.Item>
          </Col>
        </Row>
      </div>
    ))

    return (
      <PasajerosContainer>
        <Form onSubmit={this.enviarPasajerosInfo} ref={f => (this.form = f)}>
          {formItems}
          <div className='pasajero contacto'>
            <h4>Contacto Principal</h4>
            <Row gutter={32}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label='Nombre'>
                  {getFieldDecorator(`contactName`, {
                    // initialValue: 'GG',
                    initialValue: undefined,
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                      {
                        required: true,
                        message: 'Ingrese un nombre válido'
                      }
                    ]
                  })(<Input
                    placeholder={'Nombre completo'}
                    />)}
                </Form.Item>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <Form.Item label='Teléfono / Celular'>
                  {getFieldDecorator(`contactPhone`, {
                    // initialValue: '98989898',
                    initialValue: undefined,
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                      {
                        required: true,
                        message: 'Ingrese un número válido'
                      }
                    ]
                  })(<Input
                    placeholder={'Nro. de télefono'}
                    />)}
                </Form.Item>
              </Col>
            </Row>
          </div>
          <button type='submit' hidden>enviar</button>
        </Form>
        <NavegadorContainer>
          <Button onClick={this.goNext}>
            Continuar
          </Button>
        </NavegadorContainer>
      </PasajerosContainer>
    )
  }
}

const Pasajeros = Form.create()(PasajeroComponent)

export default compose(
  graphql(getAllNacionalidades, {
    name: 'nacionalidades',
    options: props => {
      return {
        notifyOnNetworkStatusChange: true
      }
    }
  })
)(Pasajeros)

import React, { Component, Fragment } from 'react'
import { ViajeContainer } from './styles'
import { Button, Form, Input, Col, Row, message } from 'antd'
import moment from 'moment'
import { get } from 'lodash'
import { Loading } from '../../utils'
import RowTravel from '../../../components/ReservaComponents/RowTravel'
import { consultarPdf } from '../../../graphQL/queries/lamba'

class DetalleCompraContainer extends Component {
  state = {
    loadingMail: false
  }

  onSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true})
        if(this.props.sendMail(values.mail)){
          this.props.form.resetFields()
          this.setState({loading: false})
        }
        else
          this.setState({loading: false})
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <ViajeContainer>
        <div className='detalle-header'>
          <div className='detalle-title'>
            ¡Gracias {`${get(this.props.pasajeros.data[0], 'nombres')} ${get(this.props.pasajeros.data[0], 'apellidos')}`}!
          </div>
            <div className='detalle-subtitle'>
              Su compra fue realizada con éxito.
            </div>
          <Row className='detalle-comprobante'>
            <Col xs={{span: 24}} sm={{span: 12}}>
              <Button icon="download" loading={this.props.loadingDownload} onClick={this.props.descargarPdf} >Descargar comprobante</Button>
            </Col>
            <Col xs={{span: 24}} sm={{span: 12}}>
              <Button icon="download" loading={this.props.loadingDownload} onClick={this.props.downloadEmbarque} >Descargar Ticket de embarque</Button>
            </Col>
          </Row>
        </div>
        <div className='detalle-content'>
          <div className='detalle-abstract'>
            <div className='abstract-header barra-right'>
              <div className='title'>Fecha de Compra:</div>
              <div className='content'>{moment().format('DD/MM/YYYY')}</div>
            </div>
          </div>
          {
            this.props.loadingPasaje ?
              <Loading /> :
              (this.props.pasajes || []).map(pasaje => (
                <Fragment key={pasaje.id_pasaje}>
                  <div className='detalle-pasajero'>
                    <div className='pasajero-name'>
                      <b>Pasajero: </b> {`${pasaje.Cliente.nombres} ${pasaje.Cliente.apellidos}`}
                    </div>
                  </div>
                  <RowTravel
                    disabled={true}
                    viaje={{
                      fec_hora_partida: pasaje.fec_hora_partida,
                      fec_hora_llegada: pasaje.fec_hora_llegada,
                      monto: pasaje.precio
                    }}
                    setViaje={() => { }}
                    viajeSelected={0}
                  />
                </Fragment>
              ))
          }
        </div>
        <div className='send-mail' style={{ marginTop: '2rem' }}>
          <Form onSubmit={this.onSubmit} hideRequiredMark style={{ alignItems: 'center', marginTop: '2rem' }}>
            <Row>
              <Col xs={{span: 24}} sm={{span: 20}}>
                <Form.Item>
                  {getFieldDecorator('mail', {
                    rules: [{ type: 'email', required: true, message: 'Ingrese un correo válido' }],
                  })(
                    <Input placeholder='Enviar correo de compra a...' />
                  )}
                </Form.Item>
              </Col>
              <Col xs={{span: 24}} sm={{span: 4}}>
                <Button disabled={this.props.loadingPasaje} htmlType="submit" loading={this.state.loadingMail}>Enviar</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </ViajeContainer>
    )
  }
}

const DetalleCompra = Form.create()(DetalleCompraContainer);

export default DetalleCompra

import React from 'react'
import { withRouter } from 'next/router'
import { compose, graphql, withApollo } from 'react-apollo'
import styled from 'styled-components'
import { getParadaByID } from '../../graphQL/queries/paradas'
import { getAllDescuentos } from '../../graphQL/queries/tiposGenerales'
import { deselectAsientoReservado, getOrCreateAsientoReservado } from '../../graphQL/mutations/asientosreservados'
import { bulkCreatePasajesWithClientesAndEmpresa } from '../../graphQL/mutations/pasajes'
import { Affix, Col, message, Row } from 'antd'
import Resumen from './pasos/Resumen'
import Avance from './pasos/Avance'
import Viajes from './pasos/Viajes'
import Pasajeros from './pasos/Pasajeros'
import Asientos from './pasos/Asientos'
import Pago from './pasos/Pago'
import DetalleCompra from './pasos/DetalleCompra'
import { NotFound } from '../utils'
import uuid from 'uuid/v4'
import moment from 'moment'
import Contact from '../Index/Contact'
import axios from 'axios'
import { jsreport, ses, boletasC2U, facturasC2U, consultarPdf } from '../../graphQL/queries/lamba'
import bases from 'bases'

message.config({
  duration: 5,
  maxCount: 3
})

const ReservaContainer = styled.div`
  padding: 0 8rem 2rem 8rem; 
  @media only screen and (max-width: 56.25em) {
    padding: 0 2rem 2rem 2rem;
  }
`

class ReservaComponent extends React.Component {

  state = {
    currentStep: 0,
    statusSteps: ['process', 'wait', 'wait', 'wait'],
    id_ida: '',
    id_vuelta: '',
    montoIda: 0,
    montoVuelta: 0,
    numeroPasajeros: 1,
    porcentajes: [],
    datosPasajeros: {},
    tip_comprobante: '',
    fec_hora_partida: '',
    fec_hora_llegada: '',
    asientosIda: [],
    asientosVuelta: [],
    diff_horas: '',
    token: uuid(),
    siguiente: false,
    precio: 0,
    empresa: {},
    loadingSeatVuelta: false,
    loadingSeatIda: false,
    loadingPasaje: false,
    pasajes:[],
    payment: {},
    payment_id:'',
    mp_email:'',
    pdfurl: '',
    nro_comprobante: '',
    loadingDownload: true
  }

  getBirthday = edad => {
    let hoy = new Date()
    return moment(hoy.setMonth(hoy.getMonth() - edad * 12)).startOf('day')
  }

  addSeatIda = (row, number, id) => {
    this.setState({ loadingSeatIda: true }, async () => {
      const id_viaje = Number(this.state.id_ida)
      const token = this.state.token
      const asientos = [...this.state.asientosIda]
      console.log({
        id_viaje: Number(id_viaje),
        id_asiento: Number(id),
        transaccion: token
      })
      try {
        const asientoreservado = await this.props.client.mutate({
          mutation: getOrCreateAsientoReservado,
          variables: {
            id_viaje: Number(id_viaje),
            id_asiento: Number(id),
            transaccion: token
          }
        })
        if (asientoreservado.data.AsientoReservado.id_reserva) {
          let index_reserva = asientos.indexOf(null)
          if (index_reserva > -1) {
            asientos[index_reserva] = {
              id_reserva: asientoreservado.data.AsientoReservado.id_reserva,
              codigo: number
            }
            this.setState({
              asientosIda: asientos
            }, () => {
              this.calculatePrecio()
              this.setState({ loadingSeatIda: false })
            })
          }
          this.setState({ loadingSeatIda: false })
        } else {
          message.error('Este asiento se encuentra seleccionado por otra persona')
          this.setState({ loadingSeatIda: false })
        }
      } catch (e) {
        console.log('error on selectAsiento', e)
        message.error('Hubo un error en el sistema')
        this.setState({ loadingSeatIda: false })
      }
    })
  }

  removeSeatIda = (row, number, id) => {
    this.setState({ loadingSeatIda: true }, async () => {
      const asientos = [...this.state.asientosIda]
      //console.log('asientos idagg', asientos)
      let reserva = asientos.find(asiento => {
        return asiento && asiento.codigo === number
      })
      let token = this.state.token
      try {
        if (reserva) {
          const asientoreservado = await this.props.client.mutate({
            mutation: deselectAsientoReservado,
            variables: {
              id_reserva: Number(reserva.id_reserva),
              transaccion: token
            }
          })
          if (asientoreservado.data.AsientoReservado.id_reserva) {
            this.setState({
              asientosIda: asientos.map(asiento => {
                if (asiento && asiento.id_reserva === asientoreservado.data.AsientoReservado.id_reserva)
                  return null
                else
                  return asiento
              })
            }, () => {
              this.calculatePrecio()
              this.setState({ loadingSeatIda: false })
            })
          }
          this.setState({ loadingSeatIda: false })
        }
        this.setState({ loadingSeatIda: false })
      } catch (e) {
        console.log('error on deselectAsiento', e)
        message.error('Hubo un error en el sistema')
        this.setState({ loadingSeatIda: false })
      }
    })
  }

  addSeatVuelta = (row, number, id) => {
    this.setState({ loadingSeatVuelta: true }, async () => {
      const id_viaje = Number(this.state.id_vuelta)
      const token = this.state.token
      const asientos = [...this.state.asientosVuelta]
      console.log({
        id_viaje: Number(id_viaje),
        id_asiento: Number(id),
        transaccion: token
      })
      try {
        const asientoreservado = await this.props.client.mutate({
          mutation: getOrCreateAsientoReservado,
          variables: {
            id_viaje: Number(id_viaje),
            id_asiento: Number(id),
            transaccion: token
          }
        })
        if (asientoreservado.data.AsientoReservado.id_reserva) {
          let index_reserva = asientos.indexOf(null)
          if (index_reserva > -1) {
            asientos[index_reserva] = {
              id_reserva: asientoreservado.data.AsientoReservado.id_reserva,
              codigo: number
            }
            this.setState({
              asientosVuelta: asientos
            }, () => {
              this.calculatePrecio()
              this.setState({ loadingSeatVuelta: false })
            })
          }

        } else {
          message.error('Este asiento se encuentra seleccionado por otra persona')
          this.setState({ loadingSeatVuelta: false })
        }
      } catch (e) {
        console.log('error on selectAsiento', e)
        message.error('Hubo un error en el sistema')
        this.setState({ loadingSeatVuelta: false })
      }
    })
  }

  removeSeatVuelta = (row, number, id) => {
    this.setState({ loadingSeatVuelta: true }, async () => {
      const asientos = [...this.state.asientosVuelta]
      let reserva = asientos.find(asiento => {
        return asiento && asiento.codigo === number
      })
      let token = this.state.token
      try {
        if (reserva) {
          const asientoreservado = await this.props.client.mutate({
            mutation: deselectAsientoReservado,
            variables: {
              id_reserva: Number(reserva.id_reserva),
              transaccion: token
            }
          })
          if (asientoreservado.data.AsientoReservado.id_reserva) {
            this.setState({
              asientosVuelta: asientos.map(asiento => {
                if (asiento && asiento.id_reserva === asientoreservado.data.AsientoReservado.id_reserva)
                  return null
                else
                  return asiento
              })
            }, () => {this.calculatePrecio()})
          }
          this.setState({ loadingSeatVuelta: false })
        }
      } catch (e) {
        console.log('error on deselectAsiento', e)
        message.error('Hubo un error en el sistema')
        this.setState({ loadingSeatVuelta: false })
      }
    })
  }

  getViajeIda = (e, amount, fec_hora_partida, fec_hora_llegada) => {
    const { id_ida } = this.state
    if (id_ida !== e) {
      this.setState(prevState => ({
        id_ida: e,
        fec_hora_partida: fec_hora_partida,
        fec_hora_llegada: fec_hora_llegada,
        montoIda: amount
      }), () => {this.calculatePrecio()})
    } else {
      this.setState(prevState => ({
        id_ida: '',
        fec_hora_partida: '',
        fec_hora_llegada: '',
        montoIda: 0
      }), () => {this.calculatePrecio()})
    }
  }

  getViajeVuelta = (e, amount, fec_hora_partida, fec_hora_llegada) => {
    const { id_vuelta } = this.state
    if (id_vuelta !== e) {
      this.setState(prevState => ({
        id_vuelta: e,
        fec_hora_partida: fec_hora_partida,
        fec_hora_llegada: fec_hora_llegada,
        montoVuelta: amount
      }), () => {this.calculatePrecio()})
    } else {
      this.setState(prevState => ({
        id_vuelta: '',
        fec_hora_partida: '',
        fec_hora_llegada: '',
        montoVuelta: 0
      }), () => {this.calculatePrecio()})
    }
  }

  next = () => {
    window.scrollTo(0, 0)
    this.setState(prevState => ({
      currentStep: Number(prevState.currentStep) + 1
    }), () => {this.calculatePrecio()})
  }

  prev = () => {
    this.setState(prevState => ({
      currentStep: Number(prevState.currentStep) - 1
    }))
  }

  createPasajes = async () => {
    this.setState({ loadingPasaje: true })
    const { datosPasajeros, asientosIda, asientosVuelta, tip_comprobante, id_ida, id_vuelta, token, empresa, payment, payment_id, mp_email } = this.state
    const { origen, destino } = this.props.router.query

    const info_pasaje = {
      id_viaje_ida: Number(id_ida),
      id_viaje_vuelta: Number(id_vuelta),
      origen: Number(origen),
      destino: Number(destino),
      tip_comprobante: Number(tip_comprobante),
      transaccion: token
    }
    const clientes = datosPasajeros.data.map((pasajero) => {
      return {
        nombres: pasajero.nombres,
        apellidos: pasajero.apellidos,
        doc_identidad: pasajero.docs,
        tip_documento: Number(pasajero.tip_documento),
        correo: pasajero.correo,
        direccion: pasajero.direccion,
        genero: pasajero.genero === 'M',
        nacionalidad: pasajero.nacionalidad,
        telefono: pasajero.telefono,
        fec_nacimiento: this.getBirthday(Number(pasajero.edad))
      }
    })

    const contacto={
      nombre: datosPasajeros.contactName,
      telefono: datosPasajeros.contactPhone
    }

    const id_reservas_ida = (asientosIda || []).map((asiento) => {
      if (asiento) {
        return Number(asiento.id_reserva)
      } else {
        return null
      }
    })

    const id_reservas_vuelta = (asientosVuelta || []).map((asiento) => {
      if (asiento) {
        return Number(asiento.id_reserva)
      } else {
        return null
      }
    })
    try {
      console.log({
        info_pasaje: info_pasaje,
        empresa: empresa,
        clientes: clientes,
        id_reservas_ida,
        id_reservas_vuelta
      })

      let URL_PAYMENT = 'https://zg80igcjwc.execute-api.us-east-1.amazonaws.com/dev/payment'
      // let URL_PAYMENT = 'http://localhost:4000/payment'
      let response = await axios.post(URL_PAYMENT, {
        amount:this.state.precio,
        token: payment.id,
        description: 'Pasajes EduExpress',
        // installments: payment.mp_installments,
        payment_method_id: payment_id,
        // issuer_id: payment.mp_issuer_id,
        email: mp_email
      })
      //Si el pago tiene status=approved, fue aceptado y se crea el pasaje
      if(response.data.body.status==='approved'){
        const pasajes = await this.props.client.mutate({
          mutation: bulkCreatePasajesWithClientesAndEmpresa,
          variables: {
            info_pasaje: info_pasaje,
            empresa: empresa,
            clientes: clientes,
            id_reservas_ida: id_reservas_ida,
            id_reservas_vuelta: id_reservas_vuelta,
            contacto: contacto
          }
        })
        if (pasajes) {
          let Pasajes = pasajes.data.Pasajes.map( p => {
            const _p = {...p}
            if (!_p.Asiento) _p.Asiento = { codigo: 'Sin Asiento' }
            _p.serie = bases.toBase32(_p.serie + 2147483648)
            return { Pasaje: _p }
          })

          let resultComprobante
          if(empresa.ruc ){
            resultComprobante = await this.props.client.query({
              query: facturasC2U,
              variables: {
                data: {Pasaje: Pasajes},
                producto: 1,
                size: Pasajes.length
              }
            })
          }else{
            resultComprobante = await this.props.client.query({
              query: boletasC2U,
              variables: {
                data: {Pasaje: Pasajes},
                producto: 1,
                size: Pasajes.length
              }
            })
          }
          if (resultComprobante.data.Comprobante.statusCode === 200) {
            message.info(
              'Se registró el comprobante ' + resultComprobante.data.Comprobante.message
              // "Se envió el comprobante al correo: " + Pasajes[0].Pasaje.Cliente.correo
            )
            this.setState({
              nro_comprobante: resultComprobante.data.Comprobante.message
            })
          } else {
            message.error('Hubo un error al registrar el comprobante')
          }
          let result = await this.props.client.query({
            query: jsreport,
            variables: {
              template: 'Boleto_Store',
              data: {Pasajes}
            }
          })
          if (result.data.jsreport) {
            this.setState({pdfurl: result.data.jsreport})
            //SEND MAIL
            // let email =  Pasajes[0].Pasaje.Cliente.correo
            // let nombres = Pasajes[0].Pasaje.Cliente.nombres
            // let apellidos = Pasajes[0].Pasaje.Cliente.apellidos
            // this.downloadEmbarque()
            // try{
            //   console.log(email, nombres,apellidos)
            //   let mailRpta = this.sendMail(email, `${nombres}, ${apellidos}`)
            //   console.log(mailRpta)
            // }catch(err){
            //   console.log('error al enviar el correo')
            // }
          } else message.error('Hubo un error al generar el ticket de viaje')

          this.setState({
            pasajes: pasajes.data.Pasajes,
            loadingPasaje: false,
            loadingDownload: false
          })
        }
      }else{
        message.error('Hubo un error al realizar el pago.')
      }
    } catch (e) {
      console.log('error al crear los pasajes', e)
      message.error('Hubo un error en el sistema')
      this.setState({ loadingPasaje: false, loadingDownload: false })
    }
  }

  downloadEmbarque = async () =>{
    this.setState({ loadingDownload: true })
    // window.open(this.state.pdfurl, '_blank')
    const downloadEmbarqueLink = document.createElement('a')
    downloadEmbarqueLink.href = this.state.pdfurl
    downloadEmbarqueLink.type = 'application/octet-stream'
    downloadEmbarqueLink.download = 'Ticket.pdf'
    if(window.innerWidth <= 992)
      downloadEmbarqueLink.target = '_blank'
    document.body.appendChild(downloadEmbarqueLink)
    await downloadEmbarqueLink.click()
    this.setState({ loadingDownload: false })
    message.warn('Se descargó el ticket bien.')
    document.body.removeChild(downloadEmbarqueLink)
  }
  sendMail = async (email, name ) => {
    try{
      let sesTicket = await this.props.client.query({
        query: ses,
        variables: {
          url: this.state.pdfurl,
          name: name || 'Cliente',
          destination: email,
          type: 'compras'
        }
      })
      if (sesTicket) {
        message.info(`Se envió el correo electrónico: ${email}`)
        return true;
      } else {
        message.warn('Hubo un error al enviar el correo electrónico')
        return false;        
      }
    }catch(err){
      console.log(err)
      message.warn('Hubo un error al enviar el correo electrónico')
        return false;
    }

  }

  descargarPdf = async () => {
    this.setState({ loadingDownload: true })
    const {nro_comprobante} = this.state
    try{
      const pdfComprobante = await this.props.client.query({
        query: consultarPdf,
        variables: {
          nro_comprobante: nro_comprobante
        }
      })
      this.setState({ loadingDownload: true })
      if (pdfComprobante.data.Consulta.statusCode === 200) {
        let url = pdfComprobante.data.Consulta.message
        // window.open('data:application/pdf;base64, ' + url, '_blank')
        const downloadLink = document.createElement('a')
        const fileName = (nro_comprobante) + '.pdf'

        downloadLink.href = 'data:application/pdf;base64,' + url
        downloadLink.type = 'application/octet-stream'
        downloadLink.download = fileName
        downloadLink.target = '_blank'
        document.body.appendChild(downloadLink)
        await downloadLink.click()
        this.setState({ loadingDownload: false })
        message.info('Se descargó el comprobante electrónico correctamente.')
        document.body.removeChild(downloadLink)        
      }else {
        message.warn('Hubo un error al descargar el comprobante electrónico.')
      }
      this.setState({ loadingDownload: false })
    }catch(err){
      console.log('Error',err)
      message.warn('Hubo un error al descargar el comprobante electrónico')
      this.setState({ loadingDownload: false })
    }

  }

  saveData = (data, callback) => {
    const porcentajes = data.data.map((pasajero) => {
      let porcentaje
      this.props.descuentos.Descuentos.forEach((d) => {
        const edad_maxima = Number(d.subclase.substring(0, 2))
        if (pasajero.edad <= edad_maxima) {
          porcentaje = d.valor
        }
      })
      return porcentaje
    })
    this.setState({
      datosPasajeros: data,
      porcentajes: porcentajes,
      asientosIda: data.data.map(() => {return null}),
      asientosVuelta: data.data.map(() => {return null}),
    }, () => {
      callback()
    })
  }

  saveEmpresa = (data, tip_comprobante, payment, payment_id, mp_email, callback) => {
    this.setState({
      empresa: data,
      tip_comprobante,
      payment: payment,
      payment_id: payment_id,
      mp_email: mp_email
    },()=>{
      this.createPasajes()
      callback()
    })
  }

  calculatePrecio = () => {
    if (this.state.currentStep < 2) {
      this.setState({
        precio: (this.state.montoVuelta + this.state.montoIda) * (this.props.router.query.numeroPasajeros)
      })
    } else {
      //return (this.state.montoVuelta + this.state.montoIda) * (this.props.router.query.numeroPasajeros)

      if (this.state.currentStep < 4) {
        let precios = [0]
        let siguiente = true
        const { porcentajes, asientosIda, asientosVuelta, montoIda, montoVuelta } = this.state
        precios = porcentajes.map((porcentaje, index) => {
          let monto = 0
          if (porcentaje === this.props.descuentos.Descuentos[this.props.descuentos.Descuentos.length - 1].valor) {
            if (asientosIda[index]) {
              monto = montoIda * this.props.descuentos.Descuentos[this.props.descuentos.Descuentos.length - 2].valor
            }
            if (this.state.id_vuelta && asientosVuelta[index]) {
              monto = monto + montoVuelta * this.props.descuentos.Descuentos[this.props.descuentos.Descuentos.length - 2].valor
            }
            return monto
          } else {
            siguiente = siguiente && !!asientosIda[index]
            if (this.state.id_vuelta) {
              siguiente = siguiente && !!asientosVuelta[index]
            }
          }
          return (montoVuelta + montoIda) * porcentaje
        })
        this.setState({
          siguiente: siguiente,
          precio: precios.reduce((valorAnterior, valorActual, index) => {
            return valorAnterior + valorActual
          })
        })
      }
    }
  }

  getStep = () => {
    const { currentStep } = this.state
    switch (this.state.currentStep) {
      case 0:
        return (
          <Viajes
            numeroPasajeros={this.props.router.query.numeroPasajeros}
            id_ruta={this.props.router.query.id_ruta}
            origen={this.props.router.query.origen}
            destino={this.props.router.query.destino}
            fec_ida={this.props.router.query.fec_ida}
            fec_vuelta={this.props.router.query.fec_vuelta}
            getViajeIda={this.getViajeIda}
            getViajeVuelta={this.getViajeVuelta}
            id_ida={this.state.id_ida}
            id_vuelta={this.state.id_vuelta}
            prev={this.prev}
            next={this.next}
            step={currentStep}
          />
        )
      case 1:
        return (
          <Pasajeros
            saveData={this.saveData}
            prev={this.prev}
            next={this.next}
            step={currentStep}
            numeroPasajeros={this.props.router.query.numeroPasajeros}/>
        )
      case 2:
        return (
          <Asientos
            loadingSeatVuelta={this.state.loadingSeatVuelta}
            loadingSeatIda={this.state.loadingSeatIda}
            pasajeros={this.state.datosPasajeros}
            prev={this.prev}
            next={this.next}
            step={currentStep}
            origen={this.props.router.query.origen}
            destino={this.props.router.query.destino}
            id_ida={this.state.id_ida}
            id_vuelta={this.state.id_vuelta}
            numeroPasajeros={this.props.router.query.numeroPasajeros}
            fec_ida={this.props.router.query.fec_ida}
            fec_vuelta={this.props.router.query.fec_vuelta}
            addSeatIda={this.addSeatIda}
            removeSeatIda={this.removeSeatIda}
            addSeatVuelta={this.addSeatVuelta}
            removeSeatVuelta={this.removeSeatVuelta}
            asientosIda={this.state.asientosIda}
            asientosVuelta={this.state.asientosVuelta}
            siguiente={this.state.siguiente}
          />
        )
      case 3:
        return <Pago prev={this.prev}
                     step={currentStep}
                     next={this.next}
                     saveEmpresa={this.saveEmpresa}
                     precio={this.state.precio}/>
      case 4:
        return <DetalleCompra prev={this.prev}
                              pasajeros={this.state.datosPasajeros}
                              pasajes={this.state.pasajes}
                              fec_hora_partida={this.state.fec_hora_partida}
                              fec_hora_llegada={this.state.fec_hora_llegada}
                              diff_horas={this.state.diff_horas}
                              step={currentStep}
                              next={this.next}
                              loadingPasaje={this.state.loadingPasaje}
                              sendMail={this.sendMail}
                              descargarPdf = {this.descargarPdf}
                              downloadEmbarque= {this.downloadEmbarque}
                              loadingDownload={this.state.loadingDownload}/>
      default:
        return <NotFound/>
    }
  }

  render () {
    const { currentStep, statusSteps } = this.state
    const { origen, destino } = this.props
    return (
      <div>
        <ReservaContainer>
          <Row>
            <Col span={24}>
              {currentStep < 4 && (
                <Avance currentStep={currentStep}/>
              )}
            </Col>
          </Row>
          <Row gutter={32}>
            <Col xs={{ span: 24 }} lg={{ span: 0 }}>
              <Resumen
                numeroPasajeros={this.props.router.query.numeroPasajeros}
                montoVuelta={this.state.montoVuelta}
                montoIda={this.state.montoIda}
                step={currentStep}
                origen={origen.Parada}
                destino={destino.Parada}
                fec_ida={this.props.router.query.fec_ida}
                fec_vuelta={this.props.router.query.fec_vuelta}
                precio={this.state.precio}
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <div>{this.getStep()}</div>
            </Col>
            <Col xs={{ span: 0 }} lg={{ span: 8 }} style={{ marginTop: '20px' }}>
              <Affix offsetTop={80}>
                <Resumen
                  numeroPasajeros={this.props.router.query.numeroPasajeros}
                  montoVuelta={this.state.montoVuelta}
                  montoIda={this.state.montoIda}
                  step={currentStep}
                  origen={origen.Parada}
                  destino={destino.Parada}
                  fec_ida={this.props.router.query.fec_ida}
                  fec_vuelta={this.props.router.query.fec_vuelta}
                  precio={this.state.precio}
                />
              </Affix>
            </Col>
          </Row>
        </ReservaContainer>
        <Contact />
      </div>
    )
  }
}

export default withRouter(
  compose(
    withApollo,
    graphql(getAllDescuentos, {
      name: 'descuentos',
      options: props => {
        return {
          notifyOnNetworkStatusChange: true,
          // variables: { id_parada: Number(props.router.query.origen) }
        }
      }
    }),
    graphql(getParadaByID, {
      name: 'origen',
      options: props => {
        return {
          notifyOnNetworkStatusChange: true,
          variables: { id_parada: Number(props.router.query.origen) }
        }
      }
    }),
    graphql(getParadaByID, {
      name: 'destino',
      options: props => {
        return {
          notifyOnNetworkStatusChange: true,
          variables: { id_parada: Number(props.router.query.destino) }
        }
      }
    })
  )(ReservaComponent)
)

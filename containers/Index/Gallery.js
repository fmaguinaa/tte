import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faHamburger } from '@fortawesome/free-solid-svg-icons'
import SeatBeltIcon from '../../static/icon/seat-belt'
import RadarIcon from '../../static/icon/radar'
// language=LESS
const Panels = styled.div`
    .panels {
      display: flex;
      flex-direction: column;
    }
    .panel-container {
      display: flex;
      height: 400px;
      @media only screen and (max-width: 56.25em) {
        height: fit-content;
      }
    }
    .panel {
      box-shadow: inset 0 0 0 5px rgba(255,255,255,0.1);
      color: white;
      text-align: center;
      align-items: center;
      font-size: 20px;
      background-size: cover;
      background-position: center;
      flex: 50%;
      justify-content: center;
      display: flex;
      flex-direction: column;
    }
    .panel-text {
      flex: 50%;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-direction: column;
      padding: 8rem;
      @media only screen and (max-width: 56.25em) {
        padding: 6rem 2rem;
      }
      i {
        margin-bottom: 1rem;
      }
      svg {
        font-size: 6rem;
      }
      &  .reason-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      & .reason-description {
        font-size: 1.8rem;
        text-align: right;
      }
    }
    .panel-container:nth-child(odd) {
      background-color: rgba(41, 43, 115, 0.75);
      & .panel-text {
        & .reason-title, .reason-description, svg{
          color: white;
        }
      }
      @media only screen and (max-width: 56.25em) {
        flex-direction: column;
        & .panel {
          height: 200px;
          clip-path: none;
        }
      }
    }
    .panel-container:nth-child(even) {
      flex-direction: row-reverse;
      & .panel-text {
        align-items: flex-start;
        & .reason-description {
          text-align: left;
        }
      }
      @media only screen and (max-width: 56.25em) {
        flex-direction: column;
        & .panel {
          height: 200px;
          clip-path: none;
        }
      }
    }
    .panel1 {
      -webkit-clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
      clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
      background-image:url(https://s3.amazonaws.com/cdn-eduexpress/COMPROMISO1.jpg); 
    }
    .panel2 {
      -webkit-clip-path: polygon(0 0, 100% 0%, 100% 100%, 20% 100%);
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 20% 100%);
      background-image:url(https://s3.amazonaws.com/cdn-eduexpress/CONFIANZA.png); 
    }
    .panel3 {
      -webkit-clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
      clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
      background-image:url(https://s3.amazonaws.com/cdn-eduexpress/SEGURIDAD.png); 
    }
    .panel4 {
      -webkit-clip-path: polygon(0 0, 100% 0%, 100% 100%, 20% 100%);
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 20% 100%);
      background-image:url(https://s3.amazonaws.com/cdn-eduexpress/TECNOLOGIA.png); 
    }
    .panel5 {
      -webkit-clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
      clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
      background-image:url(https://s3.amazonaws.com/cdn-eduexpress/ALIMENTACION.png); 
    }
    .panel6 {
      -webkit-clip-path: polygon(0 0, 100% 0%, 100% 100%, 20% 100%);
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 20% 100%);
      background-image:url(https://s3.amazonaws.com/cdn-eduexpress/TECNOLOGIA.jpg); 
    }

`

export default class Gallery extends React.Component {
  render () {
    return (
      <Panels>
        <div className="panels">
          <div className="panel-container">
            <div className="panel panel1"/>
            <div className="panel-text">
              <Icon component={() => (<FontAwesomeIcon icon={faHandshake}/>)}/>
              <div className='reason-title'>Compromiso</div>
              <div className='reason-description'>
                Estamos comprometidos con el desarrollo basado en la igualdad de
                oportunidades, la no discriminación y el respeto a la diversidad.
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel panel2"/>
            <div className="panel-text">
              <Icon type='like' theme="filled"/>
              <div className='reason-title'>Confianza</div>
              <div className='reason-description'>
                Contamos con un equipo humano con más de 20 años de experiencia en
                el mercado. Nadie conoce mejor el amazonas que EduExpress.
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel panel3"/>
            <div className="panel-text">
              <Icon component={SeatBeltIcon} />
              <div className='reason-title'>Seguridad</div>
              <div className='reason-description'>
                Cumplimos con los más exigentes estándares de seguridad para
                garantizarle un viaje cómodo y seguro.
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel panel4"/>
            <div className="panel-text">
              <Icon component={RadarIcon} />
              <div className='reason-title'>Tecnología</div>
              <div className='reason-description'>
                Nuestras modernas unidades cuentan con sistemas de navegación y
                propulsión de última generación que permiten que nuestras
                embarcaciones naveguen de forma rápida y segura por las rutas de
                nuestra amazonia.
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel panel5"/>
            <div className="panel-text">
              <Icon component={() => (<FontAwesomeIcon icon={faHamburger} />)} />
              <div className='reason-title'>Alimentación</div>
              <div className='reason-description'>
                Nuestro servicio incluye alimentación de cortesía a bordo.
              </div>
            </div>
          </div>
          <div className="panel-container">
            <div className="panel panel6"/>
            <div className="panel-text">
              <Icon type="safety-certificate" theme="filled" />
              <div className='reason-title'>Vanguardia</div>
              <div className='reason-description'>
                En EduExpress usted puede realizar la compra de sus pasajes y
                servicios en línea con confianza, ya que disponemos de los más
                altos estándares para mantener la seguridad en sus transacciones.
              </div>
            </div>
          </div>
        </div>
      </Panels>
    )
  }
}

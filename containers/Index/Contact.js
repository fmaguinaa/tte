import styled from 'styled-components'
import { Col, Row } from 'antd'
import Link from 'next/link'
import { secondaryColor } from '../../components/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF'

const Contact = styled.div`
  background-color: rgba(41, 43, 115, 0.75);
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    display: inline-block;
    font-weight: 500;
    margin-bottom: 2rem;
    margin-top: 2rem;
    color: white;
    font-size: 22px;
    border-bottom: 2px solid ${secondaryColor};
  }
  h2, p {
    text-align: center;
  }
  p {
    max-width: 750px;
    font-size: 15px;
    color: white;
    margin: 0;
  }
  a,
  a:active,
  a:hover,
  a:visited {
    color: white;
    cursor: pointer;
  }
  & .ant-col {
    text-align: center;
  }
  & .social-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    height: 50px;
    width: 50px;
    margin: 0 auto;
    border-radius: 50%;
    svg {
      color: #3b5998;
      font-size: 20px;
    }
  }
`

export default () => (
  <Contact>
    <Row gutter={{ xs: 0, sm: 0, md: 0, lg: 32 }} justify="center">
      <Col sm={24} md={12} lg={8}>
        <h2>Links de ayuda</h2>
        <p>
          <Link href="/">
            <a href="#">
              Inicio
            </a>
          </Link>
        </p>
        <p>
          <Link href="/rutas">
            <a href="#">
              Rutas
            </a>
          </Link>
        </p>
        <p>
          <Link href="/destinos">
            <a href="#">
              Destinos
            </a>
          </Link>
        </p>
        <p>
          <Link href="/ayuda">
            <a href="#">
              Centro de ayuda
            </a>
          </Link>
        </p>
        <p>
          <Link href="/reclamaciones">
            <a href="#">
              Libro de reclamaciones
            </a>
          </Link>
        </p>
      </Col>
      <Col sm={24} md={12} lg={8}>
        <h2>Contáctanos</h2>
        <p>
          Celular: <a href="tel:+51965635351">+51 965 635 351</a>
        </p>
        <p>
          Correo: <a href="mailto:contacto@eduexpress.pe" target='_blank'>contacto@eduexpress.pe</a>
        </p>
        <p>
          Dirección: <a
          href='https://www.google.com/maps/place/Calle+Elena+Pardo+114,+Yurimaguas+16501/@-5.8956707,-76.1101282,17z/data=!3m1!4b1!4m5!3m4!1s0x91b9eaa1e86df847:0xd93ca30795b3839f!8m2!3d-5.8956707!4d-76.1079395'
          target='_blank'>Calle Elena Pardo #114, Yurimaguas</a>
        </p>
        <p>Horario de atención: Lunes - Domingo de 8:00 a.m a 8:30 p.m</p>
      </Col>
      <Col sm={24} md={12} lg={8}>
        <h2>Redes sociales</h2>
        <div className='social-icon'>
          <a
            href={'https://www.facebook.com/EduExpress-267815570514944/'}
            target='_blank'
          >
            <FontAwesomeIcon icon={faFacebookF}/>
          </a>
        </div>
      </Col>
    </Row>
  </Contact>
)

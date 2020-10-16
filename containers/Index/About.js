import styled from 'styled-components'
import { secondaryColor } from '../../components/utils'

const About = styled.div`
  padding: 12rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    font-weight: 500;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    border-bottom: 2.5px solid ${secondaryColor};
  }
  h2, p {
    text-align: center;
  }
  p {
    max-width: 750px;
    font-size: 2rem;
  }
  @media (max-width: 576px){
    padding-top: 0;
  }
`

export default () => (
  <About>
    <h2>COMUNIDAD EDUEXPRESS</h2>
    <p>
      Nuestra sostenibilidad como empresa, y la sostenibilidad de nuestro entorno y los recursos, están estrechamente
      relacionadas con el bienestar de las personas que viven a nuestro alrededor. Trabajamos arduamente para promover
      una relación de respeto mutuo, confianza y comunicación asertiva.
    </p>
  </About>
)

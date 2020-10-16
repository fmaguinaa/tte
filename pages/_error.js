import React from 'react'
import { secondaryColor } from '../components/utils'
import GlobalLayou from './destinos'

class Error extends React.Component {
  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render () {
    return (
      <GlobalLayou>
        <div style={{ minHeight: 'calc(100vh - 144px)', backgroundColor: 'white', marginTop: 64 }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '3rem', display: 'inline', borderBottom: `2px solid ${secondaryColor}` }}>Nuestros
              Lag página que busca no esta disponible</h1>
          </div>
          <div style={{ maxWidth: '100vw' }}>
            <p>
              {this.props.statusCode
                ? `An error ${this.props.statusCode} occurred on server`
                : 'An error occurred on client'}
            </p>
          </div>
        </div>
      </GlobalLayou>
    )
  }
}

export default Error

import GlobalLayou from '../components/Layout';
import React from 'react';
import {secondaryColor} from '../components/utils';
import ReservaComponent from '../containers/Reserva';
import redirect from '../lib/redirect';
import Head from '../components/Head';

export default class Reserva extends React.Component {
  static async getInitialProps(ctx) {
    const {query} = ctx;
    if (!(query.id_ruta &&
        query.origen &&
        query.destino &&
        query.numeroPasajeros &&
        query.fec_ida)) {
      redirect(ctx, '/');
    }
    return {};
  }

  render() {
    return (
        <GlobalLayou>
          <Head title="Reserva - EduExpress"/>
          <div style={{
            minHeight: 'calc(100vh - 144px)',
            backgroundColor: 'white',
            marginTop: 64,
          }}>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '2rem',
            }}>
              <h1 style={{
                fontSize: '3rem',
                display: 'inline',
                borderBottom: `2px solid ${secondaryColor}`,
              }}>
                Reserva
              </h1>
            </div>
            <ReservaComponent/>
          </div>
        </GlobalLayou>
    );
  }
}

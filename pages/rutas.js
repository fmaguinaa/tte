import GlobalLayou from '../components/Layout';
import React from 'react';
import {Col, Row} from 'antd';
import {secondaryColor} from '../components/utils';
import styled from 'styled-components';
import Head from '../components/Head';

const rutas = [
  {
    photo: 'https://s3.amazonaws.com/cdn-eduexpress/rutamapas1_small.png',
    name: 'Iquitos - Santa Rosa',
  },
  {
    photo: 'https://s3.amazonaws.com/cdn-eduexpress/rutamapas2_small.png',
    name: 'Yurimaguas - Nauta',
  },
];

const CustomCard = styled.div`
  margin: 2rem;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 4px 0px;
  @media only screen and (max-width: 56.25em) {
    margin: 0;
    margin-bottom: 2rem;
  }
  & .photo {
    img {
      width: 100%;
    }
  }
  & .title {
    padding: 1rem;
    font-size: 2.5rem;
    text-align: center;
  }
`;

const DestinosContainer = styled.div`
  max-width: 100vw;
  min-height: calc(100vh - 144px);
  background: white;
`;

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem;
  margin-top: 64px;
`;

export default () => (
    <GlobalLayou>
      <Head
          title="Rutas - EduExpress"
          description="EduExpress ofrece a sus usuarios dos rutas a traves de los ríos de nuestra grandiosa selva peruana."
          url="https://eduexpress.pe/rutas"
      />
      <DestinosContainer>
        <ContentHeader>
          <h1 style={{
            fontSize: '3rem',
            display: 'inline',
            borderBottom: `2px solid ${secondaryColor}`,
          }}>
            Nuestras rutas
          </h1>
        </ContentHeader>
        <div style={{padding: '2rem'}}>
          <Row gutter={32}>
            {rutas.map((destino, i) => (
                <Col xs={24} sm={12} key={i}>
                  <CustomCard>
                    <div className="photo">
                      <img src={destino.photo} alt={destino.name}/>
                    </div>
                    <div className="title">
                      {destino.name}
                    </div>
                  </CustomCard>
                </Col>
            ))}
          </Row>
        </div>
      </DestinosContainer>
    </GlobalLayou>
)

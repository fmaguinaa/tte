import GlobalLayout from '../components/Layout';
import React from 'react';
import {Col, Row} from 'antd';
import {secondaryColor} from '../components/utils';
import styled from 'styled-components';
import Head from '../components/Head';

const destinos = [
  {
    photo: 'https://s3.amazonaws.com/cdn-eduexpress/nauta_small.jpg',
    name: 'Nauta',
  },
  {
    photo: 'https://s3.amazonaws.com/cdn-eduexpress/yurimaguas_small.jpeg',
    name: 'Yurimaguas',
  },
  {
    photo: 'https://s3.amazonaws.com/cdn-eduexpress/santa-rosa_small.jpg',
    name: 'Santa Rosa',
  },
  {
    photo: 'https://s3.amazonaws.com/cdn-eduexpress/iquitos_small.jpg',
    name: 'Iquitos',
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
    width: 100%;
    background-image: url(${props => props.src});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    min-height: 350px;
    @media only screen and (max-width: 56.25em) {
      min-height: 200px;
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
    <GlobalLayout>
      <Head
          title="Destinos - EduExpress"
          description="¿Planeas viajar por la amazonía peruana?. Mira nuestros destinos!"
          url="https://eduexpress.pe/destinos"
      />
      <DestinosContainer>
        <ContentHeader>
          <h1 style={{
            fontSize: '3rem',
            display: 'inline',
            borderBottom: `2px solid ${secondaryColor}`,
          }}>
            Nuestros destinos</h1>
        </ContentHeader>
        <div style={{padding: '2rem'}}>
          <Row gutter={32}>
            {destinos.map((destino, i) => (
                <Col xs={24} sm={12} key={i}>
                  <CustomCard src={destino.photo}>
                    <div className="photo"/>
                    <div className="title">
                      {destino.name}
                    </div>
                  </CustomCard>
                </Col>
            ))}
          </Row>
        </div>
      </DestinosContainer>
    </GlobalLayout>
)

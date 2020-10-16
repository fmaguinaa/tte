import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  height: 100vh;
  background-image: url('https://cdn-eduexpress.s3.amazonaws.com/PORTADA.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-blend-mode: color;
  @media (max-width: 1200px){
    height: 60vh;  
  }
  @media (max-width: 576px){
    height: 40vh;
  }
`;

export default () => (
  <Background/>
)

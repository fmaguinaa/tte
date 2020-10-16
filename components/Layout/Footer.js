import { Layout } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { brandColor } from '../utils'

const { Footer } = Layout

const CustomFooter = styled.footer`
  background-color: ${brandColor};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default () => (
  <CustomFooter style={{ color: 'white' }}>
    Eduexpress ©2019
  </CustomFooter>
)

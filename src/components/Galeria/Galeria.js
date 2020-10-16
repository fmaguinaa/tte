import React, { Component } from 'react'

import { Carousel, Col, Divider, Row, Tabs } from 'antd'
import planta1 from '../../layout/images/planta1.jpg'

const { TabPane } = Tabs;

const photos = [
  {label: "Planta 1", photo: planta1},
  {label: "Planta 2", photo: planta1},
  {label: "Planta 3", photo: planta1},
  {label: "Planta 4", photo: planta1},
  {label: "Planta 5", photo: planta1},
  {label: "Planta 6", photo: planta1},
]

const carousel = (
  <Carousel autoplay>
    {
      photos.map((e,i)=>(
        <div className='galeria__wallpaper' key={i}>
          <div className='galeria__image' style={{ backgroundImage: e.photo }}>
            <div className='galeria__image_description'>
              {e.label}
            </div>
          </div>
        </div>
      ))
    }
  </Carousel>
)

const allPhotos = (
  <Row gutter={32}>
    {
      photos.map((e,i)=>(
          <Col xs={24} sm={12} key={i}>
            <div className='card'>
              <div className='card-photo' style={{backgroundImage:e.photo}} />
              <div className='title'>{e.label}</div>
            </div>
          </Col>
      ))
    }
  </Row>
)


export default class Galeria extends Component {
  render() {
    return (
      <div className='galeria'>
        <Divider style={{paddingTop: '2rem', marginTop:'0'}}>
          <h1 className='heading-tertiary heading-tertiary--1'>
            Galería
          </h1>
        </Divider>


        <Tabs>

          <TabPane tab='Presentación' key='1'>
            {carousel}
          </TabPane>
          <TabPane tab='Todas las plantas' key='2'>
            {allPhotos}
          </TabPane>

        </Tabs>

       
      </div>
    )
  }
}
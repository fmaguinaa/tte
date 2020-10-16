import React, { Component } from 'react'

import image from '../../layout/images/image1.jpg'

import { Divider } from 'antd'

export default class Nosotros extends Component {
  render() {
    return (
      <div className='nosotros'>
        <div className='nosotros-introduction'>
          <Divider>
            <h1 className='heading-tertiary heading-tertiary--1'>
              Nosotros
            </h1>
          </Divider>
          <p className='paragraph'>
            Trabajamos para que su estadía en la muy noble y generosa ciudad de Huaraz, sea satisfactoria. Brindamos información turística, y programamos el itinerario de nuestros visitantes, contamos con personal, calificado para brindar un servicio de calidad.
          </p>
        </div>
        <h1 className='heading-tertiary heading-tertiary--1 heading-tertiary--center u-margin-bottom-small '>
          About us
        </h1>
        <div className='services'>
          <div className='service'>
            <div className='content'>
              <img src={image} alt='description--1' className='photo photo--p1' />
              <div className='description'>
                <h1 className='heading-tertiary heading-tertiary--center u-margin-bottom-small'>
                  Welcome
                </h1>
                <p className='paragraph'>
                  Welcome to Hostel Traveller’s Palace in Huaraz – Perú, set high in the Andes mountains, surrounded by stunning snowcapped mountains this is the best place for adventure, relaxing and partying in Huaraz.
                <br />
                  We offer the best hospitality and an exceptional standard of service to provide our guests with unforgettable vacations. Explore the amazing country side and push yourself to the limit with the many adventure sports and treks available through our excellent in property tourist agency.
                </p>
              </div>
            </div>
          </div>
        </div>
        <h1 className='heading-tertiary heading-tertiary--1 heading-tertiary--center u-margin-bottom-small '>
          Sobre Nosotros
        </h1>
        <div className='services'>

          <div className='service'>
            <div className='content content-reverse'>
              <img src={image} alt='description--1' className='photo photo--p1' />
              <div className='description'>
                <h1 className='heading-tertiary heading-tertiary--center u-margin-bottom-small'>
                  Bienvenidos
                </h1>
                <p className='paragraph'>
                  Hostel Traveller’s Palace, le da la más cordial bievenida a la muy noble y generosa ciudad de Huaraz, situada en lo alto de los Andes peruanos, rodeado de montañas nevadas, como el imponente Huascarán (la montaña tropical más alta del mundo), siendo un extraordinario lugar para la aventura, el relax y disfrutar de la naturaleza, así como de las fiestas tradicionales y la gastronomía de Huaraz y de las ciudades del callejón de Huaylas.
                </p>
              </div>
            </div>
          </div>

          <div className='service'>
            <div className='content'>
              <img src={image} alt='description--1' className='photo photo--p1' />
              <div className='description'>
                <p className='paragraph'>
                  Disfrute de zonas comunes con Wi-Fi, TV por cable y una extensa biblioteca Blu-ray. Puede divertirse en nuestra zona de bar antes de salir a explorar la fantástica vida nocturna de Huaraz. Este albergue tiene dormitorios limpios y modernos, con agua caliente las 24 horas del día. También hay habitaciones privadas con camas matrimoniales y dobles individuales disponibles. Tenemos un desayuno gratuito diario. Y servicio de lavandería.
                </p>
              </div>
            </div>
          </div>


        </div>

        <h1 className='heading-tertiary heading-tertiary--1 heading-tertiary--center u-margin-bottom-small'>
          Nuestros servicios
        </h1>
        <div className='services'>
          <div className='service'>
            <div className='content content-reverse'>
              <img src={image} alt='description--1' className='photo photo--p1' />
              <div className='description'>
                <h1 className='heading-tertiary heading-tertiary--center u-margin-bottom-small'>
                  Services
                </h1>
                <p className='paragraph'>
                  Enjoy common areas complete with free computers, Wi-Fi, cable TV and an extensive Blu-ray library. You can party in our bar area before heading out to explore the fantastic Huaraz nightlife.
                  <br />
                  This hostel has clean and modern dormitories, each with their own private bathroom with hot water 24hrs a day and cable TV. Also private rooms with double beds and triple singles are available. We have a daily free breakfast. On site laundry service provided. Spanish lessons and salsa lessons.
                </p>
              </div>
            </div>
          </div>
          <div className='service'>
            <div className='content'>
              <img src={image} alt='description--1' className='photo photo--p1' />
              <div className='description'>
                <h1 className='heading-tertiary heading-tertiary--center u-margin-bottom-small'>
                  Servicios
                </h1>
                <p className='paragraph'>
                  Ofrecemos nuestros servicio con la mejor hospitalidad y un nivel excepcional, para ofrecer a nuestros huéspedes unas vacaciones inolvidables. Explore la naturaleza y el campo, y empuje usted mismo al límite con los muchos deportes de aventura y circuitos de caminatas disponibles a través de nuestra excelente agencia de turismo de la propiedad.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
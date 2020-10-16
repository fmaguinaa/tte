import styled from 'styled-components'
import { rgba } from 'polished'
import { brandColor, middleGray, secondaryColor, successColor, darkGray } from '../../../components/utils'

const AsientosContainer = styled.div`
  & .seat {
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 20px;
    margin: 20px 0;
    box-shadow: rgba(0,0,0,0.15) 0px 2px 4px 0px;
    @media (max-width: 576px){
      padding: 10px 5px;
    }
    & .seat-info {
      & .seat-date {
        padding: 10px;
        display: flex;
        align-items: center;
        & span {
          text-transform: uppercase;
          font-size: 18px;
          font-weight: bold;
        }
        & i {
          padding: 0 5px;
          color: rgba(0, 0, 0, 0.65);
        }
        & .seat-calendar {
          font-size: 1.8rem;
        }
      }
      & .info-fecha {
        color: ${brandColor};
        font-size: 18px;
        text-transform: uppercase;
        margin-bottom: 10px;
        & i {
          color: black;
          margin: 0 15px 0 40px;
        }
      }
      & .seat-detail {
        & .detail-title {
          font-weight: bold;
          margin-bottom: 10px;
          font-size: 18px;
          span {
            color: ${brandColor};
          }
        }
        & ol {
          li {
            & .ant-input {
              width: 50px;
              height: 30px;
              margin-left: 40%;
              text-align: center;
            }
          }
        }
      }
    }
    & .ant-collapse{
      margin-top: 1rem;
      & .ant-collapse-header{
        color: ${brandColor};
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
      & .ant-collapse-content-box{
        padding: 5px;
      }
    }
    & .seat-display {
      width: 250px;
      margin: 0 auto;
      position: relative;
      & .seat-content {
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        & .seat-head {
          position: relative;
          height: 75px;
          overflow: hidden;
          &:before {
            content: '';
            display: block;
            top: 0;
            left: 0;
            height: 150px;
            width: 100%;
            border-radius: 50%;
            border-top: 2px solid grey;
            border-right: 2px solid grey;
            border-left: 2px solid grey;
          }
        }
        & .seat-body {
          border: 2px solid grey;
          border-top-color: grey;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          padding: 10px 0;
        }
      }
      & .SeatPicker {
        margin: 0 auto;
        & .Seat {
          color: white;
          &--north {
            background: ${rgba(brandColor, .5)};
          }
          &--reserved{
            background: ${middleGray};
          }
          &--enabled {
            background: ${brandColor};
            &:hover {
              background: ${rgba(brandColor, .8)};
            }
          }
          &--selected {
            background: ${secondaryColor};
            &:hover {
              background: ${rgba(secondaryColor, .8)};
            }
          }
          
        }
      }
    }
  }
`

const AvanceContainer = styled.div`
  padding: 2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  margin-bottom: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  .ant-steps{
    &-item{
      &-process{
        i {
          color: ${secondaryColor};
        }
      }
      &-wait{
        .ant-steps-icon{
          color: ${middleGray};
        }
      }
      &-finish{
        .ant-steps-icon{
          color: ${brandColor};
        }
        .ant-steps-item-title::after, .ant-steps-item-tail::after{
          background-color: ${brandColor};
        }
      }
    }
  }
`

const DetalleCompraContainer = styled.div`
  padding: 2rem;
  border: 1px solid red;
`

const NavegadorContainer = styled.div`
  text-align: right;
  padding: 1rem;
  right: 0;
  & .ant-btn {
    border-color: ${secondaryColor};
    color: ${secondaryColor};
    background: white;
    margin-left: 10px;
    padding: 1rem 2rem;
    height: auto;
    &:disabled {
      border-color: #d9d9d9;
      color: gray;
    }
  }
  @media (max-width: 576px) {
    position: relative;
    bottom: 0;
  }
`

const PagoContainer = styled.div`
  border: 1px solid #d9d9d9;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
  border-radius: 5px;
  padding: 2rem;
  margin-top: 20px;
  .ant-tabs-tab:hover,
  .ant-tabs-tab-active {
    color: ${secondaryColor};
  }
  .ant-tabs-ink-bar {
    background: ${secondaryColor};
  }
  .ant-form-explain{
    visibility: hidden;
  }
  .ant-input {
    margin: 0;
    height: 42px;
    box-shadow: none;
    &:focus,
    &:active,
    &:hover {
      border-color: ${secondaryColor};
    }

    &::placeholder {
      color: ${middleGray};
    }
  }
  .ant-radio-wrapper{
    margin-right: 2rem;
  }
  .ant-radio{
    &-checked{
      .ant-radio-inner{
        border-color: ${secondaryColor};
        &::after{
          background-color: ${secondaryColor};
        }
      }
    }
  }
  .pay-select{
    height: 42px;
    width: 100%;
    display: flex;
    padding-left: 11px;
    padding-right: 11px;
    background: white;
    color: black;
    border: 1px solid #d9d9d9;
    -webkit-border-radius:4px;
    -moz-border-radius:4px;
    border-radius:4px;
    transition: all 0.3s;
    &:hover, &:active, &:focus{
      border-color: ${secondaryColor};
    }
    option{
      color: ${darkGray};
      background: white;
      &:hover, &:focus, &:active, &:checked{
        color: black;
        background: ${middleGray};
      }
    }
  }
  .pay-btn{
    width: 100%;
    text-align: center;
    button{
      background: ${brandColor};
      color: white;
      text-transform: uppercase;
      border: none;
      font-size: 18px;
      &:hover,  &:active{
        background: ${rgba(brandColor, .6)};
      }
    }
  }
`

const PasajerosContainer = styled.div`
  & .pasajero {
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 0 20px 10px;
    margin: 20px 0;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 4px 0px;
    h4 {
      padding-top: 15px;
      color: black;
      font-size: 18px;
      font-weight: bold;
    }
    .ant-form-item-children {
      outline-color: ${secondaryColor};
    }
    .ant-input-wrapper{
      padding: 0;
    }
    .ant-input-group-addon{
      padding-left:0;
      padding-right:0;
    }
    .ant-input {
      margin: 0;
      height: 42px;
      box-shadow: none;
      &:focus,
      &:active,
      &:hover {
        border-color: ${secondaryColor};
      }

      &::placeholder {
        color: ${middleGray};
      }
    }
    & .ant-select {
      width: 100%;
    }
    & .ant-select-selection--single {
      height: 42px;
      width: 100%;
      display: flex;
      box-shadow: none;
      align-items: center;
      justify-content: flex-start;
    }
    & .ant-select-selection-selected-value {
      padding-right: 38px;
    }
    .ant-select-selection {
      .ant-select-arrow {
        color: black;
      }

      &:focus,
      &:active,
      &:hover {
        border-color: ${secondaryColor};
      }

      .ant-select-selection__placeholder {
        color: ${middleGray};
      }

      .ant-select-selection__rendered {
        height: 100%;
        justify-content: left;
        align-items: center;
        display: flex;

        ul {
          width: 100%;
          input {
          }
        }
      }
      color: black;
    }
    .ant-input-number {
      width: 100%;
      box-shadow: none;
      height: 42px;
      display: flex;
      align-items: center;
      border-color: #d9d9d9;
      &:focus,
      &:active,
      &:hover {
        border-color: ${secondaryColor} !important;
      }
      &::placeholder {
        color: ${middleGray};
      }
      .ant-input-number-handler-wrap {
        display: none;
      }
      .ant-input-number-input-wrap {
        height: 100%;
        width: 100%;
        .ant-input-number-input {
          height: 100%;
        }
      }
    }
  }
  & .contacto {
    h4 {
      color: ${brandColor};
    }
  }
`

const ResumenContainer = styled.div`
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  padding: 0 10px;
  text-align: center;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 4px 0px;
  & .left,
  & .right {
    display: inline-block;
    padding: 15px 10px;
    width: 48%;
  }
  & .left {
    text-align: left;
  }
  & .right {
    text-align: right;
  }
  & .resumen-header {
    font-weight: bold;
    font-size: 18px;
    i {
      width: 4%;
    }
  }
  .ant-divider {
    margin: 5px 0;
    background: #d9d9d9;
  }
  .resumen-tip {
    .left {
      font-weight: bold;
      font-size: 16px;
    }
    .right {
      color: ${brandColor};
      font-weight: bold;
      font-size: 2rem;
    }
  }
`

const StateContainer = styled.div`
  background: ${successColor};
  color: white;
  margin-top: 20px;
  padding: 5px 30px;
  font-size: 16px;
  border-radius: 5px;
  & b {
    padding-left: 15px;
  }
`

const ViajeContainer = styled.div`
  margin: 20px 0;
  border: 1px solid #d9d9d9;
  padding: 20px;
  box-shadow: rgba(0,0,0,0.15) 0px 2px 4px 0px;
  border-radius: 5px;
  @media (max-width: 992px){
    padding: 10px
  }
  & .viaje-header {
    padding: 10px;
    display: flex;
    align-items: center;
    & span {
      text-transform: uppercase;
      font-size: 18px;
      font-weight: bold;
    }
    & i {
      padding: 0 5px;
      color: rgba(0, 0, 0, 0.65);
    }
    & .viaje-date {
      font-size: 1.8rem;
    }
  }
  & .viaje-detalle {
    border: 1px solid #d9d9d9;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    font-size: 18px;
    height: 60px;
    position: relative;
    & .viaje-description {
      text-transform: uppercase;
      font-size: 14px;
      position: absolute;
      left: 10px;
      top: 0;
    }
    & .viaje-horario {
      padding-left: 75px;
      padding-top: 5px;
      i {
        color: ${secondaryColor};
        padding: 0 20px;
        @media (max-width: 992px){
          padding: 0 10px;
        }
      }
      @media (max-width: 992px){
        padding: 0;
      }
    }
    & .viaje-duracion-precio{
      position: relative;
      &>span{
        font-size: 16px;
        color: #d9d9d9;
        line-height: 40px;
      }
      & .viaje-precio {
        display: inline;
        text-align: left;
        position: absolute;
        right: 0;
        padding: 0 10%;
        border-left: 1px solid #d9d9d9;
        .title {
          font-size: 11px;
        }
      }
    }
    &-active{
      border-color: ${secondaryColor};
    }
    &:hover {
      border-color: ${secondaryColor};
      cursor: pointer;
    }
    @media (max-width: 992px){
      height: 100px;
      .viaje-horario,
      .viaje-duracion-precio{
        text-align: center;
      }
      .viaje-duracion-precio>span{
        padding-right: 40%;
      }
      .viaje-precio{
        border-left: none !important;
        position: relative;
        padding: 0 !important;
        margin: 0;
        left: 60%;
      }
    }

    }
  }
  & .detalle-header {
    & .detalle-title {
      font-size: 24px;
      font-weight: bold;
      color: ${brandColor};
      margin-bottom: 16px;
    }
    & .detalle-subtitle {
      font-size: 16px;
      margin-bottom: 8px;
    }
    & .detalle-phrase {
      font-size: 14px;
      color: #d9d9d9;
    }
    & .detalle-comprobante{
      text-align: center;
      & .ant-btn {
        border-color: ${rgba(brandColor, .6)};
        color: ${brandColor};
        background: white;
        margin: 1rem 0;
      }
    }
  }
  & .detalle-content {
    margin: 10px 0;
    border-radius: 5px;
    & .detalle-abstract {
      display: inline;
      & .abstract-header {
        display: inline-block;
        padding-right: 50px;
        & .title {
          font-weight: bold;
          display: inline;
          margin-right: 5px;
        }
        & .content {
          display: inline;
        }
      }
      & .barra-right {
        margin-right: 20px;
      }
    }
    @media (max-width: 576px) {
      padding: 10px;
    }
  }
  & .detalle-pasajero {
    margin-top: 20px;
    & .pasajero-name {
      font-size: 18px;
      & b {
        text-transform: uppercase;
      }
    }
  }
  & .send-mail {
    margin-bottom: 24px;
    & .ant-form {
      .ant-form-item{
        margin: 0;
      }
      .ant-input {
        box-shadow: none;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        &:focus,
        &:active,
        &:hover {
          border-color: ${secondaryColor};
        }

        &::placeholder {
          color: ${middleGray};
        }
      }
      & .ant-btn {
        width: 100%;
        background: ${brandColor};
        color: white;
        text-transform: uppercase;
        border: none;
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        margin-top:3px;
      }
      @media (max-width: 576px){
        .ant-input, .ant-btn{
          border-radius: 4px; 
        }
      }
    }
  }
`
export {
  AsientosContainer,
  AvanceContainer,
  DetalleCompraContainer,
  NavegadorContainer,
  PagoContainer,
  PasajerosContainer,
  ResumenContainer,
  StateContainer,
  ViajeContainer
}

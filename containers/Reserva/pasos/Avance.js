import React from 'react'
import { AvanceContainer } from './styles'
import { Icon, Steps } from 'antd'

const Step = Steps.Step

export default props => (
  <AvanceContainer>
    <Steps size='small' current={props.currentStep}>
      <Step
        title='Hora de salida'
        icon={<Icon type='calendar'/>}
      />
      <Step
        title='Información de pasajeros'
        icon={<Icon type='user'/>}
      />
      <Step
        title='Selección de asientos'
        icon={<Icon type='gold'/>}
      />
      <Step
        title='Pago'
        icon={<Icon type='credit-card'/>}
      />
    </Steps>
  </AvanceContainer>
)

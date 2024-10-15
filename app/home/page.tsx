'use client'

import { ButtonV3, InputV3, SelectTextV3 } from '@cecoc/ui-kit-v3'
import { useState } from 'react'
import { Notification, NotificationType, NotificationVariant } from '../components/Notification/Notification'
import { NotificationPosition, useNotification } from '../components/Notification/NotificationProvider'
import { Tabs, useHandleTabs } from '../components/Tabs/Tabs'
import { NormalForm } from './components/1-normal'
import { FormWithArray } from './components/2-array'
import FormWithWrapper from './components/3-with-form-wrapper'
import ArrayFormWithWrapper from './components/4-array-with-form-wrapper'
// const options: string[] = [];

// const options = ["hola", "adios", "nacho"] as const;

const options = [
  { label: 'Normal form', value: 'normal', prefix: '@', sufix: '#' },
  { label: 'Array form', value: 'array' },
  { label: 'Normal wrapper form', value: 'normal-wrapper', disabled: true },
  { label: 'Array wrapper form', value: 'array-wrapper' }
] as const

export default function Home() {
  const {
    onTabChange,
    currentTab,
    options: opt
  } = useHandleTabs(options, {
    queryKey: 'test'
  })
  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState<NotificationVariant>('outlined')
  const [type, setType] = useState<NotificationType>('default')
  const [position, setPosition] = useState<NotificationPosition>('top-right')
  const [num, setNum] = useState(1)

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const { notify } = useNotification()

  const variants: NotificationVariant[] = ['filled', 'outlined']
  const types: NotificationType[] = ['default', 'error', 'info', 'success', 'warning']
  const positions: NotificationPosition[] = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

  return (
    <div style={{ padding: '20px' }}>
      <Tabs onTabChange={onTabChange} currentTab={currentTab} options={options} variant="tab" />
      <div style={{ height: '10px' }} />
      <Tabs onTabChange={onTabChange} currentTab={currentTab} options={options} variant="button" />

      {/* <ButtonGroup
        onTabChange={onTabChange}
        currentTab={currentTab}
        options={options}
      /> */}

      <div style={{ padding: '20px' }}>
        {currentTab === 'normal' && <NormalForm editingUser={null} />}
        {currentTab === 'array' && <FormWithArray editingUser={null} />}
        {currentTab === 'normal-wrapper' && <FormWithWrapper editingUser={null} />}
        {currentTab === 'array-wrapper' && <ArrayFormWithWrapper editingUser={null} />}
        {currentTab === null && 'No hay nada'}

        <div style={{ display: 'flex', gap: '16px', margin: '10px 0px' }}>
          <ButtonV3
            onClick={() => {
              notify({
                title: `Notificación ${num}`,
                message: message,
                position: position,
                variant: variant,
                type: type,
                autoClose: null
              })
              setNum(prev => prev + 1)
            }}
          >
            Notify
          </ButtonV3>
          <InputV3 value={message} onValueChange={setMessage} />
          <SelectTextV3
            options={variants.map(p => ({ label: p, value: p }))}
            value={variant}
            onChange={e => setVariant(e.target.value as NotificationVariant)}
            placeholder="variants"
          />
          <SelectTextV3
            options={types.map(p => ({ label: p, value: p }))}
            value={type}
            onChange={e => setType(e.target.value as NotificationType)}
            placeholder="type"
          />
          <SelectTextV3
            options={positions.map(p => ({ label: p, value: p }))}
            value={position}
            onChange={e => setPosition(e.target.value as NotificationPosition)}
            placeholder="positions"
          />

          <button onClick={() => setIsOpen(prev => !prev)}>Toggle active</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Notification
            title="Hola"
            message="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
        dignissimos excepturi illo ipsam, perferendis obcaecati molestiae
        commodi eveniet inventore cupiditate iste suscipit amet placeat. Illum
        quos placeat possimus iure dolore."
            open={isOpen}
            closable={false}
            actions={[<ButtonV3 key="1">Hola</ButtonV3>]}
            onOpenChange={open => {
              setIsOpen(open)
              console.log(open)
            }}
          />
          ----------------------------
          <Notification
            title="Default filled"
            message="Mensaje"
            variant="filled"
            type="default"
            onOpenChange={open => console.log(open)}
          />
          <Notification title="Error filled" message="Mensaje" variant="filled" type="error" />
          <Notification title="Hola" message="Info filled" variant="filled" type="info" />
          <Notification title="Hola" message="Success filled" variant="filled" type="success" />
          <Notification title="Hola" message="Warning filled" variant="filled" type="warning" />
          <Notification title="Hola" message="Mensaje" variant="outlined" type="default" />
          <Notification title="Hola" message="Mensaje" variant="outlined" type="error" />
          <Notification title="Hola" message="Mensaje" variant="outlined" type="info" />
          <Notification title="Hola" message="Mensaje" variant="outlined" type="success" />
          <Notification
            title="Hola"
            message="Mensaje"
            variant="outlined"
            type="warning"
            actions={[
              <ButtonV3 key={1} uppercase={false} variant="link-secondary">
                Acción uno
              </ButtonV3>,
              <ButtonV3 key={2} uppercase={false} variant="secondary" outline>
                Acción dos
              </ButtonV3>
            ]}
          />
        </div>
      </div>
    </div>
  )
}

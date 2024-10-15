'use client'
import { Icon, IconType } from '@cecoc/icons'
import { ColorsV3 } from '@cecoc/ui-kit-v3'
import classNames from 'classnames'
import { ComponentProps, forwardRef, useEffect, useState } from 'react'
import styles from './Notification.module.css'
import { NotificationProviderProps } from './NotificationProvider'

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'default'
export type NotificationVariant = 'outlined' | 'filled'
export interface NotificationProps extends NotificationProviderProps {
  id?: string
  type?: NotificationType
  title: string
  message?: string
  variant?: NotificationVariant
  actions?: any[]
}
export interface ExtendedNotificationProps
  extends Omit<NotificationProps, 'position'>,
    Omit<ComponentProps<'div'>, 'title'> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const typeIcons: Record<NotificationType, IconType | undefined> = {
  default: undefined,
  success: 'circle-check',
  error: 'circle-x-mark',
  warning: 'circle-exclamation',
  info: 'circle-info'
}
const typeColors: Record<NotificationType, string> = {
  default: '#273237',
  success: ColorsV3.status.positive.active,
  error: ColorsV3.status.danger.active,
  warning: ColorsV3.status.warning.active,
  info: ColorsV3.status.info.active
}

export const Notification = forwardRef<HTMLDivElement, ExtendedNotificationProps>(function Notification(
  {
    variant = 'outlined',
    type = 'default',
    title,
    open = true,
    autoClose = null,
    closable = true,
    message,
    actions = [],
    className,
    onOpenChange,
    ...props
  },
  ref
) {
  const [isOpen, setIsOpen] = useState<boolean>(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    onOpenChange && onOpenChange(isOpen)
  }, [isOpen])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (autoClose) {
      timer = setTimeout(() => {
        setIsOpen(false)
      }, autoClose)
    }
    return () => clearTimeout(timer)
  }, [autoClose])

  return (
    isOpen && (
      <div ref={ref} className={classNames(styles.notification, styles[variant], styles[type], className)} {...props}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
          <Icon
            icon={typeIcons[type]}
            color={
              variant === 'outlined'
                ? typeColors[type]
                : type === 'default' || type === 'warning'
                ? '#273237'
                : ColorsV3.base.white
            }
            width={40}
            height={40}
          />
          <div className={styles.content}>
            <div className={classNames(styles.title, styles[variant], styles[type])}>{title}</div>
            <div className={classNames(styles.message, styles[variant], styles[type])}>{message}</div>
          </div>
          {closable && (
            <button onClick={() => setIsOpen(false)}>
              <Icon
                icon="xmark"
                height={24}
                width={24}
                color={
                  variant === 'filled' && type === 'default'
                    ? '#273237'
                    : variant === 'filled' && (type === 'success' || type === 'error' || type === 'info')
                    ? 'white'
                    : '#858F99'
                }
                className={styles.closeButton}
              />
            </button>
          )}
        </div>
        {actions.length > 0 && (
          <>
            <hr />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end'
              }}
            >
              {actions.map(action => action)}
            </div>
          </>
        )}
      </div>
    )
  )
})

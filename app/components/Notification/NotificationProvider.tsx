'use client'
import { objectKeys } from '@/app/utils/form'
import { Tag } from '@cecoc/ui-kit-v3'
import classNames from 'classnames'
import { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { Notification, NotificationProps } from './Notification'
import styles from './Notification.module.css'

interface NotificationContextProps {
  notify: (options: NotificationProps) => void
}
const NotificationContext = createContext<null | NotificationContextProps>(null)

export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export interface NotificationProviderProps {
  children?: ReactNode
  position?: NotificationPosition
  autoClose?: number | null
  closable?: boolean
}

type States = 'default' | 'collapsed' | 'open'

export function NotificationProvider({
  position = 'bottom-right',
  autoClose = null,
  closable = true,
  children
}: NotificationProviderProps) {
  const [isOpen, setIsOpen] = useState<null | NotificationPosition>(null)
  const [notifications, setNotifications] = useState<Record<NotificationPosition, NotificationProps[]>>({
    'bottom-left': [],
    'bottom-right': [],
    'top-left': [],
    'top-right': []
  })
  const [positions, setPositions] = useState<Record<NotificationPosition, number[]>>({
    'bottom-left': [],
    'bottom-right': [],
    'top-left': [],
    'top-right': []
  })
  const gap = 8
  const [animateKey, setAnimateKey] = useState<Record<NotificationPosition, number>>({
    'bottom-left': 0,
    'bottom-right': 0,
    'top-left': 0,
    'top-right': 0
  })
  const itemRefs = useRef<Record<NotificationPosition, (HTMLDivElement | null)[]>>({
    'bottom-left': [],
    'bottom-right': [],
    'top-left': [],
    'top-right': []
  })

  const notify = (options: NotificationProps) => {
    const pos = options?.position || position
    setNotifications(prev => ({
      ...prev,
      [pos]: [...prev[pos], { id: prev[pos].length, ...options }]
    }))
    if (notifications[pos].length > 1) setAnimateKey(prev => ({ ...prev, [pos]: prev[pos] + 1 }))
  }

  useEffect(() => {
    const calculatePositions = () => {
      const newPositions: Record<NotificationPosition, number[]> = {
        'bottom-left': [],
        'bottom-right': [],
        'top-left': [],
        'top-right': []
      }

      Object.keys(notifications).forEach(posKey => {
        const pos = posKey as NotificationPosition
        let topOffset = 0

        itemRefs.current[pos].forEach(item => {
          if (item) {
            const itemHeight = item.offsetHeight
            newPositions[pos].push(topOffset)
            topOffset += itemHeight + gap
          }
        })
      })

      setPositions(newPositions)
    }

    calculatePositions()

    window.addEventListener('resize', calculatePositions)
    return () => window.removeEventListener('resize', calculatePositions)
  }, [isOpen, notifications])

  const getTopPosition = (index: number, pos: NotificationPosition): number => {
    if (isState('collapsed', pos)) return 0
    return positions[pos][index]
  }

  const getOpacity = (index: number, pos: NotificationPosition) => {
    if (isState('collapsed', pos) && index !== 0) return 'hidden'
    return 'visible'
  }

  const isState = (state: States, pos: NotificationPosition) => {
    if (state === 'default') return notifications[pos].length <= 2
    if (state === 'collapsed') return notifications[pos].length > 2 && isOpen !== pos
    if (state === 'open') notifications[pos].length > 2 && isOpen === pos
  }

  const isLeft = (pos: NotificationPosition) => pos === 'top-left' || pos === 'bottom-left'
  const isTop = (pos: NotificationPosition) => pos === 'top-left' || pos === 'top-right'
  const isBottom = (pos: NotificationPosition) => pos === 'bottom-left' || pos === 'bottom-right'

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {objectKeys(notifications).map(pos => (
        <div
          key={pos}
          className={classNames(styles.container, styles[`container-${pos}`])}
          style={{
            zIndex: isState('open', pos) ? 9 : 8,
            height: positions[pos][positions[pos].length - 1],
            width: '400px',
            backgroundColor: 'red'
          }}
          onMouseLeave={() => setIsOpen(null)}
        >
          <Notification
            title=""
            variant={notifications[pos][notifications[pos].length - 2]?.variant || 'outlined'}
            type={notifications[pos][notifications[pos].length - 2]?.type || 'default'}
            key={animateKey[pos]}
            className={classNames(
              styles.stackEffect,
              styles.toast,
              isLeft(pos) ? styles.leftEffect : styles.rightEffect
            )}
            style={{
              top: isTop(pos) ? itemRefs.current[pos][0]?.offsetHeight! - 46 : 'auto',
              bottom: isBottom(pos) ? itemRefs.current[pos][0]?.offsetHeight! - 46 : 'auto',
              opacity: isState('collapsed', pos) ? 1 : 0
            }}
          />
          {isState('collapsed', pos) && (
            <Tag
              text={notifications[pos].length}
              onClick={() => setIsOpen(pos)}
              className={classNames(styles.count, isLeft(pos) ? styles.left : styles.right)}
              style={{
                top: isTop(pos) ? itemRefs.current[pos][0]?.offsetHeight! + 14 : 'auto',
                bottom: isBottom(pos) ? itemRefs.current[pos][0]?.offsetHeight! + 14 : 'auto'
              }}
            />
          )}
          {notifications[pos]
            .slice()
            .reverse()
            .map((notification, index) => (
              <Notification
                ref={el => {
                  itemRefs.current[pos][index] = el
                }}
                className={classNames(
                  styles.toast,
                  isLeft(pos) ? styles.leftEffect : styles.rightEffect,
                  isTop(pos) ? styles.top : styles.bottom
                )}
                style={{
                  top: isTop(pos) ? getTopPosition(index, pos) : 'auto',
                  bottom: isBottom(pos) ? getTopPosition(index, pos) : 'auto',
                  visibility: getOpacity(index, pos),
                  zIndex: notifications[pos].length - index
                }}
                key={notification.id}
                autoClose={autoClose}
                closable={closable}
                {...notification}
                onOpenChange={open =>
                  !open &&
                  setNotifications(prev => ({
                    ...prev,
                    [pos]: prev[pos].filter(n => n.id !== notification.id)
                  }))
                }
              />
            ))}
        </div>
      ))}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be inside a NotificationProvider')
  return context
}

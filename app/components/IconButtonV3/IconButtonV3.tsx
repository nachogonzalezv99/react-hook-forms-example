import React, { ButtonHTMLAttributes, CSSProperties, ReactNode, forwardRef } from 'react'
import styles from './IconButtonV3.module.css'

type Size = 'S' | 'M'
type Variant = 'primary' | 'secondary' | 'non-square'

export interface IconButtonV3Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The IconButton variant
   */
  variant?: Variant

  /**
   * The IconButton outline
   */
  outline?: boolean

  /**
   * The IconButton status
   */
  disabled?: boolean

  /**
   * The IconButton size
   */
  size?: Size

  /**
   * The IconButton icon
   */
  icon: ReactNode

  /**
   * The IconButton styles
   */
  style?: CSSProperties

  /**
   * Id for testing propouses
   */
  dataTestId?: string
}

export const IconButtonV3 = forwardRef<HTMLButtonElement, IconButtonV3Props>(
  (
    {
      variant = 'primary',
      outline = false,
      size = 'M',
      disabled = false,
      icon,
      style,
      dataTestId = 'icon-button',
      className = '',
      ...props
    },
    ref
  ) => {
    const getButtonClassNames = () => {
      let classNames = `${styles.iconButton} `
      classNames += size === 'S' ? styles.iconButtonSmall : ''

      if (variant === 'non-square') {
        classNames += ` ${styles.iconButtonNoSquare}`
      } else if (variant === 'primary') {
        classNames += outline ? ` ${styles.iconButtonOutlinePrimary}` : ` ${styles.iconButtonPrimary}`
      } else if (variant === 'secondary') {
        classNames += outline ? ` ${styles.iconButtonOutlineSecondary}` : ` ${styles.iconButtonSecondary}`
      }

      if (disabled) {
        classNames += ` ${styles.iconButtonDisabled}`
      }

      return classNames + ` ${className}`
    }

    const getIconClassNames = (base:string) => {
      let classNames = `${base} ${styles.icon} `

      if (variant === 'non-square') {
        classNames += ` ${styles.iconNoSquare}`
      } else if (variant === 'primary') {
        classNames += outline ? ` ${styles.iconOutlinePrimary}` : ` ${styles.iconPrimary}`
      } else if (variant === 'secondary') {
        classNames += outline ? ` ${styles.iconOutlineSecondary}` : ` ${styles.iconSecondary}`
      }

      if (disabled) {
        classNames += ` ${styles.iconDisabled}`
      }

      return classNames
    }

    return (
      <button
        style={style}
        tabIndex={0}
        className={getButtonClassNames()}
        disabled={disabled}
        data-testid={dataTestId}
        {...props}
        ref={ref}
      >
        {React.cloneElement(icon as React.ReactElement, { width: 24, height: 24, className: getIconClassNames(className) })}
      </button>
    )
  }
)

IconButtonV3.displayName = 'IconButtonV3'

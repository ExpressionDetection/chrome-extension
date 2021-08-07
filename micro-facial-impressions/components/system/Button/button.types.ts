
import { CSSProp } from 'styled-components'
import { DefaultStyleProps, CssProperties, ColorType } from '../theme/types'

export type ButtonStyledProps = DefaultStyleProps & CssProperties

export interface ButtonProps extends ButtonStyledProps {
  // styling?: ColorType | 'base' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'link'
  styling: ColorType
  size?: 'small' | 'medium' | 'large'
  outline?: boolean
  disabled?: boolean
  boxShadow?: string
  text?: boolean
  block?: boolean
  css?: CSSProp
  onClick: object
}
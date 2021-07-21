import styled from 'styled-components'
import {
  color,
  typography,
  fontSize,
  position,
  space,
  flexbox,
  grid,
  layout,
  border,
  system,
  shadow
} from 'styled-system'
import { BoxProps } from './box.types'

export const Box: React.FC<BoxProps> = styled.div<BoxProps>`
    ${color}
    ${typography}
    ${fontSize}
    ${space}
    ${position}
    ${flexbox}
    ${grid}
    ${layout}
    ${border}
    ${shadow}
    ${system({ transition: true, animationFillMode: true, boxSizing: true })}
    ${(props) => props.css ?? ''}
`

export default Box
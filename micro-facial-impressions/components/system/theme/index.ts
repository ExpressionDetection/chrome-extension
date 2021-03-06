import colors from './colors'
import { breakpoints, fontSizes, fontWeights, radii, space, shadows } from './sizes'

const theme = {
  breakpoints,
  fontSizes,
  fontWeights,
  radii,
  space,
  shadows,
  colors: colors()
}

// @ts-expect-error
theme.breakpoints.mobile = breakpoints[0]
// @ts-expect-error
theme.breakpoints.tablet = breakpoints[1]
// @ts-expect-error
theme.breakpoints.desktop = breakpoints[2]

export default theme
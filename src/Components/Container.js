// @flow
import styled from '@emotion/styled'
import withProps from 'recompose/withProps'
import { color } from 'styled-system'
import { layout, position, flexBox } from './styles'

export const Box = styled('div')(layout, position, color)
export const Flex = styled(Box)({ flexShrink: 0 }, flexBox)

export const Absolute = withProps({ position: 'absolute' })(Box)
export const Fixed = withProps({ position: 'fixed' })(Box)

export const Grid = withProps(({ innerRef, maxWidth, gutter, ...props }) => {
  let invertedGutter
  if (Array.isArray(gutter)) gutter.map(v => -v)
  else if (typeof gutter === 'object')
    invertedGutter = Object.keys(gutter).reduce(
      (prev, k) => ({
        ...prev,
        [k]: -gutter[k],
      }),
      {},
    )
  else invertedGutter = -gutter

  return {
    ...props,
    ref: innerRef,
    mx: invertedGutter || {
      sm: -1,
      md: -12,
      xlg: -2,
    },
    maxWidth: maxWidth || {
      lg: 945,
      xlg: 1120,
    },
    flexWrap: 'wrap',
  }
})(Flex)

export const Col = withProps(({ innerRef, gutter, ...props }) => ({
  width: 1,
  ...props,
  ref: innerRef,
  px: gutter || {
    sm: 1,
    md: 12,
    xlg: 2,
  },
}))(Flex)

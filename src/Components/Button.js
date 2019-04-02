// @flow
import styled from '@emotion/styled'
import { Link } from '@reach/router'
import { mergeAll, compose } from 'ramda'
import withProps from 'recompose/withProps'
import { color } from 'styled-system'
import { interactiveColor, outline, typography } from './styles'
import { Flex } from './Container'

const Base = styled('button')(
  interactiveColor(
    compose(
      mergeAll,
      color,
    ),
  ),
  typography,
  outline({ borderRadius: 2 }),
  {
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },
)

const StyledButton = styled(Base)({
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  padding: '16px 32px',
  fontFamily: 'Montserrat',
  fontWeight: '700',
  fontSize: 14,
})
const StyledFloatingButton = styled(Base)(
  {
    width: 48,
    height: 48,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ({ raised }) => ({
    boxShadow: raised && 'rgba(0, 0, 0, .2) 0 8px 16px',
  }),
)

const withButtonProps = withProps(({ to, disabled, ...props }) => ({
  as: to ? Link : undefined,
  bg: disabled ? 'disabled' : 'accent',
  color: 'white',
  ...props,
}))
const Button = withButtonProps(Flex.withComponent(StyledButton))
const FloatingButton = withButtonProps(Flex.withComponent(StyledFloatingButton))

export { Base, Button, FloatingButton }

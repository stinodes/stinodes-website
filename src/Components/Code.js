// @flow
// @jsx jsx
import { jsx } from '@emotion/core'
import * as React from 'react'
import { keyframes } from 'emotion'
import styled from '@emotion/styled'
import { map, repeat } from 'ramda'
import { useTransition, animated } from 'react-spring'
import { color } from 'styled-system'
import { typography } from './styles'

const SpanForChars = ({
  value,
  children,
  ...props
}: {
  value: string,
  children: string,
}) => map(c => <span {...props}>{c}</span>, value || children)

const cursorAnimation = keyframes({
  from: { opacity: 1 },
  '33%': { opacity: 1 },
  '66%': { opacity: 0 },
  to: { opacity: 0 },
})

export const Span = styled(SpanForChars)(color, ({ theme: { colors } }) => ({
  position: 'relative',
  cursor: 'none',
  '::before': {},
  ':hover': {
    '::before': {
      pointerEvents: 'none',
      content: "' '",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      animation: `${cursorAnimation} infinite 1s`,
      backgroundColor: colors.text[1],
    },
  },
}))
export const AnimatedSpan = animated(Span)

const Block = ({
  children,
  color,
  ...props
}: {
  children: React.Node,
  color: string,
}) => {
  const childArr = React.Children.toArray(children)
  return (
    <span {...props}>
      {map(
        child =>
          typeof child === 'string' ? (
            <Span color={color}>{child}</Span>
          ) : (
            child
          ),
        childArr,
      )}
    </span>
  )
}

export const Code = styled(Block)(
  {
    fontFamily: 'Source Code Pro',
    position: 'relative',
  },
  typography,
)

export const Ellipsis = () => {
  const [mode, setMode] = React.useState('add')
  const [num, setNum] = React.useState(0)
  const timeout = React.useRef(null)

  const transitions = useTransition(repeat('.', num), (item, index) => index, {
    from: { opacity: 0, transform: 'translateY(5px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(5px)' },
  })

  React.useEffect(() => {
    if (mode === 'add') {
      timeout.current = setTimeout(() => {
        if (num === 3) return setMode('remove')
        return setNum(num => (num === 3 ? num : num + 1))
      }, 500)
    } else {
      timeout.current = setTimeout(() => {
        if (num === 0) return setMode('add')
        return setNum(num => (num === 0 ? num : num - 1))
      }, 100)
    }
    return () => clearTimeout(timeout.current)
  }, [num, mode])

  return (
    <span css={{ position: 'relative' }}>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.span
              css={{ display: 'inline-block' }}
              key={key}
              style={props}>
              <Span color="lights.3">.</Span>
            </animated.span>
          ),
      )}
    </span>
  )
}

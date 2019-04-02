// @flow
import * as React from 'react'
import { keyframes } from 'emotion'
import styled from '@emotion/styled'
import { map, repeat } from 'ramda'
import withProps from 'recompose/withProps'
import { color } from 'styled-system'
import { Text } from './Text'
import { Box } from './Container'

const SpanForChars = ({
  value,
  children,
  ...props
}: {
  value: string,
  children: string,
}) => map(c => <span {...props}>{c}</span>, value || children)

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
      backgroundColor: colors.text,
    },
  },
}))

const cursorAnimation = keyframes({
  from: { opacity: 1 },
  '33%': { opacity: 1 },
  '66%': { opacity: 0 },
  to: { opacity: 0 },
})

const CodeStyle = styled(Text)({
  fontFamily: 'Hasklig',
  position: 'relative',
})

type CodeProps = { children: React.Node }
export const Code = ({ children, ...props }: CodeProps) => {
  console.log(children)
  return <CodeStyle {...props}>{children}</CodeStyle>
}

export const Var = withProps(() => ({ color: 'variable' }))(Span)
export const Keyword = withProps(() => ({ color: 'keyword' }))(Span)
export const Str = withProps(() => ({ color: 'string' }))(Span)

const Indent = () => <Span>&nbsp;&nbsp;</Span>
export const Line = ({
  children,
  indent = 0,
}: {
  children: React.Node,
  indent?: number,
}) => {
  const childArr = React.Children.toArray(children)
  return (
    <Box height={26}>
      {map(() => <Indent />, repeat(null, indent))}
      {map(
        child => (typeof child === 'string' ? <Span>{child}</Span> : child),
        childArr,
      )}
    </Box>
  )
}

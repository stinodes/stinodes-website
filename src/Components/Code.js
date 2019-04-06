// @flow
import * as React from 'react'
import { keyframes } from 'emotion'
import styled from '@emotion/styled'
import { map, repeat, toPairs } from 'ramda'
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

const Block = ({ children, color, ...props }: { children: React.Node }) => {
  const childArr = React.Children.toArray(children)
  return (
    <span {...props}>
      {map(
        child => (typeof child === 'string' ? <Span>{child}</Span> : child),
        childArr,
      )}
    </span>
  )
}

const cursorAnimation = keyframes({
  from: { opacity: 1 },
  '33%': { opacity: 1 },
  '66%': { opacity: 0 },
  to: { opacity: 0 },
})

export const Code = styled(Block)(
  {
    display: 'block',
    fontFamily: 'Hasklig',
    position: 'relative',
  },
  ({ theme: { colors } }) => ({ color: colors.text }),
)

// type CodeProps = { children: React.Node }
// export const Code = ({ children, ...props }: CodeProps) => {
//   return <CodeStyle {...props} />
// }

export const Var = withProps(() => ({ color: 'variable' }))(Span)
export const Keyword = withProps(() => ({ color: 'keyword' }))(Span)
export const Str = withProps(() => ({ color: 'string' }))(Span)
export const NewLine = () => <br />

const Indent = () => <Span>&nbsp;&nbsp;</Span>
export const Indents = ({ n = 0 }: { n?: number }) => repeat(<Indent />, n)

export const asVar = (value: string) => `var::${value}`
export const asString = (value: string) => `string:${value}`
export const asKeyword = (value: string) => `keyword:${value}`

const AS_REGEX = /^[a-z]+::/
const STRING_REGEX = /^(?:(?:'.*')|(?:`.*`)|(?:".*"))$/
type ValueProps = {
  as: React.ComponentType<any>,
  indent?: number,
  children: any,
}
export const Value = ({ as, children, indent = 0 }: ValueProps) => {
  if (as) return <as>{children}</as>

  if (typeof children === 'string' && AS_REGEX.test(children)) {
    const [type, value] = children.split('::')
    if (type === 'var') return <Var>{value}</Var>
    if (type === 'string') return <Str>{value}</Str>
    if (type === 'keyword') return <Keyword>{value}</Keyword>
  }
  if (typeof children === 'string') return <Str>{"'" + children + "'"}</Str>
  if (typeof children === 'object')
    return <ObjLiteral indent={indent}>{children}</ObjLiteral>
  return <Var>{children}</Var>
}
type ObjLiteralProps = {
  children: Object,
  indent?: number,
}
export const ObjLiteral = ({ children, indent = 0 }: ObjLiteralProps) => {
  const pairs = toPairs(children)
  return (
    <Block>
      {'{'} <NewLine />
      {map(
        ([key, val]) => (
          <Block>
            <Indents n={indent + 1} />
            {key}: <Value indent={indent + 1}>{val}</Value>,
            <NewLine />
          </Block>
        ),
        pairs,
      )}
      <Indents n={indent} />
      {'}'}
    </Block>
  )
}

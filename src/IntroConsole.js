// @flow
// @jsx jsx
import { jsx } from '@emotion/core'
import * as React from 'react'
import styled from '@emotion/styled'
import { useSpring, animated } from 'react-spring'
import { Fixed, Card, Code, Ellipsis } from './Components'
import { useCmds } from './useSteps'

const Container = styled(Fixed)({
  right: 0,
  bottom: 32,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
const ELLIPSIS_EXP = /(\.{3}$)/
const Cmd = ({ children, ...props }: { children: string }) => {
  const spring = useSpring({
    from: { opacity: 0, height: 0 },
    to: { opacity: 1, height: 26 },
  })
  const showEllipsis = ELLIPSIS_EXP.test(children)
  const cmd = showEllipsis ? children.replace(ELLIPSIS_EXP, '') : children
  return (
    <animated.div style={spring}>
      <Code
        css={{
          height: 26,
          display: 'flex',
          whiteSpace: 'pre-wrap',
          alignItems: 'center',
        }}
        color="lights.3"
        {...props}>
        <Code color="lights.3" css={{ opacity: 0.7 }}>
          stinodes${' '}
        </Code>
        {cmd}
        {showEllipsis && <Ellipsis />}
      </Code>
    </animated.div>
  )
}

type Props = {}
export const IntroConsole = (props: Props) => {
  const [mountSpring, set] = useSpring(() => ({ opacity: 0 }))
  const cmds = useCmds()
  React.useEffect(() => {
    set({ opacity: 1 })
  }, [])

  return (
    <Container>
      <Card
        as={animated.div}
        style={mountSpring}
        width={480}
        px={3}
        py={2}
        bg="darks.1"
        border="darks.3"
        flexDirection="column">
        {cmds.map(cmd => (
          <Cmd>{cmd}</Cmd>
        ))}
      </Card>
    </Container>
  )
}

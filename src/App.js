// @flow
// @jsx jsx
import { jsx } from '@emotion/core'
import * as React from 'react'
import { useSpring, animated } from 'react-spring'
import styled from '@emotion/styled'
import { reduce } from 'ramda'
import { ThemeProvider } from 'emotion-theming'
import { Fixed, Grid, Flex, Text, Col } from './Components'
import { StepsProvider, useStep } from './useSteps'
import { Navigation } from './Components/Navigation'
import { Intro } from './Intro'
import { RefsProvider, useRefAs } from './useRefs'

const theme = {
  colors: {
    lights: ['#D4D6E3', '#E9E9F0', '#F0F2F6', '#F9FAFC', '#FCFCFD'],
    darks: ['#0C0D13', '#191A26', '#212333', '#32354D', '#71737D'],
    text: ['#212333', '#FAFCFD'],
    panel: '#2C2B46',
    variable: '#61E786',
    keyword: '#88CCF1',
    string: '#e4a88a',
  },
  space: [0, 8, 16, 24, 32, 64],
}

const withProviders = (App, providers) => () =>
  reduce(
    (children, [Provider, props = {}]) => (
      <Provider {...props}>{children}</Provider>
    ),
    <App />,
    providers,
  )

const Title = styled(Text)(
  {
    fontSize: 64,
    fontWeight: '800',
    letterSpacing: 16,
    textAlign: 'center',
  },
  ({ theme: { colors } }) => {
    const color = colors.darks[3]
    return {
      color: color,
      textShadow: `${colors.darks[0]} 0 8px 48px`,
    }
  },
)

const App = () => {
  const step = useStep()
  const refAs = useRefAs()
  const scrollRef = React.useRef()
  const [spring, set] = useSpring(() => ({
    transform: 'translateY(0px)',
    opacity: 1,
  }))
  const onScroll = React.useCallback(e => {
    const scrollTop = e.target.scrollTop
    if (scrollTop <= window.innerHeight)
      set({
        transform: `translateY(${Math.min(
          scrollTop,
          window.innerHeight * 0.5,
        )})px`,
      })
  }, [])

  React.useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollRef.current])

  return (
    <Flex justifyContent="center" width="100vw">
      <Grid
        css={{ overflowY: 'auto' }}
        innerRef={scrollRef}
        width={1}
        maxWidth="unset"
        bg="darks.1">
        <Col
          css={{ position: 'relative' }}
          height="100vh"
          bg="darks.1"
          justifyContent="center"
          flexDirection="column">
          <Flex justifyContent="center">
            <Title ref={refAs('title')} as={animated.p} style={spring}>
              STINODES
            </Title>
          </Flex>
        </Col>
        <Col height={window.innerHeight - 120} bg="darks.2">
          {}
        </Col>
        <Navigation navRef={refAs('navigation')} />
      </Grid>
      {step !== 'hide' && (
        <Fixed css={{ display: 'flex' }} top={0} left={0} bottom={0} right={0}>
          <Intro />
        </Fixed>
      )}
    </Flex>
  )
}

export default withProviders(App, [
  [RefsProvider],
  [StepsProvider],
  [ThemeProvider, { theme }],
])

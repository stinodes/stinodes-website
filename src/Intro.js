// @flow
// @jsx jsx
import { jsx } from '@emotion/core'
import * as React from 'react'
import styled from '@emotion/styled'
import { reduce, assoc, join, adjust, toUpper } from 'ramda'
import { animated, useSpring } from 'react-spring'
import { useStepsContext } from './useSteps'
import { DrawableCol, DrawableCols } from './DrawableElements'
import { IntroConsole } from './IntroConsole'
import { Flex, Fixed } from './Components'
import { useDimensionsFor } from './useRefs'

const cols = 6
const BorderCol = styled(Flex)(
  {
    border: '1px solid transparent',
  },
  ({ theme: { colors }, borders = ['left'] }) =>
    reduce(
      (prev, border) =>
        assoc(
          `border${join('', adjust(0, toUpper, border))}Color`,
          colors.darks[3],
          prev,
        ),
      {},
      borders,
    ),
)
const PositionableDrawableCol = ({
  dimensions: { x, y, width, height },
  ...props
}: {
  dimensions: { x: number, y: number, width: number, height: number },
  visible: boolean,
  children: React.Node,
}) => (
  <Fixed top={y} left={x}>
    <DrawableCol width={width} height={height} {...props} />
  </Fixed>
)

export const Intro = () => {
  const navDimensions = useDimensionsFor('navigation')
  const titleDimensions = useDimensionsFor('title')
  const { step, isPastStep } = useStepsContext()
  const [spring, set] = useSpring(() => ({ opacity: 1 }))
  React.useEffect(() => {
    if (step === 'done') {
      set({ opacity: 0 })
    }
  }, [step])

  return (
    <Flex as={animated.div} style={spring} flex={1} bg="darks.1">
      <Flex width={1}>
        <DrawableCols visible={isPastStep('generating.0')} as={BorderCol}>
          <BorderCol width={1 / cols} />
          <BorderCol width={1 / cols} />
          <BorderCol width={1 / cols} />
          <BorderCol width={1 / cols} />
          <BorderCol width={1 / cols} />
          <BorderCol width={1 / cols} />
        </DrawableCols>
      </Flex>
      <PositionableDrawableCol
        dimensions={navDimensions}
        visible={isPastStep('generating.1')}
        from={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
        to={{ transform: 'scaleX(1)', transformOrigin: 'left' }}
        borders={['bottom']}
        as={BorderCol}>
        {null}
      </PositionableDrawableCol>

      <PositionableDrawableCol
        dimensions={titleDimensions}
        visible={isPastStep('generating.2')}
        from={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
        to={{ transform: 'scaleX(1)', transformOrigin: 'left' }}
        borders={['bottom', 'top']}
        as={BorderCol}>
        {null}
      </PositionableDrawableCol>
      <PositionableDrawableCol
        dimensions={titleDimensions}
        visible={isPastStep('generating.2')}
        from={{ transform: 'scaleY(0)', transformOrigin: 'top' }}
        to={{ transform: 'scaleY(1)', transformOrigin: 'top' }}
        borders={['left', 'right']}
        as={BorderCol}>
        {null}
      </PositionableDrawableCol>

      <IntroConsole />
    </Flex>
  )
}

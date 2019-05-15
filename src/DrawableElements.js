// @flow
import * as React from 'react'
import { compose, not, filter, flip, contains, propEq } from 'ramda'
import { useSpring, useTrail, animated } from 'react-spring'
import { Col } from './Components'

type ColsProps = {
  visible: boolean,
  num?: number,
  as?: React.ComponentType<*>,
  children: React.Node,
  from?: { [string]: number | string },
  to?: { [string]: number | string },
}
export const DrawableCols = ({
  children,
  visible,
  num = 6,
  from = { height: '0%' },
  to = { height: '100%' },
  as = Col,
}: ColsProps) => {
  const childrenArray = React.Children.toArray(children)
  const cols = filter(propEq('type', as), childrenArray)
  const rest = filter(
    compose(
      not,
      flip(contains)(cols),
    ),
    childrenArray,
  )

  const [trails, setTrails] = useTrail(cols.length, () => from)
  React.useEffect(() => {
    visible && setTrails(to)
    return () => {}
  }, [visible])
  return (
    <>
      {trails.map((props, index) =>
        React.cloneElement(cols[index], { as: animated.div, style: props }),
      )}
      {rest}
    </>
  )
}
type ColProps = {
  visible: boolean,
  as?: React.ComponentType<*>,
  children: React.Node,
  from?: { [string]: number | string },
  to?: { [string]: number | string },
}
export const DrawableCol = ({
  children,
  visible,
  from = { transform: 'scaleY(0)', transformOrigin: 'top', height: '100%' },
  to = { transform: 'scaleY(1)', transformOrigin: 'top', height: '100%' },
  as = Col,
  ...props
}: ColProps) => {
  const [spring, setSpring] = useSpring(() => from)
  const C = as
  React.useEffect(() => {
    visible && setSpring(to)
    return () => {}
  }, [visible])
  return (
    <C {...props} as={animated.div} style={spring}>
      {children}
    </C>
  )
}

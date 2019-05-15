// @flow
import * as React from 'react'
import { compose, assoc, prop } from 'ramda'

type Context = {
  dimensionsFor: string => Object,
  refAs: string => React.ElementType => any,
  refs: { [string]: React.ElementType },
}

const RefsContext = React.createContext<Context>({
  dimensionsFor: () => ({}),
  refs: {},
  refAs: () => () => {},
})

type Props = {}
export const RefsProvider = (props: Props) => {
  const ref = React.useRef({})
  const refAs = (id: string) => (component: React.ElementType) =>
    (ref.current = assoc(id, component, ref.current))
  const dimensionsFor = (id: string) => {
    const el = prop(id, ref.current)
    return el ? el.getBoundingClientRect() : {}
  }
  return (
    <RefsContext.Provider
      {...props}
      value={{ refs: ref.current, refAs, dimensionsFor }}
    />
  )
}

export const useRefsContext = () => React.useContext(RefsContext)
export const useRefs = compose(
  prop('refs'),
  useRefsContext,
)
export const useRefAs = compose(
  prop('refAs'),
  useRefsContext,
)
export const useDimensionsFor = (id: string) =>
  useRefsContext().dimensionsFor(id)

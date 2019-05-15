// @flow
import * as React from 'react'
import {
  findIndex,
  propEq,
  compose,
  path,
  prop,
  reduce,
  take,
  inc,
  append,
  update,
} from 'ramda'

const steps = [
  { name: 'none', dur: 200 },
  { name: 'command', add: 'create-awesome-app stinodes', dur: 300 },
  { name: 'initializing', add: 'initializing...', dur: 300 },
  { name: 'initialized', update: 'initialized ✅', dur: 300 },
  { name: 'generating.0', add: 'generating layout...', dur: 1500 },
  { name: 'generating.1', dur: 1000 },
  { name: 'generating.2', dur: 1000 },
  { name: 'generated', update: 'generated ✅', dur: 300 },
  { name: 'drawing', add: 'drawing app...', dur: 3000 },
  { name: 'done', update: 'done ✅', dur: 700 },
  { name: 'hide' },
]

type CtxType = {
  cmds: string[],
  next: () => void,
  steps: typeof steps,
  isPastStep: string => boolean,
  stepIndex: number,
  step: string,
}

const Ctx = React.createContext<CtxType>({
  cmds: [],
  next: () => {},
  isPastStep: () => false,
  steps,
  stepIndex: 0,
  step: '',
})

const addCmd = append
const editCmd = update(-1)

export const StepsProvider = (props: {}) => {
  const [step, setStep] = React.useState(0)
  const next = compose(
    setStep,
    inc,
  )

  const cmds = React.useMemo(
    () =>
      reduce(
        (prev, { add, update }) =>
          add ? addCmd(add, prev) : update ? editCmd(update, prev) : prev,
        [],
        take(step + 1, steps),
      ),

    [step],
  )
  const isPastStep = React.useCallback(
    (stepName: string) => findIndex(propEq('name', stepName), steps) <= step,
    [step],
  )

  React.useEffect(() => {
    if (steps[step + 1]) {
      const timeout = setTimeout(next, path([step, 'dur'], steps))
      return () => clearTimeout(timeout)
    }
  }, [step])

  return (
    <Ctx.Provider
      {...props}
      value={{
        cmds,
        next,
        steps,
        isPastStep,
        stepIndex: step,
        step: path([step, 'name'], steps),
      }}
    />
  )
}

export const useStepsContext = () => React.useContext(Ctx)
export const useCmds = compose(
  prop('cmds'),
  useStepsContext,
)
export const useStep = compose(
  prop('step'),
  useStepsContext,
)

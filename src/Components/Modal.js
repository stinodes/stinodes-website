// @flow
import * as React from 'react'
import styled from '@emotion/styled'
import { useTransition, animated } from 'react-spring'
import { Absolute } from './Container'
import { FloatingButton } from './Button'
import { Icon } from './Icons'

const Overlay = styled(animated.div)(
  {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.overlay,
  }),
)
const ModalWindowAnimator = styled(animated.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  maxHeight: '100%',
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'flex-start',
  overflowY: 'scroll',
  padding: '32px 0',
})
const ModalWindow = styled(animated.div)(
  {
    display: 'flex',
    width: 560,
    borderRadius: 5,
    position: 'relative',
  },
  ({ theme }) => ({
    backgroundColor: theme.colors.white,
  }),
)

type ModalState<Data> = {
  data: ?Data,
  visible: boolean,
  show: Data => void,
  hide: () => void,
  toggle: () => void,
}
export const useModalState = <Data>(): ModalState<Data> => {
  const [visible, setVisible] = React.useState(false)
  const [data, setData] = React.useState<?Data>(null)

  return {
    data,
    visible,
    show: (data: Data) => {
      setData(data)
      setVisible(true)
    },
    hide: () => setVisible(false),
    toggle: () => setVisible(!visible),
  }
}

export const useModalTransitions = (visible: boolean) => {
  const overlay = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const modal = useTransition(visible, null, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translateY(100%)' },
  })
  return { overlay, modal }
}

type Props = {
  visible: boolean,
  onRequestClose: () => any,
  children: React.Node,
}
export const Modal = ({ visible, onRequestClose, children }: Props) => {
  const transition = useModalTransitions(visible)
  return transition.overlay.map(
    overlay =>
      overlay.item && (
        <Overlay onClick={onRequestClose} style={overlay.props}>
          {transition.modal.map(
            modal =>
              modal.item && (
                <ModalWindowAnimator style={modal.props}>
                  <ModalWindow onClick={e => e.stopPropagation()}>
                    {children}
                    <Absolute top={16} right={16}>
                      <FloatingButton
                        bg="white"
                        width={48}
                        height={48}
                        onClick={onRequestClose}>
                        <Icon icon={Icon.ICONS.X} size={32} color="accent" />
                      </FloatingButton>
                    </Absolute>
                  </ModalWindow>
                </ModalWindowAnimator>
              ),
          )}
        </Overlay>
      ),
  )
}

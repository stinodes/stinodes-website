// @flow
import * as React from 'react'
import { Grid, Col, Flex } from './'
import styled from '@emotion/styled'

const NavContainer = styled(Flex)({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  justifyContent: 'center',
})
const NavBar = styled(Flex)(
  {
    height: 80,
    boxShadow: 'rgba(0, 14, 26, .4) 0 3px 24px',
  },
  ({ theme: { colors } }) => ({ backgroundColor: colors.darks[2] }),
)

type Props = { navRef?: * }
export const Navigation = ({ navRef, ...props }: Props) => {
  return (
    <NavContainer>
      <Flex maxWidth="unset" width={1}>
        <NavBar innerRef={navRef} width={3 / 6} />
      </Flex>
    </NavContainer>
  )
}

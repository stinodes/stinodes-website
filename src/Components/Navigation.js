// @flow
import * as React from 'react'
import { Grid, Col, Flex } from './'
import styled from '@emotion/styled'

const NavContainer = styled(Flex)({
  position: 'fixed',
  top: 0,
  left: -8,
  right: -8,
  justifyContent: 'center',
})
const NavBar = styled(Flex)(
  {
    height: 80,
    boxShadow: 'rgba(0, 14, 26, .4) 0 3px 24px',
    width: '100%',
  },
  ({ theme: { colors } }) => ({ backgroundColor: colors.darks[2] }),
)

type Props = { navRef?: * }
export const Navigation = ({ navRef, ...props }: Props) => {
  return (
    <NavContainer>
      <Grid maxWidth="unset" width={1}>
        <Col innerRef={navRef} width={3 / 6}>
          <NavBar>{null}</NavBar>
        </Col>
      </Grid>
    </NavContainer>
  )
}

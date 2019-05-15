// @flow
import styled from '@emotion/styled'
import { path, split } from 'ramda'
import { transparentize } from 'polished'
import { Flex } from './Container'

export const Card = styled(Flex)(
  {
    borderRadius: 12,
    border: '1px solid',
  },
  ({ border = 'lights.3', bg, theme: { colors } }) => ({
    boxShadow: `${transparentize(0.7)(
      path(split('.', bg), colors),
    )} 0 8px 24px`,
    borderColor: path(split('.', border), colors),
  }),
)

// @flow
import * as React from 'react'
import { ThemeContext } from '@emotion/core'
import styled from '@emotion/styled'
import { width, height } from 'styled-system'

import { ReactComponent as ArrowUp } from './feather/arrow-up.svg'
import { ReactComponent as ArrowLeft } from './feather/arrow-left.svg'
import { ReactComponent as Eye } from './feather/eye.svg'
import { ReactComponent as Info } from './feather/info.svg'
import { ReactComponent as Folder } from './feather/folder.svg'
import { ReactComponent as Camera } from './feather/camera.svg'

const ICONS = { ArrowUp, Info, Folder, Camera, ArrowLeft, Eye }

type Props = {
  color?: string,
  size?: number,
  icon: React.ComponentType<{ stroke: ?string }>,
}
const Icon = ({ color, icon: Svg, size, ...props }: Props) => {
  const theme = React.useContext(ThemeContext)
  const colorString = theme.colors[color] || color || theme.colors.icon
  return <Svg stroke={colorString} {...props} height={size} width={size} />
}

const StyledIcon = styled(Icon)(width, height)

Icon.ICONS = ICONS
StyledIcon.ICONS = ICONS

export { StyledIcon as Icon }

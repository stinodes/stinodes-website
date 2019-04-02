// @flow
import * as React from 'react'
import { ThemeProvider } from 'emotion-theming'
import {
  Flex,
  Code,
  Line,
  Keyword as K,
  Str as S,
  Var as V,
} from './Components'

const theme = {
  colors: {
    panel: '#2C2B46',
    text: '#EDFFEC',
    variable: '#61E786',
    keyword: '#88CCF1',
    string: '#E85E14',
  },
}

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Flex bg="panel" minHeight="100vh" p={3}>
          <Code>
            <Line>
              <K>function</K> <V>test</V>() {'{'}
            </Line>
            <Line indent={1}>
              <K>const</K> <V>nickname</V> = <S>'stinodes'</S>
            </Line>
            <Line indent={1}>
              <K>const</K> <V>firstName</V> = <S>'Stijn'</S>
            </Line>
            <Line indent={1}>
              <K>const</K> <V>lastName</V> = <S>'Tytgat'</S>
            </Line>
            {'}'}
          </Code>
        </Flex>
      </ThemeProvider>
    )
  }
}

export default App

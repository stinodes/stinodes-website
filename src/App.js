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
  NewLine as N,
  Indents as I,
  ObjLiteral,
  asVar,
  asString,
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
            <K>function</K> <V>showProfile</V>() {'{'} <N />
            <I n={1} /> <K>const</K> <V>myProfile</V> = {'{'} <N />
            <I n={2} />
            nickname: <S>'stinodes'</S>,
            <N />
            <I n={2} />
            firstName: <S>'Stijn'</S>,
            <N />
            <I n={2} />
            lastName: <S>'Tytgat'</S>,
            <N />
            <I n={1} />
            {'}'}
            <N />
            {'}'}
            <N />
            <ObjLiteral>
              {{
                firstName: 'Stijn',
                lastName: 'Tytgat',
                test: { key: asVar('myVar') },
              }}
            </ObjLiteral>
          </Code>
        </Flex>
      </ThemeProvider>
    )
  }
}

export default App

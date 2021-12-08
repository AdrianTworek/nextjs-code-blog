import { createContext, useMemo, useReducer, ReactNode, Dispatch } from 'react'

import { getThemeOptions, setTheme } from '../utils/theme'

import { createTheme, PaletteMode, ThemeProvider } from '@mui/material'

type AppState = typeof initialState
type Action = { type: 'TOGGLE_DARK_MODE' } | { type: 'TOGGLE_LIGHT_MODE' }

interface ThemeProviderProps {
  children: ReactNode[]
}

const initialState: PaletteMode = 'dark'

const reducer = (state: AppState, { type }: Action) => {
  switch (type) {
    case 'TOGGLE_DARK_MODE':
      setTheme('dark')
      return 'dark'
    case 'TOGGLE_LIGHT_MODE':
      setTheme('light')
      return 'light'
    default:
      return state
  }
}

const ThemeContext = createContext<{
  state: AppState
  dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => {} })

const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const theme = useMemo(() => createTheme(getThemeOptions(state)), [state])

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }

import type { AppProps } from 'next/app'

import { ThemeContextProvider } from '../context/ThemeContext'

import '../styles/globals.css'
import { CssBaseline } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeContextProvider>
  )
}

export default MyApp

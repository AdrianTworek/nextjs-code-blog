import type { AppProps } from 'next/app'

import { ThemeContextProvider } from '../context/ThemeContext'

import '../styles/globals.css'
import { CssBaseline } from '@mui/material'

import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <Layout>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeContextProvider>
  )
}

export default MyApp

import type { AppProps } from 'next/app'

import { ThemeContextProvider } from '../context/ThemeContext'

import '../styles/globals.css'
import { CssBaseline } from '@mui/material'

import { Layout } from '../components'
import { PostsContextProvider } from '../context/PostsContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeContextProvider>
      <PostsContextProvider>
        <Layout>
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </PostsContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp

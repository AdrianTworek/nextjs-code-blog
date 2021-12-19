import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeContextProvider } from '../context/ThemeContext'
import { PostsContextProvider } from '../context/PostsContext'

import '../styles/globals.css'
import { CssBaseline } from '@mui/material'

import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
      </Head>
      <ThemeContextProvider>
        <PostsContextProvider>
          <Layout>
            <CssBaseline />
            <Component {...pageProps} />
          </Layout>
        </PostsContextProvider>
      </ThemeContextProvider>
    </>
  )
}

export default MyApp

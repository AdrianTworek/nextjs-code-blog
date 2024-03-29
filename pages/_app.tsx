import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeContextProvider } from '../context/ThemeContext'
import { PostsContextProvider } from '../context/PostsContext'
import { RecentPostsContextProvider } from '../context/RecentPostsContext'

import '../styles/globals.css'
import { CssBaseline } from '@mui/material'

import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
        ></link>
      </Head>
      <ThemeContextProvider>
        <PostsContextProvider>
          <RecentPostsContextProvider>
            <Layout>
              <CssBaseline />
              <Component {...pageProps} />
            </Layout>
          </RecentPostsContextProvider>
        </PostsContextProvider>
      </ThemeContextProvider>
    </>
  )
}

export default MyApp

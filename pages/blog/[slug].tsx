import { useEffect } from 'react'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { NextSeo } from 'next-seo'
import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

import { useRecentPostsContext } from '../../context'

import { Box } from '@mui/material'

import { BlogPostHeader, PostImage, TOC, TOCItem } from '../../components'

const components = {
  BlogPostHeader,
  PostImage,
  TOC,
  TOCItem,
}

const PostPage: NextPage = ({
  slug,
  metaData: { title, imageUrl },
  source,
}: InferGetStaticPropsType<GetStaticProps>) => {
  const { dispatch } = useRecentPostsContext()

  useEffect(() => {
    // Highlight code syntax if it's there in the post
    hljs.highlightAll()

    // Add post to the recent viewed posts context
    dispatch({ type: 'SET_RECENT_POSTS', payload: { slug, title, imageUrl } })
  }, [title])

  return (
    <>
      <NextSeo
        title={`Code Blog | ${title}`}
        description={`Detail page of ${title} post`}
      />
      <Box sx={{ maxWidth: 800, margin: '2rem auto 0', padding: '2rem' }}>
        <MDXRemote {...source} components={components} />
      </Box>
    </>
  )
}

export default PostPage

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map((fileName: string) => ({
    params: { slug: fileName.replace('.mdx', '') },
  }))

  return {
    paths,
    fallback: false,
  }
}

type Params = {
  [params: string]: any
}

export const getStaticProps: GetStaticProps<Params> = async ({
  params: { slug },
}: Params) => {
  const post = fs.readFileSync(path.join('posts', slug + '.mdx'), 'utf-8')

  const { data: metaData, content } = matter(post)

  const source = await serialize(content, { scope: metaData })

  return {
    props: { slug, metaData, source },
  }
}

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import { Box } from '@mui/material'

import BlogPostHeader from '../../components/Posts/BlogPostHeader'

const components = {
  BlogPostHeader,
}

const PostPage: NextPage = ({
  source,
}: InferGetStaticPropsType<GetStaticProps>) => {
  return (
    <Box sx={{ maxWidth: 800, margin: '2rem auto 0', padding: '2rem' }}>
      <MDXRemote {...source} components={components} />
    </Box>
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
    props: { source },
  }
}

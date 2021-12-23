import { useEffect } from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import { Post } from '../../types/post.interface'

import { usePostsContext } from '../../context'

import { Box, Container } from '@mui/material'

import { PostsContainer, PostsFiltering } from '../../components'
import { HomeButton } from '../../helpers'

const Blog: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { dispatch } = usePostsContext()

  useEffect(() => {
    dispatch({ type: 'SET_POSTS', payload: posts })
  }, [])

  return (
    <>
      <NextSeo
        title="Code Blog | Blog posts"
        description="Page with all posts on Code Blog"
      />
      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <HomeButton text="Home Page" variant="outlined" color="info" icon />
        </Container>
        <PostsFiltering posts={posts} />
        <PostsContainer />
      </Box>
    </>
  )
}

export default Blog

export const getStaticProps: GetStaticProps = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const posts: Post[] = files.map((fileName: string) => {
    const slug = fileName.replace('.mdx', '')
    const post = fs.readFileSync(path.join('posts', fileName), 'utf-8')

    const { data: metaData } = matter(post)

    return { slug, metaData } as Post
  })

  return {
    props: {
      posts: posts.sort(
        (a: any, b: any) =>
          new Date(b.metaData.dateString).valueOf() -
          new Date(a.metaData.dateString).valueOf()
      ),
    },
  }
}

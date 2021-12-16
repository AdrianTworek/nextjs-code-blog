import { useEffect } from 'react'
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { Post } from '../../types/post.interface'

import { usePostsContext } from '../../context/PostsContext'

import PostsContainer from '../../components/Posts/PostsContainer'
import PostsFiltering from '../../components/PostsFiltering/PostsFiltering'
import { Box } from '@mui/material'

const Blog: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { dispatch } = usePostsContext()

  useEffect(() => {
    dispatch({ type: 'SET_POSTS', payload: posts })
  }, [])

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <PostsFiltering posts={posts} />
      <PostsContainer />
    </Box>
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

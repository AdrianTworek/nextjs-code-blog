import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { Post } from '../../types/post.interface'

import PostsContainer from '../../components/Posts/PostsContainer'

const Blog: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <PostsContainer posts={posts} />
)

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

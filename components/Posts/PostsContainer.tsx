import { FC } from 'react'

import { Post } from '../../types/post.interface'

import { usePostsContext } from '../../context/PostsContext'

import { Grid } from '@mui/material'

import PostCard from './PostCard'

const PostsContainer: FC = () => {
  const { state: posts } = usePostsContext()

  return (
    <Grid
      container
      justifyContent="center"
      spacing={4}
      sx={{ padding: '2rem' }}
    >
      {posts.map((post: Post) => (
        <Grid key={post.slug} item>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PostsContainer

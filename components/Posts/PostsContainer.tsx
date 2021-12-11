import { FC } from 'react'

import { Post } from '../../types/post.interface'

import { Grid } from '@mui/material'

import PostCard from './PostCard'

interface Props {
  posts: Post[]
}

const PostsContainer: FC<Props> = ({ posts }) => {
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

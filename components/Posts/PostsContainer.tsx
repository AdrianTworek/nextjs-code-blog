import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Post } from '../../types/post.interface'

import { usePostsContext } from '../../context'

import { Grid } from '@mui/material'

import PostCard from './PostCard'

const variant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

const PostsContainer: FC = () => {
  const { state: posts } = usePostsContext()

  return (
    <Grid
      container
      justifyContent="center"
      spacing={4}
      sx={{ padding: '2rem' }}
    >
      <AnimatePresence>
        {posts.map((post: Post) => (
          <Grid
            key={post.slug}
            item
            component={motion.div}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <PostCard post={post} />
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  )
}

export default PostsContainer

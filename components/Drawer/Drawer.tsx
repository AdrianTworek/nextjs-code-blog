import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { RecentPost } from '../../types/recentPost.type'

import { useRecentPostsContext } from '../../context'

import { Box, Typography, Grid } from '@mui/material'

const DrawerContent: FC = () => {
  const { state: recentPosts } = useRecentPostsContext()

  return (
    <Box sx={{ maxWidth: 300, padding: '4rem 1rem', overflow: 'hidden' }}>
      <Typography
        sx={{ fontWeight: 700 }}
        variant="h5"
        align="center"
        gutterBottom
      >
        Recents posts you read
      </Typography>
      <Grid
        container
        sx={{ marginTop: '1rem' }}
        justifyContent="center"
        spacing={2}
      >
        {recentPosts.map(({ slug, title, imageUrl }: RecentPost) => (
          <Grid
            key={title}
            sx={{ textAlign: 'center', cursor: 'pointer' }}
            xs={10}
            item
            component={motion.div}
            initial={{ opacity: 0, x: '-50%' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: 'spring',
              stiffness: 140,
              duration: 0.3,
            }}
          >
            <Link href={`/blog/${slug}`} passHref>
              <Image
                src={imageUrl}
                width={70}
                height={70}
                alt={`Image of post ${title}`}
              />
            </Link>
            <Link href={`/blog/${slug}`} passHref>
              <Typography
                sx={{ marginTop: '0.4rem' }}
                variant="subtitle2"
                gutterBottom
              >
                {title}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default DrawerContent

import { FC } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Post } from '../../types/post.interface'

import { Card, CardContent, CardMedia, Typography } from '@mui/material'

interface Props {
  post: Post
}

const FilteredBlogCard: FC<Props> = ({
  post: {
    slug,
    metaData: { title, imageUrl },
  },
}) => {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <Card
        sx={{
          width: 90,
          height: 130,
          margin: '0.5rem',
          cursor: 'pointer',
          '@media screen and (min-width: 48em)': {
            width: 120,
            height: 150,
          },
        }}
        elevation={5}
        component={motion.div}
        whileHover={{ scale: 1.02 }}
      >
        <CardMedia
          sx={{
            '@media screen and (min-width: 48em)': {
              height: 80,
            },
          }}
          component="img"
          image={imageUrl}
          height={70}
        />
        <CardContent>
          <Typography
            align="center"
            sx={{
              fontSize: '0.43rem',
              fontWeight: 700,
              '@media screen and (min-width: 48em)': {
                fontSize: '0.6rem',
              },
            }}
            gutterBottom
          >
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default FilteredBlogCard

import { FC } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Post } from '../../types/post.interface'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@mui/material'

interface Props {
  post: Post
}

const FilteredBlogCard: FC<Props> = ({
  post: {
    slug,
    metaData: { title, imageUrl },
  },
}) => {
  const matches_tablet = useMediaQuery('(min-width: 48em)')

  return (
    <Link href={`/blog/${slug}`} passHref>
      <Card
        sx={{
          width: matches_tablet ? 120 : 90,
          height: matches_tablet ? 150 : 130,
          margin: '0.5rem',
          cursor: 'pointer',
        }}
        elevation={5}
        component={motion.div}
        whileHover={{ scale: 1.02 }}
      >
        <CardMedia
          sx={{
            height: matches_tablet ? 80 : 70,
          }}
          component="img"
          image={imageUrl}
        />
        <CardContent>
          <Typography
            align="center"
            sx={{
              fontSize: matches_tablet ? '0.6rem' : '0.43rem',
              fontWeight: 700,
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

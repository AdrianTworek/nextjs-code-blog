import { FC } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Post } from '../../types/post.interface'

import { useThemeContext } from '../../context'

import {
  Button,
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { delay: 0.1 } },
  hover: {
    scale: 1.02,
  },
  tap: {
    scale: 1,
  },
}

const cardContentContainerVariant = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { delay: 0.2, staggerChildren: 0.15 } },
}

const cardContentVariant = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0 },
}

interface Props {
  post: Post
}

const PostCard: FC<Props> = ({ post: { slug, metaData } }) => {
  const { textColor } = useThemeContext()

  return (
    <Card
      sx={{ maxWidth: 300, height: 430 }}
      component={motion.div}
      variants={cardVariant}
      initial="hidden"
      animate="show"
      whileHover="hover"
      whileTap="tap"
    >
      <Box
        component={motion.div}
        variants={cardContentContainerVariant}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={cardContentVariant}>
          <CardMedia component="img" image={metaData.imageUrl} height={205} />
        </motion.div>

        <CardContent component={motion.div} variants={cardContentVariant}>
          <Typography sx={{ fontWeight: 500 }} variant="h5" gutterBottom>
            {metaData.title}
          </Typography>
          <Typography sx={{ fontWeight: 300 }} variant="body2">
            {metaData.excerpt}
          </Typography>
        </CardContent>

        <motion.div variants={cardContentVariant}>
          <CardActions>
            <Link href={`/blog/${slug}`} passHref>
              <Button size="small" color={textColor}>
                Read More
              </Button>
            </Link>
          </CardActions>
        </motion.div>
      </Box>
    </Card>
  )
}

export default PostCard

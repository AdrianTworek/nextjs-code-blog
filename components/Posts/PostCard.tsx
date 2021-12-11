import { FC } from 'react'
import Link from 'next/link'

import { Post } from '../../types/post.interface'

import { useThemeContext } from '../../context/ThemeContext'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

interface Props {
  post: Post
}

const PostCard: FC<Props> = ({ post: { slug, metaData } }) => {
  const { textColor } = useThemeContext()

  return (
    <Card sx={{ maxWidth: 300, height: 430 }}>
      <CardMedia component="img" image={metaData.imageUrl} height={205} />

      <CardContent>
        <Typography sx={{ fontWeight: 500 }} variant="h5" gutterBottom>
          {metaData.title}
        </Typography>
        <Typography sx={{ fontWeight: 300 }} variant="body2">
          {metaData.excerpt}
        </Typography>
      </CardContent>

      <CardActions>
        <Link href={`/blog/${slug}`} passHref>
          <Button size="small" color={textColor}>
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}

export default PostCard

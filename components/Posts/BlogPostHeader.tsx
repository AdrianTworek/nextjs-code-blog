import { FC } from 'react'
import Image from 'next/image'

import { Grid, Typography } from '@mui/material'

interface Props {
  title: string
  imageUrl: string
  dateString: string
}

const BlogPostHeader: FC<Props> = ({ title, imageUrl, dateString }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Image
          src={imageUrl}
          width={400}
          height={400}
          alt="Blog post image"
          priority
        />
      </Grid>

      <Grid item>
        <Typography variant="subtitle2" sx={{ fontWeight: 300 }}>
          Posted on {dateString}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default BlogPostHeader

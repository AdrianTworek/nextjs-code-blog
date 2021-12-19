import { FC } from 'react'
import Image from 'next/image'

import { Box } from '@mui/material'

interface Props {
  imageUrl: string
  width: number
  height: number
  alt: string
}

const PostImage: FC<Props> = ({ imageUrl, width, height, alt }) => {
  return (
    <Box sx={{ margin: '2rem auto 2rem 0' }}>
      <Image src={imageUrl} width={width} height={height} alt={alt} priority />
    </Box>
  )
}

export default PostImage

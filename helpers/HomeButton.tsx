import { FC } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Color } from '../types/color.type'

import { Box, Button } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'

interface Props {
  text: string
  variant?: 'outlined' | 'contained'
  color: Color
  icon?: boolean
}

const HomeButton: FC<Props> = ({ text, variant, color, icon }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <Link href="/" passHref>
        <Button sx={{ fontWeight: 500 }} variant={variant} color={color}>
          {icon && <HomeIcon fontSize="small" sx={{ mr: 1 }} />}
          {text}
        </Button>
      </Link>
    </Box>
  )
}

export default HomeButton

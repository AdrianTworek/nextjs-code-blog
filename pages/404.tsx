import { NextPage } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { useThemeContext } from '../context'

import { Button, Grid, Typography } from '@mui/material'

import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'

import { HomeButton } from '../helpers'

const Page404: NextPage = () => {
  const { textColor } = useThemeContext()

  return (
    <Grid
      sx={{ mt: 20, textAlign: 'center', gap: 2.5 }}
      container
      justifyContent="center"
    >
      <Grid
        item
        xs={12}
        component={motion.div}
        initial={{ rotateY: 0 }}
        animate={{
          rotateY: 360,
          transition: { duration: 2.5, repeat: 2, delay: 0.15, ease: 'linear' },
        }}
      >
        <Typography
          sx={{ fontWeight: 700 }}
          variant="h3"
          align="center"
          color={textColor}
        >
          404
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography sx={{ fontWeight: 500 }} variant="h5" gutterBottom>
          Resource not found
          <Typography sx={{ fontWeight: 600 }} variant="h5" color={textColor}>
            :(
          </Typography>
        </Typography>
        <Typography sx={{ fontWeight: 300, mt: 3 }} variant="subtitle1">
          Go back to one of the following:
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <HomeButton text="Home" color={textColor} variant="outlined" icon />
      </Grid>

      <Grid
        item
        xs={12}
        component={motion.div}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
      >
        <Link href="/blog" passHref>
          <Button variant="outlined" color={textColor}>
            <MenuBookIcon sx={{ mr: 1 }} /> Blog
          </Button>
        </Link>
      </Grid>

      <Grid
        item
        xs={12}
        component={motion.div}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        <Link href="/learn" passHref>
          <Button variant="outlined" color={textColor}>
            <SchoolIcon sx={{ mr: 1 }} /> Learn
          </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Page404

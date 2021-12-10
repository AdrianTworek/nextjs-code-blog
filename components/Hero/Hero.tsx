import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Color } from '../../types/color.type'
import { motion } from 'framer-motion'

import { useThemeContext } from '../../context/ThemeContext'

import { Box, Container, Typography, Button, Stack, Grid } from '@mui/material'

type Buttons = {
  text: string
  href: string
  color: Color
}[]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

const typographyVariant = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
}

const imageVariant = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0 },
}

const buttonVariant = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
}

const Hero: FC = () => {
  const { state, textColor } = useThemeContext()

  const buttons: Buttons = [
    {
      text: 'Read Blog',
      href: 'blog',
      color: 'secondary',
    },
    {
      text: 'Learn',
      href: 'learn',
      color: 'primary',
    },
  ]

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '4rem',
      }}
      component={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Container maxWidth="lg" sx={{ display: 'grid', placeItems: 'center' }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}
          maxWidth={768}
        >
          <Grid
            item
            xs={10}
            sm={6}
            component={motion.div}
            variants={typographyVariant}
          >
            <Typography
              sx={{
                fontSize: 'clamp(2.5rem, 4vw, 2.8rem)',
                fontWeight: 500,
                maxWidth: 300,
                margin: '0 auto',
                '@media screen and (min-width: 37.5em)': {
                  textAlign: 'left',
                  maxWidth: 400,
                },
              }}
              variant="h1"
              align="center"
            >
              Stay up to date anywhere you like
              <Typography variant="h3" color={textColor} component="span">
                .
              </Typography>
            </Typography>
          </Grid>

          <Grid
            item
            xs={10}
            sm={6}
            maxWidth={350}
            component={motion.div}
            variants={imageVariant}
          >
            <Image
              src="/blogging.svg"
              width={350}
              height={220}
              alt="People discussing blog"
              priority
            />
          </Grid>
        </Grid>

        <Stack
          sx={{ marginTop: '2rem', maxWidth: 768 }}
          direction="row"
          spacing={2}
        >
          {buttons.map((item) => (
            <Link key={item.text} href={`/${item.href}`} passHref>
              <Button
                key={item.text}
                variant={state === 'dark' ? 'outlined' : 'contained'}
                color={item.color}
                size="large"
                component={motion.button}
                variants={buttonVariant}
              >
                {item.text}
              </Button>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero

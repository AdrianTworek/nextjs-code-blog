import { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Color } from '../../types/color.type'

import { useThemeContext, useRecentPostsContext } from '../../context'

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  useMediaQuery,
  useTheme,
  Badge,
  Drawer,
  Tooltip,
} from '@mui/material'

import EmailIcon from '@mui/icons-material/Email'
import CloseIcon from '@mui/icons-material/Close'

import DrawerContent from '../Drawer/Drawer'

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

const badgeVariant = {
  hidden: { opacity: 0, scale: 1 },
  show: { opacity: 1, scale: [0.9, 1.3, 0.95, 1.08, 1] },
}

const Hero: FC = () => {
  const { state: recentPosts } = useRecentPostsContext()
  const { state: themeMode, textColor } = useThemeContext()

  // Drawer
  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  const theme = useTheme()
  const matches_600_up = useMediaQuery(theme.breakpoints.up('sm'))

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

  const handleDrawerClose = () => {
    setShowDrawer(false)
  }

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '4rem',
        overflow: 'hidden',
      }}
      component={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Container
        maxWidth="lg"
        sx={{ position: 'relative', display: 'grid', placeItems: 'center' }}
      >
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
                margin: '0 auto',
                maxWidth: matches_600_up ? 400 : 300,
                textAlign: matches_600_up ? 'left' : 'center',
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
              src="/images/blogging.svg"
              width={350}
              height={220}
              alt="People discussing blog"
              priority
            />
          </Grid>
        </Grid>

        <Stack
          sx={{ position: 'relative', marginTop: '2rem', maxWidth: 768 }}
          direction="row"
          spacing={2}
        >
          {buttons.map((item) => (
            <Link key={item.text} href={`/${item.href}`} passHref>
              <Button
                key={item.text}
                variant={themeMode === 'dark' ? 'outlined' : 'contained'}
                color={item.color}
                size="large"
                component={motion.button}
                variants={buttonVariant}
              >
                {item.text}
              </Button>
            </Link>
          ))}

          {recentPosts.length > 0 && (
            <Tooltip
              title="See what you were reading"
              placement="top"
              leaveTouchDelay={3500}
            >
              <Badge
                onClick={() => setShowDrawer(true)}
                sx={{
                  position: 'absolute',
                  left: -30,
                  top: -10,
                  cursor: 'pointer',
                }}
                badgeContent={recentPosts.length}
                color={themeMode === 'dark' ? 'secondary' : 'primary'}
                component={motion.div}
                variants={badgeVariant}
              >
                <EmailIcon />
              </Badge>
            </Tooltip>
          )}

          <Drawer anchor="left" open={showDrawer} onClose={handleDrawerClose}>
            <CloseIcon
              onClick={handleDrawerClose}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                cursor: 'pointer',
              }}
            />
            <DrawerContent />
          </Drawer>
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero

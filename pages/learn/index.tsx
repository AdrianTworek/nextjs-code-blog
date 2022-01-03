import { NextPage } from 'next'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'

import { learnTopics } from '../../types/learnTopicData.type'

import { useThemeContext } from '../../context'

import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'

import { HomeButton } from '../../helpers'

const Learn: NextPage = () => {
  const { state: themeMode, textColor } = useThemeContext()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const leftVariant = {
    hidden: { opacity: 0, x: -30 },
    show: {
      opacity: 1,
      x: 0,
    },
  }

  const rightVariant = {
    hidden: { opacity: 0, x: 30 },
    show: {
      opacity: 1,
      x: 0,
    },
  }

  return (
    <>
      <NextSeo
        title="Code Blog | Learn section"
        description={`Section with all technologies you can learn`}
      />
      <Container maxWidth="xl" sx={{ mt: 8 }}>
        <Grid
          container
          justifyContent="center"
          component={motion.div}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Grid item xs={12} component={motion.div} variants={leftVariant}>
            <Typography align="center" variant="h4" gutterBottom>
              Welcome to{' '}
              <Typography variant="h4" color={textColor} component="span">
                Learn
              </Typography>{' '}
              section
            </Typography>
          </Grid>

          <Grid
            item
            xs={10}
            sx={{ mt: 1, maxWidth: 400 }}
            component={motion.div}
            variants={rightVariant}
          >
            <Typography align="center" variant="h6" sx={{ fontWeight: 300 }}>
              Here you can acquire knowledge in various fields of{' '}
              <Typography
                sx={{ fontWeight: 400 }}
                variant="h6"
                color={themeMode === 'dark' ? 'secondary' : 'primary'}
                component="span"
              >
                Web Development
              </Typography>
              . Select what you are interesed in.
            </Typography>
          </Grid>

          <Box
            sx={{ display: 'grid', placeItems: 'center', width: '100%', mt: 3 }}
            component={motion.div}
            variants={leftVariant}
          >
            <List>
              {learnTopics.map(({ technology, icon }) => (
                <Link
                  key={technology}
                  href={`/learn/${technology.toLowerCase()}/introduction`}
                  passHref
                >
                  <a>
                    <ListItem>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar sx={{ background: 'transparent' }}>
                            <i className={icon}></i>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={technology} />
                      </ListItemButton>
                    </ListItem>
                  </a>
                </Link>
              ))}
            </List>
          </Box>

          <Box sx={{ mt: 3 }} component={motion.div} variants={rightVariant}>
            <HomeButton
              text="Home Page"
              variant="outlined"
              color={textColor}
              icon
            />
          </Box>
        </Grid>
      </Container>
    </>
  )
}

export default Learn

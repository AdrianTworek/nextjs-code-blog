import { FC, useState, MouseEvent, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Post } from '../../types/post.interface'

import { useThemeContext, usePostsContext } from '../../context'

import { getTheme } from '../../utils/theme'

import {
  AppBar,
  Container,
  Box,
  Button,
  Divider,
  IconButton,
  InputLabel,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Switch,
  useTheme,
  Input,
  FormControl,
  InputAdornment,
  Grid,
  useMediaQuery,
  Tooltip,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import ComputerIcon from '@mui/icons-material/Computer'
import MenuIcon from '@mui/icons-material/Menu'

import FilteredBlogCard from './FilteredBlogCard'

const Navbar: FC = () => {
  const {
    state: themeState,
    dispatch: dispatchTheme,
    textColor,
  } = useThemeContext()
  const { state: posts } = usePostsContext()

  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [showTooltip, setShowTooltip] = useState<boolean>(false)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorMobileMenu, setAnchorMobileMenu] = useState<null | HTMLElement>(
    null
  )

  const router = useRouter()
  const theme = useTheme()
  const menuItems = ['learn', 'blog']

  const matches_600_up = useMediaQuery(theme.breakpoints.up('sm'))
  const matches_tablet = useMediaQuery('(min-width: 48em)')

  useEffect(() => {
    const theme = getTheme()

    if (theme) {
      if (theme === 'light') {
        dispatchTheme({ type: 'TOGGLE_LIGHT_MODE' })
      } else {
        dispatchTheme({ type: 'TOGGLE_DARK_MODE' })
      }
    }
  }, [])

  // Reset filteredPosts state if there is nothing in input field
  useEffect(() => {
    if (!searchValue) {
      setFilteredPosts([])
    }
  }, [searchValue])

  // Reset filtered posts when changing the page
  useEffect(() => {
    resetFilteredPosts()
  }, [router])

  // Close mobile menu if it's open (during resizing)
  useEffect(() => {
    if (matches_600_up) {
      handleCloseUserMenu()
      handleCloseMobileMenu()
    }
  }, [matches_600_up])

  const handleOpenMobileMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorMobileMenu(event.currentTarget)
  }

  const handleCloseMobileMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorMobileMenu(null)
  }

  const handleThemeChange = () => {
    if (themeState === 'dark') {
      dispatchTheme({ type: 'TOGGLE_LIGHT_MODE' })
    } else {
      dispatchTheme({ type: 'TOGGLE_DARK_MODE' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    // Hide tooltip when user has already typed something
    if (input.length > 0) {
      setShowTooltip(false)
    }

    setSearchValue(input)
    searchBlogs(input.toLowerCase())
  }

  const searchBlogs = (input: string) => {
    const filteredPosts = posts.filter((post: Post) =>
      post.metaData.title.toLowerCase().includes(input)
    )

    setFilteredPosts(filteredPosts)
  }

  const resetFilteredPosts = () => {
    setFilteredPosts([])
    setSearchValue('')
  }

  return (
    <>
      <AppBar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 75,
          background: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
        position="static"
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Link href="/" passHref>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontWeight: 700,
                  fontSize: matches_600_up ? '1.6rem' : '1.2rem',
                  cursor: 'pointer',
                  overflow: 'visible',
                }}
                variant="h6"
                noWrap
                component="div"
              >
                <ComputerIcon fontSize="medium" />
                Code Blog
              </Typography>
            </Link>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'flex' },
                gap: '0.5rem',
                marginLeft: '2.5rem',
              }}
            >
              {menuItems.map((link) => (
                <Link key={link} href={`/${link}`} passHref>
                  <Button
                    sx={{
                      fontSize: '0.9rem',
                      transitionDuration: '0s',
                    }}
                    color={textColor}
                  >
                    {link}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Show filtering form if the user has already visited /blog 
            and data is in the PostsContext state */}
            {posts.length > 0 && router.pathname !== '/blog' && (
              <Tooltip
                title="With the aid of global state management you can search for blog posts anywhere!"
                placement="bottom"
                leaveTouchDelay={5000}
                open={showTooltip}
                onOpen={() => setShowTooltip(true)}
                onClose={() => setShowTooltip(false)}
              >
                <Box
                  sx={{
                    width: matches_tablet ? 200 : 120,
                    marginLeft: '1rem',
                    marginRight: matches_600_up ? '1.5rem' : 0,
                  }}
                  component={motion.div}
                  initial={{ x: -15, scale: 1, opacity: 0 }}
                  animate={{ x: 0, scale: [1, 1.1, 0.9, 1], opacity: 1 }}
                >
                  <FormControl variant="standard" color={textColor}>
                    <InputLabel htmlFor="blog-search-input">
                      Search blogs
                    </InputLabel>
                    <Input
                      id="blog-search-input"
                      autoComplete="off"
                      value={searchValue}
                      onChange={handleInputChange}
                      onFocus={() => setShowTooltip(true)}
                      onBlur={() => setShowTooltip(false)}
                      startAdornment={
                        <InputAdornment position="start">
                          <InputLabel htmlFor="blog-search-input">
                            <SearchIcon color={textColor} />
                          </InputLabel>
                        </InputAdornment>
                      }
                    ></Input>
                  </FormControl>
                </Box>
              </Tooltip>
            )}

            <Box
              sx={{
                display: matches_600_up ? 'flex' : 'none',
                marginLeft: 'auto',
              }}
            >
              <Switch
                checked={themeState === 'dark'}
                color="primary"
                onChange={handleThemeChange}
              />
            </Box>

            <Box
              sx={{
                width: matches_600_up ? '0px' : 'min-content',
                visibility: matches_600_up ? 'hidden' : 'visible',
                marginLeft: 'auto',
                overflow: 'hidden',
              }}
            >
              <IconButton color={textColor} onClick={handleOpenMobileMenu}>
                <MenuIcon fontSize="large" color={textColor} />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Menu
                sx={{
                  mt: '50px',
                }}
                id="menu-appbar"
                anchorEl={anchorMobileMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={!!anchorMobileMenu}
                onClose={handleCloseUserMenu}
              >
                {menuItems.map((item) => (
                  <Link key={item} href={`/${item}`} passHref>
                    <MenuItem key={item} onClick={handleCloseMobileMenu}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </MenuItem>
                  </Link>
                ))}

                <Divider sx={{ background: 'rgba(255, 255, 255, 0.3)' }} />

                <MenuItem>
                  <Box>
                    <Switch
                      checked={themeState === 'dark'}
                      color="primary"
                      onChange={handleThemeChange}
                    />
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {filteredPosts.length > 0 && (
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            padding: '1rem',
            background: 'rgba(14, 14, 14, 0.5)',
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.25, ease: 'easeInOut' },
          }}
        >
          {filteredPosts.map((post: Post) => (
            <Grid key={post.slug} item>
              <FilteredBlogCard post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default Navbar

import { FC, useState, MouseEvent, useContext, useEffect } from 'react'
import Link from 'next/link'

import { ThemeContext } from '../../context/ThemeContext'

import { getTheme } from '../../utils/theme'

import {
  AppBar,
  Container,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Switch,
  useTheme,
} from '@mui/material'

import ComputerIcon from '@mui/icons-material/Computer'
import MenuIcon from '@mui/icons-material/Menu'

const Navbar: FC = () => {
  const { state, dispatch } = useContext(ThemeContext)
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorMobileMenu, setAnchorMobileMenu] = useState<null | HTMLElement>(
    null
  )

  const theme = useTheme()
  const menuItems = ['learn', 'blog']

  useEffect(() => {
    const theme = getTheme()

    if (theme) {
      if (theme === 'light') {
        dispatch({ type: 'TOGGLE_LIGHT_MODE' })
      } else {
        dispatch({ type: 'TOGGLE_DARK_MODE' })
      }
    }
  }, [])

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
    if (state === 'dark') {
      dispatch({ type: 'TOGGLE_LIGHT_MODE' })
    } else {
      dispatch({ type: 'TOGGLE_DARK_MODE' })
    }
  }

  return (
    <AppBar
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: 70,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontWeight: 700,
              fontSize: '1.2rem',
              '@media screen and (min-width: 37.5em)': {
                fontSize: '1.6rem',
              },
            }}
            variant="h6"
            noWrap
            component="div"
          >
            <ComputerIcon fontSize="medium" />
            Code Blog
          </Typography>

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
                  color={state === 'dark' ? 'primary' : 'secondary'}
                >
                  {link}
                </Button>
              </Link>
            ))}
          </Box>

          <Box
            sx={{
              display: 'none',
              marginLeft: 'auto',
              '@media screen and (min-width: 37.5em)': { display: 'block' },
            }}
          >
            <Switch
              checked={state === 'dark'}
              color="primary"
              onChange={handleThemeChange}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              marginLeft: 'auto',
              '@media screen and (min-width: 37.5em)': { display: 'none' },
            }}
          >
            <IconButton
              color={state === 'dark' ? 'primary' : 'secondary'}
              onClick={handleOpenMobileMenu}
            >
              <MenuIcon
                fontSize="large"
                color={state === 'dark' ? 'primary' : 'secondary'}
              />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Menu
              sx={{ mt: '45px' }}
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
                    checked={state === 'dark'}
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
  )
}

export default Navbar

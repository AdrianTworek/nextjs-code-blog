import { FC } from 'react'

import { AppBar, Container, Toolbar, Typography, Switch } from '@mui/material'

import ComputerIcon from '@mui/icons-material/Computer'

import useStyles from './styles'

const Navbar: FC = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            className={classes.logo}
            variant="h6"
            noWrap
            component="div"
          >
            <ComputerIcon fontSize="medium" />
            Code Blog
          </Typography>

          <Switch className={classes.switch} color="default" />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar

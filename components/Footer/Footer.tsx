import { FC } from 'react'

import { useThemeContext } from '../../context'

import { Container, Grid, Stack, Typography, useTheme } from '@mui/material'

const Footer: FC = () => {
  const { textColor } = useThemeContext()
  const theme = useTheme()

  return (
    <footer
      style={{
        marginTop: 'auto',
        padding: '0.5rem',
        background: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="center">
          <Grid item>
            <Stack direction="row">
              <Typography variant="body2" color={textColor}>
                &copy;
              </Typography>
              <Typography variant="body1" color={textColor}>
                Copyright | Code Blog {new Date().getFullYear()}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer

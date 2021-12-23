import { FC, ReactNode } from 'react'

import { useThemeContext } from '../../context'

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'

interface Props {
  topic: string
  children: ReactNode
}

const TOCItem: FC<Props> = ({ topic, children }) => {
  const { state } = useThemeContext()
  const theme = useTheme()
  const matches_600_down = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box id={topic} className="section-element" component="section">
      <Stack sx={{ margin: '3.5rem 0 2rem' }} direction="row" spacing={2}>
        <Box
          sx={{
            width: 3,
            backgroundColor:
              state === 'dark' ? 'primary.light' : 'secondary.light',
          }}
        />

        <Typography sx={{ fontWeight: 700 }} variant="h5">
          {topic}
        </Typography>
      </Stack>

      <Box
        sx={{
          fontWeight: 300,
          fontSize: matches_600_down ? '1.1rem' : '1.3rem',
          lineHeight: '1.9',
          textAlign: matches_600_down ? 'justify' : 'left',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default TOCItem

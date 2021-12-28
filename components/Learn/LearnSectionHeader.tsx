import { FC } from 'react'

import { Grid, Typography } from '@mui/material'

import { HomeButton } from '../../helpers'

interface Props {
  topic: string
}

const LearnSectionHeader: FC<Props> = ({ topic }) => {
  return (
    <Grid container spacing={1}>
      <Grid item sx={{ mb: 5 }} xs={12}>
        <HomeButton text="Home" variant="contained" color="warning" />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>
          {topic}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default LearnSectionHeader

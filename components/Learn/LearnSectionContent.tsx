import { FC, ReactNode } from 'react'

import { Box } from '@mui/material'

interface Props {
  children: ReactNode
}

const LearnSectionContent: FC = ({ children }) => {
  return (
    <Box sx={{ fontSize: '1.2rem', fontWeight: 300, lineHeight: 1.6 }}>
      {children}
    </Box>
  )
}

export default LearnSectionContent

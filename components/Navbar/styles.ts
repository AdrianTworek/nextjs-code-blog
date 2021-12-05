import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  appBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: 60,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  switch: {
    marginLeft: 'auto',
  },
}))

export default useStyles

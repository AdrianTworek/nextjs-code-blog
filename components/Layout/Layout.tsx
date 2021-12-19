import { FC } from 'react'

import { Navbar } from '../../components'
import Footer from '../Footer/Footer'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ marginBottom: '3rem' }}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout

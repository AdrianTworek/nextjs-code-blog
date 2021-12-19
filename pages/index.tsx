import type { NextPage } from 'next'
import { NextSeo } from 'next-seo'

import { Hero } from '../components'

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo
        title="Code Blog"
        description="The blog was created for adepts of programming"
      />

      <Hero />
    </div>
  )
}

export default Home

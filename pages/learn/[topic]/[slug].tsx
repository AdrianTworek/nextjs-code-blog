import { useEffect } from 'react'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { NextSeo } from 'next-seo'
import fs from 'fs'
import path from 'path'

import { getMenu } from '../../../utils/learn/getMenu'

import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'

import { Box } from '@mui/material'

import {
  LearnSectionHeader,
  LearnNavigation,
  LearnSectionContent,
} from '../../../components'

const components = {
  LearnSectionHeader,
  LearnNavigation,
  LearnSectionContent,
}

const LearnDetailPage: NextPage = ({
  topic,
  slug,
  metaData,
  source,
}: InferGetStaticPropsType<GetStaticProps>) => {
  useEffect(() => {
    // Highlight code syntax if it's there in the section
    hljs.highlightAll()
  }, [metaData])

  const menu = getMenu(topic.toLowerCase())

  return (
    <>
      <NextSeo
        title={`Code Blog | ${topic} - ${metaData.topic}`}
        description={`Detail page of "${topic}" section`}
      />
      <LearnNavigation
        menu={menu}
        topic={topic}
        slug={slug}
        metaData={metaData}
      />
      <Box sx={{ maxWidth: 800, margin: '2rem auto 0', padding: '2rem' }}>
        <MDXRemote {...source} components={components} />
      </Box>
    </>
  )
}

export default LearnDetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  const topicDirs = fs.readdirSync(path.join('learn'))

  const paths: {
    params: {
      topic: string
      slug: string
    }
  }[] = []

  topicDirs.forEach((topic: string) => {
    const files = fs.readdirSync(path.join('learn', topic))

    files.forEach((fileName: string) => {
      const path = {
        params: { topic, slug: fileName.replace('.mdx', '') },
      }

      paths.push(path)
    })
  })

  return {
    paths,
    fallback: false,
  }
}

type Params = {
  [params: string]: any
}

export const getStaticProps: GetStaticProps<Params> = async ({
  params: { topic, slug },
}: Params) => {
  const section = fs.readFileSync(
    path.join('learn', topic, slug + '.mdx'),
    'utf-8'
  )

  const { data: metaData, content } = matter(section)

  const source = await serialize(content, { scope: metaData })

  return {
    props: { topic: metaData.section, slug, metaData, source },
  }
}

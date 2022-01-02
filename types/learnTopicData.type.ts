export type LearnTopicItem = {
  technology: string
  icon: string
}

export type Topics = 'javascript' | 'react' | 'nodejs'

export type LearnTopics = LearnTopicItem[]

export const learnTopics: LearnTopics = [
  {
    technology: 'JavaScript',
    icon: 'devicon-javascript-plain colored',
  },
  {
    technology: 'React',
    icon: 'devicon-react-original-wordmark colored',
  },
  {
    technology: 'NodeJS',
    icon: 'devicon-nodejs-plain colored',
  },
]

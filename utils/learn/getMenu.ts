import { Topics } from '../../types/learnTopicData.type'

import { javascriptMenu } from './javascript'
import { nodejsMenu } from './nodejs'
import { reactMenu } from './react'

export const getMenu = (topic: Topics) => {
  const menu = {
    javascript: javascriptMenu,
    react: reactMenu,
    nodejs: nodejsMenu,
  }

  return menu[topic]
}

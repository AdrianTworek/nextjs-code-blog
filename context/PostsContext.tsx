import {
  createContext,
  ReactNode,
  Dispatch,
  useReducer,
  useContext,
} from 'react'

import { Post } from '../types/post.interface'

type AppState = typeof initialState
type Action = { type: 'SET_POSTS'; payload: Post[] }

interface PostsContextProps {
  children: ReactNode | ReactNode[]
}

const initialState: Post[] = []

const reducer = (state: AppState, { type, payload }: Action) => {
  switch (type) {
    case 'SET_POSTS':
      return payload
    default:
      return state
  }
}

const PostsContext = createContext<{
  state: AppState
  dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => {} })

export const PostsContextProvider = ({ children }: PostsContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <PostsContext.Provider value={{ state, dispatch }}>
      {children}
    </PostsContext.Provider>
  )
}

const usePostsContext = () => useContext(PostsContext)

export default usePostsContext

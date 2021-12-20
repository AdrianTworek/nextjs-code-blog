import {
  createContext,
  ReactNode,
  Dispatch,
  useReducer,
  useContext,
} from 'react'

import { RecentPost } from '../types/recentPost.type'

type AppState = typeof initialState
type Action = { type: 'SET_RECENT_POSTS'; payload: RecentPost }

interface RecentPostsContextProps {
  children: ReactNode | ReactNode[]
}

const initialState: RecentPost[] = []

const reducer = (state: AppState, { type, payload }: Action) => {
  switch (type) {
    case 'SET_RECENT_POSTS':
      state = [...state, payload]

      // Return unique array of objects
      return [...new Map(state.map((obj) => [obj['title'], obj])).values()]
    default:
      return state
  }
}

const RecentPostsContext = createContext<{
  state: AppState
  dispatch: Dispatch<Action>
}>({ state: initialState, dispatch: () => {} })

export const RecentPostsContextProvider = ({
  children,
}: RecentPostsContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <RecentPostsContext.Provider value={{ state, dispatch }}>
      {children}
    </RecentPostsContext.Provider>
  )
}

const useRecentPostsContext = () => useContext(RecentPostsContext)

export default useRecentPostsContext

import { FC, useState, useEffect } from 'react'

import { Tag, tagFilters } from '../../types/tag.type'
import { Post } from '../../types/post.interface'

import { Button, Chip, Paper, Stack, Box } from '@mui/material'
import { usePostsContext } from '../../context/PostsContext'

const chipWidth: number = 80

interface Props {
  posts: Post[]
}

const PostsFiltering: FC<Props> = ({ posts: initialPosts }) => {
  const { state: posts, dispatch } = usePostsContext()
  const [isAll, setIsAll] = useState<boolean>(true)
  const [showFiltering, setShowFiltering] = useState<boolean>(false)
  const [filteredTags, setFilteredTags] = useState<Tag[]>([])

  const chipStyles = { minWidth: chipWidth, cursor: 'pointer', fontWeight: 500 }

  useEffect(() => {
    dispatch({ type: 'SET_POSTS', payload: initialPosts })
  }, [])

  useEffect(() => {
    if (!filteredTags.length) {
      setIsAll(true)
    } else {
      setIsAll(false)
    }

    filterPosts()
  }, [filteredTags])

  const resetFilters = () => {
    setIsAll(true)
    setFilteredTags([])
  }

  const handleFilterBtn = () => {
    if (showFiltering) {
      resetFilters()
      setShowFiltering(false)
    } else {
      setShowFiltering(true)
    }
  }

  const handleClickTag = (tag: Tag) => {
    if (filteredTags.includes(tag)) {
      const filtered = filteredTags.filter((el) => el !== tag)
      setFilteredTags(filtered)
      return
    }

    setFilteredTags([...filteredTags, tag])
  }

  const handleClickAllTag = () => resetFilters()

  const filterPosts = () => {
    // Reset posts if 'all' is selected
    if (!filteredTags.length) {
      dispatch({ type: 'SET_POSTS', payload: initialPosts })
      return
    }

    const filteredPosts: Post[] = []

    initialPosts.map((post: Post) => {
      if (post.metaData.tags.some((tag) => filteredTags.includes(tag))) {
        filteredPosts.push(post)
      }
    })

    dispatch({ type: 'SET_POSTS', payload: filteredPosts })
  }

  return (
    <>
      <Box sx={{ display: 'grid', placeItems: 'center', marginTop: '2rem' }}>
        <Button
          variant="contained"
          color={showFiltering ? 'info' : 'secondary'}
          onClick={handleFilterBtn}
        >
          {showFiltering ? 'Cancel' : 'Filter posts'}
        </Button>
      </Box>

      {showFiltering && (
        <Paper
          sx={{
            display: 'grid',
            placeItems: 'center',
            minHeight: 55,
            marginTop: '2rem',
            padding: '0.5rem 2rem',
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
            direction="row"
          >
            <Chip
              sx={chipStyles}
              label="all"
              color={isAll ? 'primary' : 'default'}
              onClick={handleClickAllTag}
            />

            {tagFilters.map((tag: Tag) => (
              <Chip
                sx={chipStyles}
                key={tag}
                label={tag}
                color={filteredTags.includes(tag) ? 'secondary' : 'default'}
                onClick={() => handleClickTag(tag)}
              />
            ))}
          </Stack>
        </Paper>
      )}
    </>
  )
}

export default PostsFiltering

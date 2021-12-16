import { FC, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Tag, tagFilters } from '../../types/tag.type'
import { Post } from '../../types/post.interface'

import { usePostsContext } from '../../context'

import { Button, Chip, Paper, Stack, Box } from '@mui/material'

const CHIP_WIDTH: number = 80

const filterBtnVariant = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300 },
  },
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 1,
  },
}

const stackVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.25, staggerChildren: 0.07 },
  },
}

const chipVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

interface Props {
  posts: Post[]
}

const PostsFiltering: FC<Props> = ({ posts: initialPosts }) => {
  const { dispatch } = usePostsContext()
  const [isAll, setIsAll] = useState<boolean>(true)
  const [showFiltering, setShowFiltering] = useState<boolean>(false)
  const [filteredTags, setFilteredTags] = useState<Tag[]>([])

  const chipStyles = {
    minWidth: CHIP_WIDTH,
    cursor: 'pointer',
    fontWeight: 500,
  }

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

    // Reset posts when unmounting
    return () => {
      dispatch({ type: 'SET_POSTS', payload: initialPosts })
    }
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
      <Box
        sx={{ display: 'grid', placeItems: 'center', marginTop: '2rem' }}
        component={motion.div}
        variants={filterBtnVariant}
        initial="hidden"
        animate="show"
        whileHover="hover"
        whileTap="tap"
      >
        <Button
          variant="contained"
          color={showFiltering ? 'info' : 'secondary'}
          onClick={handleFilterBtn}
        >
          {showFiltering ? 'Cancel' : 'Filter posts'}
        </Button>
      </Box>

      <AnimatePresence exitBeforeEnter>
        {showFiltering && (
          <Paper
            sx={{
              display: 'grid',
              placeItems: 'center',
              minHeight: 55,
              marginTop: '2rem',
              padding: '0.5rem 2rem',
            }}
            component={motion.div}
            variants={filterBtnVariant}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.35 }}
            exit={{ opacity: 0, x: [-20, 10, -5, 6] }}
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
              component={motion.div}
              variants={stackVariant}
              initial="hidden"
              animate="show"
            >
              <Chip
                sx={chipStyles}
                label="all"
                color={isAll ? 'primary' : 'default'}
                onClick={handleClickAllTag}
                component={motion.span}
                variants={chipVariant}
              />

              {tagFilters.map((tag: Tag) => (
                <Chip
                  sx={chipStyles}
                  key={tag}
                  label={tag}
                  color={filteredTags.includes(tag) ? 'secondary' : 'default'}
                  onClick={() => handleClickTag(tag)}
                  component={motion.span}
                  variants={chipVariant}
                />
              ))}
            </Stack>
          </Paper>
        )}
      </AnimatePresence>
    </>
  )
}

export default PostsFiltering

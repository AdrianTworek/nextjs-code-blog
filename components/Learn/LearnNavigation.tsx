import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Menu, MenuItem } from '../../types/learnMenu.type'
import { LearnMetaData } from '../../types/learnMetaData.type'
import { Topics } from '../../types/learnTopicData.type'

import { useThemeContext } from '../../context'

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import ListIcon from '@mui/icons-material/List'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Close from '@mui/icons-material/Close'

interface Props {
  menu: Menu
  topic: Topics
  slug: string
  metaData: LearnMetaData
}

const LearnNavigation: FC<Props> = ({ menu, topic, slug, metaData }) => {
  const getInitialMenu = (menu: Menu) =>
    menu.map((item: MenuItem) => ({ ...item, isOpen: false }))

  const { state: themeMode, textColor } = useThemeContext()
  const [currentMenu, setCurrentMenu] = useState(getInitialMenu(menu))
  const [showMobileNavigation, setShowMobileNavigation] =
    useState<boolean>(false)

  const theme = useTheme()
  const matches_1200_up = useMediaQuery(theme.breakpoints.up('lg'))

  const router = useRouter()

  useEffect(() => {
    setCurrentMenu(getInitialMenu(menu))
  }, [menu])

  useEffect(() => {
    if (matches_1200_up && showMobileNavigation) {
      setShowMobileNavigation(true)
      return
    }

    if (matches_1200_up && !showMobileNavigation) {
      setShowMobileNavigation(true)
    } else {
      setShowMobileNavigation(false)
    }
  }, [matches_1200_up])

  const listItemStyles = {
    cursor: 'pointer',
    '&:hover': {
      background:
        themeMode === 'dark'
          ? 'rgba(23, 228, 190, 0.2)'
          : 'rgba(211, 20, 84, 0.2)',
    },
  }

  const getMenuItemColor = (v1: string, v2: string = slug) => {
    const color =
      themeMode === 'dark'
        ? theme.palette.primary.main
        : theme.palette.secondary.main

    return {
      color:
        v1?.toLowerCase() === v2.toLowerCase()
          ? color
          : theme.palette.text.primary,
    }
  }

  const IntroductionListItem = () => {
    return (
      <Link href={`/learn/${topic.toLowerCase()}/introduction`} passHref>
        <ListItem sx={listItemStyles}>
          <ListItemText
            style={getMenuItemColor('introduction')}
            primary="Introduction"
          />
        </ListItem>
      </Link>
    )
  }

  return (
    <>
      {showMobileNavigation && (
        <Box
          sx={{
            display: 'flex',
            visibility: showMobileNavigation ? 'visible' : 'hidden',
            flexDirection: 'column',
            position: 'fixed',
            top: 200,
            width: 190,
            maxHeight: '55vh',
            pt: 2,
            background: theme.palette.background.paper,
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
          component={motion.div}
          initial={{ opacity: 0, x: '-100%' }}
          animate={{
            opacity: 1,
            x: 0,
            transition: { type: 'spring', stiffness: 90, duration: 0.2 },
          }}
        >
          {/* Close button on mobile devices */}
          {!matches_1200_up && (
            <Box
              sx={{ position: 'absolute', right: 5, top: 5 }}
              onClick={() => setShowMobileNavigation(false)}
            >
              <Close sx={{ width: 20, height: 20, cursor: 'pointer' }} />
            </Box>
          )}

          <Typography
            variant="h5"
            color={textColor}
            align="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            {topic}
          </Typography>

          <Divider sx={{ background: '#5a5a5a' }} />

          <IntroductionListItem />

          <List>
            {currentMenu.map((menuItem: any, idx: number) => {
              const [[label, subMenu], [_, isOpen]] = Object.entries(menuItem)

              const section = (
                <>
                  <ListItem
                    sx={listItemStyles}
                    onClick={() => {
                      // If a section doesn't have a submenu then redirect
                      // user immediately to the labeled section
                      if (!(subMenu as string[]).length) {
                        router.push(
                          `/learn/${topic.toLowerCase()}/${label.toLowerCase()}`
                        )
                      }

                      // Showing & hiding subMenus
                      const tmpCurrentMenu = [...currentMenu]
                      if ((tmpCurrentMenu[idx] as any)[label].length > 0) {
                        tmpCurrentMenu[idx] = {
                          ...tmpCurrentMenu[idx],
                          isOpen: !isOpen,
                        }
                        setCurrentMenu(tmpCurrentMenu)
                      }
                    }}
                    secondaryAction={
                      (Object.values(menuItem)[0] as string[]).length > 0 && (
                        <>
                          {menuItem.isOpen ? (
                            <KeyboardArrowUpIcon color={textColor} />
                          ) : (
                            <KeyboardArrowDownIcon color={textColor} />
                          )}
                        </>
                      )
                    }
                  >
                    <ListItemText
                      style={getMenuItemColor(
                        metaData?.subSection || metaData.topic,
                        label
                      )}
                      primary={label}
                    />
                  </ListItem>
                </>
              )

              const subSection = (subMenu as string[]).map(
                (item: string, idx: number) => {
                  return (
                    menuItem.isOpen && (
                      <Link
                        key={`${label}_${idx}`}
                        href={`/learn/${topic.toLowerCase()}/${item.toLowerCase()}`}
                        passHref
                      >
                        <ListItem
                          sx={{ ...listItemStyles, pl: 3 }}
                          component={motion.li}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <FiberManualRecordIcon
                            sx={{ width: 10, height: 10, mr: 1 }}
                            color={textColor}
                          />

                          <ListItemText
                            style={getMenuItemColor(item)}
                            primary={` ${item}`}
                          />
                        </ListItem>
                      </Link>
                    )
                  )
                }
              )

              return [section, subSection]
            })}
          </List>
        </Box>
      )}

      {!matches_1200_up && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            position: 'absolute',
            top: 140,
            right: 100,
            width: 30,
            height: 30,
            cursor: 'pointer',
          }}
          onClick={() => setShowMobileNavigation((prev) => !prev)}
        >
          <Typography variant="body2" component="span">
            Sections
          </Typography>
          <ListIcon
            sx={{
              width: 30,
              height: 30,
            }}
            color={textColor}
          />
        </Box>
      )}
    </>
  )
}

export default LearnNavigation

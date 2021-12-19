import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

import { useThemeContext } from '../../context'

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab'
import { Box, Typography, useMediaQuery } from '@mui/material'

interface Section {
  topic: string
  boundingTop: number
  isActive: boolean
}

const MARGIN_TOP = 35

const TOC: FC = () => {
  const { textColor } = useThemeContext()
  const matches_desktop = useMediaQuery('(min-width: 87.5em)')

  const [offsetY, setOffsetY] = useState<number>(0)
  const [sections, setSections] = useState<Section[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setOffsetY(0)
  }, [])

  useEffect(() => {
    const elements: HTMLElement[] = Array.from(
      document.querySelectorAll('section.section-element')
    )

    // setTimeout fixes the bug associated with inappropriate scrolling
    // due to the excessive 198px caused by rendered Navbar's box with
    // filtered posts, which was still visible for little amount of time
    // (100 ms is just enough to fade off for this element)
    setTimeout(() => {
      const sections = elements.map((el: HTMLElement, idx: number) => {
        const { top: boundingTop } = el.getBoundingClientRect()

        return {
          topic: el.getAttribute('id')!,
          boundingTop,
          isActive: idx === 0, // Set the first section active by default
        }
      })

      setSections(sections)
    }, 100)
  }, [])

  useEffect(() => {
    if (sections.length <= 1) return

    const onScroll = () => {
      setOffsetY(window.pageYOffset)
    }
    window.addEventListener('scroll', onScroll)

    // Clean up event listener
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  useEffect(() => {
    if (!sections.length) return

    if (sections.length === 1) {
      sections[0].isActive = true
      return
    }

    sections.forEach((section: Section, idx: number) => {
      if (idx === 0) {
        section.isActive = sections[idx + 1].boundingTop > offsetY + MARGIN_TOP
      } else {
        if (sections[idx + 1]) {
          section.isActive =
            sections[idx + 1].boundingTop > offsetY + MARGIN_TOP &&
            sections[idx].boundingTop <= offsetY + MARGIN_TOP
        } else {
          section.isActive = sections[idx].boundingTop <= offsetY + MARGIN_TOP
        }
      }
    })
  }, [sections, offsetY])

  const toggleSection = (offset: number) => {
    window.scrollTo(0, offset - MARGIN_TOP)
    setOffsetY(offset - MARGIN_TOP)
  }

  return (
    <Box
      sx={{
        display: matches_desktop ? 'block' : 'none',
        position: 'fixed',
        top: 300,
        right: 100,
        width: 300,
        maxHeight: 330,
        overflow: 'scroll',
      }}
      component={motion.div}
      initial={{ opacity: 0, y: -30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 100 },
      }}
    >
      <Timeline>
        {sections.map((section: Section, idx: number) => (
          <TimelineItem
            key={idx}
            onClick={() => toggleSection(section.boundingTop)}
          >
            {/* Add 'Pipe' separator to each item except the last one */}
            {idx !== sections.length - 1 ? (
              <TimelineSeparator>
                <TimelineDot
                  color={textColor}
                  variant={section.isActive ? 'filled' : 'outlined'}
                />
                <TimelineConnector />
              </TimelineSeparator>
            ) : (
              <TimelineDot
                color={textColor}
                variant={section.isActive ? 'filled' : 'outlined'}
              />
            )}

            <TimelineContent>
              <Typography
                color={section.isActive ? textColor : undefined}
                sx={{
                  cursor: 'pointer',
                }}
                variant="subtitle2"
                component="span"
              >
                {section.topic}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  )
}

export default TOC

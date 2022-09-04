import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import ReadingGraph from "../components/graphs/reading-graph"

import {
  Box,
  ExtLink,
  Flex,
  OList,
  Text,
  Title,
} from "../components/basics"

export default function ReadingList2022() {
  const books = [
    {title: "She Who Became The Sun", url: "https://www.goodreads.com/book/show/48727813-she-who-became-the-sun"},
    {title: "The Idiot", url: "https://www.goodreads.com/book/show/30962053-the-idiot"},
    {title: "Harlem Shuffle", url: "https://www.goodreads.com/en/book/show/54626223-harlem-shuffle"},
    {title: "Chattter", url: "https://www.goodreads.com/book/show/53330118-chatter"},
    {title: "My Year Abroad", url: "https://www.goodreads.com/book/show/55333981-my-year-abroad"},
    {title: "The State of Affairs", url: "https://www.goodreads.com/book/show/34017010-the-state-of-affairs"},
    {title: "Severance", url: "https://www.goodreads.com/book/show/36348525-severance"},
    {title: "Beasts of a Little Land", url: "https://www.goodreads.com/book/show/57151981-beasts-of-a-little-land"},
    {title: "Em", url: "https://www.goodreads.com/book/show/55692516-em"},
    {title: "Communication Miracles for Couples", url: "https://www.goodreads.com/book/show/14347301-communication-miracles-for-couples"},
    {title: "The Uninhabitable Earth", url: "https://www.goodreads.com/en/book/show/41552709"},
    {title: "Heaven", url: "https://www.goodreads.com/book/show/53223710-heaven"},
    {title: "The Long Hangover", url: "https://www.goodreads.com/book/show/34757375"},
    {title: "The Body Keeps the Score", url: "https://www.goodreads.com/book/show/18693771-the-body-keeps-the-score"},
    {title: "The Physics of Everyday Things", url: "https://www.goodreads.com/book/show/31752980-the-physics-of-everyday-things"},
    {title: "How Beautiful We Were", url: "https://www.goodreads.com/book/show/51794532-how-beautiful-we-were"},
    {title: "Running Smart", url: "https://www.goodreads.com/book/show/55643208-running-smart"},
    {title: "The Bright Hour", url: "https://www.goodreads.com/book/show/34104392-the-bright-hour"},
    {title: "We Were Dreamers", url: "https://www.goodreads.com/book/show/52582665-we-were-dreamers"},
    {title: "Hello, Habits", url: "https://www.goodreads.com/en/book/show/53447249"},
    {title: "The Lost Art of Doing Nothing", url: "https://www.goodreads.com/en/book/show/54310867-the-lost-art-of-doing-nothing"},
    {title: "Athénaïse", url: "https://www.goodreads.com/en/book/show/1264774"},
    // {title: "", url: ""},
  ]
  const year = "2022"

  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>{"Reading List "+year}</Title>
      <Text description>{"What I read in "+year}</Text>

      <Flex>
        <Box width={{ _: "100%", widescreen: "100%" }}>
          <ReadingGraph year={year} />
          <OList>
            {
              books.map((book, i) => {
                return (
                  <li key={i}>
                    <Text>
                      <ExtLink
                        href={book.url}
                        td="none"
                      >
                        {book.title}
                      </ExtLink>
                    </Text>
                  </li>
                )
              })
            }
          </OList>
        </Box>
      </Flex>
    </Layout>
  )
}

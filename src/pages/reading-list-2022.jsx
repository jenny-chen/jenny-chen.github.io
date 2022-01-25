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

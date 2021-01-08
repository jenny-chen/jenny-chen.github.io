import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
// import ReadingWords2020Graph from "../components/graphs/reading-words-2020"

import {
  Box,
  ExtLink,
  Flex,
  OList,
  Text,
  Title,
} from "../components/basics"

export default function ReadingList2021() {
  const books = [
    {title: "The Promised Land", url: "https://www.goodreads.com/book/show/55976344-the-promised-land"},
  ]
  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>Reading List 2021</Title>
      <Text description>What I read in 2021</Text>

      <Flex>
        <Box width={{ _: "100%", widescreen: "100%" }}>
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

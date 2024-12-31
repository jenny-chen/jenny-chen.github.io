import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import ReadingGraph from "../components/graphs/reading-graph"

import { Box, ExtLink, Flex, OList, Text, Title } from "../components/basics"

export default function ReadingList2022() {
  const books = [
    {
      title: "Convenience Store Woman",
      url:
        "https://www.goodreads.com/book/show/36739755-convenience-store-woman",
    },
    {
      title: "Life Ceremony",
      url: "https://www.goodreads.com/book/show/59793324-life-ceremony",
    },
    {
      title: "The Priory of the Orange Tree",
      url:
        "https://www.goodreads.com/book/show/40275288-the-priory-of-the-orange-tree",
    },
    {
      title: "Babel",
      url: "https://www.goodreads.com/book/show/57945316-babel",
    },
    {
      title: "The Art of Doing Science and Engineering",
      url:
        "https://www.goodreads.com/en/book/show/530415.The_Art_of_Doing_Science_and_Engineering",
    },
    {
      title: "The Premonition",
      url: "https://www.goodreads.com/book/show/90564433-the-premonition",
    },
    {
      title: "Japanese Cooking",
      url: "https://www.goodreads.com/book/show/297751.Japanese_Cooking",
    },
    {
      title: "The Double Life of Benson Yu",
      url:
        "https://www.goodreads.com/book/show/61273339-the-double-life-of-benson-yu",
    },

    {
      title: "Kitchen Confidential",
      url: "https://www.goodreads.com/book/show/33313.Kitchen_Confidential",
    },
    {
      title: "The Vegetarian",
      url: "https://www.goodreads.com/book/show/25489025-the-vegetarian",
    },
    {
      title: "Butter",
      url: "https://www.goodreads.com/book/show/200776812-butter",
    },
    {
      title: "Orbital",
      url: "https://www.goodreads.com/book/show/123136728-orbital",
    },
    // {title: "", url: ""},
  ]
  const year = "2024"

  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>{"Reading List " + year}</Title>
      <Text description>{"What I read in " + year}</Text>

      <Flex>
        <Box width={{ _: "100%", widescreen: "100%" }}>
          <ReadingGraph year={year} />
          <OList>
            {books.map((book, i) => {
              return (
                <li key={i}>
                  <Text>
                    <ExtLink href={book.url} td="none">
                      {book.title}
                    </ExtLink>
                  </Text>
                </li>
              )
            })}
          </OList>
        </Box>
      </Flex>
    </Layout>
  )
}

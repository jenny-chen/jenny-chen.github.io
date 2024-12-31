import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import ReadingGraph from "../components/graphs/reading-graph"

import { Box, ExtLink, Flex, OList, Text, Title } from "../components/basics"

export default function ReadingList2022() {
  const books = [
    {
      title: "Bad Gays",
      url: "https://www.goodreads.com/en/book/show/59012057",
    },
    {
      title: "Four Thousand Weeks: Time Management for Mortals",
      url: "https://www.goodreads.com/book/show/54785515-four-thousand-weeks",
    },
    {
      title: "Tomorrow and Tomorrow and Tomorrow",
      url: "https://www.goodreads.com/en/book/show/58784475",
    },
    {
      title: "Black Cake",
      url: "https://www.goodreads.com/en/book/show/57926137",
    },
    {
      title: "The Food Lab",
      url: "https://www.goodreads.com/book/show/24861842-the-food-lab",
    },
    {
      title: "Sea of Tranquility",
      url: "https://www.goodreads.com/book/show/58446227-sea-of-tranquility",
    },
    {
      title: "Family Meal",
      url: "https://www.goodreads.com/book/show/123414019-family-meal",
    },
    {
      title: "All the Lovers in the Night",
      url:
        "https://www.goodreads.com/book/show/59336625-all-the-lovers-in-the-night",
    },
    // {title: "", url: ""},
  ]
  const year = "2023"

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

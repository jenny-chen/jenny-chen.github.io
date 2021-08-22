import React from "react"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import PageList from "../components/page-list"
import Reading2020Graph from "../components/graphs/reading-2020"
import Reading2021Graph from "../components/graphs/reading-2021"
import ReadingWords2020Graph from "../components/graphs/reading-words-2020"

import {
  Box,
  ExtLink,
  Flex,
  Heading,
  Link,
  Section,
  Subtitle,
  Text,
  Title,
  UList
} from "../components/basics"

const RecHeading = styled(Heading)`
  ${({ theme }) => `${theme.mediaQueries.tablet} {
    margin-top: 10px;
  }`}
`

const PaddedLink = styled(Link)`
  margin-right: 20px;
`

export default function Reading() {
  const recNonFic = [
    {title: "Becoming", url: "https://www.goodreads.com/book/show/38746485-becoming"},
    {title: "Educated", url: "https://www.goodreads.com/book/show/35133922-educated"},
    {title: "Invisible Women", url: "https://www.goodreads.com/book/show/41104077-invisible-women"},
    {title: "Maybe You Should Talk to Someone", url: "https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone"},
    {title: "Non-Violent Communication", url: "https://www.goodreads.com/book/show/71730.Nonviolent_Communication"},
    {title: "Prepared", url: "https://www.goodreads.com/en/book/show/43422738-prepared"}
  ]
  const recFic = [
    {title: "Airborn", url: "https://www.goodreads.com/book/show/428042.Airborn"},
    {title: "Breasts and Eggs", url: "https://www.goodreads.com/book/show/50736031-breasts-and-eggs"},
    {title: "Children of Time", url: "https://www.goodreads.com/series/247630-children-of-time"},
    {title: "Life of Pi", url: "https://www.goodreads.com/book/show/4214.Life_of_Pi"},
    {title: "The Long Way to a Small, Angry Planet", url: "https://www.goodreads.com/book/show/22733729-the-long-way-to-a-small-angry-planet"},
    {title: "The Luminaries", url: "https://www.goodreads.com/book/show/17333230-the-luminaries"},
    {title: "The Remains of the Day", url: "https://www.goodreads.com/book/show/28921.The_Remains_of_the_Day"},
    {title: "The Three-Body Problem", url: "https://www.goodreads.com/book/show/20518872-the-three-body-problem"},
  ]
  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>Reading</Title>
      <Text description>What I talk about when I talk about books</Text>

      {/* <Reading2020Graph /> */}
      {/* <ReadingWords2020Graph /> */}
      <Reading2021Graph />

      <Text>
        <PaddedLink td="none" to="/reading-list-2021">Reading List 2021</PaddedLink>
        <PaddedLink td="none" to="/reading-list-2020">Reading List 2020</PaddedLink>
      </Text>
      <br />

      <Section>
        <Subtitle>Recommended Reading</Subtitle>

        <Flex boxWidth="32%">
          <Box>
            <RecHeading>non-fiction</RecHeading>
            <UList>
              {
                recNonFic.map((book, i) => {
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
            </UList>
          </Box>

          <Box>
            <RecHeading>fiction</RecHeading>
            <UList>
              {
                recFic.map((book, i) => {
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
            </UList>
          </Box>

          <Box>
            <RecHeading>other</RecHeading>
          </Box>
        </Flex>

      </Section>

      <PageList section="reviews" />

    </Layout>
  )
}


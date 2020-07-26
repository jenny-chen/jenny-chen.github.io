import React from "react"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import PageList from "../components/page-list"
import Reading2020Graph from "../components/graphs/reading-2020"

import {
  Box,
  ExtLink,
  Flex,
  Heading,
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

export default function Reading() {
  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>Reading</Title>
      <Text description>What I talk about when I talk about books</Text>

      <Reading2020Graph />

      <Section>
        <Subtitle>Recommended Reading</Subtitle>

        <Flex>
          <Box width="32%">
            <RecHeading>non-fiction</RecHeading>
            <UList>
              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/38746485-becoming"
                    td="none"
                  >
                    Becoming
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/35133922-educated"
                    td="none"
                  >
                    Educated
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/41104077-invisible-women"
                    td="none"
                  >
                    Invisible Women
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone"
                    td="none"
                  >
                    Maybe You Should Talk to Someone
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/71730.Nonviolent_Communication"
                    td="none"
                  >
                    Non-Violent Communication
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/en/book/show/43422738-prepared"
                    td="none"
                  >
                    Prepared
                  </ExtLink>
                </Text>
              </li>
            </UList>
          </Box>

          <Box width="32%">
            <RecHeading>fiction</RecHeading>
            <UList>
              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/428042.Airborn"
                    td="none"
                  >
                    Airborn
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/22733729-the-long-way-to-a-small-angry-planet"
                    td="none"
                  >
                    The Long Way to a Small, Angry Planet
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/17333230-the-luminaries"
                    td="none"
                  >
                    The Luminaries
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/28921.The_Remains_of_the_Day"
                    td="none"
                  >
                    The Remains of the Day
                  </ExtLink>
                </Text>
              </li>

              <li>
                <Text>
                  <ExtLink
                    href="https://www.goodreads.com/book/show/10357575-1q84"
                    td="none"
                  >
                    1Q84
                  </ExtLink>
                </Text>
              </li>
            </UList>
          </Box>

          <Box width="32%">
            <RecHeading>other</RecHeading>
          </Box>
        </Flex>

      </Section>

      <PageList section="reviews" />

    </Layout>
  )
}


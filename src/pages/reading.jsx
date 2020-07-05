import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import PageList from "../components/page-list"

import {
  Box,
  Flex,
  Heading,
  Link,
  Section,
  Subtitle,
  Text,
  Time,
  Title,
  UList
} from "../components/basics"

const RecHeading = styled(Heading)`
  margin-top: 10px;
`

export default function Reading({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Reading" />
      <Title>Reading</Title>
      <Text description>What I talk about when I talk about books</Text>

      <Section>
        <Subtitle>Recommended Reading</Subtitle>

        <Flex>
          <Box>
            <RecHeading>non-fiction</RecHeading>
            <UList>
              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/38746485-becoming"
                    td="none"
                  >
                    Becoming
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/35133922-educated"
                    td="none"
                  >
                    Educated
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/41104077-invisible-women"
                    td="none"
                  >
                    Invisible Women
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone"
                    td="none"
                  >
                    Maybe You Should Talk to Someone
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/71730.Nonviolent_Communication"
                    td="none"
                  >
                    Non-Violent Communication
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/en/book/show/43422738-prepared"
                    td="none"
                  >
                    Prepared
                  </Link>
                </Text>
              </li>
            </UList>
          </Box>

          <Box>
            <RecHeading>fiction</RecHeading>
            <UList>
              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/428042.Airborn"
                    td="none"
                  >
                    Airborn
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/22733729-the-long-way-to-a-small-angry-planet"
                    td="none"
                  >
                    The Long Way to a Small, Angry Planet
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/17333230-the-luminaries"
                    td="none"
                  >
                    The Luminaries
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/28921.The_Remains_of_the_Day"
                    td="none"
                  >
                    The Remains of the Day
                  </Link>
                </Text>
              </li>

              <li>
                <Text>
                  <Link
                    to="https://www.goodreads.com/book/show/10357575-1q84"
                    td="none"
                  >
                    1Q84
                  </Link>
                </Text>
              </li>
            </UList>
          </Box>

          <Box>
            <RecHeading>other</RecHeading>
          </Box>
        </Flex>

      </Section>

      <PageList pageTitle="Reviews" posts={posts}/>

    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/reading/"}}, 
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "DD-MM-YYYY")
            path
          }
        }
      }
    }
  }
`

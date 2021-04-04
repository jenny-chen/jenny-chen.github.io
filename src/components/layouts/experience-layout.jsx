import React from "react"
import rehypeReact from "rehype-react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "../seo"

import { Box, ExtLink, Flex, Heading, Link, Pre, Text, Title } from "../basics"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: ExtLink,
    h1: Title, 
    h3: Heading, 
    p: Text, 
    "link": Link,
    pre: Pre,
  }
}).Compiler

export default function ExperienceLayout({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout tab={post.frontmatter.title}>
      <SEO title={post.frontmatter.title} />
      <Title>{post.frontmatter.title}</Title>
      <Flex boxWidth="32%" style={{ marginTop: "20px" }}>
        <Box>
          <Heading>time</Heading>
          <Text>{post.frontmatter.time}</Text>
        </Box>

        <Box>
          <Heading>location</Heading>
          <Text>{post.frontmatter.location}</Text>
        </Box>
        
        <Box>
          <Heading>technologies</Heading>
          <Text>{post.frontmatter.technologies}</Text>
        </Box>
      </Flex>
      {
        renderAst(post.htmlAst)
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query ExperienceByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        path
        title
        time
        location
        technologies
      }
    }
  }
`

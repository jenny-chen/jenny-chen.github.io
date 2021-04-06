import React from "react"
import rehypeReact from "rehype-react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "../seo"

import { ExtLink, Heading, Link, OList, Text, Title } from "../basics"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 
    a: ExtLink,
    h1: Title,
    h3: Heading,
    p: Text,
    ol: OList,
    "link": Link,
  }
}).Compiler

export default function ReadingLayout({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout tab="Reading">
      <SEO title={post.frontmatter.title} />
      <Title><ExtLink href={post.frontmatter.goodreads}>{post.frontmatter.title}</ExtLink>{" by " + post.frontmatter.author}</Title>
      <Heading>{post.frontmatter.date}</Heading>
      {
        renderAst(post.htmlAst)
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query ReadingByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        author
        title
        goodreads
      }
    }
  }
`

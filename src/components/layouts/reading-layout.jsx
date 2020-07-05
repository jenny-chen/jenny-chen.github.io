import React from "react"
import rehypeReact from "rehype-react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "../seo"

import { Heading, Link, Text, Title } from "../basics"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 
    h1: Title,
    h3: Heading,
    p: Text,
    "Link": Link
  }
}).Compiler

export default function ReadingLayout({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Title><Link to={post.frontmatter.goodreads}>{post.frontmatter.title}</Link>{" by " + post.frontmatter.author}</Title>
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

import React from "react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "../seo"

import { Heading, Link, Text, Title } from "../basics"

export default function ReadingLayout({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Title><Link to={post.frontmatter.goodreads}>{post.frontmatter.title}</Link>{" by " + post.frontmatter.author}</Title>
      <Heading>{post.frontmatter.date}</Heading>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ReadingByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
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

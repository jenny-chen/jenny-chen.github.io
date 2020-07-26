import React from "react"
import rehypeReact from "rehype-react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "../seo"

import { Heading, Link, Pre, Text, Title } from "../basics"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: Title, 
    h3: Heading, 
    p: Text, 
    "Link": Link,
    pre: Pre,
  }
}).Compiler

export default function PoemLayout({ data }) {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Title>{post.frontmatter.title}</Title>
      {
        renderAst(post.htmlAst)
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query PoemByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        path
        title
      }
    }
  }
`

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

export default function EssayLayout({ data }) {
  const { markdownRemark: post } = data
  console.log("post: ", post.frontmatter.contents)
  return (
    <Layout tab="Writing">
      <SEO title={post.frontmatter.title} />
      <Title>{post.frontmatter.title}</Title>
      <Text description>{post.frontmatter.description}</Text>
      <Heading>{post.frontmatter.date}</Heading>
      {post.frontmatter.contents.map((heading, i) => {
        return (
          <Link key={i} href={"#"+heading}>
            <Text>{heading}</Text>
          </Link>
        )
      })}
      {
        renderAst(post.htmlAst)
      }
      <div style={{ height: "40vh" }}></div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query EssayByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        description
        contents
      }
    }
  }
`

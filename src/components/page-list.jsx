import React from "react"
import { StaticQuery, graphql } from "gatsby"

import {
  Link,
  Section,
  Subtitle,
  Text,
  Time,
  UList
} from "./basics"

export default function PageList({ section }) {
    
  return (
    <StaticQuery 
      query={graphql`
        query IndexQuery {
          reviews: allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/reviews/"}}, 
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

          poems: allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/poems/"}}, 
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

          essays: allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/essays/"}}, 
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
      `}
      render={data => <Helper data={data} section={section} /> }
    /> 
  )
}

const Helper = ({ data, section }) => {
  const { edges: posts } = data[section]
  return (
    <Section>
      <Subtitle>{section}</Subtitle>
      <UList>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <li 
                key={post.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Text>
                <Link 
                  to={post.frontmatter.path} 
                  td="none"
                >
                  {post.frontmatter.title}
                </Link>
                </Text>
                <Time>{post.frontmatter.date}</Time>
              </li>
            )
          })
        }
      </UList>
    </Section>
  )
}

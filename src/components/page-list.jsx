import React from "react"

import {
  Link,
  Section,
  Subtitle,
  Text,
  Time,
  UList
} from "./basics"

const PageList = ({ pageTitle, posts }) => {
  return (
    <Section>
      <Subtitle>{pageTitle}</Subtitle>
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

export default PageList

import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import Socials from "../components/socials"
import resume from "../../assets/resume.pdf"

import { Box, ExtLink, Link, Text, Title } from "../components/basics"

const IndexPage = () => {
  return (
    <Layout tab="Portfolio">
      <SEO title="Portfolio" />

      <Box display={{ _: "block", tablet: "none" }}>
        <Title>Hi, my name is Jenny!</Title>
        <Socials />
        <Text>
        I’m currently a software engineering student at the <ExtLink href="https://uwaterloo.ca/">University of Waterloo</ExtLink>. When I’m not studying or coding, you can usually catch me reading, gaming, or cooking.
        </Text>
      </Box>

      <Text>
        Oops, still a work in progress. You can check out my <Link to={resume}>resume</Link> in the meantime.
      </Text>
    </Layout>
  )
}

export default IndexPage

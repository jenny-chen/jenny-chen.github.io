import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import { ExtLink, Heading, Link, Text, Title } from "../components/basics"

const About = () => (
  <Layout tab="About">
    <SEO title="About" />
    <Title>Biography</Title>

    <Heading>early life</Heading>

    <Text>
      I grew up in Ontario, Canada, my family moving several times between
      cities before finally settling down in suburban Toronto. It was there that
      I obtained most of my schooling before attending University.
    </Text>

    <Heading>career</Heading>

    <Text>
      I studied computer science at the University of Waterloo and during my time there, interned at a number of different companies.
      Since graduating, I've been working as a software engineer at Figma.
    </Text>
  </Layout>
)

export default About

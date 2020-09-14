import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import {
  Flex,
  Heading,
  Section,
  Subtitle,
  Text,
  Title,
} from "../components/basics"

const Portfolio = () => (
  <Layout tab ="Portfolio">
    <SEO title="About" />
    <Title>Portfolio</Title>
    <Text description>Things I've done</Text>

    <Section>
      <Subtitle>experiences</Subtitle>

      <Flex boxWidth={{ _: "100%", tablet: "50%" }}>
        <Heading>Jewlr</Heading> 
      </Flex>
    </Section>


    <Section>
      <Subtitle>projects</Subtitle>
    </Section>
    
  </Layout>
)

export default Portfolio

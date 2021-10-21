import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import {
  Box,
  ExtLink,
  Flex,
  Heading,
  Link,
  Text,
  Title
} from "../components/basics"

const About = () => (
  <Layout tab="About">
    <SEO title="About" />
    <Title>Biography</Title>

    <Heading>early life</Heading>

    <Text>
      I grew up in Ontario, Canada, my family moving several times between cities before finally settling down in suburban Toronto. It was there that I obtained most of my schooling before attending University.
    </Text>

    <Text>
      At home, I’m the middle child between two sisters, meaning I’ve never had a shortage of people around. In between going on neighbourhood adventures, I would often lose myself in books, something that hasn’t changed much over the years. At school, I tended toward the quiet side as a student, usually completing my work independently and spending my free time <Link to="/reading">reading</Link>. By grade 4, I transferred into the gifted program and then eventually the <ExtLink href="https://www.ibo.org/">International Baccalaureate (IB)</ExtLink> program in high school, from which I graduated in 2019. I was fairly involved throughout high school, serving on school councils, and participating in sports such as track & field, volleyball, and rugby.
    </Text>

    <Heading>technology</Heading>

    <Text>
      Until I reached high school, technology use was a rare priviledge in our household. Computers was used primarily for studying or working, and the exclusivity of it all piqued my curiosity. When I reached grade 7, my sister began a computer science course in high school. Having nothing better to do, I decided I wanted to follow along. From there, I discovered raw HTML and CSS. The webpage I made was crude and ugly, but it didn’t matter to me at all- I was simply amazed that I could control the pixels on the screen. From then on, I spent much of my free time on learning and gaining experience in software development. This experience came from all sorts of places: I attended hackathons all throughout high school, hosted workshops at my school, and worked on personal projects whenever I could.
    </Text>

    <Heading>up next</Heading>

    <Text>
      I currently study Software Engineering at the <ExtLink href="https://www.uwaterloo.ca">University of Waterloo</ExtLink>. I’m excited to work on and use new technology to positively impact communities and help improve the world we live in as a whole.
    </Text>

    <Flex boxWidth="32%" style={{ marginTop: "20px" }}>
      <Box>
        <Heading>current term</Heading>
        <Text>Coop at Faire</Text>
      </Box>

      <Box>
        <Heading>location</Heading>
        <Text>Waterloo, ON</Text>
      </Box>
      <Box></Box>
    </Flex>

  </Layout>
)

export default About

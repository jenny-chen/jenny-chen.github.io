import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import Socials from "../components/socials"
import resume from "../../assets/resume.pdf"

import { Box, ExtLink, Heading, Link, PageLink, Text, Title } from "../components/basics"

const PageLinks = ({ pages, paths, tab }) => {
  return (
    <>
      {pages.map((page, i) => (
        <PageLink
          display="block" key={i} mb="5px" to={paths[i]}>
            {page}
        </PageLink>
      ))}
    </>
  )
}

const IndexPage = () => {
  const travelsPages = ["Hong Kong", "Japan"]
  const travelsPaths =["/hongkong", "/japan"]

  const experiencesPages = ["Figma S2022", "Faire", "Synqrinus", "Jewlr", "HelpingHands", "ProjectCSGirls"]
  const experiencesPaths = ["/figma-S2022", "/faire", "/synqrinus", "/jewlr", "/helpinghands", "/projectcsgirls"]

  const projectsPages = []
  const projectsPaths = []

  return (
    <Layout tab="Home">
      <SEO title="Home"/>

      <Box display={{ _: "block", tablet: "none" }}>
        <Title>Hi, my name is Jenny!</Title>
        <Socials />
        <Text>
        I’m currently a software engineering student at the <ExtLink href="https://www.uwaterloo.ca/">University of Waterloo</ExtLink>. When I’m not studying or coding, you can usually catch me reading, gaming, or cooking.
        </Text>

        <Text>
          Check out my <Link to={resume}>resume</Link>.
        </Text>

        <Heading>travels</Heading>
        <Text>
          <PageLinks pages={travelsPages} paths={travelsPaths} />
        </Text>

        <Heading>experiences</Heading>
        <Text>
          <PageLinks pages={experiencesPages} paths={experiencesPaths} />
        </Text>

        <Heading>projects</Heading>
        <Text>
          <PageLinks pages={projectsPages} paths={projectsPaths} />
        </Text>
        <Text>
          <ExtLink href="https://www.joannachen.ca/pear/" td="none">Pear</ExtLink>
        </Text>
        <Text>
          <ExtLink href="https://devpost.com/jenny-chen?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav" td="none">Hackathon Projects</ExtLink>
        </Text>
      </Box>

      <Box display={{ _: "none", tablet: "block" }}>
        <Text>
          Welcome to my little corner on the internet!
        </Text>
        <Text>
          To be honest, I'm not sure what to do with this empty space yet. If you have a suggestion, I'd love to <ExtLink href="mailto:jenny.chen1@uwaterloo.ca">hear it</ExtLink>!
        </Text>
        <Text>
          I'm (perpetually) in the process of designing a new personal site, but this current layout is inspired by <ExtLink href="https://willium.com">William Strimling</ExtLink>.
        </Text>
        <Text>In the meantime, I just updated this site with some memories from my <b><Link to="/hongkong">2022 exchange term in Hong Kong</Link></b> and would love for you to see :D</Text>
      </Box>
    </Layout>
  )
}

export default IndexPage

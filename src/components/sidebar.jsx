import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

// import profile from "../images/profile.png"
import Socials from "../components/socials"
import resume from "../../assets/resume.pdf"

import { Box, ExtLink, Heading, Link, PageLink, Text, Title } from "./basics"

const Side = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightestGray}; 
  border-right: none;
  padding-bottom: 20px;
  padding-right: 0px;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    border-bottom: none;
    border-right: 1px solid ${theme.colors.lightestGray}; 
    padding-bottom: 0;
    padding-right: 20px;
  }`}
`

const PageLinks = ({ pages, paths, tab }) => {
  return (
    <>
      {pages.map((page, i) => (
        <PageLink
          bold={page === tab ? 700 : 500}
          key={i} to={paths[i]}>
            {page}
        </PageLink>
      ))}
    </>
  )
}

const Sidebar = ({ page, tab }) => {
  const pages = ["About", "Reading"]
  const paths = ["/about", "/reading"]

  const travelsPages = ["Japan"]
  const travelsPaths =["/japan"]

  const experiencesPages = ["Faire", "Synqrinus", "Jewlr", "HelpingHands", "ProjectCSGirls"]
  const experiencesPaths = ["/faire", "/synqrinus", "/jewlr", "/helpinghands", "/projectcsgirls"]

  const projectsPages = []
  const projectsPaths = []

  return (
    <Box flex="1" mt={{ _: "50px", tablet: "30px" }} outside style={{ maxWidth: "300px", minWidth: "300px" }}>
      <Side>

        {/* <img alt="headshot" src={profile} height="50px" width="50px" /> */}
        <Box display={{ _: "none", tablet: "block" }}>
          <Title>
            Hi, my name is <Link to="/" td="none">Jenny</Link>!
          </Title>
          <Socials />
          <Text>
            I’m currently a software engineering student at the University of Waterloo. When I’m not studying or coding, you can usually catch me reading, gaming, or cooking.
          </Text>

          <Text>
            Check out my <Link to={resume}>resume</Link>.
          </Text>
        </Box>

        <Text>
          <br />
          <PageLink bold={"Home" === tab ? 700 : 500} display={{ tablet: "none" }} to="/" >Home</PageLink>
          <PageLinks pages={pages} paths={paths} tab={tab} />
        </Text>

        <Box display={{ _: "none", tablet: "block" }}>
          <Heading>travels</Heading>
          <Text>
            <PageLinks pages={travelsPages} paths={travelsPaths} tab={tab} />
          </Text>

          <Heading>experiences</Heading>
          <Text>
            <PageLinks pages={experiencesPages} paths={experiencesPaths} tab={tab} />
          </Text>

          <Heading>projects</Heading>
          <Text>
            <PageLinks pages={projectsPages} paths={projectsPaths} tab={tab} />
          </Text>
          <Text>
            <ExtLink href="https://www.joannachen.ca/pear/" td="none">Pear</ExtLink>
          </Text>
          <Text>
            <ExtLink href="https://devpost.com/jenny-chen?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav" td="none">Hackathon Projects</ExtLink>
          </Text>
        </Box>

      </Side>
    </Box>
  )
}

Sidebar.propTypes = {
  page: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: `portfolio`,
}

export default Sidebar

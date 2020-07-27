import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

// import profile from "../images/profile.png"
import Socials from "../components/socials"
import resume from "../../assets/resume.pdf"

import { Box, Link, Text, Title } from "./basics"

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

const PageLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  font-weight: ${props => props.bold};
  
  &:hover {
    text-decoration: underline;
  }

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    display: block;
    margin-bottom: 5px;
  }`}
`

const PageLinks = ({ tab }) => {
  const pages = ["Portfolio", "About", "Reading", "Writing"]
  const paths = ["/", "/about", "/reading", "/writing"]

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

const Sidebar = ({ page, tab }) => (
  <Box flex="1" mt={{ _: "50px", tablet: "30px" }} outside style={{ maxWidth: "300px", minWidth: "300px" }}>
    <Side>

      {/* <img alt="headshot" src={profile} height="50px" width="50px" /> */}
      <Box display={{ _: "none", tablet: "block" }}>
        <Title>
          Hi, my name is Jenny!
        </Title>
        <Socials />
        <Text>
          I’m currently a software engineering student at the University of Waterloo. When I’m not studying or coding, you can usually catch me reading, gaming, or cooking. This is a test.
        </Text>

        <Text>
          Check out my <Link to={resume}>resume</Link>.
        </Text>
      </Box>

      <Text>
        <br />
        <PageLinks tab={tab} />
      </Text>

    </Side>
  </Box>
)

Sidebar.propTypes = {
  page: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: `portfolio`,
}

export default Sidebar

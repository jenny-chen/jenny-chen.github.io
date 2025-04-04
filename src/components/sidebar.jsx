import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import Socials from "../components/socials"

import { Box, ExtLink, Flex, Highlight, Link, PageLink, Text } from "./basics"

const Side = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  border-right: none;
  padding-bottom: 20px;
  padding-right: 0px;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    border-bottom: none;
    border-right: 1px solid ${theme.colors.lightGray}; 
    padding-bottom: 0;
    padding-right: 32px;
    height: 100%;
  }`}

  border: ${props => props.tab === "Home" && "none !important"};
  padding: ${props => props.tab === "Home" && "0px !important"};
`

const PageLinks = ({ pages, paths, tab }) => {
  return (
    <>
      {pages.map((page, i) => (
        <PageLink underline={page === tab} key={i} to={paths[i]}>
          {page === tab ? <Highlight>{page}</Highlight> : page}
        </PageLink>
      ))}
    </>
  )
}

const PageLinksBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    display: block;
  }`}
`

const Header = styled(Text)`
  font-weight: bold;
  margin-bottom: 8px;
`

const Sidebar = ({ tab }) => {
  const travelsPages = ["Japan (Oct) 2023", "Japan 2023", "Hong Kong", "Japan"]
  const travelsPaths = ["/japan-oct-2023", "/japan-2023", "/hongkong", "/japan"]

  const experiencesPages = [
    "Riot Games",
    "Figma W2023",
    "Figma S2022",
    "Faire",
    "Synqrinus",
    "Jewlr",
    "HelpingHands",
    "ProjectCSGirls",
  ]
  const experiencesPaths = [
    "/riotgames",
    "/figma-W2023",
    "/figma-S2022",
    "/faire",
    "/synqrinus",
    "/jewlr",
    "/helpinghands",
    "/projectcsgirls",
  ]

  return (
    <Box
      flex="1"
      mt={{ _: "50px", tablet: "30px" }}
      outside
      style={{ maxWidth: "300px", minWidth: "300px" }}
    >
      <Side tab={tab}>
        <Flex flexDirection="column">
          <Socials />
          <Box>
            <Header>
              Hi, I'm{" "}
              <Highlight>
                <Link to="/about" td="none">
                  Jenny
                </Link>
              </Highlight>
            </Header>
            <Text>
              I'm currently working fulltime as a software engineer at Figma in
              San Francisco. I recently graduated from the
              <ExtLink href="https://www.uwaterloo.ca/">
                {" "}
                University of Waterloo{" "}
              </ExtLink>
              in 2024 where I studied computer science. When not at work, you
              can usually catch me running, travelling, or reading.
            </Text>
          </Box>

          <Box mt={16}>
            <Flex mt={16}>
              <Flex flexDirection="column" flex="1" justifyContent="flex-start">
                <Header>Work</Header>
                <PageLinksBox>
                  {experiencesPages.length > 0 && (
                    <PageLinks
                      pages={experiencesPages}
                      paths={experiencesPaths}
                      tab={tab}
                    />
                  )}
                </PageLinksBox>
              </Flex>

              <Flex flexDirection="column" flex="1" justifyContent="flex-start">
                <Header>Travels</Header>
                <PageLinksBox>
                  {travelsPages.length > 0 && (
                    <PageLinks
                      pages={travelsPages}
                      paths={travelsPaths}
                      tab={tab}
                    />
                  )}
                </PageLinksBox>
              </Flex>
            </Flex>
          </Box>

          <Box mt={16}>
            <Header>
              <Link to="/reading" td="none">
                {tab === "Reading" ? <Highlight>Reading</Highlight> : "Reading"}
              </Link>
            </Header>
          </Box>
        </Flex>
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

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Theme from "../basics/theme"
import { Box, Flex } from "../basics"
import Sidebar from "../sidebar"
// import "./layout.css"


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const styles = {
    margin: "auto",
    maxWidth: "1000px",
    lineHeight: "1.5",
    WebkitFontSmoothing: "antialiased"
  }

  return (
    <>
      <Theme>
        <Flex style={ styles }>
        <Sidebar />
          <Box flex="3" outside>
            <main>{children}</main>
          </Box>
        </Flex>
      </Theme>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

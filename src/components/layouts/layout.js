/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Theme from "../basics/theme"
import { Box, Flex } from "../basics"
import Sidebar from "../sidebar"
// import "./layout.css"


const Layout = ({ tab, children }) => {

  const styles = {
    margin: "auto",
    maxWidth: "1200px",
    lineHeight: "1.5",
    WebkitFontSmoothing: "antialiased"
  }

  return (
    <>
      <Theme>
        <Flex justifyContent="center" style={ styles }>
          {/* <Sidebar tab={tab} /> */}
          {/* <Box flex="4" width="20%" outside> */}
          <Box flex="4" outside>
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

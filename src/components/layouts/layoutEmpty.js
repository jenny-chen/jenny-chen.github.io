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
// import "./layout.css"

const LayoutEmpty = ({ children }) => {

  const styles = {
    margin: "auto",
    maxWidth: "750px",
    lineHeight: "1.5",
    WebkitFontSmoothing: "antialiased"
  }

  return (
    <>
      <Theme>
        <Flex justifyContent="center" style={ styles }>
          <Box flex="4" outside>
            <main>{children}</main>
          </Box>
        </Flex>
      </Theme>
    </>
  )
}

LayoutEmpty.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutEmpty

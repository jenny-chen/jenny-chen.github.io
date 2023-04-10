import React from "react"
import { withTheme } from "styled-components"

import { Box, ExtLink, Link, Text } from "../components/basics"
import resume from "../../assets/resume.pdf"

const Socials = (props) => {
  return (
    <Box mb={16}>
      <Text fontSize="12px">
        <ExtLink 
          href="https://github.com/jenny-chen"
          style={{ marginRight: "5px" }}
          td="none"
        >
          github
        </ExtLink>
        <ExtLink
          href="https://www.linkedin.com/in/linkjennychen/"
          style={{ marginRight: "5px" }}
          td="none"
        >
          linkedin
        </ExtLink>
        <Link to={resume} td="none">resume</Link>
      </Text>
    </Box>
  )
}

export default withTheme(Socials)

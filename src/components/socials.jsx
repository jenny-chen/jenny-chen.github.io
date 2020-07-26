import React from "react"
import { withTheme } from "styled-components"

import { Box, ExtLink, Text } from "../components/basics"

const Socials = (props) => {
  return (
    <Box>
      <Text fontFamily={props.theme.fonts.mono} fontSize="12px">
        <ExtLink 
          href="https://github.com/jenny-chen"
          style={{ color: "RGB(36, 41, 46)", marginRight: "5px" }}
          td="none"
        >
          github
        </ExtLink>
        <ExtLink
          href="https://www.linkedin.com/in/linkjennychen/"
          style={{ color: "RGB(17, 120, 179)" }}
          td="none"
        >
          linkedin
        </ExtLink>
      </Text>
    </Box>
  )
}

export default withTheme(Socials)

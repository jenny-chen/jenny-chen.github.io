import React from "react"
import styled from "styled-components"
import { Link as L } from "gatsby"

const Link = styled(L)`
  color: inherit;
  text-decoration: ${props => props.td || "underline"};

  &:hover {
    text-decoration: underline;
  }
`

export default Link

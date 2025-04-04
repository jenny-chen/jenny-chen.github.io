import styled from "styled-components"
import { Link as L } from "gatsby"

const Link = styled(L)`
  color: inherit;
  text-decoration: ${props => props.td || "underline"};

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: inherit;
  }
`

export default Link

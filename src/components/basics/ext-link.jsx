import styled from "styled-components"

const ExtLink = styled.a`
  color: inherit;
  text-decoration: ${props => props.td}; 

  &:hover {
    text-decoration: underline;
  }
`

export default ExtLink

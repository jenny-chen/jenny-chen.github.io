import React from "react"
import styled from "styled-components"

const Description = styled.p`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.mono}
  font-size: 1.1em;
`

export default Description 

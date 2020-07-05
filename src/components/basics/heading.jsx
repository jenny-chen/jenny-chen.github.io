import React from "react"
import styled from "styled-components"

const Heading = styled.h3`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.9em;
  font-weight: 400;
  margin-top: 32px;
`

export default Heading

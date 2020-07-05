import React from "react"
import styled from "styled-components"

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 1em;
  font-weight: 700;
  margin-bottom: 0.5em;
  margin-top: 0;
`

export default Subtitle

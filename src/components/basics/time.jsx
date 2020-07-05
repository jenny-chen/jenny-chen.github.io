import React from "react"
import styled from "styled-components"

const Time = styled.time`
  color: ${props => props.theme.colors.lightGray};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.8em;
  margin-top: 0.5em;
`

export default Time

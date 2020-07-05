import React from "react"
import styled, { css } from "styled-components"

const Text = styled.p`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.serif};
  font-size: 0.9em;
  margin: 0.9em 0 0 0;
  
  ${props => props.description && css`
    color: ${props.theme.colors.lightGray};
    font-family: ${props.theme.fonts.mono};
    font-size: 1em;
    margin-bottom: 2em;
  `}
`

export default Text

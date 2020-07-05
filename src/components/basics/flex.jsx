import React from "react"
import styled from "styled-components"

const Flex = styled.div`
  display: ${props => props.display || "block"};
  justify-content: ${props => props.justifyContent};

  @media (min-width: ${props => props.theme.screens.mobile}) {
    display: flex;
  }
`

export default Flex

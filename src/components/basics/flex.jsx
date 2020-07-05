import styled from "styled-components"
import { Box } from "./index"

const Flex = styled.div`
  display: ${props => props.display || "block"};
  justify-content: ${props => props.justifyContent || "space-between"};
  width: 100%;

  @media (min-width: ${props => props.theme.screens.mobile}) {
    display: flex;

    ${Box} {
      width: ${props => props.boxWidth};
    }
  }
`

export default Flex

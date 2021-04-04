import styled, { css } from "styled-components"
import { compose, flexbox, layout } from "styled-system"
import { Box } from "./index"

const Flex = styled.div`
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    display: flex;
    flex-wrap: wrap;
  }`}
   
  ${props => props.boxWidth && css`
    ${Box} {
      width: 100%;

      ${({ theme }) => `${theme.mediaQueries.tablet} {
        width: ${props.boxWidth};
      }`}
    }
  `}

  ${compose(flexbox, layout)}
`

export default Flex

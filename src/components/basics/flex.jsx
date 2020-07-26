import styled from "styled-components"
import { compose, flexbox, layout } from "styled-system"

const Flex = styled.div`
  justify-content: space-between;
  width: 100%;

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    display: flex;
  }`}

  ${compose(flexbox, layout)}
`

export default Flex

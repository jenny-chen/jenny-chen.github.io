import styled from "styled-components"

const Highlight = styled.span`
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.yellow} 50%,
    transparent 50%
  );
`

export default Highlight

import styled from "styled-components"
import { compose, layout, space } from "styled-system"
import { Link } from "./index"

const PageLink = styled(Link)`
  margin-right: 10px;
  text-decoration: none;
  font-weight: ${props => props.bold};
  text-decoration: ${props => props.underline ? "underline" : "none"};
  text-decoration-color: ${props => props.theme.colors.yellow};
  
  &:hover {
    text-decoration: underline;
  }

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    display: block;
    margin-bottom: 5px;
  }`}

  ${compose(layout, space)}
`

export default PageLink

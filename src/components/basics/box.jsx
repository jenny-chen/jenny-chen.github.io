import styled, { css } from "styled-components"
import { compose, layout, space} from "styled-system"

const Box = styled.div`
  flex: ${props => props.flex};

  ${props => props.outside && {
    margin: "30px 20px 20px 20px",
  }}

  ${props => props.photo && css`
    margin-top: 2px;
  `}

  ${compose(layout, space)}
`

export default Box

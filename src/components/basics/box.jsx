import styled from "styled-components"
import { compose, layout, space} from "styled-system"

const Box = styled.div.attrs(props => ({
  ...props
}))`
  flex: ${props => props.flex};

  ${props => props.outside && {
    margin: "30px 20px 20px 20px",
  }}

  ${compose(layout, space)}
`

export default Box

import styled from "styled-components"

const Box = styled.div`
  flex: ${props => props.flex};

  ${props => props.outside && {
    margin: "20px" 
  }}
`

export default Box

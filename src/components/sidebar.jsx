import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import profile from "../images/profile.png"
import resume from "../../assets/resume.pdf"

import { Box, Link, Text, Title } from "./basics"

const Side = styled.div`
  border-right: 1px solid ${props => props.theme.colors.lightestGray}; 
  padding-right: 20px;
`

const Sidebar = ({ page }) => (
  <Box flex="1" outside style={{ maxWidth: "300px", minWidth: "300px" }}>
    <Side>

      <img alt="headshot" src={profile} height="50px" width="50px" />
      <Title>
      Hi, my name is Jenny!
      </Title>
      <Text>
      I’m currently a software engineering student at the University of Waterloo. When I’m not studying or coding, you can usually catch me reading, gaming, or cooking. 
      </Text>

      <Text>
        <Link to={resume}>Resume</Link>
      </Text>

      <Text>
        <Link to="/">Portfolio</Link><br/> 
        <Link to="/about/">About</Link><br/>
        <Link to="/reading/">Reading</Link><br/>
        <Link to="/writing/">Writing</Link>
      </Text>

    </Side>
  </Box>
)

Sidebar.propTypes = {
  page: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: `portfolio`,
}

export default Sidebar

import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import resume from "../../assets/resume.pdf"

import { Link, Text, Title } from "../components/basics"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Portfolio" />
      <Title>Hi, my name is Jenny!</Title>
      <Text>
        I’m currently a software engineering student at the <Link to="https://uwaterloo.ca/">University of Waterloo</Link>. When I’m not studying or coding, you can usually catch me reading, gaming, or cooking.
      </Text>
      <Text>
        Check out my <Link to={resume}>resume</Link>.
      </Text>
    </Layout>
  )
}

export default IndexPage

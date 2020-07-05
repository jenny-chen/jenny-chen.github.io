import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"

import { Text, Title } from "../components/basics"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Title>NOT FOUND</Title>
    <Text>
      You just hit a route that doesn&#39;t exist... the sadness.</Text>
  </Layout>
)

export default NotFoundPage

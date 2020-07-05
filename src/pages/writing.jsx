import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import PageList from "../components/page-list"

import {
  Text,
  Title
} from "../components/basics"

export default function Writing() {
  return (
    <Layout>
      <SEO title="Writing" />
      <Title>Writing</Title>
      <Text description>My thoughts in words</Text>

      <PageList section="poems" />
    </Layout>
  )
}


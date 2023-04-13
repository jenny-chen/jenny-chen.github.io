import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import JapanMap2023 from "../components/maps/japan2023"
import PhotoModal from "../components/photoModal"

import { japanPhotoInformation } from "../images/japan/info"

import { Box, Flex, Text, Title } from "../components/basics"

export default function Japan2023({ data }) {
  const [loc, setLoc] = useState("Japan")

  return (
    <Layout tab="Japan 2023">
      <SEO title="Japan 2023" />
      <Title>Japan</Title>
      <Text description>April 2023</Text>

      <JapanMap2023 setLoc={newLoc => setLoc(newLoc)} />
    </Layout>
  )
}

import React, { useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import JapanMap from "../components/maps/japan"
import PhotoModal from "../components/photoModal"

import { japanPhotoInformation } from "../images/japan/info"

import {
  Box,
  ExtLink,
  Flex,
  Heading,
  Link,
  Section,
  Subtitle,
  Text,
  Title,
  UList
} from "../components/basics"

export default function Japan({ data }) {

  const [loc, setLoc] = useState("Japan");
  const [openPhoto, setOpenPhoto] = useState({});
  const [modalHidden, setModalHidden] = useState(true);

  var location = {"loc": "Japan"}
  var photos = {}
  var allPhotos = data.allFile.edges

  for (var i = 0; i < allPhotos.length; i++) {
    var name = allPhotos[i].node.name
    var place = name.split("_")[0]
    if (place in photos) {
      photos[place].push({name: name,
                          image: getImage(allPhotos[i].node.childImageSharp)})
    } else {
      photos[place] = [{name: name,
                        image: getImage(allPhotos[i].node.childImageSharp)}]
    }
  }

  const openModal = () => {
    
  }

  return (
    <Layout tab="Japan">
      <SEO title="Japan" />
      <Title>Japan</Title>
      <Text description>August 2019</Text>

      <JapanMap setLoc={(newLoc) => setLoc(newLoc)}  />

      <Flex boxWidth="49.5%" photos>
        {loc !== "Japan" &&
          photos[loc.split(" ")[0].toLowerCase()].map((photo, index) => {
            return (
              <Box key={photo.name} photo onClick={e => {
                setOpenPhoto(photo)
                setModalHidden(false)
              }}>
                <GatsbyImage
                  alt={photo.name}
                  key={photo.name}
                  image={photo.image}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            )
          })
        }
      </Flex>

      <PhotoModal
        text="modal text" 
        hidden={modalHidden}
        photo={openPhoto}
        setModalHidden={(newModalHidden) => setModalHidden(newModalHidden)}
        info={japanPhotoInformation[openPhoto.name] || {date: "", location: "", description: [""]}}
      />
      
    </Layout>
  )
}

export const pageQuery = graphql`
  query JapanPhotos {
    allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, dir: {regex: "/images/japan/"}}) {
      edges {
        node {
          id
          name
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`

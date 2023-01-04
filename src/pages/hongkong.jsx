import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import HongKongMap from "../components/maps/hongkong"
import PhotoModal from "../components/photoModal"

import { hongKongPhotoInformation } from "../images/hongkong/info"

import {
  Box,
  Flex,
  Text,
  Title,
} from "../components/basics"

export default function HongKong({ data }) {

  const [loc, setLoc] = useState("HongKong");
  const [openPhoto, setOpenPhoto] = useState({});
  const [modalHidden, setModalHidden] = useState(true);

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

  return (
    <Layout tab="HongKong">
      <SEO title="HongKong" />
      <Title>Hong Kong</Title>
      <Text description>Aug - Dec 2022</Text>

      <HongKongMap setLoc={(newLoc) => setLoc(newLoc)}  />

      <Flex boxWidth="49.5%" photos>
        {loc !== "HongKong" &&
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
        info={hongKongPhotoInformation[openPhoto.name] || {date: "", location: "", description: [""]}}
      />
      
    </Layout>
  )
}

export const pageQuery = graphql`
  query HKPhotos {
    allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, dir: {regex: "/images/hongkong/"}}) {
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

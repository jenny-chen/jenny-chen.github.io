import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled, { css } from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"

import { japanPhotoInformation } from "../images/japan-oct-2023/info"

import { Box, Flex, Heading, Text, Title } from "../components/basics"

const PhotosFlex = styled(Flex)`
  display: flex;
  justify-content: flex-start;
  column-gap: 10px;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;

  ${Box} {
    width: 20%;
    ${({ theme }) => `${theme.mediaQueries.tablet} {
      width: 100%;
    }`}
  }

  ${({ theme }) => `${theme.mediaQueries.tablet} {
    margin-top: 0px;
    flex-direction: column;
    row-gap: 10px;
    width: 10%;
  }`}
`

const DateButton = styled.button`
  font-family: ${props => props.theme.fonts.mono};
  background-color: white;
  color: ${props => props.theme.colors.lightGray};
  padding: 0;
  margin-right: 10px;
  cursor: pointer;
  border: none;

  &:hover {
    font-weight: 700;
    text-decoration: none;
  }

  ${props =>
    props.active &&
    css`
      font-weight: 700;
    `}
`

const dates = [
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "18",
  "20",
  "21",
  "23",
  "24",
  "25",
]

export default function JapanOct2023({ data }) {
  const [dateStr, setDateStr] = useState("10")
  const [mainPhoto, setMainPhoto] = useState({})

  var photos = {}
  var allPhotos = data.allFile.edges

  for (var i = 0; i < allPhotos.length; i++) {
    var name = allPhotos[i].node.name
    var date = name.split("-")[0]
    if (date in photos) {
      photos[date].unshift({
        name: name,
        image: getImage(allPhotos[i].node.childImageSharp),
      })
    } else {
      photos[date] = [
        { name: name, image: getImage(allPhotos[i].node.childImageSharp) },
      ]
    }
  }

  if (mainPhoto.name === undefined) {
    setMainPhoto(photos[dateStr][0])
  }

  return (
    <Layout tab="Japan (Oct) 2023">
      <SEO title="Japan (Oct) 2023" />
      <Title>Japan (Oct) 2023</Title>
      <Text description>Select photos from an unplanned trip to Japan</Text>

      {/* DATE BUTTONS */}
      {dates.map((date, index) => {
        return (
          <DateButton
            key={date}
            onClick={() => {
              setDateStr(date)
              setMainPhoto({})
            }}
            active={dateStr == date}
          >
            {date}
          </DateButton>
        )
      })}

      {/* MAIN FLEX: picture + notes on the side */}
      <Flex
        boxWidth="70%"
        photos
        justifyContent="flex-start"
        style={{ columnGap: "10px" }}
      >
        <Box photo>
          <GatsbyImage
            alt={mainPhoto.name}
            key={mainPhoto.name}
            image={mainPhoto.image}
          />
          {/* DATE AND DESCRIPTION */}
          {japanPhotoInformation[mainPhoto.name] !== undefined && (
            <Text>{japanPhotoInformation[mainPhoto.name].description}</Text>
          )}
        </Box>

        <PhotosFlex photos>
          {photos[dateStr].map((photo, index) => {
            return (
              <Box
                key={photo.name}
                photo
                onClick={e => {
                  setMainPhoto(photo)
                }}
                style={{ cursor: "pointer" }}
              >
                <GatsbyImage
                  alt={photo.name}
                  key={photo.name}
                  image={photo.image}
                />
              </Box>
            )
          })}
        </PhotosFlex>
      </Flex>
    </Layout>
  )
}

export const pageQuery = graphql`
  query JapanOct2023Photos {
    allFile(
      filter: {
        extension: { regex: "/(jpg)|(jpeg)|(png)/" }
        dir: { regex: "/images/japan-oct-2023/" }
      }
    ) {
      edges {
        node {
          id
          name
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`

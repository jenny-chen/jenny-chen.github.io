import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

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

const Modal = styled(Box)`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.hidden ? "0" : "1"};
  transition: all 0.2s ease-in-out;
  pointer-events: ${props => props.hidden ? "none" : "auto"};
`

const ModalContent = styled(Box)`
  width: 50%;
  background-color: white;
  padding: 50px;
`

export default function PhotoModal(props) {
  return (
    <Modal hidden={props.hidden} onClick={e => props.setModalHidden(true)}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Flex boxWidth="48%">
          <Box>
            <GatsbyImage
              alt={props.photo.name}
              key={props.photo.name}
              image={props.photo.image}
            />
          </Box>
          <Box>
            <Flex boxWidth="50%">
              <Box>
                <Heading>location</Heading>
                <Text>{props.info.location}</Text>
              </Box>
              <Box>
                <Heading>date</Heading>
                <Text>{props.info.date}</Text>
              </Box>
            </Flex>
            <div>
              <Heading>description</Heading>
              {props.info.description.map((line, index) => {
                return <Text key={index}>{line}</Text>
              })}
            </div>
          </Box>
          </Flex>
      </ModalContent>
    </Modal>
  )
}

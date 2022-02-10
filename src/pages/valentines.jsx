import React from "react"
import styled, { css } from "styled-components"

import menu_decor from "../images/menu_decor.png"
import menu_right from "../images/menu_right.png"
import menu_left from "../images/menu_left.png"
import LayoutEmpty from "../components/layouts/layoutEmpty"
import SEO from "../components/seo"
import {
  Box,
  ExtLink,
  Flex,
  Heading,
  Link,
  Text,
  Title,
} from "../components/basics"

const Valentines = () => (
  <LayoutEmpty>
    <SEO title="Valentine's Day" />
    <StyledTitle>Happy (early) Valentine's Day</StyledTitle>

    <Text>
      I know this is no Wordle and it's a little absurd trying to make any dinner particularly romantic when we already live and eat together all the time but bear with me.
    </Text>

    <Text>
      If there's anything that catches your eye, let's get the ingredients and make it for Sunday/Monday evening. Otherwise, feel free to suggest your own :D
    </Text>

    <MenuBox mt={40}>
      <MenuTitle>appetizers</MenuTitle>

      <Dish>cucumber salad</Dish>
      <DishText>refreshing spicy and sour cucumber salad</DishText>

      <Dish>scallion pancakes</Dish>
      <DishText>savory, flaky, layered pancakes folded with oil and minced scallions</DishText>

      <Dish>tamagoyaki</Dish>
      <DishText>sweetened japanese folded omelette</DishText>

      <Dish>kimchi pancakes</Dish>
      <DishText>kimchi, onions, scallions and more in a batter and fried</DishText>

      <Dish>korean sweet glazed potatoes</Dish>
      <DishText>soy glazed potatoes, crispy exterior and soft inside</DishText>

      <Dish>ddeokbokki</Dish>
      <DishText>crispy and spicy pan-fried rice cakes</DishText>

      <Dish>shrimp croquettes</Dish>
      <DishText>shrimp, potato, onion come together before being covered with panko and deep fried</DishText>
    </MenuBox>

    <MenuBox mains>
      <MenuTitle>mains</MenuTitle>

      <Dish>beef ragu</Dish>
      <DishText>chickpea pasta in a beef and tomato based sauce made with carrots, onions and more</DishText>

      <Dish>chicken katsu sando</Dish>
      <DishText>toasted milk bread, fried chicken, cabbage, caramelized onions, pickles, house sauce</DishText>

      <Dish>cabbage mille-feuille</Dish>
      <DishText>napa cabbage layered with slices of pork, simmered in a flavourful broth</DishText>

      <Dish>you pou mian</Dish>
      <DishText>knife cut noodles, chili flakes, scallions, cilantro, ramen egg</DishText>

      <Dish>zaru soba</Dish>
      <DishText>chilled buckwheat soba noodles served with a soy-sauce based dipping sauce</DishText>

      <Dish>mapo tofu</Dish>
      <DishText>minced beef and cubed tofu simmered in chili bean sauce, served over rice</DishText>

      <Dish>soy-glazed pork belly and eggplant</Dish>
      <DishText>pork belly and eggplant braised and galzed in a soy sauce, gochujang mix</DishText>

      <Dish>teriyaki onigirazu</Dish>
      <DishText>teriyaki salmon/chicken, asparagus, pickled radish, topped with furikake</DishText>
    </MenuBox>

    <MenuBox>
      <MenuTitle>desserts</MenuTitle>

      <Dish>tiramisu</Dish>
      <DishText>lady fingers dipped in coffee, mascarpone and cream filling, dusted with cocoa powder</DishText>

      <Dish>butter mochi</Dish>
      <DishText>chewy, cocounut flavoured butter mochi, with a crispy top</DishText>

      <Dish>pie supreme</Dish>
      <DishText>we get a pie and ice cream</DishText>

      <Dish>fruit bowl</Dish>
      <DishText>mmm fruit</DishText>

      <Dish>banana bread</Dish>
      <DishText>bananas in bread</DishText>

      <Dish>apple crisp</Dish>
      <DishText>crispy apples</DishText>

      <Dish>mochi</Dish>
      <DishText>something with mochi, (strawberry filling? tang yuan? cookies?)</DishText>
    </MenuBox>
  </LayoutEmpty>
)

const StyledTitle = styled(Title)`
  text-align: center;
  font-size: 28px;
`

const MenuTitle = styled.p`
  font-size: 40px;
  font-family: ${props => props.theme.fonts.serif};
  color: ${props => props.theme.colors.black};
  text-align: center;
`

const Dish = styled.p`
  font-size: 18px;
  font-family: ${props => props.theme.fonts.serif};
  color: ${props => props.theme.colors.black};
  text-align: center;
  margin-top: 30px;
  margin-bottom: 12px;
`

const DishText = styled.p`
  font-size: 12px;
  font-family: ${props => props.theme.fonts.mono};
  color: #606060;
  text-align: center;
  margin: auto;
  max-width: 70%;
`

const MenuBox = styled(Box)`
  padding: 40px 0px 60px 0px;
  background-color: #FFF4EA;

  ${props => props.mains && css`
    background-color: #FFF9F3;
  `}
`

export default Valentines

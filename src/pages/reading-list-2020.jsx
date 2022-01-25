import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
// import ReadingWords2020Graph from "../components/graphs/reading-words-2020"
import ReadingGraph from "../components/graphs/reading-graph"

import {
  Box,
  ExtLink,
  Flex,
  OList,
  Text,
  Title,
} from "../components/basics"

export default function ReadingList2020() {
  const books = [
    {title: "Non-Violent Communication", url: "https://www.goodreads.com/book/show/71730.Nonviolent_Communication"},
    {title: "Educated", url: "https://www.goodreads.com/book/show/35133922-educated"},
    {title: "Maybe You Should Talk to Someone", url:"https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone"},
    {title: "The Rosie Result", url: "https://www.goodreads.com/book/show/41018628-the-rosie-result"},
    {title: "Behave", url: "https://www.goodreads.com/book/show/31170723-behave"},
    {title: "Prepared", url: "https://www.goodreads.com/book/show/43422738-prepared"},
    {title: "Nothing to See Here", url: "https://www.goodreads.com/book/show/42519313-nothing-to-see-here"},
    {title: "The Obstacle is the Way", url: "https://www.goodreads.com/book/show/18668059-the-obstacle-is-the-way"},
    {title: "The Testaments", url: "https://www.goodreads.com/book/show/42975172-the-testaments"},
    {title: "Becoming", url: "https://www.goodreads.com/book/show/38746485-becoming"},
    {title: "The Long Way to a Small, Angry Planet (Wayfarers #1)", url: "https://www.goodreads.com/book/show/22733729-the-long-way-to-a-small-angry-planet"},
    {title: "A Closed and Common Orbit (Wayfarers #2)", url: "https://www.goodreads.com/book/show/29475447-a-closed-and-common-orbit"},
    {title: "Record of a Spaceborn Few (Wayfarers #3)", url: "https://www.goodreads.com/book/show/32802595-record-of-a-spaceborn-few"},
    {title: "Blood, Sweat, and Pixels", url: "https://www.goodreads.com/book/show/34376766-blood-sweat-and-pixels"},
    {title: "Salt, Fat, Acid, Heat", url: "https://www.goodreads.com/book/show/30753841-salt-fat-acid-heat"},
    {title: "Outliers", url: "https://www.goodreads.com/book/show/3228917-outliers"},
    {title: "Kitchen Confidential", url: "https://www.goodreads.com/book/show/33313.Kitchen_Confidential"},
    {title: "The Moment of Lift", url: "https://www.goodreads.com/book/show/40776644-the-moment-of-lift"},
    {title: "Player Piano*", url: "https://www.goodreads.com/book/show/9597.Player_Piano"},
    {title: "Mere Christianity", url: "https://www.goodreads.com/book/show/40792344-mere-christianity"},
    {title: "So You Want to Talk About Race", url: "https://www.goodreads.com/book/show/35099718-so-you-want-to-talk-about-race"},
    {title: "Pachinko", url: "https://www.goodreads.com/book/show/34051011-pachinko"},
    {title: "Born a Crime", url: "https://www.goodreads.com/book/show/29780253-born-a-crime"},
    {title: "Dune", url: "https://www.goodreads.com/book/show/44767458-dune"},
    {title: "Strangers in Their Own Land", url: "https://www.goodreads.com/book/show/28695425-strangers-in-their-own-land"},
    {title: "Too Much and Never Enough", url: "https://www.goodreads.com/book/show/54114950-too-much-and-never-enough"},
    {title: "Ivan Ramen", url: "https://www.goodreads.com/book/show/17345273-ivan-ramen"},
    {title: "The Three-Body Problem (Rememberance of Earth's Past #1)", url: "https://www.goodreads.com/book/show/20518872-the-three-body-problem"},
    {title: "The Dark Forest (Rememberance of Earth's Past #2)", url: "https://www.goodreads.com/book/show/23168817-the-dark-forest"},
    {title: "Death's End (Rememberance of Earth's Past #3)", url: "https://www.goodreads.com/book/show/25451264-death-s-end"},
    {title: "Children of Time (Children of Time #1)", url: "https://www.goodreads.com/book/show/25499718-children-of-time"},
    {title: "Children of Ruin (Children of Time #2)", url: "https://www.goodreads.com/book/show/40376072-children-of-ruin"},
    {title: "The Best We Could Do", url: "https://www.goodreads.com/book/show/29936927-the-best-we-could-do"},
    {title: "Growth", url: "https://www.goodreads.com/book/show/44512537-growth"},
    {title: "To Sleep in a Sea of Stars", url: "https://www.goodreads.com/book/show/48829708-to-sleep-in-a-sea-of-stars"},
    {title: "The Fork, the Witch, and the Worm", url: "https://www.goodreads.com/book/show/26152839-the-fork-the-witch-and-the-worm"},
    {title: "The End of Policing", url: "https://www.goodreads.com/book/show/35403039-the-end-of-policing"},
    {title: "The Golden Compass (His Dark Materials #1)", url: "https://www.goodreads.com/book/show/119322.The_Golden_Compass"},
    {title: "The Subtle Knife (His Dark Materials #2)", url: "https://www.goodreads.com/book/show/41637836-the-subtle-knife"},
    {title: "The Amber Spyglass (His Dark Materials #3)", url: "https://www.goodreads.com/book/show/18122.The_Amber_Spyglass"},
    {title: "Life of Pi", url: "https://www.goodreads.com/book/show/4214.Life_of_Pi"},
    {title: "Free Food for Millionaires", url: "https://www.goodreads.com/book/show/40727626-free-food-for-millionaires"},
    {title: "Pumpkinheads", url: "https://www.goodreads.com/book/show/40864790-pumpkinheads"},
    {title: "Breath: The New Science of a Lost Art", url: "https://www.goodreads.com/book/show/48890486-breath"},
    {title: "Breasts and Eggs", url: "https://www.goodreads.com/book/show/50736031-breasts-and-eggs"},
    {title: "The Rise and Fall of Dinosaurs", url: "https://www.goodreads.com/book/show/35820369-the-rise-and-fall-of-the-dinosaurs"},
    {title: "The Martian", url: "https://www.goodreads.com/book/show/18007564-the-martian"},
    {title: "Artemis", url: "https://www.goodreads.com/book/show/34928122-artemis"},
    {title: "Milkman", url: "https://www.goodreads.com/book/show/36047860-milkman"},
    {title: "Recursion", url: "https://www.goodreads.com/book/show/42046112-recursion"},
    {title: "Solutions and Other Problems", url: "https://www.goodreads.com/book/show/51323365-solutions-and-other-problems"},
    {title: "Cloud Atlas", url: "https://www.goodreads.com/book/show/49628.Cloud_Atlas"},
    {title: "The Midnight Library", url: "https://www.goodreads.com/book/show/52578297-the-midnight-library"},
    {title: "The Courage to Be Disliked", url: "https://www.goodreads.com/book/show/43306206-the-courage-to-be-disliked"},
    {title: "Axiom's End", url: "https://www.goodreads.com/book/show/51171377-axiom-s-end"},
    {title: "The Elephant Vanishes", url: "https://www.goodreads.com/book/show/9555.The_Elephant_Vanishs"},
    {title: "When Breath Becomes Air", url: "https://www.goodreads.com/book/show/25899336-when-breath-becomes-air"},
    {title: "The Long Earth", url: "https://www.goodreads.com/book/show/13147230-the-long-earth"},
    {title: "Someone Who Will Love You in All Your Damaged Glory", url: "https://www.goodreads.com/book/show/41949311-someone-who-will-love-you-in-all-your-damaged-glory"},
  ]
  const year = "2020";

  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>{"Reading List "+year}</Title>
      <Text description>{"What I read in "+year}</Text>

      <Flex>
        <Box width={{ _: "100%", widescreen: "100%" }}>
          <ReadingGraph year={year} />
          <OList>
            {books.map((book, i) => {
                return (
                  <li key={i}>
                    <Text>
                      <ExtLink
                        href={book.url}
                        td="none"
                      >
                        {book.title}
                      </ExtLink>
                    </Text>
                  </li>
                )
              })}
          </OList>

          <br />

          <Text>
            * Didn't finish :( simply did not have the motivation to read the rest of it
          </Text>
        </Box>

        {/* <Box display={{ _: "none", widescreen: "block" }} width={{ widescreen: "50%" }}> */}
        {/*   <ReadingWords2020Graph /> */}
        {/* </Box> */}
      </Flex>

    </Layout>
  )
}

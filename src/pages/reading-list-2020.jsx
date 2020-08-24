import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import {
  ExtLink,
  OList,
  Text,
  Title,
} from "../components/basics"

export default function ReadingList2020() {
  var goodreads = [
    "https://www.goodreads.com/book/show/71730.Nonviolent_Communication",
    "https://www.goodreads.com/book/show/35133922-educated",
    "https://www.goodreads.com/book/show/37570546-maybe-you-should-talk-to-someone",
    "https://www.goodreads.com/book/show/41018628-the-rosie-result",
    "https://www.goodreads.com/book/show/31170723-behave",
    "https://www.goodreads.com/book/show/43422738-prepared",
    "https://www.goodreads.com/book/show/42519313-nothing-to-see-here",
    "https://www.goodreads.com/book/show/18668059-the-obstacle-is-the-way",
    "https://www.goodreads.com/book/show/42975172-the-testaments",
    "https://www.goodreads.com/book/show/38746485-becoming",
    "https://www.goodreads.com/book/show/22733729-the-long-way-to-a-small-angry-planet",
    "https://www.goodreads.com/book/show/29475447-a-closed-and-common-orbit",
    "https://www.goodreads.com/book/show/32802595-record-of-a-spaceborn-few",
    "https://www.goodreads.com/book/show/34376766-blood-sweat-and-pixels",
    "https://www.goodreads.com/book/show/30753841-salt-fat-acid-heat",
    "https://www.goodreads.com/book/show/3228917-outliers",
    "https://www.goodreads.com/book/show/33313.Kitchen_Confidential",
    "https://www.goodreads.com/book/show/40776644-the-moment-of-lift",
    "https://www.goodreads.com/book/show/9597.Player_Piano",
    "https://www.goodreads.com/book/show/40792344-mere-christianity",
    "https://www.goodreads.com/book/show/35099718-so-you-want-to-talk-about-race",
    "https://www.goodreads.com/book/show/34051011-pachinko",
    "https://www.goodreads.com/book/show/29780253-born-a-crime",
    "https://www.goodreads.com/book/show/44767458-dune",
    "https://www.goodreads.com/book/show/28695425-strangers-in-their-own-land",
    "https://www.goodreads.com/book/show/54114950-too-much-and-never-enough",
    "https://www.goodreads.com/book/show/17345273-ivan-ramen",
    "https://www.goodreads.com/book/show/20518872-the-three-body-problem",
    "https://www.goodreads.com/book/show/23168817-the-dark-forest",
    "https://www.goodreads.com/book/show/25451264-death-s-end"
  ]
  var titles = [
    "Non-Violent Communication",
    "Educated",
    "Maybe You Should Talk to Someone",
    "The Rosie Result",
    "Behave",
    "Prepared",
    "Nothing to See Here",
    "The Obstacle is the Way",
    "The Testaments",
    "Becoming",
    "The Long Way to a Small, Angry Planet (Wayfarers #1)",
    "A Close and Common Orbit (Wayfarers #2)",
    "Record of a Spaceborn Few (Wayfarers #3)",
    "Blood, Sweat, and Pixels",
    "Salt, Fat, Acid, Heat",
    "Outliers",
    "Kitchen Confidential",
    "Moment of Lift",
    "Player PIano*",
    "Mere Christianity",
    "So You Want to Talk About Race",
    "Pachinko",
    "Born a Crime",
    "Dune",
    "Strangers in Their Own Land",
    "Too Much and Never Enough",
    "Ivan Ramen",
    "The Three-Body Problem (Rememberance of Earth's Past #1)",
    "The Dark Forest (Rememberance of Earth's Past #2)",
    "Death's End (Rememberance of Earth's Past #3)"
  ]
  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>Reading List 2020</Title>
      <Text description>What I read in 2020</Text>

      <OList>
        {
          titles.map((e, i) => {
            return (
              <li key={i}>
                <Text>
                  <ExtLink
                    href={goodreads[i]}
                    td="none"
                  >
                    {e}
                  </ExtLink>
                </Text>
              </li>
            )
          })
        }
      </OList>

      <br />
      <Text>
        * Didn't finish :( simply did not have the motivation to read the rest of it
      </Text>
    </Layout>
  )
}

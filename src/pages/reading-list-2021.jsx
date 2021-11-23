import React from "react"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import Reading2021Graph from "../components/graphs/reading-2021"
// import ReadingWords2020Graph from "../components/graphs/reading-words-2020"

import {
  Box,
  ExtLink,
  Flex,
  OList,
  Text,
  Title,
} from "../components/basics"

export default function ReadingList2021() {
  const books = [
    {title: "The Promised Land", url: "https://www.goodreads.com/book/show/55976344-the-promised-land"},
    {title: "Calypso", url: "https://www.goodreads.com/book/show/38348476-calypso"},
    {title: "Astrophysics for People in a Hurry", url: "https://www.goodreads.com/book/show/32191710-astrophysics-for-people-in-a-hurry"},
    {title: "To the Lighthouse", url: "https://www.goodreads.com/book/show/59716.To_the_Lighthouse"},
    {title: "Less", url: "https://www.goodreads.com/book/show/39927096-less"},
    {title: "Wishful Drinking", url: "https://www.goodreads.com/book/show/4961048-wishful-drinking"},
    {title: "Hitchhiker's Guide to the Galaxy", url: "https://www.goodreads.com/book/show/386162.The_Hitchhiker_s_Guide_to_the_Galaxy"},
    {title: "When", url: "https://www.goodreads.com/book/show/35412097-when"},
    {title: "Behind the Beautiful Forevers", url: "https://www.goodreads.com/book/show/11869272-behind-the-beautiful-forevers"},
    {title: "The Gene", url: "https://www.goodreads.com/book/show/27276428-the-gene"},
    {title: "Eat a Peach", url: "https://www.goodreads.com/book/show/51700803-eat-a-peach"},
    {title: "A Pale View of Hills", url: "https://www.goodreads.com/book/show/28920.A_Pale_View_of_Hills"},
    {title: "The Hate U Give", url: "https://www.goodreads.com/book/show/32075671-the-hate-u-give"},
    {title: "Everything I Never Told You", url: "https://www.goodreads.com/book/show/18693763-everything-i-never-told-you"},
    {title: "The Nickel Boys", url: "https://www.goodreads.com/book/show/42270835-the-nickel-boys"},
    {title: "Ms Ice Sandwich", url: "https://www.goodreads.com/en/book/show/32927264-ms-ice-sandwich"},
    {title: "All The Light We Cannot See", url: "https://www.goodreads.com/book/show/18143977-all-the-light-we-cannot-see"},
    {title: "10% Happier", url: "https://www.goodreads.com/book/show/18505796-10-happier"},
    {title: "Caste", url: "https://www.goodreads.com/en/book/show/51152447-caste"},
    {title: "The Goldfinch", url: "https://www.goodreads.com/book/show/17333223-the-goldfinch"},
    {title: "How To Avoid a Climate Disaster", url: "https://www.goodreads.com/book/show/52275335-how-to-avoid-a-climate-disaster"},
    {title: "Catch-22", url: "https://www.goodreads.com/book/show/168668.Catch_22"},
    {title: "Station Eleven", url: "https://www.goodreads.com/book/show/20170404-station-eleven"},
    {title: "Klara and the Sun", url: "https://www.goodreads.com/book/show/54120408-klara-and-the-sun"},
    {title: "Dark Matter", url: "https://www.goodreads.com/book/show/27833670-dark-matter"},
    {title: "The Orphan Master's Son", url: "https://www.goodreads.com/book/show/11529868-the-orphan-master-s-son"},
    {title: "Detransition Baby", url: "https://www.goodreads.com/book/show/48890225-detransition-baby"},
    {title: "Happiness: Essential Mindfulness Practices", url: "https://www.goodreads.com/book/show/6550421-happiness"},
    {title: "A Visit from the Goon Squad", url: "https://www.goodreads.com/book/show/7331435-a-visit-from-the-goon-squad"},
    {title: "The Song of Achilles", url: "https://www.goodreads.com/book/show/11250317-the-song-of-achilles"},
    {title: "Tinkers", url: "https://www.goodreads.com/book/show/4957350-tinkers"},
    {title: "Project Hail Mary", url: "https://www.goodreads.com/book/show/54493401-project-hail-mary"},
    {title: "Circe", url: "https://www.goodreads.com/book/show/35959740-circe"},
    {title: "Catcher in the Rye", url: "https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye"},
    {title: "Crying in H-Mart", url: "https://www.goodreads.com/book/show/54814676-crying-in-h-mart"},
    {title: "Difficult Conversations", url: "https://www.goodreads.com/book/show/774088.Difficult_Conversations"},
    {title: "The Glass Castle", url: "https://www.goodreads.com/book/show/7445.The_Glass_Castle"},
    {title: "First Person Singular", url: "https://www.goodreads.com/book/show/54614599-first-person-singular"},
    {title: "You'll Like it Here (Everybody Does)", url: "https://www.goodreads.com/book/show/9460533-you-ll-like-it-here"},
    {title: "Uncanny Valley", url: "https://www.goodreads.com/book/show/45186565-uncanny-valley"},
    {title: "Dearly", url: "https://www.goodreads.com/it/book/show/50706476-dearly"},
    {title: "Debt", url: "https://www.goodreads.com/book/show/6617037-debt"},
    {title: "Dear Girls", url: "https://www.goodreads.com/book/show/44600621-dear-girls"},
    {title: "Turtles All The Way Down", url: "https://www.goodreads.com/book/show/35504431-turtles-all-the-way-down"},
    {title: "Conversations With Friends", url: "https://www.goodreads.com/book/show/32187419-conversations-with-friends"},
    {title: "When We Were Orphans", url: "https://www.goodreads.com/book/show/28923.When_We_Were_Orphans"},
    {title: "One Flew Over The Cuckoo's Nest", url: "https://www.goodreads.com/book/show/332613.One_Flew_Over_the_Cuckoo_s_Nest"},
    {title: "Time Travel: A History", url: "https://www.goodreads.com/book/show/28587584-time-travel"},
    {title: "Interior Chinatown", url: "https://www.goodreads.com/book/show/44436221-interior-chinatown"},
    {title: "Writing Tools: 50 Essential Strategies for Every Writer", url: "https://www.goodreads.com/book/show/51750.Writing_Tools"},
    {title: "Ella Minnow Pea: A Novel in Letters", url: "https://www.goodreads.com/book/show/16200.Ella_Minnow_Pea"},
    {title: "A Clockwork Orange", url: "https://www.goodreads.com/book/show/41817486-a-clockwork-orange"},
    {title: "The Seven Husbands of Evelyn Hugo", url: "https://www.goodreads.com/book/show/32620332-the-seven-husbands-of-evelyn-hugo"},
    {title: "The Headspace Guide to Mindfulness & Meditation", url: "https://www.goodreads.com/book/show/27414493-the-headspace-guide-to-meditation-mindfulness"},
    {title: "Alias Grace", url: "https://www.goodreads.com/book/show/72579.Alias_Grace"},
    {title: "They Both Die At The End", url: "https://www.goodreads.com/book/show/33385229-they-both-die-at-the-end"},
    {title: "The Poppy War", url: "https://www.goodreads.com/book/show/35068705-the-poppy-war"},
    {title: "The Dragon Republic", url: "https://www.goodreads.com/book/show/41118857-the-dragon-republic"},
    {title: "The Burning God", url: "https://www.goodreads.com/book/show/45857086-the-burning-god"},
    {title: "Immediate Family", url: "https://www.goodreads.com/book/show/48804965-immediate-family"},
    {title: "Tokyo Ueno Station", url: "https://www.goodreads.com/book/show/43398196-tokyo-ueno-station"},
    {title: "China Room", url: "https://www.goodreads.com/book/show/55994371-china-room"},
    {title: "An Ugly Truth", url: "https://www.goodreads.com/book/show/56470423-an-ugly-truth"},
    {title: "Beautiful World, Where Are You", url: "https://www.goodreads.com/book/show/56597885-beautiful-world-where-are-you"},
    {title: "Great Circle", url: "https://www.goodreads.com/book/show/54976986-great-circle"},
    {title: "Open Water", url: "https://www.goodreads.com/en/book/show/53414230"},
    {title: "How Do You Live", url: "https://www.goodreads.com/book/show/54110592-how-do-you-live"},
    {title: "The Dutch House", url: "https://www.goodreads.com/book/show/44318414-the-dutch-house"},
    // {title: "", url: ""},
  ]
  return (
    <Layout tab="Reading">
      <SEO title="Reading" />
      <Title>Reading List 2021</Title>
      <Text description>What I read in 2021</Text>

      <Flex>
        <Box width={{ _: "100%", widescreen: "100%" }}>
          <Reading2021Graph />
          <OList>
            {
              books.map((book, i) => {
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
              })
            }
          </OList>
        </Box>
      </Flex>

    </Layout>
  )
}

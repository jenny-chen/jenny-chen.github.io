import React from "react"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"

import { Heading, Text, Title } from "../components/basics"

const HidingText = styled(Text)`
  background: black;

  &:hover {
    background: white;
  }
`

export default function Writing() {
  const Lesson13 = [
    {
      question: "子供の時に何ができましたか。何ができませんでした。",
      translation:
        "When you were a child, what could you do? What could you not do?",
      audio: "lesson13-1.m4a",
    },
    {
      question: "百円で何が買えますか。",
      translation: "What can you buy for ¥100?",
      audio: "lesson13-2.m4a",
    },
    {
      question: "どこにいってみたいですか。どうしてですか。",
      translation: "Where do you want to go? Why?",
      audio: "lesson13-3.m4a",
    },
    {
      question: "子供の時、何がしてみたかったですか。",
      translation: "When you were a child, what did you want to try to do?",
      audio: "lesson13-4.m4a",
    },
    {
      question: "今、何がしてみたいですか。",
      translation: "What do you want to try to do now?",
      audio: "lesson13-5.m4a",
    },
    {
      question: "一日に何時間ぐらい勉強しますか。",
      translation: "About how many hours do you study in a day?",
      audio: "lesson13-6.m4a",
    },
    {
      question: "一か月にいくらぐらい使いますか。",
      translation: "About how much do you spend in a month?",
      audio: "lesson13-7.m4a",
    },
  ]
  const Lesson14 = [
    {
      question: "去年の誕生日に何をもらいましたか。",
      translation: "Last year, what did you receive for your birthday?",
      audio: "lesson14-1.m4a",
    },
    {
      question: "家族の誕生日に何をあげましたか。",
      translation: "For your family's birthday, what did you give?",
      audio: "lesson14-2.m4a",
    },
    {
      question: "友達の誕生日に何をあげたいですか。",
      translation: "For your friend's birthday, what do you want to give?",
      audio: "lesson14-3.m4a",
    },
    {
      question:
        "バレンタインデーに何かあげたことがありますか。何をあげましたか。",
      translation:
        "Have you ever given something for Valentine's Day? What did you give?",
      audio: "lesson14-4.m4a",
    },
    {
      question:
        "バレンタインデーに何かもらったことがありますか。何をもらいましたか。",
      translation:
        "Have you ever received something for Valentine's Day? What did you receive?",
      audio: "lesson14-5.m4a",
    },
    {
      question: "あんたの国ではお正月に何かあげますか。誰が誰にあげますか。",
      translation:
        "In your country, do you give something for New Year's? Who gives to who?",
      audio: "lesson14-6.m4a",
    },
    {
      question: "一番うれしかったプレゼントは何ですか。だれにもらいましたか。",
      translation:
        "What was the best present you received? Who gave it to you?",
      audio: "lesson14-7.m4a",
    },
    {
      question:
        "一番うれしくなかったプレゼントは何ですか。誰にもらいましたか。",
      translation:
        "What was the worst present you received? Who gave it to you?",
      audio: "lesson14-8.m4a",
    },
  ]
  const Lesson15 = [
    {
      question: "週末何をしようと思っていますか。",
      translation: "What are you planning to do this weekend?",
      audio: "lesson15-1.m4a",
    },
  ]
  const Lesson16 = [
    {
      question: "今度の母の日/父の日に何をしてあげようと思いますか。",
      translation:
        "What are you planning to do (as a favour) for Mother's/Father's Day?",
      audio: "lesson16-1.m4a",
    },
    {
      question: "子供の時、家族は何をしてくれましたか。",
      translation: "When you were a child, what did your family do for you?",
      audio: "lesson16-2.m4a",
    },
    {
      question: "彼/彼女/パートナーに何をしてもらいたいですか。",
      translation: "What do you want your partner to do for you?",
      audio: "lesson16-3.m4a",
    },
    {
      question: "家族に何をしてもらいたいですか。",
      translation: "What do you want your family to do for you?",
      audio: "lesson16-4.m4a",
    },
    {
      question: "友達が落ち込んでいます。何をしてあげますか。",
      translation:
        "Your friend is feeling down/depressed. What do you do for them?",
      audio: "lesson16-5.m4a",
    },
    {
      question: "病気の時、友達に何をしてもらいたいですか。",
      translation:
        "When you are sick, what do you want your friends to do for you?",
      audio: "lesson16-6.m4a",
    },
  ]
  const Lesson16B = [
    {
      question: "どんな時、学校をサボりますか。",
      translation: "When do you skip school?",
      audio: "lesson16B-1.m4a",
    },
    {
      question: "どんな時、親に電話しますか。",
      translation: "When do you call your parents?",
      audio: "lesson16B-2.m4a",
    },
    {
      question: "どんな時、うれしくなりますか。",
      translation: "When are you happy?",
      audio: "lesson16B-3.m4a",
    },
    {
      question: "どんな時、緊張しますか。",
      translation: "When are you nervous?",
      audio: "lesson16B-4.m4a",
    },
    {
      question: "どんな時、泣きましたか。",
      translation: "When did you cry?",
      audio: "lesson16B-5.m4a",
    },
    {
      question: "どんな時、感動しましたか。",
      translation: "When were you moved?",
      audio: "lesson16B-6.m4a",
    },
  ]

  const Lessons = [
    ["Lesson 13", Lesson13],
    ["Lesson 14", Lesson14],
    ["Lesson 15", Lesson15],
    ["Lesson 16", Lesson16],
    ["Lesson 16B", Lesson16B],
  ]

  const [listLayout, setListLayout] = React.useState(true)
  const [lessonNum, setLessonNum] = React.useState(0)
  const [num, setNum] = React.useState(0)
  const lesson = Lessons[lessonNum][1]

  function changeLesson(e) {
    console.log("change lesson")
    console.log(e.target.value)
    setLessonNum(e.target.value)
    generateNewNum(Lessons[e.target.value][1].length)
  }

  function generateNewNum(len) {
    const newNum = Math.floor(Math.random() * len)
    setNum(newNum)
  }

  return (
    <Layout tab="Japan 201">
      <SEO title="Japan 201" />
      <Title>Japan 201</Title>
      <Text description>Japan 201 Oral Test Practice</Text>

      <button onClick={() => setListLayout(!listLayout)}>
        {listLayout ? "randomizer" : "list"}
      </button>

      {!listLayout ? (
        <>
          <select
            name="lessons"
            id="lessons"
            onBlur={changeLesson}
            onChange={changeLesson}
            value={lessonNum}
          >
            {Lessons.map((lesson, index) => (
              <option key={index} value={index}>
                {lesson[0]}
              </option>
            ))}
          </select>
          <button onClick={() => generateNewNum(lesson.length)}>
            refresh question
          </button>
          <Heading>{Lessons[lessonNum][0]}</Heading>
          <audio
            controls
            autoplay
            src={"/japanAudio/" + lesson[num].audio}
            type="audio/x-m4a"
          ></audio>
          <Text>{lesson[num].question}</Text>
          <Text>Translation: (show on hover)</Text>
          <HidingText>{lesson[num].translation}</HidingText>
        </>
      ) : (
        <>
          {Lessons.map((lesson, index) => (
            <>
              <Heading key={index}>{lesson[0]}</Heading>
              {lesson[1].map((question, index) => (
                <div key={index}>
                  <audio
                    controls
                    src={"/japanAudio/" + question.audio}
                    type="audio/x-m4"
                  ></audio>
                  <Text>{lesson[1][index].question}</Text>
                  <Text>Translation: (show on hover)</Text>
                  <HidingText>{lesson[1][index].translation}</HidingText>
                  <div style={{ height: "20px" }}></div>
                </div>
              ))}
            </>
          ))}
        </>
      )}
    </Layout>
  )
}

import React from "react"
import styled from "styled-components"

import Layout from "../components/layouts/layout"
import SEO from "../components/seo"
import RunningGraph from "../components/graphs/running-graph"
import RunDetail from "../components/running-detail"

import { Box, Title } from "../components/basics"

const SCROLL_THRESHOLD = 80 // accumulated wheel delta before advancing one step

const ContentWrapper = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const GraphArea = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
`

const DetailArea = styled.div`
  padding: 16px 0;
  height: 180px;
  flex-shrink: 0;
`

class RunningPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: -1,
      data: [],
    }
    this.accumulatedDelta = 0
    this.contentRef = React.createRef()
  }

  componentDidMount() {
    if (this.contentRef.current) {
      this.contentRef.current.addEventListener("wheel", this.handleWheel, {
        passive: false,
      })
    }
  }

  componentWillUnmount() {
    if (this.contentRef.current) {
      this.contentRef.current.removeEventListener("wheel", this.handleWheel)
    }
  }

  handleWheel = e => {
    if (this.state.data.length === 0) return

    e.preventDefault()

    this.accumulatedDelta += e.deltaY
    const steps = Math.trunc(this.accumulatedDelta / SCROLL_THRESHOLD)

    if (steps === 0) return

    this.accumulatedDelta -= steps * SCROLL_THRESHOLD

    this.setState(prev => {
      const next = Math.max(-1, Math.min(prev.activeIndex + steps, prev.data.length - 1))
      return next !== prev.activeIndex ? { activeIndex: next } : null
    })
  }

  handleDataLoaded = data => {
    this.setState({ data })
  }

  render() {
    const { activeIndex, data } = this.state
    const activeRun = activeIndex >= 0 && activeIndex < data.length ? data[activeIndex] : null

    return (
      <Layout tab="Running">
        <SEO title="Running" />
        <ContentWrapper ref={this.contentRef}>
          <Box mb={16}>
            <Title>Mountains 2 Beach Marathon block</Title>
          </Box>
          <GraphArea>
            <RunningGraph
              activeIndex={activeIndex}
              onDataLoaded={this.handleDataLoaded}
            />
          </GraphArea>
          <DetailArea>
            <RunDetail run={activeRun} />
          </DetailArea>
        </ContentWrapper>
      </Layout>
    )
  }
}

export default RunningPage

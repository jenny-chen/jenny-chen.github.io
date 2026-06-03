import React, { Component } from "react"
import * as d3 from "d3"
import "./graph-css.css"

const KM_TO_MI = 0.621371

class RunningGraph extends Component {
  constructor(props) {
    super(props)
    this.data = []
    this.drawn = false
  }

  componentDidMount() {
    this.loadData()
    window.addEventListener("resize", this.redraw)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.redraw)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.updatePoints(this.props.activeIndex)
    }
  }

  redraw = () => {
    if (this.data.length > 0) {
      this.drawChart()
      this.updatePoints(this.props.activeIndex)
    }
  }

  loadData() {
    d3.csv("/running/runalyze-running-2026.csv").then(raw => {
      this.data = raw
        .map(d => ({
          date: new Date(+d.time * 1000),
          distance: +d.distance * KM_TO_MI,
          seconds: +d.s,
          pulseAvg: d.pulseAvg ? +d.pulseAvg : null,
          pulseMax: d.pulseMax ? +d.pulseMax : null,
          kcal: d.kcal ? +d.kcal : null,
          elevationUp: d.elevationUp ? +d.elevationUp : null,
          elevationDown: d.elevationDown ? +d.elevationDown : null,
          title: d.title || "",
          routeName: d.routeName || "",
        }))
        .sort((a, b) => a.date - b.date)

      // Defer draw to next frame so flex layout has resolved container height
      requestAnimationFrame(() => {
        this.drawChart()
        this.updatePoints(this.props.activeIndex)
        if (this.props.onDataLoaded) {
          this.props.onDataLoaded(this.data)
        }
      })
    })
  }

  drawChart() {
    const div = d3.select(this.containerRef)
    div.select("svg").remove()

    const height = +div.node().offsetHeight
    const width = +div.node().offsetWidth
    if (width === 0 || height === 0) return

    const margin = { top: 20, right: 20, bottom: 40, left: 50 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const svg = div
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    this.g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)

    // X scale: time
    const dateExtent = d3.extent(this.data, d => d.date)
    // Add padding on both sides
    const dayPad = 3 * 24 * 60 * 60 * 1000
    this.xScale = d3
      .scaleTime()
      .domain([new Date(dateExtent[0] - dayPad), new Date(dateExtent[1].getTime() + dayPad)])
      .range([0, innerWidth])

    // Y scale: miles
    const maxMiles = d3.max(this.data, d => d.distance)
    this.yScale = d3
      .scaleLinear()
      .domain([0, maxMiles * 1.1])
      .range([innerHeight, 0])
      .nice()

    // X axis
    this.g
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(
        d3
          .axisBottom(this.xScale)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%b"))
          .tickSizeOuter(0)
      )

    // Y axis
    const yAxisG = this.g.append("g").call(
      d3
        .axisLeft(this.yScale)
        .ticks(5)
        .tickFormat(d => d + " mi")
    )

    // Week divider lines (between Sunday and Monday, i.e. midnight Monday)
    const [domainStart, domainEnd] = this.xScale.domain()
    const mondays = d3.timeMonday.range(domainStart, domainEnd)
    this.g
      .selectAll("line.week-divider")
      .data(mondays)
      .enter()
      .append("line")
      .attr("class", "week-divider")
      .attr("x1", d => this.xScale(d))
      .attr("x2", d => this.xScale(d))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#ccc")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.5)

    this.drawn = true
  }

  updatePoints(activeIndex) {
    if (!this.drawn || !this.g) return

    const visibleData = activeIndex < 0 ? [] : this.data.slice(0, activeIndex + 1)

    // Join
    const circles = this.g.selectAll("circle.run-point").data(visibleData, (d, i) => i)

    // Enter
    circles
      .enter()
      .append("circle")
      .attr("class", "run-point")
      .attr("cx", d => this.xScale(d.date))
      .attr("cy", d => this.yScale(d.distance))
      .attr("r", 0)
      .style("fill", "#FFD148")
      .style("opacity", 0.5)
      .transition()
      .duration(300)
      .attr("r", 4)

    // Update: highlight active vs past
    this.g
      .selectAll("circle.run-point")
      .data(visibleData, (d, i) => i)
      .transition()
      .duration(200)
      .attr("r", (d, i) => (i === visibleData.length - 1 ? 6 : 3.5))
      .style("fill", (d, i) =>
        i === visibleData.length - 1 ? "#FFD148" : "#FFD148"
      )
      .style("opacity", (d, i) => (i === visibleData.length - 1 ? 1 : 0.35))

    // Exit
    circles
      .exit()
      .transition()
      .duration(200)
      .attr("r", 0)
      .remove()
  }

  render() {
    return (
      <div
        ref={el => (this.containerRef = el)}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    )
  }
}

export default RunningGraph

import React, { Component } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import "./japan.css"

class JapanMap2023 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title_loc: "Japan",
      title_loc_ja: "日本",
      loc: "Japan",
      loc_ja: "日本",
    }
  }

  getLoc = () => {
    return this.state.loc
  }

  componentDidMount() {
    this.drawChart()
    window.addEventListener("resize", this.drawChart.bind(this))
  }

  drawChart = () => {
    const div = d3.select("#japan")
    div.select("svg").remove()

    const height = +div.node().offsetHeight
    const width = +div.node().offsetWidth
    console.log("height: ", height)
    console.log("width: ", width)

    const svg = div.append("svg").attr("width", width).attr("height", height)

    var projection = d3
      .geoMercator()
      .scale(1200)
      .center([137, 37])
      .translate([width / 2, 250])

    var path = d3.geoPath().projection(projection)

    var selected = this.state.title_loc

    const visited = [
      "Tokyo To",
      "Kyoto Fu",
      "Osaka Fu",
      "Nagano Ken",
      "Hokkai Do",
    ]
    const selectedColor = "#FFD148"
    const visitedColor = "#f5d1c6"
    const nonVisitedColor = "white"

    const setLoc = (newLoc, newLocJa) => {
      this.setState({ loc: newLoc, loc_ja: newLocJa })
    }

    const setTitleLoc = (newLoc, newLocJa) => {
      this.setState({ title_loc: newLoc })
      this.setState({ title_loc_ja: newLocJa })
      this.props.setLoc(newLoc)
      selected = this.state.title_loc
    }

    const resetLoc = () => {
      this.setState({
        loc: this.state.title_loc,
        loc_ja: this.state.title_loc_ja,
      })
    }

    d3.json("/json/topojapan.json").then(data => {
      var features = topojson.feature(data, data.objects.japan).features

      svg
        .selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .style("stroke-width", "0.6")
        .style("fill", function (e) {
          if (selected === e.properties.nam) {
            return selectedColor
          } else if (visited.includes(e.properties.nam)) {
            return visitedColor
          } else {
            return nonVisitedColor
          }
        })
        .on("mouseover", function (e) {
          setLoc(e.properties.nam, e.properties.nam_ja)
          if (visited.includes(e.properties.nam)) {
            d3.select(this).style("fill", "#d9bbb2")
          } else {
            d3.select(this).style("fill", "lightgrey")
          }
        })
        .on("mouseout", function (e) {
          if (e.properties.nam === selected) {
            d3.select(this).style("fill", selectedColor)
          } else if (visited.includes(e.properties.nam)) {
            d3.select(this).style("fill", visitedColor)
          } else {
            d3.select(this).style("fill", nonVisitedColor)
          }
          resetLoc()
        })
        .on("click", function (e) {
          if (visited.includes(e.properties.nam)) {
            svg.selectAll("path").style("fill", function (e) {
              if (visited.includes(e.properties.nam)) {
                return visitedColor
              } else {
                return nonVisitedColor
              }
            })
            setTitleLoc(e.properties.nam, e.properties.nam_ja)
            d3.select(this).style("fill", selectedColor)
          }
        })
    })
  }

  render() {
    return (
      <>
        <div id="japan-labels">
          <p id="english-label">{this.state.loc}</p>
          <p id="japanese-label">{this.state.loc_ja}</p>
        </div>
        <div id="japan" className="mapDiv"></div>
      </>
    )
  }
}

export default JapanMap2023

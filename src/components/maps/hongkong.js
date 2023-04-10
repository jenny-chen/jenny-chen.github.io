import React, { Component } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client";
import "./japan.css"

class HongKongMap extends Component {
  constructor(props){
    super(props);
    this.state = {
      title_loc: "Hong Kong",
      title_loc_ch: "香港",
      loc: "Hong Kong",
      loc_ch: "香港",
    };
  }

  getLoc = () => {
    return this.state.loc
  }

  componentDidMount() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart.bind(this));
  }

  drawChart = () => {
    const div = d3.select("#hongkong");
    div.select('svg').remove();

    const height = +div.node().offsetHeight;
    const width = +div.node().offsetWidth;
    console.log("height: ", height)
    console.log("width: ", width)

    const svg = div.append('svg')
      .attr("width", width)
      .attr("height", height);

    var projection = d3.geoMercator()
      .scale(50000)
      .center([114,22])
      .translate([width/3,650])

    var path = d3.geoPath().projection(projection);

    var selected = this.state.title_loc

    const visited = ["Central and Western", "Eastern", "Wan Chai", "Islands", "Southern", "Yau Tsim Mong", "Kowloon City", "Tuen Mun", "Tsuen Wan", "Sham Shui Po"]
    const selectedColor = "#FFD148";
    const visitedColor = "#f5d1c6"
    const nonVisitedColor = "white"

    const setLoc = (newLoc, newLocCh) => {
      this.setState({loc: newLoc, loc_ch: newLocCh})
    }

    const setTitleLoc = (newLoc, newLocCh) => {
      this.setState({title_loc: newLoc})
      this.setState({title_loc_ch: newLocCh})
      this.props.setLoc(newLoc)
      selected = this.state.title_loc
    }

    const resetLoc = () => {
      this.setState({loc: this.state.title_loc, loc_ch: this.state.title_loc_ch})
    }


    d3.json("/json/topohongkong.json").then(data => {
      var features = topojson.feature(data, data.objects.HKG_adm1_1).features

      svg.selectAll("path")
        .data(features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "black")
        .style("stroke-width", "0.6")
        .style("fill", function(e) {
          if (selected === e.properties.NAME_1) {
            return selectedColor
          } else if (visited.includes(e.properties.NAME_1)) {
            return visitedColor
          } else {
            return nonVisitedColor
          }
        })
        .on("mouseover", function(e) {
          setLoc(e.properties.NAME_1, e.properties.NAME_2)
          if (visited.includes(e.properties.NAME_1)) {
            d3.select(this).style("fill", "#d9bbb2")
          } else {
            d3.select(this).style("fill", "lightgrey")
          }
        })
        .on("mouseout", function(e) {
          if (e.properties.NAME_1 === selected) {
            d3.select(this).style("fill", selectedColor)
          } else if (visited.includes(e.properties.NAME_1)) {
            d3.select(this).style("fill", visitedColor)
          } else {
            d3.select(this).style("fill", nonVisitedColor)
          }
          resetLoc()
        })
        .on("click", function(e) {
          if (visited.includes(e.properties.NAME_1)) {
            svg.selectAll("path")
              .style("fill", function(e) {
                if (visited.includes(e.properties.NAME_1)) {
                  return visitedColor
                } else {
                  return nonVisitedColor
                }
              })
            setTitleLoc(e.properties.NAME_1, e.properties.NAME_2)
            d3.select(this).style("fill", selectedColor)
          }
        })
    });

  };

  render() {
    return (
      <>
        <div id="japan-labels">
          <p id="english-label">{this.state.loc}</p>
          <p id="japanese-label">{this.state.loc_ch}</p>
        </div>
        <div id="hongkong" className="mapDiv"></div>
      </>
    )
  }
}

export default HongKongMap

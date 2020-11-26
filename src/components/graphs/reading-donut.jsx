import React, { Component } from "react"
import * as d3 from "d3"
import "./graph-css.css"

class ReadingDonut extends Component {
  componentDidMount() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart.bind(this));
  }

  drawChart() {

  };

  render() {
    return (
      <div id="donut" className="hide-graph graphDiv"></div>
    )
  }
}

export default ReadingDonut

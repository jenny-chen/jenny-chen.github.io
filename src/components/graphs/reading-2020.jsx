import React, { Component } from "react"
import * as d3 from "d3"
import "./graph-css.css"

class Reading2020Graph extends Component {
  componentDidMount() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart.bind(this));
  }
  
  drawChart() {
    const div = d3.select('#scatter');
    div.select('svg').remove();

    const height = +div.node().offsetHeight;
    const width = +div.node().offsetWidth;

    console.log(width)

    const svg = div.append('svg')
      .attr('width', width)
      .attr('height', height);

    const render = data => {

      const margin = {top: 10, right: 20, bottom: 40, left: 30};
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.books)])
        .range([innerHeight, 0])
        .nice();

      const xScale = d3.scalePoint()
        .domain(data.map(d => d.month))
        .range([0, innerWidth]);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // yAxisG
      g.append('g')
        .call(d3.axisLeft(yScale)
          .ticks(7)
          .tickFormat(d3.format('d')));
      
      // xAxisG
      g.append('g')
        .call(d3.axisBottom(xScale)
          .tickSizeOuter(0))
        .attr('transform', `translate(0, ${innerHeight})`);

      // line chart
      const lineGenerator = d3.line()
        .x(d => xScale(d.month))
        .y(d => yScale(d.books));

      g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data));

      // area chart 
      const areaGenerator = d3.area()
        .x(d => xScale(d.month))
        .y0(innerHeight)
        .y1(d => yScale(d.books));

      g.append('path')
        .attr('class', 'area-path')
        .attr('d', areaGenerator(data));

    };

    d3.csv("/data/reading-2020.csv").then(data => {
      data.forEach(d => {
        d.books = +d.books;
      });
      render(data);
    });
  };

  render() {
    return (
      <div id="scatter" className="hide-graph graphDiv"></div>
    )
  }
}

export default Reading2020Graph

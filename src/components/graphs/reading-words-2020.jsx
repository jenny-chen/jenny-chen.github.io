import React, { Component } from "react"
import * as d3 from "d3"
import "./graph-css.css"

class ReadingWords2020Graph extends Component {
  componentDidMount() {
    this.drawChart();
    window.addEventListener("resize", this.drawChart.bind(this));
  }
  
  drawChart() {
    const div = d3.select('#wordsscatter');
    div.select('svg').remove();

    const height = +div.node().offsetHeight;
    const width = +div.node().offsetWidth;

    const svg = div.append('svg')
      .attr('width', width)
      .attr('height', height);

    const render = data => {

      const margin = {top: 10, right: 20, bottom: 40, left: 50};
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const yAxisLabel = '# of words read'

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.words)])
        .range([innerHeight, 0])
        .nice();

      const xScale = d3.scalePoint()
        .domain(data.map(d => d.month))
        .range([0, innerWidth]);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // yAxisG
      const yAxisG = g.append('g')
        .call(d3.axisLeft(yScale)
          .ticks(7)
          .tickFormat(d3.format('.1s')));

      yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('fill', 'black')
        .attr('y', -35)
        .attr('x', -innerHeight / 2)
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle')
        .text(yAxisLabel);
      
      // xAxisG
      g.append('g')
        .call(d3.axisBottom(xScale)
          .tickSizeOuter(0))
        .attr('transform', `translate(0, ${innerHeight})`);

      // line chart
      const lineGenerator = d3.line()
        .x(d => xScale(d.month))
        .y(d => yScale(d.words));

      g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data));

      // area chart 
      const areaGenerator = d3.area()
        .x(d => xScale(d.month))
        .y0(innerHeight)
        .y1(d => yScale(d.words));

      g.append('path')
        .attr('class', 'area-path')
        .attr('d', areaGenerator(data));

    };

    d3.csv("/data/reading-words-2020.csv").then(data => {
      data.forEach(d => {
        d.words = +d.words;
      });
      render(data);
    });
  };

  render() {
    return (
      <div id="wordsscatter" className="graphDiv"></div>
    )
  }
}

export default ReadingWords2020Graph

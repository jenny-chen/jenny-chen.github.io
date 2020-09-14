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

    const svg = div.append('svg')
      .attr('width', width)
      .attr('height', height);

    const render = data => {

      const margin = {top: 10, right: 20, bottom: 40, left: 50};
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const yAxisLabel = '# of books read'

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
      const yAxisG = g.append('g')
        .call(d3.axisLeft(yScale)
          .ticks(7)
          .tickFormat(d3.format('d')));

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

      // interactive label stuff
      const focus = g.append('circle')
          .style("fill", "steelblue")
          .attr("stroke", "steelblue")
          .attr('r', 4)
          .style("opacity", 0)

      const focusText = g.append('text')
          .style("opacity", 0)
          .attr("text-anchor", "left")
          .attr("alignment-baseline", "middle")

      g.append('rect')
        .attr('class', 'some-rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

      function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity", 1)
      }

      function mousemove() {
        var x0 = d3.mouse(this)[0];
        var domain = xScale.domain();
        var range = xScale.range();
        var rangePoints = d3.range(range[0], range[1]+15, xScale.step())
        var i = (d3.bisect(rangePoints, x0) - 1) < 0 ? 0 : d3.bisect(rangePoints, x0) - 1
        var mouseMonth = domain[d3.bisect(rangePoints, x0) - 1];

        var yDomain = yScale.domain();
        var yRange = yScale.range();
        var yRangePoints = d3.range(yRange[0], yRange[1], -(yRange[0]/yDomain[1]))

        var selectedData = data[i]
        focus
          .attr("cx", rangePoints[i])
          .attr("cy", yRangePoints[selectedData.books])
        focusText
          .html(`${mouseMonth} - ${selectedData.books} ${selectedData.books > 1 ? "books" : "book"}`)
          .attr("x", i >= domain.length-2 ? rangePoints[i]-140: rangePoints[i]+15)
          .attr("y", yRangePoints[selectedData.books])
      }

      function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
      }

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

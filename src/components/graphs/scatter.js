const div = d3.select('#scatter');

function drawChart() {

  const height = +div.node().offsetHeight;
  const width = +div.node().offsetWidth;

  console.log('width: ', width);
  console.log('height: ', height);

  div.select('svg').remove();

  const svg = div.append('svg')
    .attr('width', width)
    .attr('height', height);

  const render = data => {

    const yValue = d => d.books;
    const xValue = d => d.month;
    const margin = {top: 10, right: 20, bottom: 40, left: 30};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, yValue)])
      .range([innerHeight, 0])
      .nice();

    const xScale = d3.scalePoint()
      .domain(data.map(xValue))
      .range([0, innerWidth]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const yAxisG = g.append('g')
      .call(d3.axisLeft(yScale)
        .ticks(7)
        .tickFormat(d3.format('d')));
    
    const xAxisG = g.append('g')
      .call(d3.axisBottom(xScale)
        .tickSizeOuter(0))
      .attr('transform', `translate(0, ${innerHeight})`);


    // line chart
    const lineGenerator = d3.line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(yValue(d)));

    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator(data));

    // area chart 
    const areaGenerator = d3.area()
      .x(d => xScale(xValue(d)))
      .y0(innerHeight)
      .y1(d => yScale(yValue(d)));

    g.append('path')
      .attr('class', 'area-path')
      .attr('d', areaGenerator(data));

  };

  d3.csv('../data/books2020d3.csv').then(data => {
    data.forEach(d => {
      d.books = +d.books;
    });
    render(data);
  });
};

drawChart();

window.addEventListener('resize', drawChart);

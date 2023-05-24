<script>
function drawBubbleChart(data: CountryStats[]) {
  // Set the dimensions and margins of the graph
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // Create an SVG element and append it to the DOM
  const svg = d3
    .select('#bubbleChart')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  //@ts-ignore
  const x = d3.scaleLinear().domain([0, d3.max(data, d => d.gdpPerCapita)]).range([0, width]);
  //@ts-ignore
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.lifeExpectancy)]).range([height, 0]);
  //@ts-ignore
  const radius = d3.scaleSqrt().domain([0, d3.max(data, d => d.population)]).range([0, 40]);

  // Add dots
  svg
    .selectAll('dot')
    .data(data)
    .enter()
    .append('circle')
  //@ts-ignore
      .attr('cx', d => x(d.gdpPerCapita))
  //@ts-ignore
      .attr('cy', d => y(d.lifeExpectancy))
  //@ts-ignore
      .attr('r', d => radius(d.population))
      .style('fill', '#69b3a2')
      .style('opacity', '0.7')
      .attr('stroke', 'black');
}
</script>


<template>
    <div id="bubbleChart" class="chart"></div>
</template>
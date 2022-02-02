/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const svg = d3.select("#chart-area").append("svg")
  .attr("width", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
  .attr("height", WIDTH + MARGIN.LEFT + MARGIN.BOTTOM);

d3.json("data/buildings.json").then(data => {
  data.forEach(d => {
    d.height = Number(d.height)
  })

  const rects = svg.selectAll("rect")
    .data(data)

  rects.enter().append("rect")
    .attr("y", 0)
    .attr("x", (d, i) => (i * 60))
    .attr("width", 40)
    .attr("height", d => d.height)
    .attr("fill", "grey")
})
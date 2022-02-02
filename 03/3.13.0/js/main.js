/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const filePath = "../data/revenues.csv";
const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

//X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", WIDTH / 2)
    .attr("y", HEIGHT + 75)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Month")

// Legend
g.append("text")
    .attr("class", "legend")
    .attr("x", WIDTH - 100)
    .attr("y", HEIGHT + 50)
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .text("Blue is revenue")
g.append("text")
    .attr("class", "legend")
    .attr("x", WIDTH - 100)
    .attr("y", HEIGHT + 70)
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .text("Red is profit")

//Y label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (HEIGHT / 2))
    .attr("y", -80)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Dollars")


const data = d3.csv(filePath).then(data => {

    data.forEach(d => {
        d.revenue = Number(d.revenue),
        d.profit = Number(d.profit)
    })

    const x = d3.scaleBand()
        .domain(data.map(d => d.month))
        .range([0, WIDTH])
        .paddingInner(0.3)
        .paddingOuter(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.revenue)])
        .range([HEIGHT, 0]);

    const xAxisCall = d3.axisBottom(x);
    //Add axis
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${HEIGHT})`)
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)")

    const yAxisCall = d3.axisLeft(y).ticks(8).tickFormat(d => formatter.format(d));
    // Add axis
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    console.log(data)

    const bars = g.selectAll("rect").data(data);

    bars.enter().append("rect")
        .attr("y", d => y(d.revenue))
        .attr("x", (d) => x(d.month))
        .attr("width", x.bandwidth)
        .attr("height", d => HEIGHT - y(d.revenue))
        .attr("fill", "blue");

    bars.enter().append("rect")
        .attr("y", d => y(d.profit))
        .attr("x", (d) => x(d.month))
        .attr("width", x.bandwidth)
        .attr("height", d => HEIGHT - y(d.profit))
        .attr("fill", "red");

});




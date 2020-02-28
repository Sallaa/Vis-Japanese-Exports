const svg = d3.select("#vis")
    .append('svg')
    .attr("id", "chart1")
    .attr("width", "800")
    .attr("height", "500");

const height = svg.attr("height");
const width = svg.attr("width");
const margins = {
    "top": 30,
    "right": 30,
    "bottom": 30,
    "left": 30
};

const chartWidth = width - margins.right - margins.left;
const chartHeight = height - margins.top - margins.bottom;

d3.json("").then((data) => {


}, (error) => {
    console.log(error);
});
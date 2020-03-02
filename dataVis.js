const svg = d3.select("#vis")
    .append('svg')
    .attr("id", "chart1")
    .attr("width", "960")
    .attr("height", "500");

const height = svg.attr("height");
const width = svg.attr("width");

svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr('fill', '#1c1e20');

var projection = d3.geoMercator()
    .center([0, 20])
    .scale(150);

var path = d3.geoPath()
    .projection(projection);

const mapPath = svg.append('g')
    .attr('class', 'mapPath');

//map and color scale
var trade = d3.map();
let colorScale = d3.scaleSequential(d3.interpolateReds)
    .domain([0, 10000]);

var promises = [
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
    d3.csv('dataset/ds_2000_exports_mc_country.csv', function (d) {

        trade.set(d.country, +d.value);
    })
];

Promise.all(promises).then(ready);

function ready([data]) {

    // convert topojson to geo data
    var countries = topojson.feature(data, data.objects.countries).features;
    console.log(countries);

    // // create path
    d3.json("dataset/world.topojson").then(function (data) {
        mapPath.selectAll("path")
            .data(countries)
            .enter()
            .append("path")
            .style("stroke-width", "1")
            .style("stroke", "#1c1e20")
            .attr("d", path)

            // set colors for the countries
            .attr("fill", function (d) {
                d.total = trade.get(d.properties.name) || 0;

                return colorScale(d.total);
            });
    });
}


const svg2 = d3.select("#vis2")
    .append('svg')
    .attr("id", "chart2")
    .attr("width", "960")
    .attr("height", "500");

const height2 = svg2.attr("height");
const width2 = svg2.attr("width");

svg2.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr('fill', '#1c1e20');

const mapPath2 = svg2.append('g')
    .attr('class', 'mapPath');

//map and color scale
let trade2 = d3.map();

let promises2 = [
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
    d3.csv('dataset/ds_2015_exports_mc_country.csv', function (d) {

        trade2.set(d.country, +d.value);
    })
];

Promise.all(promises2).then(ready2);

function ready2([data]) {

    // convert topojson to geo data
    var countries = topojson.feature(data, data.objects.countries).features;

    // // create path
    d3.json("dataset/world.topojson").then(function (data) {
        mapPath2.selectAll("path")
            .data(countries)
            .enter()
            .append("path")
            .style("stroke-width", "1")
            .style("stroke", "#1c1e20")
            .attr("d", path)

            // set colors for the countries
            .attr("fill", function (d) {
                d.total = trade2.get(d.properties.name) || 0;

                //debug
                // console.log(trade);
                // console.log(d.properties.name);

                return colorScale(d.total);
            });
    });
}
const svg = d3.select("#vis")
    .append('svg')
    .attr("id", "chart1")
    .attr("width", "960")
    .attr("height", "500")
    .style("-webkit-filter", "drop-shadow( 0px 10px 1rem #1c1e20)")
    .style("filter", "drop-shadow( 0px 10px 1rem #1c1e20)");

const height = svg.attr("height");
const width = svg.attr("width");

svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr('fill', '#1c1e20');


// https://www.d3-graph-gallery.com/graph/choropleth_basic.html for choropleth example
let projection = d3.geoMercator()
    .center([0, 20])
    .scale(150);

let path = d3.geoPath()
    .projection(projection);

const mapPath = svg.append('g')
    .attr('class', 'mapPath');

//map and color scale (from d3 documentation)
let trade = d3.map();
let colorScale1 = d3.scaleSequential(d3.interpolateReds)
    .domain([0, 2000000000]);

//draw legend
const legendTitle = svg.append('text')
    .attr("x", "10")
    .attr("y", (height - 105))
    .attr('dominant-baseline', "hanging")
    .text("Value in Yen ($1 ≃ ¥108)")
    .attr('fill', "white");

const legendSquare1 = svg.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height - 80))
    .attr('fill', colorScale1(0));

const legend1 = svg.append('text')
    .attr("x", "30")
    .attr("y", (height - 83))
    .attr('dominant-baseline', "hanging")
    .text("0")
    .attr('fill', "white");

const legendSquare2 = svg.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height - 60))
    .attr('fill', colorScale1(500000000));

const legend2 = svg.append('text')
    .attr("x", "30")
    .attr("y", (height - 63))
    .attr('dominant-baseline', "hanging")
    .text("500 Millions")
    .attr('fill', "white");

const legendSquare3 = svg.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height - 40))
    .attr('fill', colorScale1(1500000000));

const legend3 = svg.append('text')
    .attr("x", "30")
    .attr("y", (height - 43))
    .attr('dominant-baseline', "hanging")
    .text("1,5 Billion")
    .attr('fill', "white");

const legendSquare4 = svg.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height - 20))
    .attr('fill', colorScale1(2000000000));

const legend4 = svg.append('text')
    .attr("x", "30")
    .attr("y", (height - 23))
    .attr('dominant-baseline', "hanging")
    .text("2 Billions or more")
    .attr('fill', "white");


// Promise structure from https://bl.ocks.org/adamjanes/6cf85a4fd79e122695ebde7d41fe327f
let promises = [
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
    d3.csv('dataset/ds_1988_exports_country.csv', function (d) {

        trade.set(d.country, +d.value);
    })
];

Promise.all(promises).then(ready);

function ready([data]) {

    // convert topojson to geo data
    let countries = topojson.feature(data, data.objects.countries).features;
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

                return colorScale1(d.total);
            });
    });
}


const svg2 = d3.select("#vis2")
    .append('svg')
    .attr("id", "chart2")
    .attr("width", "960")
    .attr("height", "500")
    .style("-webkit-filter", "drop-shadow( 0px 10px 1rem #1c1e20)")
    .style("filter", "drop-shadow( 0px 10px 1rem #1c1e20)");


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

let colorScale2 = d3.scaleSequential(d3.interpolateReds)
    .domain([0, 2000000000]);

//draw legend
const legendTitle_2 = svg2.append('text')
    .attr("x", "10")
    .attr("y", (height2 - 105))
    .attr('dominant-baseline', "hanging")
    .text("Value in Yen ($1 ≃ ¥108)")
    .attr('fill', "white");

const legendSquare1_2 = svg2.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height2 - 80))
    .attr('fill', colorScale2(0));

const legend1_2 = svg2.append('text')
    .attr("x", "30")
    .attr("y", (height2 - 83))
    .attr('dominant-baseline', "hanging")
    .text("0")
    .attr('fill', "white");

const legendSquare2_2 = svg2.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height2 - 60))
    .attr('fill', colorScale2(500000000));

const legend2_2 = svg2.append('text')
    .attr("x", "30")
    .attr("y", (height2 - 63))
    .attr('dominant-baseline', "hanging")
    .text("500 Millions")
    .attr('fill', "white");

const legendSquare3_2 = svg2.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height2 - 40))
    .attr('fill', colorScale2(1500000000));

const legend3_2 = svg2.append('text')
    .attr("x", "30")
    .attr("y", (height2 - 43))
    .attr('dominant-baseline', "hanging")
    .text("1,5 Billion")
    .attr('fill', "white");

const legendSquare4_2 = svg2.append('rect')
    .attr('width', "10")
    .attr('height', "10")
    .attr("x", "10")
    .attr("y", (height2 - 20))
    .attr('fill', colorScale2(2000000000));

const legend4_2 = svg2.append('text')
    .attr("x", "30")
    .attr("y", (height2 - 23))
    .attr('dominant-baseline', "hanging")
    .text("2 Billions or more")
    .attr('fill', "white");

let promises2 = [
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
    d3.csv('dataset/ds_2015_exports_country.csv', function (d) {

        trade2.set(d.country, +d.value);
    })
];

Promise.all(promises2).then(ready2);

function ready2([data]) {

    // convert topojson to geo data
    let countries = topojson.feature(data, data.objects.countries).features;

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

                return colorScale2(d.total);
            });
    });
}
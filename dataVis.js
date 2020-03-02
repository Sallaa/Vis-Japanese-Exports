const svg = d3.select("#vis")
    .append('svg')
    .attr("id", "chart1")
    .attr("width", "960")
    .attr("height", "500");

const height = svg.attr("height");
const width = svg.attr("width");

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
        console.log(d['country']);
        
        trade.set(d.country, +d.value);
    })
];

Promise.all(promises).then(ready);

function ready([data]) {
    console.log(data);

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
            .style("stroke", "white")
            .attr("d", path)

            // set colors for the countries
            .attr("fill", function (d) {
                d.total = trade.get(d.properties.name) || 0;
                // console.log(trade);
                console.log(d.properties.name);

                return colorScale(d.total);
            });
    });
}
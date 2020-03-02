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

var promises = [
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json')
];

Promise.all(promises).then(ready);

function ready([data]){
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
            .style("stroke", "red")
            .attr("d", path);
    });
}
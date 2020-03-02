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

// Data and color scale
var trade = d3.map();
var colorScale = d3.scaleThreshold()
    .domain([0, 2071, 3000, 4000, 5000])
    .range(d3.schemeReds[5]);

var promises = [
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json'),
    d3.csv('dataset/ds_2000_exports_mc_country.csv', function (d) { trade.set(d.country, + d.value); })
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
            .style("stroke", "white")
            .attr("d", path)
        
        // set colors for the countries
            .attr("fill", function (d) {
                d.total = trade.get(d.country) || 0;
                // console.log(trade);
                console.log(d.total);
                
                return colorScale(d.total);
            });
    });
}
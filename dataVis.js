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

const countryCodes = getCountryCodes();

const labels = getLabels();

//countryNumber should be a string
function findCountryName(c, countryNumber) {
    for (let index = 0; index < c.length; index++) {
        if (c[index].Country == countryNumber)
            return c[index].Country_name;
    }
    return undefined;
}

//labelNumber should be strings
function getLabelName(l, labelNumber) {
    for (let index = 0; index < l.length; index++) {
        if (l[index].hs2 == labelNumber)
            return l[index].hs2_name;
    }
    return undefined;
}

function getCountryCodes() {
    d3.csv("dataset/country_eng-2.csv").then((data) => {
        return data;

    }, (error) => {
        console.log(error);
    });
}

function getLabels() {
    d3.csv("dataset/hs2_eng-2.csv").then((data) => {
        return data;

    }, (error) => {
        console.log(error);
    });
}
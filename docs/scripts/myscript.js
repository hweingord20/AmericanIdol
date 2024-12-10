// Define the dimensions of the heatmap
const margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

// Append an SVG element to the 'plot' div
const svg = d3.select("#plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Embed the JSON data directly
const viewershipData = [
    { "season": 1.0, "average_viewers_in_millions": 11.91 },
    { "season": 2.0, "average_viewers_in_millions": 21.3 },
    { "season": 3.0, "average_viewers_in_millions": 23.53 },
    { "season": 4.0, "average_viewers_in_millions": 25.98 },
    { "season": 5.0, "average_viewers_in_millions": 29.46 },
    { "season": 6.0, "average_viewers_in_millions": 28.94 },
    { "season": 7.0, "average_viewers_in_millions": 26.19 },
    { "season": 8.0, "average_viewers_in_millions": 24.59 },
    { "season": 9.0, "average_viewers_in_millions": 21.99 },
    { "season": 10.0, "average_viewers_in_millions": 22.75 },
    { "season": 11.0, "average_viewers_in_millions": 17.2 },
    { "season": 12.0, "average_viewers_in_millions": 13.07 },
    { "season": 13.0, "average_viewers_in_millions": 9.79 },
    { "season": 15.0, "average_viewers_in_millions": 9.09 },
    { "season": 16.0, "average_viewers_in_millions": 7.88 },
    { "season": 17.0, "average_viewers_in_millions": 7.17 },
    { "season": 18.0, "average_viewers_in_millions": 6.85 }
];

const judgesData = [
    "Paula Abdul, Simon Cowell, Randy Jackson",
    "Paula Abdul, Simon Cowell, Randy Jackson",
    "Paula Abdul, Simon Cowell, Randy Jackson",
    "Paula Abdul, Simon Cowell, Randy Jackson",
    "Paula Abdul, Simon Cowell, Randy Jackson",
    "Paula Abdul, Simon Cowell, Randy Jackson",
    "Paula Abdul, Simon Cowell, Randy Jackson",
    "Paula Abdul, Simon Cowell, Kara DioGuardi, Randy Jackson",
    "Simon Cowell, Ellen DeGeneres, Kara DioGuardi, Randy Jackson",
    "Randy Jackson, Jennifer Lopez, Steven Tyler",
    "Randy Jackson, Jennifer Lopez, Steven Tyler",
    "Randy Jackson, Mariah Carey, Nicki Minaj, Keith Urban",
    "Harry Connick Jr., Jennifer Lopez, Keith Urban",
    "Harry Connick Jr., Jennifer Lopez, Keith Urban",
    "Harry Connick Jr., Jennifer Lopez, Keith Urban",
    "Katy Perry, Luke Bryan, Lionel Richie",
    "Katy Perry, Luke Bryan, Lionel Richie",
    "Katy Perry, Luke Bryan, Lionel Richie"
];

// Process and structure the data
const seasons = viewershipData.map(d => d.season);
const averageViewers = viewershipData.map(d => d.average_viewers_in_millions);

// Create the color scale for the heatmap (viewership)
const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
    .domain([d3.min(averageViewers), d3.max(averageViewers)]);

// Create a scale for the x and y axis
const xScale = d3.scaleBand()
    .domain(seasons)
    .range([0, width])
    .padding(0.05);

const yScale = d3.scaleBand()
    .domain(["Average Viewership"])
    .range([0, height])
    .padding(0.05);

// Append the x-axis labels (seasons)
svg.append("g")
    .selectAll(".x-axis")
    .data(seasons)
    .enter()
    .append("text")
    .attr("x", d => xScale(d) + xScale.bandwidth() / 2)
    .attr("y", height)
    .attr("text-anchor", "middle")
    .text(d => d)
    .style("font-size", "12px")
    .style("fill", "black");

// Append the heatmap cells
svg.selectAll(".cell")
    .data(seasons)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d))
    .attr("y", yScale("Average Viewership"))
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .attr("fill", d => colorScale(averageViewers[seasons.indexOf(d)]))
    .attr("stroke", "white")
    .on("mouseover", function(event, d) {
        // Show tooltip on hover
        d3.select("#tooltip")
            .style("opacity", 1)
            .html(`<strong>Season ${d}</strong><br>Average Viewers: ${averageViewers[seasons.indexOf(d)]} million<br>Judges: ${judgesData[seasons.indexOf(d)]}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function() {
        // Hide tooltip when mouse leaves
        d3.select("#tooltip").style("opacity", 0);
    });

// Create a tooltip div
d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("position", "absolute")
    .style("background-color", "rgba(0, 0, 0, 0.7)")
    .style("color", "white")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("opacity", 0);

// Title
svg.append("text")
    .attr("x", width / 2)
    .attr("y", -5)
    .style("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Average Viewership per Season");





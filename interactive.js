

// treemap.js


// Function to initialize the treemap
function initializeTreemap() {
  // Add a div for the treemap in the body
  const div = document.createElement('div');
  div.setAttribute("id", "treemap");
  document.body.appendChild(div);


  // Set up margins, width, and height
  const margin = {top: 40, right: 10, bottom: 10, left: 10};
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;


  // Create an SVG container for the treemap
  const svg = d3.select("#treemap").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // Create the treemap layout
  const treemap = d3.treemap()
    .size([width, height])
    .padding(1);


  // Load the data (JSON file)
  d3.json("american_idol_seasons.json").then(function(data) {
    // Process the data
    treemap(data);


    // Create the rectangles for each episode
    const episodes = svg.selectAll(".node")
      .data(data.children)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });


    episodes.append("rect")
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .style("fill", function(d) { return d.data.panelColor; });


    // Add tooltips with the episode details
    episodes.append("title")
      .text(function(d) {
        return "Season: " + d.data.season + "\nEpisode: " + d.data.episode + "\nViewers: " + d.data.viewers + " million";
      });
  });
}


// Initialize the treemap once the page is loaded
window.onload = initializeTreemap;

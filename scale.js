var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

console.log("hi")
var color_change = false;


var g = svg.append("g")
 
var color = d3.scaleThreshold()
        .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
        .range(d3.schemeOrRd[9]);

var x = d3.scaleSqrt()
        .domain([0, 4500])
        .rangeRound([440, 950]);
draw()

function draw(){
console.log("here")
g.selectAll("rect")
  .data(color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    }))
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return color(d[0]); });

g.append("text")
    .attr("class", "caption")
    .attr("x", x.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Population per square mile");
g.call(d3.axisBottom(x)
    .tickSize(13)
    .tickValues(color.domain()))
  .select(".domain")
    .remove();
}


function start(){
    console.log(color_change)
    if (color_change == true){
        color = d3.scaleThreshold()
        .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
        .range(d3.schemeOrRd[9]);

        x = d3.scaleSqrt()
        .domain([0, 4500])
        .rangeRound([440, 950]);
        
        color_change = false
        console.log("hiiii")
    }else{
        color = d3.scaleThreshold()
        .domain([1, 5, 10, 15, 30, 50, 200, 500])
        .range(d3.schemeOrRd[9]);
    
        x = d3.scaleSqrt()
        .domain([0, 500])
        .rangeRound([440, 950]);
        color_change = true
        console.log(color_change)
    }
    
    g.append("rect").attr("width", 600).attr("height", 50).attr("x", 400).attr("y", 0).attr("fill", "white");
    draw()
}
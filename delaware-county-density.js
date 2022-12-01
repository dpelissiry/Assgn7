//var margin = {top: 10, right: 40, bottom: 150, left: 50},
//    width = 760 - margin.left - margin.right,
//    height = 500 - margin.top - margin.bottom;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var sim = false;
var tog = true;

if (sim == true){
    var color = d3.scaleThreshold()
        .domain([1, 5, 10, 15, 30, 50, 200, 500])
        .range(d3.schemeOrRd[9]);
}else{
    var color = d3.scaleThreshold()
    .domain([1, 10, 50, 200, 500, 1000, 2000, 4000])
    .range(d3.schemeOrRd[9]);
}

var projection = d3.geoAlbers()
    //.center([-75.3,39.08])
    //.parallels([38.4,39.7])
    .scale(3900)
    .translate([-350, 300]);

var path = d3.geoPath()
    .projection(projection);



var g = svg.append("g")

var rateById = d3.map().set(1, 12).set(3,9).set(5,10);//d3.map();


var tooltip = d3.select("body").append("div")
    .attr("class", "mapTooltip")
    .style("opacity", 0);

d3.queue()
    .defer(d3.json, "de-topo.json")
   // .defer(d3.csv, "delaware-pop-density.csv", function (d) { rateById.set(d.rate, d.id)})
    .await(ready);
function ready(error, topology){
    console.log(rateById)
  g.selectAll("path")
      .data(topology.features)
      .enter()
      .append("path")
      .attr("fill", function(d) {console.log(rateById.get(parseInt(d.properties.COUNTY)));return color(rateById.get(parseInt(d.properties.COUNTY))); })
      .attr("d", path)
      .on("mouseover", function(d){
                            tooltip.style("opacity", 1)
                                    .style("left", (d3.event.pageX + 10) + "px")
                                    .style("top", (d3.event.pageY - 20) + "px");
                            tooltip.html(d.properties.NAME + "<br>" + "Pop Density: " );//+ rateById.get(parseInt(d.properties.COUNTY)));
                        }
            )
        .on("mouseout", function(d) {tooltip.style("opacity", 0);});;
    
}

function startstop(){
    if (sim == true){
        sim = false
    }else{
        sim = true
    }
    console.log(sim)
}
function toggle(){
    if (tog == true){
        tog = false
    }else{
        tog = true
    }
}


//
//function ready(error, us) {
//  if (error) throw error;
//
//  svg.append("g")
//      .attr("class", "counties")
//    .selectAll("path")
//      .data(topojson.feature(us, us.objects.counties).features)
//    .enter().append("path")
//      .attr("class", function(d) { return quantize(rateById.get(d.id)); })
//      .attr("d", path);
//
//  svg.append("path")
//      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
//      .attr("class", "states")
//      .attr("d", path);
//}

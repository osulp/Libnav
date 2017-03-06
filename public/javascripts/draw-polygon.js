/**
 * Project:
 * File: render-map
 * Author: Nathan Healea, Matthew Zakrevsky
 * Created: 1/16/17
 */


/*function loadMap(id) {
 var map = '/public/images/floor-' + id + '.svg';
 d3.xml(map, function (error, xml) {
 if (error) throw error;
 $('#map-wrapper').append(xml.documentElement);
 });
 }  */

var data;
var count;
var pointArray = [];
var result = [];
/*window.onload = function () {
 var id = 1;
 var map = '/public/images/floor-' + id + '.svg';
 var svg = d3.xml(map, function (error, xml) {
 if (error) throw error;
 $('#map-wrapper').append(xml.documentElement);
 });

 //var a = document.getElementById("#map-wrapper");
 var svgDoc;
 // var svgItem = svgDoc.getElementById("Background");
 //var mainMapSVG = d3.select;
 /!*  var a = document.getElementById("map-wrapper");
 console.log(a);
 var svgDoc = a.contentDocument;
 console.log(svgDoc);
 var svgItem = svgDoc.getElementById("Background");
 var svg = d3.select(svgItem);*!/
 /!*  var a = document.getElementById("#map-wrapper");
 var svgDoc = a.contentDocument;
 var svgChildren = svgDoc.childNodes;
 //var svgItem = svgChildren[2];*!/

 //var mainMapSVG = d3.select(svgItem.children[1]);

 svg.append("#polyLayer");

 getPoints(function (result) {
 renderPolygons(svgDoc, result);
 });

 document.getElementById('btn-draw').onclick = drawByButton(svgDoc);
 selectByShape(mainMapSVG)

 };*/

function renderPolygons(svg, data) {
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);




        svg
            .append("polygon")
            .attr("class", "data-poly")
            .attr("points", data)
            .style("fill", "0cff00")
            .style("stroke", "0cff00")
            .style("opacity", 1)
            .on("mouseover", function(){
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("Hello World")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
              div.transition()
                .duration(500)
                .style("opacity", 0);
            });

            var results = getTags("1" ,function(result){
                console.log(result);
            })
            

}


function selectByShape(mainMapSVG) {

    //select rectangles
    var rects = mainMapSVG.selectAll("rect");
   // rects.attributes.getNamedItem("fill").value = "white";

    //give rectangles fill
    _.times(rects._groups[0].length, function (g) {

        rects._groups[0][g].attributes.getNamedItem("fill").value = "white";

    });

    rects.on("mouseenter", function () {
        this.attributes.getNamedItem("fill").value = "lightblue";
    });

    rects.on("mouseleave", function () {
        this.attributes.getNamedItem("fill").value = "white";
    });


    //get data on click
    rects.on("click", function () {
        data = {
            "x": this.attributes.getNamedItem("x").value,
            "y": this.attributes.getNamedItem("y").value,
            "width": this.attributes.getNamedItem("width").value,
            "height": this.attributes.getNamedItem("height").value
        }
        console.log(data);
        /* var x = this.attributes.getNamedItem("x").value;
         var y = this.attributes.getNamedItem("y").value;
         var rectW = this.attributes.getNamedItem("width").value;
         var rectH = this.attributes.getNamedItem("height").value;
         var rectInfo = " x: " + x + " y: " + y + " rectW: " + rectW + " rectH: " + rectH;*/
        console.log(data);
        this.attributes.getNamedItem("fill").value = "red";
    });


    //polygons
    var polygon = mainMapSVG.selectAll("polygon");
    console.log(polygon);

    _.times(polygon._groups[0].length, function (g) {
       
        polygon._groups[0][g].attributes.getNamedItem("fill").value = "white";

    });

    polygon.on("mouseenter", function () {

        this.attributes.getNamedItem("fill").value = "lightgreen";

    });

    polygon.on("mouseleave", function () {
        this.attributes.getNamedItem("fill").value = "white";
    });

    polygon.on("click", function () {
        data = {
            "points": this.attributes.getNamedItem("points").value
        }


        //var points = this.attributes.getNamedItem("points").value;


        console.log(points);
        this.attributes.getNamedItem("fill").value = "red";
    });


    //polylines
    var polylines = mainMapSVG.selectAll("polyline");


    _.times(polylines._groups[0].length, function (g) {

        polylines._groups[0][g].attributes.getNamedItem("fill").value = "white";

    });

    polylines.on("mouseenter", function () {

        this.attributes.getNamedItem("fill").value = "yellow";

    });

    polylines.on("mouseleave", function () {
        this.attributes.getNamedItem("fill").value = "white";
    });

    polylines.on("click", function () {

        data = {
            "points": this.attributes.getNamedItem("points").value
        }
    console.log(data)

        // var points = this.attributes.getNamedItem("points").value;

        console.log(data);
        this.attributes.getNamedItem("fill").value = "red";
    });

    //elipses

    var ellipse = mainMapSVG.selectAll("ellipse");


    _.times(ellipse._groups[0].length, function (g) {

        ellipse._groups[0][g].attributes.getNamedItem("fill").value = "white";

    });

    ellipse.on("mouseenter", function () {

        this.attributes.getNamedItem("fill").value = "lightred";

    });
    ellipse.on("mouseleave", function () {
        this.attributes.getNamedItem("fill").value = "white";
    });

    ellipse.on("click", function () {
        data = {
            "cx": this.attributes.getNamedItem("cx").value,
            "cy": this.attributes.getNamedItem("cy").value,
            "rx": this.attributes.getNamedItem("rx").value,
            "ry": this.attributes.getNamedItem("ry").value
        }
        console.log(data);

        /*  var cx = this.attributes.getNamedItem("cx").value;
         var cy = this.attributes.getNamedItem("cy").value;
         var rx = this.attributes.getNamedItem("rx").value;
         var ry = this.attributes.getNamedItem("ry").value;
         var ellipseInfo = " cx: " + cx + " cy: " + cy + " rx: " + rx + " ry: " + ry;*/
        console.log(data);
        this.attributes.getNamedItem("fill").value = "red";
    });


    //});
}

function drawByButton(svg) {

    count = 0;

    // creates a new polygons layer
    var polyLayer = svg.append("g").attr("id", "polygons");


    // onclick to add points to svg
    svg.on("click", function (ev) {
        pos = d3.mouse(this);
        point = {
            "x": pos[0],
            "y": pos[1]
        };
        //console.log(point);

        // add points to array
        pointArray.push(point);

        //console.log(pointArray);

        // create representation of position clicked by user
        polyLayer.append("circle")
            .attr("class", "click-circle")
            //.attr("transform", "translate("+ p.x+ ","+ p.y+")")
            .attr('cx', point.x)
            .attr('cy', point.y)
            .attr("r", "5")
            .style("fill", "000000");


        // connect lines between points drawn on map
        svg.append("line")
            .attr("class", "click-line")
            .attr("x1", pointArray[count].x)
            .attr("y1", pointArray[count].y)
            .attr("x2", pointArray[(count + 1)].x)
            .attr("y2", pointArray[(count + 1)].y)
            .style("fill", "0cff00")
            .style("stroke", "0cff00")
            .style("strokeWidth", 0.5);

        count++;

    });

}

function clear(svg) {
    //console.log("attempting to remove items");
    svg.selectAll("circle.click-circle").remove();
    svg.selectAll("polygon.drawn-poly").remove();
    svg.selectAll("line.click-line").remove();
    //pointArray = [];
    //clear all points in the array
    while (pointArray.length > 0) {
        pointArray.pop();
    }
    count = 0;
}

function fill(svg) {
    svg.append("polygon")
        .attr("class", "drawn-poly")
        .attr("points", function () {
            return data = pointArray.map(function (d) {
                return [d.x, d.y].join(",");
            }).join(" ");
        })
        .style("fill", "0cff00")
        .style("stroke", "0cff00")
        .style("opacity", .25);

}


function getTags(location,callback){
  $.ajax({
        type: "POST",
        async: true,
        url: '/mapapi/getTags',
        data:{
            location: location}
    })
        .done(function (data) {
            console.log(data);
            var result = JSON.parse(data);
            callback(result);
        })
        .fail(function () {
            console.log("Ajax Failed.");
        });
}





//remove this as needed
/*function getPoints(callback) {
    $.ajax({
        type: "GET",
        async: true,
        url: '/home/location'
    })
        .done(function (data) {
            console.log(data);
            var result = JSON.parse(data);
            callback(result);
        })
        .fail(function () {
            console.log("Ajax Failed.");
        });
}*/



function selectLocation(svg){
    var polygons = svg.selectAll("polygon");
    var rectangles = svg.selectAll("rect");
    var paths = svg.selectAll("path")

    /*paths.on("mouseenter", function() {
        this.attributes.getNamedItem("fill").value = "lightred";
    })
    
     paths.on("mouseleave", function() {
        this.attributes.getNamedItem("fill").value = "white";
    })*/

    rectangles.on("mouseenter", function() {
        this.attributes.getNamedItem("fill").value = "lightred";
    })

     rectangles.on("mouseleave", function() {
        this.attributes.getNamedItem("fill").value = "white";
    })
 
    polygons.on("mouseenter", function() {
        this.attributes.getNamedItem("fill").value = "lightred";
    })

     polygons.on("mouseleave", function() {
          this.attributes.getNamedItem("fill").value = "white";
     })

}

function popUp(d3Item){




}



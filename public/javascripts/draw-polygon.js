/**
 * Project:
 * File: render-map
 * Author: Nathan Healea, Matthew Zakrevsky
 * Created: 1/16/17
 */


var data;
var count;
var pointArray = [];
var result = [];

function renderPolygons(svg, data) {
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    console.log(data);
    points =  JSON.parse(data.data_point)
    
   

    var attrArray = []
    
  
     //   console.log(attrArray)
    
       var foo = svg.append('g').attr('class', 'newLayer')/*.append('text')
                .attr("x", 200)
                .attr("y", 100)
                .style("fill", "black")
                .style("font-size", "20px")
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .style("pointer-events", "none")
                .text("hello world")*/
            .text("hello world")
                .style('fill', 'black')
            .append("polygon")
            .attr("id", "poly-"+ data.id +"" )
            .attr("points", points)
            .on("mouseover", function(){
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(formatToolTipHTML(data.id, data.name))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
              div.transition()
                .duration(500)
                .style("opacity", 0);
            })
            .style("fill", "0cff00")
            .style("stroke", "0cff00")
            .style("opacity", 0.5) 
    
            ;

        d3.selectAll()
/*
     foo.append('g').append("text")
        .style("font-size", "20px")
        .attr('dy', '1em')
        .attr("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(data.name);*/

        console.log(foo)

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

function formatToolTipHTML(location, name){
    var tags = cleanUpTags(location)
    var attrs = cleanUpAttrs(location)

    if (tags == null && attrs == null){
    return "<div>"+ name + "</div><div>Tags:No tags available </div><div>Attributes: No attributes available </div>" 
    }else{
        return "<div>"+ name + "</div><div>Tags:"+ tags + "</div><div>Attributes:" + attrs + "</div>" 
    }
}


function cleanUpTags(location){
    var tagArray = []
    var t = 0
    var tagsR = getTags(location ,function(result){
              // console.log(result);
                })

    for ( t  in tagsR){
            tagArray.push(tagsR[t].attr)
            t++
        }

   return tagArray;     


}

function cleanUpAttrs(location){

    var attrsR = getAttributes(location ,function(result){
                //console.log(result);
                })

    var attrArray = []
    var a = 0
        
        for (a in attrsR){
            attrArray.push(attrsR[a].attr)
            a++
        }

   return attrArray     
}





function getTags(location,callback){

    console.log("inside getTags");
    var temp = false;
  $.ajax({
        type: "POST",
        async: false,
        url: '/mapapi/getTags',
        data:{
            location: location}
    })
        .done(function (data) {
           // console.log(data);
            var result = JSON.parse(data);
            temp = result;
        })
        .fail(function () {
            console.log("Ajax Failed.");
        });

    //console.log(temp);
    return temp;
}

function getAttributes(location,callback){
  var temp = false
  $.ajax({
        type: "POST",
        async: false,
        url: '/mapapi/getAttributes',
        data:{
            location: location}
    })
        .done(function (data) {
           // console.log(data);
            var result = JSON.parse(data);
            temp = result
        })
        .fail(function () {
            console.log("Ajax Failed.");
        });
        return temp;
}

function selectLocation(svg){
    var polygons = svg.selectAll("polygon");
    var rectangles = svg.selectAll("rect");
    var paths = svg.selectAll("path")


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



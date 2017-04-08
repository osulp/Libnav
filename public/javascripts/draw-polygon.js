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
var start = false;
var end = false;
var show  =false;



var getNavPoints = function(svg){
    
    if(start){
    svg.select(start).style("fill","blue").style("opacity",.5);
    }

    if(end){
    svg.select(end).style("fill","red").style("opacity",.5);
    }

    if((start && end)){
        var location1 = start.split("-")
        var location2 = end.split("-")
        var point1 = getEntryPoint(location1[1]);
        var point2 = getEntryPoint(location2[1]);
        console.log(point1);
        console.log(point2);
        drawGrid(svg._groups[0][0]);
        drawLine(point1,point2);
    }
    
    
}


function getEntryPoint(location, callback) {
    var temp = false
    $.ajax({
        type: "POST",
        async: false,
        url: '/mapapi/getEntryPoint',
        data: {
            location: location
        }
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



/*****************************
 * renderPolygons
 * arguments:
 * svg: object containing XML data from the map
 * data: object containing information about the location to be drawn on the map
 * Return: none
 *****************************/ 
function renderPolygons(svg, data) {
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    console.log(data);
    points = JSON.parse(data.data_point)

    console.log(points[0])

    var attrArray = []

       var foo = svg.append('g').attr('class', 'newLayer')
            .text("hello world")
                .style('fill', 'black')
            .append("polygon")
            .attr("id", "poly-"+ data.id +"" )
            .attr("points", points)
            .on("click", function(){
                    if (!show){
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(formatToolTipHTML(data.id, data.name))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                        show = true;
                    }else{
                         div.transition()
                
                         .duration(500)
                        .style("opacity", 0);
                        show = false;
                    }
            })
              /*
        .on("click",function(){
            if(!start && !end){
                start = this.id;
            }else if(!end && end!=start){
                end = this.id;
                getNavPoints(svg);
            }else{
                end = false;
            } 
        }) */
        .style("fill", "0cff00")
        .style("stroke", "0cff00")
        .style("opacity", 0.5);


    var g = getCenter(points);
    svg.append('text')
        .attr('x', g.x )
        .attr('y', g.y)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(data.name)

}

function getCenter(points){
    var points = points.split(" ");
    
    console.log(points)


    var point1 = points[0].split(",");
    console.log(point1[0]);
    console.log(point1[1]);
    var point2 =  points[2].split(",");

    var center = {
        'x' : (Number(point1[0]) + Number(point2[0]))/2,
        'y' : (Number(point1[1]) + Number(point2[1]))/2
    }

    return center;
}



/*****************************
 * selecByShape
 * arguments:
 * svg: object containing XML data from the map
 * Return: none
 * This function will derive data for the location forms in order to make it so that the 
 * shape data is saved to the database. Must derive the corners for all rectangles and ellipses
 *****************************/
function selectByShape(svg) {

    //select rectangles
    var rects = svg.selectAll("rect");
    // rects.attributes.getNamedItem("fill").value = "white";

    //give rectangles fill
    _.times(rects._groups[0].length, function (g) {

        rects._groups[0][g].attributes.getNamedItem("fill").value = "white";

    });

    rects.on("mouseenter", function () {
        this.attributes.getNamedItem("fill").value = "#5bc0de";
    });

    rects.on("mouseleave", function () {
        this.attributes.getNamedItem("fill").value = "white";
    });


    //get data from map
        rects.on("click", function () {
        var values = {
            "x": this.attributes.getNamedItem("x").value,
            "y": this.attributes.getNamedItem("y").value,
            "width": this.attributes.getNamedItem("width").value,
            "height": this.attributes.getNamedItem("height").value
        }

        //points go clockwise with point 1 being top left
        var points = {
            'point1': ""+  this.attributes.getNamedItem("x").value + " " + this.attributes.getNamedItem("y").value + "",
            'point2' : "" + (this.attributes.getNamedItem("x").value + this.attributes.getNamedItem("width").value) + " " + this.attributes.getNamedItem("y").value + "",
            'point3' :  "" + this.attributes.getNamedItem("x").value  + " " + (this.attributes.getNamedItem("y").value - this.attributes.getNamedItem("height").value)  + "",
            'point4' :  "" + (this.attributes.getNamedItem("x").value + this.attributes.getNamedItem("width").value) + " " + (this.attributes.getNamedItem("y").value - this.attributes.getNamedItem("height").value)  + ""
        }

        console.log(data);


        //derive each corner in x,y coordinates
        var p = {
            point1: {
                x: values.x,
                y: values.y
            },
             point2: {
                x: Number(values.x) + Number(values.width),
                y: values.y
            },
              point3: {
                 x: Number(values.x) + Number(values.width),
                y: Number(values.y) + Number(values.height)
               
            },
            point4: {
                x: values.x,
                y: Number(values.y) + Number(values.height)
            }
        };

        //save coordinates for the form in the form "x,y x,y x,y x,y"
        data = p.point1.x + ',' + p.point1.y + ' ' +  p.point2.x + ',' + p.point2.y + ' '
             +  p.point3.x + ',' + p.point3.y + ' ' +  p.point4.x + ',' + p.point4.y 

    
     

        console.log(data);
        this.attributes.getNamedItem("fill").value = "red";
    });


    //polygons
    var polygon = svg.selectAll("polygon");
    console.log(polygon);

  /*  _.times(polygon._groups[0].length-1, function (g) {

        polygon._groups[0][g].attributes.getNamedItem("fill").value = "white";

    });*/

    polygon.on("mouseenter", function () {

        this.attributes.getNamedItem("fill").value = "#5cb85c";

    });

    polygon.on("mouseleave", function () {
        this.attributes.getNamedItem("fill").value = "white";
    });

    polygon.on("click", function () {
        data = {
            "points": this.attributes.getNamedItem("points").value
        }


        //var points = this.attributes.getNamedItem("points").value;


        console.log( this.attributes.getNamedItem("points").value);
        this.attributes.getNamedItem("fill").value = "red";
    });

    //elipses
    var ellipse = svg.selectAll("ellipse");


    _.times(ellipse._groups[0].length, function (g) {

        ellipse._groups[0][g].attributes.getNamedItem("fill").value = "white";

    });

    ellipse.on("mouseenter", function () {

        this.attributes.getNamedItem("fill").value = "#428bca";

    });
    ellipse.on("mouseleave", function () {
        this.attributes.getNamedItem("fill").value = "white";
    });


    //derives a polygon based upon the ellipse's attributes
    ellipse.on("click", function () {
        var ellipseVal =  {
            "cx": this.attributes.getNamedItem("cx").value,
            "cy": this.attributes.getNamedItem("cy").value,
            "rx": this.attributes.getNamedItem("rx").value,
            "ry": this.attributes.getNamedItem("ry").value
        }
        
        //determines x,y coordinates
        var corners = {
            point1 : {
                  'x' : Number(ellipseVal.cx) - Number(ellipseVal.rx),
                  'y' :  Number(ellipseVal.cy) - Number(ellipseVal.ry)
            },
             point2 : {
                  'x' : Number(ellipseVal.cx) + Number(ellipseVal.rx),
                  'y' :  Number(ellipseVal.cy) - Number(ellipseVal.ry)
            },
             point3 : {
                  'x' : Number(ellipseVal.cx) + Number(ellipseVal.rx),
                  'y' :  Number(ellipseVal.cy) + Number(ellipseVal.ry)
            },
            point4 : {
                  'x' : Number(ellipseVal.cx) - Number(ellipseVal.rx),
                  'y' :  Number(ellipseVal.cy) + Number(ellipseVal.ry)
            }
            
            }


            //produces test tring in form "x,y x,y x,y x,y"
            data = corners.point1.x + ',' + corners.point1.y + ' ' +  corners.point2.x + ',' + corners.point2.y + ' '
             
             +  corners.point3.x + ',' + corners.point3.y + ' ' +  corners.point4.x + ',' + corners.point4.y 
    
        console.log(data);
        this.attributes.getNamedItem("fill").value = "red";
    });


    //});
}

/*****************************
 * drawByButton
 * arguments:
 * svg: object containing XML data from the map
 * Return: none
 * Allows for shapes to be drawn point by point
 *****************************/
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

function formatToolTipHTML(location, name) {
    var tags = cleanUpTags(location)
    var attrs = cleanUpAttrs(location)

    if (tags == null && attrs == null) {
        return "<div>" + name + "</div><div>Tags:No tags available </div> \
                <div>Attributes: No attributes available </div>"
    } else {
        return '<div>' + name + '</div><div>Tags:' + tags + '</div>\
                <div>Attributes:' + attrs + '</div>\
                <div class="btn btn-success" id="start-"'+location +'>Start Here</div>\
                <div class="btn btn-danger" id="end-"'+location +'>End Here</div>'
    }
}

/*****************************
 * cleanUpTag
 * location: the id of a location in the database
 * takes all tags from a query and combines into a string for use in the tool tip
 *******************************/
function cleanUpTags(location) {
    var tagArray = []
    var t = 0

    var tagsR = getTags(location ,function(result){
              // console.log(result);
                })


    for (t  in tagsR) {
        tagArray.push(tagsR[t].attr)
        t++
    }

    return tagArray;

}


/*****************************
 * cleanUpAttrs
 * location: the id of a location in the database
 * takes all attributes from a query and combines into a string for use in the tool tip
 *******************************/
function cleanUpAttrs(location) {


    var attrsR = getAttributes(location ,function(result){
                //console.log(result);
                })


    var attrArray = []
    var a = 0

    for (a in attrsR) {
        attrArray.push(attrsR[a].attr)
        a++
    }

    return attrArray
}

/*****************************
 * getTags
 * location: the id of a location in the database
 * callback: javascript callback to return the query results for  the cleanUpTags function 
 * queries the database for all tags with the matching location id
 *******************************/
function getTags(location, callback) {

    console.log("inside getTags");
    var temp = false;
    $.ajax({
        type: "POST",
        async: false,
        url: '/mapapi/getTags',
        data: {
            location: location
        }
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

/*****************************
 * getAttributes
 * location: the id of a location in the database
 * callback: javascript callback to return the query results for  the cleanUpAttrs function 
 * queries the database for all attributes with the matching location id
 *******************************/
function getAttributes(location, callback) {
    var temp = false
    $.ajax({
        type: "POST",
        async: false,
        url: '/mapapi/getAttributes',
        data: {
            location: location
        }
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


function drawByBox(svg){
  var point1 = null;
  var point2 = null;
  var polyLayer = svg.append("g").attr("id", "polygons");


  /*  var drag = d3.behavior.drag()
        .on("drag", function(d,i) {
            d.x += d3.event.dx
            d.y += d3.event.dy
            d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })
        });*/

     svg.on("click", function (ev) {
        pos = d3.mouse(this);
        if (point1 == null){
        point1 = {
            "x": pos[0],
            "y": pos[1]
            
        }
           polyLayer.append("circle")
            .attr("class", "click-circle")
            //.attr("transform", "translate("+ p.x+ ","+ p.y+")")
            .attr('cx', point1.x)
            .attr('cy', point1.y)
            .attr("r", "5")
            .style("fill", "000000");

        } else {
            point2= {
            "x": pos[0],
            "y": pos[1]
        }
           polyLayer.append("circle")
            .attr("class", "click-circle")
            //.attr("transform", "translate("+ p.x+ ","+ p.y+")")
            .attr('cx', point2.x)
            .attr('cy', point2.y)
            .attr("r", "5")
            .style("fill", "000000");

        }
          if (point1 != null && point2 != null){
        console.log()
        var points =  deriveCorners(point1, point2)
        drawSpace(svg, points)
        data = points;
        }

        });

  
}

function deriveCorners(point1, point2){

    var point3 = {
        'x' : point1.x,
        'y' : point2.y 
    }

    var point4 = {
        'x' : point2.x,
        'y' : point1.y 
    }

    var points = point1.x + ',' + point1.y + ' '  + point4.x + ','+ point4.y +  ' ' + point2.x + ',' + point2.y + ' '  + point3.x + ',' + point3.y + ' '

return points;
}


function drawSpace(svg,points){
    svg.append('polygon')
        .attr('class', 'drawn-poly')
        .attr('points', points)
        .style('fill', 'blue')
        .style('opacity', 0.5)
}

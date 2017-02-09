/**
 * Project:
 * File: render-map
 * Author: Nathan Healea, Matthew Zakrevsky
 * Created: 1/16/17
 */

var pointArray = [];
var result = [];
window.onload = function () {

$("#map-wrapper").ready(function () {
      /*  var a = document.getElementById("map-wrapper");
        console.log(a);
        var svgDoc = a.contentDocument;
        console.log(svgDoc);
        var svgItem = svgDoc.getElementById("Background");
        var svg = d3.select(svgItem);*/
        var a = document.getElementById("map-wrapper");
        var svgDoc = a.contentDocument;
        var svgChildren = svgDoc.childNodes;
        var svgItem = svgChildren[2];
        
        var mainMapSVG = d3.select(svgItem.children[1]);

        document.getElementById('btn-draw').onclick = drawByButton(svgDoc);
        selectByShape(mainMapSVG);

        $.ajax({
            type: "GET",
            async: true,
            url: '/home/location'
        })
                .done(function (data) {
                    console.log(data);
                    var result = JSON.parse(data);
                    console.log("in ajax done");
                })
                .fail(function () {
                    console.log("Ajax Failed.");
                });

    });
};

function selectByShape(mainMapSVG){

 /* $("#map-group").ready(function () {

        
        //select svg
       var a = document.getElementById("map-wrapper");
        var svgDoc = a.contentDocument;
        var svgChildren = svgDoc.childNodes;
        var svgItem = svgChildren[2];*/
        
        //var mainMapSVG = d3.select(svgItem.children[1]);
        
        //select rectangles
        var rects = mainMapSVG.selectAll("rect");
        
        //give rectangles fill    
        _.times(rects._groups[0].length, function(g){
            
            rects._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        rects.on("mouseenter",function(){
                this.attributes.getNamedItem("fill").value = "lightblue";                
            });
        
        rects.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
        
        //get data on click
        rects.on("click",function(){
            
            var x = this.attributes.getNamedItem("x").value;
            var y = this.attributes.getNamedItem("y").value;
            var rectW = this.attributes.getNamedItem("width").value;
            var rectH = this.attributes.getNamedItem("height").value;
            var rectInfo = " x: " + x + " y: " + y + " rectW: " + rectW + " rectH: " + rectH;
            console.log(rectInfo);
            this.attributes.getNamedItem("fill").value = "red";          
        });

        
        
        //polygons
        var polygon = mainMapSVG.selectAll("polygon");
        
            
        _.times(polygon._groups[0].length, function(g){
            
            polygon._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        polygon.on("mouseenter",function(){
                
                this.attributes.getNamedItem("fill").value = "lightgreen";
                
            });
        
        polygon.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
         polygon.on("click",function(){
            
            var points = this.attributes.getNamedItem("points").value;

            console.log(points);
            this.attributes.getNamedItem("fill").value = "red";          
        });
        
        
         //polylines
        var polylines = mainMapSVG.selectAll("polyline");
        
            
        _.times(polylines._groups[0].length, function(g){
            
            polylines._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        polylines.on("mouseenter",function(){
                
                this.attributes.getNamedItem("fill").value = "yellow";
                
            });
        
        polylines.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
         polylines.on("click",function(){
            
            var points = this.attributes.getNamedItem("points").value;

            console.log(points);
            this.attributes.getNamedItem("fill").value = "red";          
        });
        
        //elipses
        
        var ellipse = mainMapSVG.selectAll("ellipse");
        
            
        _.times(ellipse._groups[0].length, function(g){
            
            ellipse._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        ellipse.on("mouseenter",function(){
                
                this.attributes.getNamedItem("fill").value = "lightred";
                
            });
        ellipse.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
         ellipse.on("click",function(){
            
            var cx = this.attributes.getNamedItem("cx").value;
            var cy = this.attributes.getNamedItem("cy").value;
            var rx = this.attributes.getNamedItem("rx").value;
            var ry = this.attributes.getNamedItem("ry").value;
            var ellipseInfo = " cx: " + cx + " cy: " + cy + " rx: " + rx + " ry: " + ry;
            console.log(ellipseInfo);
            this.attributes.getNamedItem("fill").value = "red";          
        });
        
        
    //});
};




function drawByButton (svgDoc){
    var count = 0;
    var floor = "../floor-6-redesign";

    console.log("in drawByButton");

    $("#map-wrapper").ready(function () {
     /*   var a = document.getElementById("map-wrapper");
        console.log(a);
        var svgDoc = a.contentDocument;*/
        console.log(svgDoc);
        var svgItem = svgDoc.getElementById("Background");
        var svg = d3.select(svgItem);

        var polyLayer = svg.append("g").attr("id", "polygons");

        

            svg.on("click", function (ev) {
                console.log('cliking');
                //var point = d3.mouse(this), p = {x:point[0], y:point[1]};
                //var $div = $(ev.target);
                //var offset = $div.offset();
                pos = d3.mouse(this);
                //pointArray.push([(ev.clientX-offset.left),(ev.clientY -  offset.top)]);
                point = {
                    "x": pos[0],
                    "y": pos[1]
                };
                console.log(point);

                pointArray.push(point);
                console.log(pointArray);

                polyLayer.append("circle")
                    .attr("class", "click-circle")
                    //.attr("transform", "translate("+ p.x+ ","+ p.y+")")
                    .attr('cx', point.x)
                    .attr('cy', point.y)
                    .attr("r", "5")
                    .style("fill", "000000");


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

                document.getElementById("btn-fill").onclick = function () {
                    svg.append("polygon")
                        .attr("class", "drawn-poly")
                        .attr("points", function () {
                            return pointArray.map(function (d) {
                                return [d.x, d.y].join(",");
                            }).join(" ");
                        })
                        .style("fill", "0cff00")
                        .style("stroke", "0cff00")
                        .style("opacity", .25);

                };

                document.getElementById("btn-clear").onclick = function () {
                    console.log("attempting to remove items")
                    svg.selectAll("circle.click-circle").remove();
                    svg.selectAll("polygon.drawn-poly").remove();
                    svg.selectAll("line.click-line").remove();
                    //pointArray = [];
                    //clear all points in the array
                    while(pointArray.length > 0) {
                         pointArray.pop();
                }    
                count = 0;
                }
            });

        
    });

};



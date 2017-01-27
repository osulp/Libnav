/**
 * Project:
 * File: render-map
 * Author: Nathan Healea, Matthew Zakrevsky
 * Created: 1/16/17
 */


var pointArray=[];

var count = 0;



$(function renderMap() {

    

    // Defining margin
    var margin = {top: 20, right: 10, bottom: 20, left: 10};

    // Defining canvas
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;


    // Load the external svg information, wrap in jQuery
     

    var wrapper = $('#map-wrapper');
    var svg = null;


    d3.text("/public/images/floor-6-redesign.svg", function (error, xml) {
        if (error) {
            console.log(error);
            return;
        }

        wrapper.append(xml);

        svg = d3.select("svg");


        /*for(var h = 0 ; h < svg.width ; h += 10){
            for(var w = 0; w < svg.height; w += 10){
                svg.append('circle').attr('cx', w).attr('cy', h).attr('r', 1).style("fill", "rgba(0,0,0,.5)");
            }
        }*/


        $('svg > *').hover(function () {
                this.style.stroke = '#00ff00';
                this.style.strokeWidth = '5';

            },
            function () {
                this.style.stroke = '#000000';
                this.style.strokeWidth = '2';
            }
        );

        

        $('svg').on('click', function(ev){
            console.log('cliking');
             //var point = d3.mouse(this), p = {x:point[0], y:point[1]};
            var $div = $(ev.target);
            var offset = $div.offset();
           
           //pointArray.push([(ev.clientX-offset.left),(ev.clientY -  offset.top)]);
            point=  {"x":ev.clientX-offset.left,
                     "y":ev.clientY -  offset.top };
          
            pointArray.push(point);

            svg.append("circle")
              .attr("class","click-circle")
              //.attr("transform", "translate("+ p.x+ ","+ p.y+")")
              .attr('cx',   ev.clientX - offset.left)
              .attr('cy', ev.clientY -  offset.top)
              .attr("r","5")
              .style("fill", "000000")   

             //add points to map may remove to have only polygons
                  console.log("in else count ==", count, pointArray, count+1)
                  console.log(pointArray[(count)].y)
                  svg.append("line")
                        .attr("class","line")
                        .attr("x1", pointArray[count].x)
                        .attr("y1", pointArray[count].y)
                        .attr("x2", pointArray[(count+1)].x )
                        .attr("y2", pointArray[(count+1)].y)
                        .style("fill", "0cff00")
                        .style("stroke", "0cff00")
                        .style("strokeWidth", 0.5);
                    count++;
                    
               document.getElementById("drawBttn").onclick = function() {
                   //draw polygon with line 
                   //http://stackoverflow.com/questions/13204562/proper-format-for-drawing-polygon-data-in-d3
                   //change to submit button
                   svg.append("line")
                        .attr("class","line")
                        .attr("x1", pointArray[0].x)
                        .attr("y1", pointArray[0].y)
                        .attr("x2", pointArray[pointArray.length-1].x )
                        .attr("y2", pointArray[pointArray.length-1].y)
                        .style("fill", "0cff00")
                        .style("stroke", "0cff00")
                        .style("strokeWidth", 0.5);


                   document.getElementById("drawBttn").innerHTML = "fill";
                   svg.append("polygon")
                        .attr("points", function(){
                            return pointArray.map(function(d){
                                return [d.x, d.y].join(",");
                            }).join(" ");
                        })
                        /*.attr("points", function(){
                            return pointArray.toString;
                        })*/
                        .style("fill", "0cff00")
                        .style("stroke", "0cff00")
                        .style("opacity", .25)
               }
                    

        })   

        

       })
});


/*$(document() {
    renderMap();
    window.onclick = addPointToMap();
})*/

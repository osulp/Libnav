 
 function getPoints(callback){
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
}

window.onload = getPoints(function(result) {

    $("#map-wrapper").ready(function () {
                var a = document.getElementById("map-wrapper");
                var svgDoc = a.contentDocument;
                var svgItem = svgDoc.getElementById("Background");
                var svg = d3.select(svgItem);

                console.log(result[0].id);   
                console.log(result);
                var count = 0;
                var space;
                var done = 0;
                var locations = [];
                var id = 1;
                var pointArray = [];
                var point;

                for( i = 0 ; i < result.length; i++){ 
                    if (locations.indexOf(result[i].id) === -1){
                        locations.push(result[i].id);
                    }
                }    
                    console.log(locations);

                for( i = 0 ; i < result.length; i++){ 
                    if ((result[i].floor === 1)&&(result[i].id === id)){
                        point = {
                                "x": result[i].y,
                                "y": result[i].x
                        };
                        pointArray.push(point);     
                    }
                }

                svg.append("polygon")
                                    .attr("class", "drawn-poly")
                                    .attr("points", function () {
                                        return pointArray.map(function (d) {
                                            return [d.x, d.y].join(",");
                                        }).join(" ");
                                    })
                                    .style("fill", "0cff00")
                                    .style("stroke", "0cff00")
                                    .style("opacity", 1);

                id = 5;
                pointArray = [];
                for( i = 0 ; i < result.length; i++){ 
                    if (locations.indexOf(result[i].id) === -1){
                        locations.push(result[i].id);
                    }
                }    
                    console.log(locations);

                for( i = 0 ; i < result.length; i++){ 
                    if ((result[i].floor === 1)&&(result[i].id === id)){
                        point = {
                                "x": result[i].y,
                                "y": result[i].x
                        };
                        pointArray.push(point);     
                    }
                }

                svg.append("polygon")
                                    .attr("class", "drawn-poly")
                                    .attr("points", function () {
                                        return pointArray.map(function (d) {
                                            return [d.x, d.y].join(",");
                                        }).join(" ");
                                    })
                                    .style("fill", "0cff00")
                                    .style("stroke", "0cff00")
                                    .style("opacity", 1);


                id = 4;
                 pointArray = [];
                for( i = 0 ; i < result.length; i++){ 
                    if (locations.indexOf(result[i].id) === -1){
                        locations.push(result[i].id);
                    }
                }    
                    console.log(locations);

                for( i = 0 ; i < result.length; i++){ 
                    if ((result[i].floor === 1)&&(result[i].id === id)){
                        point = {
                                "x": result[i].y,
                                "y": result[i].x
                        };
                        pointArray.push(point);     
                    }
                }

                svg.append("polygon")
                                    .attr("class", "drawn-poly")
                                    .attr("points", function () {
                                        return pointArray.map(function (d) {
                                            return [d.x, d.y].join(",");
                                        }).join(" ");
                                    })
                                    .style("fill", "0cff00")
                                    .style("stroke", "0cff00")
                                    .style("opacity", 1);






            /*   for( i = 0 ; i < locations.length; i++){ 
                for( j = 0 ; j < result.length; j++){ 
                    if 
                    }
                }

                if ((result[].floor === 1)&&(result.)){;

                }
                }*/
    });
});

var pointsArray = [];



      
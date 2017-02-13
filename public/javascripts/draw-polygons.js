window.onload() = function() {

$("#map-wrapper").ready(function () {
        var a = document.getElementById("map-wrapper");
        console.log(a);
        var svgDoc = a.contentDocument;
        console.log(svgDoc);
        var svgItem = svgDoc.getElementById("base");
        var svg = d3.select(svgItem);

        svg.selectAll("polygon").attr("fill", "00ffcc");

        svg.on("mousedown", function(d) {
               select(d, this);
               console.log(d.name);
        });
}
}
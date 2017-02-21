var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'thisisroot',
  database: 'libnav'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

connection.query('INSERT INTO rooms (name, floor, tag, attribute, points) VALUES (?, ?, ?)', ['some room', '2', 'study room', 'lights, chairs, group study', '268,110 172,155 160,94' ], function(err, result) {
      if (err) throw err
})

var pointArray = [];

window.onload = function () {


    var count = 0;


    var floor = "../floor-6-redesign";

    $("#map-wrapper").ready(function () {
        var a = document.getElementById("map-wrapper");
        console.log(a);
        var svgDoc = a.contentDocument;
        console.log(svgDoc);
        var svgItem = svgDoc.getElementById("base");
        var svg = d3.select(svgItem);

        var polyLayer = svg.append("g").attr("id", "polygons");

        svg.select("g").select('Layer_4').append().attr("fill", "00ccff")//select("polygon").append("polygon").attr("id","drawn-poly")style("fill", "00ccff");
        console.log("after fill")

    });

}
/*

 Main js file for navigation functionality

 *loadGridForAdmin() - loads grid with admin functionalities such as setting points traversable or not, saving new grids

 *loadGridForNav() -




 */


var rows;
var walkable = true;
var svgItem;
var startFlag = true;
var finishFlag = false;
var notWalkFlag = false;
var isDragging = false;
var allRectangles;
var startPos;
var finishPos;
var svg;
var gridCalc;

$("#loadGrid").on("click", function () {
    main();
});

$("#navLine").on("click", function () {
    allRectangles.on('click', null);
    drawLineTest();
});

function main() {

    $("#hideGrid").show();
    $("#setWalkTrue").show();
    $("#setWalkFalse").show();
    $("#navLine").show();
    $("#saveGrid").show();


    $("#map-group").ready(function () {
        var a = document.getElementById("map-wrapper");
        var svgDoc = a.contentDocument;
        var svgChildren = svgDoc.childNodes;
        svgItem = svgChildren[2];
    });

    $("#setWalkTrue").on("click", function () {
        walkable = true;
        allRectangles.on("click", null);
        gridMouse();
    });

    $("#setWalkFalse").on("click", function () {
        walkable = false;
        allRectangles.on("click", null);
        gridMouse();
    });

    $("#saveGrid").on("click", function () {
        saveGridPathFinder();
    });

    loadGridForAdmin();
    //loadGridForNavigation();

};

var setGridPathFinder = function (squaresColumn, squaresRow, svg) {
    //set grid
    gridCalc = new PF.Grid(squaresColumn + 1, squaresRow + 1);
    //nonwalk
    _.times(squaresColumn, function (n) {

        _.times(squaresRow, function (m) {
            gridCalc.setWalkableAt(n, m, false);
            var recID = "s-" + n + "-" + m;
            svg.select("rect[id='" + recID + "']").attr('fill', 'grey');
        });

    });
};

var saveGridPathFinder = function () {
    var saveThis = gridCalc;
    console.log(gridCalc);


}

var getGridPathFinder = function (squaresColumn, squaresRow, svg) {


    /*//set grid
     gridCalc = fromDatabase();
     //nonwalk
     _.times(squaresColumn, function (n) {

     _.times(squaresRow, function (m) {
     gridCalc.setWalkableAt(n, m, false);
     var recID = "s-" + n + "-" + m;
     svg.select("rect[id='" + recID + "']").attr('fill', 'grey');
     });

     });*/

    setGridPathFinder(squaresColumn, squaresRow, svg)
};

var hideGrid = function (allRectangles) {
    /*remove this!!*/
    svg.remove();

    allRectangles.attr("stroke", 'none');
    allRectangles.each(function () {
        var x = this;
        if (this.attributes.getNamedItem("path") == null) {
            this.attributes.getNamedItem("fill-opacity").value = 0;
            this.remove();
        } else {
            this.attributes.getNamedItem("fill-opacity").value = .4;
        }
    });
};

var drawGrid = function (svg) {

    console.log("Drawing Grid");
    var square = 12,
        w = svgItem.clientWidth,
        h = svgItem.clientHeight;

    // create the svg
    svg = d3.select('#grid').append('svg');
    svg.attr("width", w).attr("height", h);

    // calculate number of rows and columns
    var squaresRow = _.round(w / square);
    var squaresColumn = _.round(h / square);


    getGridPathFinder(squaresColumn, squaresRow, svg);

    // loop over number of columns
    _.times(squaresColumn, function (n) {

        // create each set of rows

        rows = svg.selectAll('rect' + ' .row-' + (n + 1)).data(d3.range(squaresRow))
            .enter().append('rect')
            .attr("fill-opacity", '.3')
            .attr('class', function (d, i) {
                return 'square row-' + (n + 1) + ' ' + 'col-' + (i + 1);
            })
            .attr('id', function (d, i) {
                return 's-' + (n + 1) + "-" + (i + 1);
            })
            .attr("width", square)
            .attr("height", square)
            .attr("x", function (d, i) {
                return i * square;
            })
            .attr('y', n * square)
            .attr("stroke", 'black');

    });


    allRectangles = svg.selectAll('rect');


};

function drawLineTest() {
    allRectangles.on('click', function (d, i) {

        var pos = this.id.split('-');
        var row = pos[1];
        var col = pos[2];
        if (startFlag) {
            startPos = [row, col];
            startFlag = false;
            finishFlag = true;
            d3.select(this).attr('fill', 'green');

        } else if (finishFlag) {
            finishPos = [row, col];
            finishFlag = false;
            d3.select(this).attr('fill', 'red');
        } else {
            notWalkFlag = false;
        }

        if (startFlag != true && finishFlag != true) {
            var finder = new PF.AStarFinder();
            var path = finder.findPath(startPos[0], startPos[1], finishPos[0], finishPos[1], gridCalc);
            startFlag = false;
            finishFlag = false;


            for (var x = 1; x < path.length - 1; x++) {
                var recID = "s-" + path[x][0] + "-" + path[x][1];
                svg.select("rect[id='" + recID + "']").attr('fill', 'blue');
            }

            for (var x = 0; x < path.length; x++) {
                var recID = "s-" + path[x][0] + "-" + path[x][1];
                svg.select("rect[id='" + recID + "']").attr("path", 'true');
            }

        }

        d3.select('#grid-ref').text(function () {
            return 'row: ' + (n + 1) + ' | ' + 'column: ' + (i + 1);
        });


    });
}

/*
 var drawLine = function(var startPosX,var startPosY, var finishPosX, var finishPosY){

 var finder = new PF.AStarFinder();
 var path = finder.findPath(startPos[0], startPos[1], finishPos[0], finishPos[1], gridCalc);



 for (var x = 1; x < path.length - 1; x++) {
 var recID = "s-" + path[x][0] + "-" + path[x][1];
 svg.select("rect[id='" + recID + "']").attr('fill', 'blue');
 }

 for (var x = 0; x < path.length; x++) {
 var recID = "s-" + path[x][0] + "-" + path[x][1];
 svg.select("rect[id='" + recID + "']").attr("path", 'true');
 }

 }

 d3.select('#grid-ref').text(function () {
 return 'row: ' + (n + 1) + ' | ' + 'column: ' + (i + 1);
 });


 });
 }
 */

var gridMouse = function () {

    var makeWalkMouseDown = allRectangles.on('mousedown', function () {
        isDragging = true;
    });

    var makeWalkMouseDrag = allRectangles.on('mousemove', function () {
        var pos = this.id.split('-');
        var row = pos[1];
        var col = pos[2];
        if (isDragging) {
            if (walkable) {
                var thisRec = svg.select("rect[id='" + this.id + "']").attr('fill', 'white');
                thisRec.attr("walkable", true);
                gridCalc.setWalkableAt(row, col, true);
            } else {
                svg.select("rect[id='" + this.id + "']").attr('fill', 'grey');
                gridCalc.setWalkableAt(row, col, false);
            }
        }
    });

    var makemouseUp = allRectangles.on('mouseup', function () {
        var wasDragging = isDragging;
        isDragging = false;
        if (!wasDragging) {
        }
    });
};

$("#hideGrid").on("click", function () {
    hideGrid();
});

var loadGridForNavigation = function () {

    $("#navGrid").ready(function () {

        drawGrid(svgItem);
        //drawLine(start,finish);

    });

};

var loadGridForAdmin = function () {

    $("#navGrid").ready(function () {

        drawGrid(svgItem);
        gridMouse(allRectangles);
    });

};

        
        



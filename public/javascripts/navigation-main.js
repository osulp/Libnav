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
var entryPoint;
var startPos;
var finishPos;
var floorGridFromDB;
var grid;
var isHomeNav = false;
var svgnav;
var gridCalc;
var path;
var finder;


$("#navLine").on("click", function () {
    allRectangles.on('click', null);
    drawLineTest();
});


var setGridPathFinder = function (squaresColumn, squaresRow, grid) {
    //set grid
    gridCalc = new PF.Grid(squaresColumn + 1, squaresRow + 1);
    //nonwalk
    _.times(squaresColumn, function (n) {

        _.times(squaresRow, function (m) {
            gridCalc.setWalkableAt(n, m, false);
            var recID = "s-" + n + "-" + m;
            grid.select("rect[id='" + recID + "']").attr('fill', 'grey');
        });

    });
};

var setGridPathFinderFromDB = function (squaresColumn, squaresRow, grid) {
    //set grid
    gridCalc = new PF.Grid(squaresColumn, squaresRow);
    if(floorGridFromDB==null || floorGridFromDB ===undefined){
        setGridPathFinder(squaresColumn, squaresRow, grid);
    }else{
    gridCalc.nodes = floorGridFromDB;
    if(isHomeNav==false){
        //nonwalk
        _.times(squaresColumn, function (n) {

            _.times(squaresRow, function (m) {
                if(floorGridFromDB[m][n].walkable){
                    var recID = "s-" + n + "-" + m;
                    grid.select("rect[id='" + recID + "']").attr('fill', 'blue');
                }
                else{
                    var recID = "s-" + n + "-" + m;
                    grid.select("rect[id='" + recID + "']").attr('fill', 'red');
                }
            });

        });
    }
    }
};


var getGridPathFinder = function (squaresColumn, squaresRow, grid) {


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
        setGridPathFinderFromDB(squaresColumn, squaresRow, grid);

  /*  if(floorGridFromDB==null || floorGridFromDB===undefined){
        setGridPathFinder(squaresColumn,squaresRow,grid);
    }else{
    }*/
};

var hideGrid = function () {
    grid.attr("display","none");
    grid.attr("z-index","-1");
};

var showGrid = function () {
    grid.attr("display","initial");
    grid.attr("z-index","1");
};

var hideGrid2 = function () {
    rects = grid.selectAll('rect');
    rects.each(function () {
        var x = this;
        if (this.attributes.getNamedItem("path") == null) {
            this.attributes.getNamedItem("fill-opacity").value = 0;
            this.attributes.getNamedItem("stroke").value = "none";

        } else {
            this.attributes.getNamedItem("fill-opacity").value = .4;
        }
    });
};

var drawGrid = function () {

    var square = 12,
        w = svgnav.attributes.width.value,
        h = svgnav.attributes.height.value;

    w = w.slice(0, -2);
    h = h.slice(0, -2);

    // create the svg
    grid = d3.select('#grid').append('svg');
    grid.attr("width", w).attr("height", h);

    // calculate number of rows and columns
    var squaresRow = _.round(w / square);
    var squaresColumn = _.round(h / square);



    // loop over number of columns
    _.times(squaresColumn, function (n) {

        // create each set of rows

        rows = grid.selectAll('rect' + ' .row-' + (n + 1)).data(d3.range(squaresRow))
            .enter().append('rect')
            .attr("fill-opacity", '.2')
            .attr("fill", 'white')
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
            .attr("stroke", 'black')
            .attr("stroke-width", ".5");

    });
    
    getGridPathFinder(squaresColumn, squaresRow, grid);
    allRectangles = grid.selectAll('rect');
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
            finder = new PF.AStarFinder();
            path = finder.findPath(startPos[0], startPos[1], finishPos[0], finishPos[1], gridCalc);
            startFlag = false;
            finishFlag = false;


            for (var x = 1; x < path.length - 1; x++) {
                var recID = "s-" + path[x][0] + "-" + path[x][1];
                grid.select("rect[id='" + recID + "']").attr('fill', 'blue');
            }

            for (var x = 0; x < path.length; x++) {
                var recID = "s-" + path[x][0] + "-" + path[x][1];
                grid.select("rect[id='" + recID + "']").attr("path", 'true');
            }

        }

        d3.select('#grid-ref').text(function () {
            return 'row: ' + (n + 1) + ' | ' + 'column: ' + (i + 1);
        });


    });
}


 var drawLine = function(point1, point2){

     
     var pos1 = point1[0].entry_point.split('-');
     var row1 = pos1[1];
     var col1 = pos1[2];
     var pos2 = point2[0].entry_point.split('-');
     var row2 = pos2[1];
     var col2 = pos2[2];
     
     var finder = new PF.AStarFinder();
     if(gridCalc == null || gridCalc===undefined){
        setGridPathFinderFromDB();
        var path = finder.findPath(row1, col1,  row2, col2, gridCalc);
     }else{
        var path = finder.findPath(row1, col1,  row2, col2, gridCalc);
     }


     for (var x = 0; x < path.length; x++) {
         var recID = "s-" + path[x][0] + "-" + path[x][1];
         grid.select("rect[id='" + recID + "']").attr('fill', 'blue');
     }

     for (var x = 0; x < path.length; x++) {
         var recID = "s-" + path[x][0] + "-" + path[x][1];
         grid.select("rect[id='" + recID + "']").attr("path", 'true');
     }

     hideGrid2();


 };
 


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
                var thisRec = grid.select("rect[id='" + this.id + "']").attr('fill', 'blue');
                thisRec.attr("walkable", true);
                gridCalc.setWalkableAt(row, col, true);
            } else {
                grid.select("rect[id='" + this.id + "']").attr('fill', 'red').attr('fill-opacity', '.4');
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
    
/*    allRectangles.each(function(){
        var pos = this.id.split('-');
        var row = pos[1];
        var col = pos[2];
        var thisRec = grid.select("rect[id='" + this.id + "']").attr('fill', 'blue');
        thisRec.attr("walkable", true);
        gridCalc.setWalkableAt(row, col, true);
        
    });*/
};

var markPoints = function () {

    var lastPoint;

    allRectangles.on('click', function (d, i) {

        var pos = this.id.split('-');
        var row = pos[1];
        var col = pos[2];

        if (lastPoint != "" && lastPoint != undefined && lastPoint != null)
            grid.select("rect[id='" + lastPoint + "']").attr('fill', 'white');

        lastPoint = this.id;
        grid.select("rect[id='" + this.id + "']").attr('fill', 'blue').attr("fill-opacity", ".8");
        
        entryPoint = this.id; 

        

    });
};

var clearPaths = function () {
    startFlag = true;
    finishFlag = false;

    for (var x = 1; x < path.length - 1; x++) {
        var recID = "s-" + path[x][0] + "-" + path[x][1];
        grid.select("rect[id='" + recID + "']").attr('fill', 'white');
    }

    for (var x = 0; x < path.length; x++) {
        var recID = "s-" + path[x][0] + "-" + path[x][1];
        grid.select("rect[id='" + recID + "']").attr("path", 'false');
    }

    var startid = "s-" + startPos[0] + "-" + startPos[1];
    var finishid = "s-" + finishPos[0] + "-" + finishPos[1];
    grid.select("rect[id='" + startid + "']").attr("path", 'false').attr('fill', 'white');
    grid.select("rect[id='" + finishid + "']").attr("path", 'false').attr('fill', 'white');

    startPos = null;
    finishPos = null;
    path = null;
    finder = null;
};


var loadGridForNavigation = function (svgi, point1, point2) {

    if (svgi != undefined) {
        svgnav = svgi._groups[0][0];

        $("#navGrid").ready(function () {
            
            isHomeNav = true;
            drawGrid();
            drawLine(point1, point2);
        });
    }

};

var loadGridForAdmin = function (svgi) {

    if (svgi != undefined) {
        svgnav = svgi._groups[0][0];

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

        $("#navGrid").ready(function () {

            drawGrid();
            gridMouse(allRectangles);

        });
    }

};

var loadGridForKnown = function (svgi) {

    if (svgi != undefined) {
        svgnav = svgi._groups[0][0];
        $("#navGrid").ready(function () {
            drawGrid();
            markPoints();
            hideGrid();
        });
    }

};
        
 



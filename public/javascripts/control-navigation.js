var svg = null;
var floorGridFromDB;
var allGrids = null;
var gridUpdate = 'navigation/update';
var url = 'navigation/save'






$(function () {

    $.when(getGrids()).done(function(gridJSON){
                var result = JSON.parse(gridJSON);
                if (result && result.length!=0) {
                    // display success message
                    console.log(result);
                    allGrids = result;
                    floorGridFromDB = JSON.parse(result[0].data);
                }
                else {
                    // display error message
                }
        loadMap(1);
    })
    
         $("#setWalkTrue").on("click", function () {
            var allRectangles = grid.selectAll('rect');
            walkable = true;
            allRectangles.on("click", null);
            gridMouse();
        });

        $("#setWalkFalse").on("click", function () {
            var allRectangles = grid.selectAll('rect');
            walkable = false;
            allRectangles.on("click", null);
            gridMouse();
        });
    
        $("#floorSelect").change(function(){
        deleteGrid();
        for(var g in allGrids){
            if(allGrids[g].floor == this.value){
                floorGridFromDB = JSON.parse(allGrids[g].data);
                break;
            }else{
                floorGridFromDB = null;
            }
        }
        loadMap(parseInt(this.value));            
        });

    
    
    // When form is submitted
    $('form').submit(function (event) {

        // get curretn floor value
        var currFloor = $("#floorSelect").val();
        currFloor = parseInt(currFloor);

        // check if grid exist
        for(var g in allGrids){
            if(allGrids[g].floor == currFloor){
                url = gridUpdate;
                break;
            }
        }
        

        // defining data type
        var data = {
            'floor': null,
            'grid': null
        }

        // Adding floor number to data array
        data['floor'] = currFloor;

        // adding stringify grid to data array
        data['grid'] = JSON.stringify(gridCalc.nodes);

        console.log(data);
        // submitting data 
        saveGrid(data, url);

        // prevents native form actions from firing
        event.preventDefault();
        return false;
    });


});


/*function loadMap(id) {
 var map = '/public/images/floor-' + id + '.svg';
 d3.text(map, function (error, externalSVG) {
 if (error) throw error;
 // select map wrapper
 var mapwrapper = d3.select('#map-wrapper');
 mapwrapper.html(externalSVG);

 svg = mapwrapper.select("svg");
 //loadGridForAdmin(svg);


 });

 }*/

function loadMap(id) {
    var map = '/public/images/floor-' + id + '.svg';
    d3.text(map, function (error, externalSVG) {
        if (error) throw error;

        // select map wrapper
        var mapwrapper = d3.select('#map-wrapper');

        // append svg data
        mapwrapper.html(externalSVG);

        // save svg object
        svg = mapwrapper.select("svg");
        // loadFloorLocation(svg, floor);
        drawGrid(svg);
        gridMouse();

    });

}

var saveGrid = function (data, url) {
    if (data != undefined) {
        $.ajax({
            type: "POST",
            async: true,
            url: url,
            data: data
        })
            .done(function (data) {
                console.log(data);
                var result = JSON.parse(data);
                if (result) {
                    // display success message
                    console.log(result);
                }
                else {
                    // display error message
                }

            })
            .fail(function () {
                console.log("Grid not saved");
            });
    }
}


/**
 * Gets all grids from database
 * @returns {*}
 */

function getGrids() {
    return $.ajax({
        type: "get",
        async: true,
        url: '/mapapi/grids'
    });
        /*.done(function (data) {
            var result = JSON.parse(data);
            if (result) {

                // display success message
                if (result.length != 0) {
                    console.log(result);
                    floorGridFromDB = JSON.parse(result[0].data);
                }

                loadGridForAdmin(svg);

            }
            else {

                loadGridForAdmin(svg);
                // display error message
                console.log('Location for retrived');
            }

        })
        .fail(function () {
            console.log("Location not retrieved");
        });*/
}

var svg = null;
var floorGridFromDB;
var allGrids = null;
var gridUpdate = 'navigation/update';
var url = 'navigation/save'
var floor = null;
var message = null;
var ePointsJSON = null;


$(function () {

    floor = "1";

    initialize();

    // Initializes save result modal
    $('#modal-result').modal({'show': false});
    
    // btn to set walkable paths
    $("#setWalkTrue").on("click", function () {
        var allRectangles = grid.selectAll('rect');
        walkable = true;
        allRectangles.on("click", null);
        gridMouse();
    });

    // btn to set unwalkable paths
    $("#setWalkFalse").on("click", function () {
        var allRectangles = grid.selectAll('rect');
        walkable = false;
        allRectangles.on("click", null);
        gridMouse();
    });
    
    // Changes floor depending on selected floor.
    $("#floorSelect").change(function(){
        deleteGrid();

        setGrid(this.value);

        loadMap(parseInt(this.value));            
    });

    $('#btn-model-close').on('click', function(){

        console.log("You CLicked me");
        // Hid message on close
        $('#modal-message-' + message).toggleClass('hidden');

        // reinitialzie navation form with update girds froms ave.
        if(message == 'success'){
            deleteGrid();
            setGrid(floor);
            initialize();
        }

        
    })

    
    
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
        .done(function (resultJSON) {
            var result = JSON.parse(resultJSON);

            if (result) {
                floor = data.floor.toString();
                // shows modal on success
                $('#modal-result').modal('show');
                $('#modal-message-success').toggleClass('hidden');
                message = 'success';
            }
            else {
                // display error message
                // shows modal on success
                $('#modal-result').modal('show');
                $('#modal-message-warning').toggleClass('hidden');
                message = 'warning';

                // Enable buttons for editing
                enableBtns();
            }

        })
        .fail(function () {
            console.log("Grid not saved");
        });
    }
}

/**
 * Initialize navation form
 * @param  {[type]} floor [description]
 * @return {[type]}       [description]
 */
function initialize(){
    $.when(getLocations(), getGrids()).done(function (locationJSON, gridJSON){
        var result = JSON.parse(gridJSON[0]);
        ePointsJSON = JSON.parse(locationJSON[0]);
        if (result && result.length!=0) {
            // display success message
            allGrids = result;
            setGrid(floor);
            // floorGridFromDB = JSON.parse(result[0].data);
        }
        else {
            // display error message
        }
        loadMap(floor);
    });
}

function setGrid(floorId){
    for(var g in allGrids){
            if(allGrids[g].floor == floorId){
                floorGridFromDB = JSON.parse(allGrids[g].data);
                break;
            }else{
                floorGridFromDB = null;
            }
        }
}


/**
 * Ajax call to get all know location from database
 * @param data
 * @param url
 */
 function getLocations() {
    return $.ajax({
        type: "get",
        async: false,
        url: '/mapapi/getAllLocation'
    });
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
}

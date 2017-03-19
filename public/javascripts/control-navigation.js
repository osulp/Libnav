var svg = null;
var floorGridFromDB;


$(function () {

    loadMap(1);
    //getGridFromDB();

    // When form is submitted
    $('form').submit(function (event) {

        // geting url form form
        var url = $('form').attr('href');

        // defining data type
        var data = {
            'floor': null,
            'grid': null
        }

        // Adding floor number to data array
        data['floor'] = parseInt($('#floor option:selected').val());

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
        getGridFromDB();

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


function getGridFromDB() {
    $.ajax({
        type: "get",
        async: true,
        url: '/mapapi/grid'
    })
        .done(function (data) {
            var result = JSON.parse(data);
            if (result) {

                // display success message
                if (result.length != 0) {
                    floorGridFromDB = JSON.parse(result[0].data);
                    console.log(floorGridFromDB);
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
        });
}

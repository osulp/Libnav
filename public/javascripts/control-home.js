var knownLocations = null;
var floor = null;
var svg = null;

$(function () {

    // Setting default floor
    floor = 'floor-1';

    // Initialize the libnav application
    initialize();

    /*
     * On sidebar navigation click
     *  remove the current map
     *  parser id of floor link click
     *  load corresponding floor.
     */
    $('a[id*="floor-"]').on('click', function () {
        console.log(this.id);
        floor = this.id;
        $('#map-wrapper').empty();
        loadMap(this.id);
    });

});

/**
 * Ajax call to get all know location from database
 * @param data
 * @param url
 */
function getKnowLocations() {
    return $.ajax({
        type: "get",
        async: true,
        url: '/mapapi/getAllLocation'
    });
    /*.done(function (data) {
     var result = JSON.parse(data);
     if (result) {

     // display success message
     fillSidebar(result);

     for (var r in result) {
     if (result[r].data_point != null) {
     renderPolygons(svg, JSON.parse(result[r].data_point));
     }
     }

     }
     else {
     // display error message
     console.log('Location for retrived');
     }

     })
     .fail(function () {
     console.log("Location not retrieved");
     });*/
}

/**
 * loads svg map based on id
 * @param id
 */
function loadMap(id) {
    var map = '/public/images/' + id + '.svg';
    d3.text(map, function (error, externalSVG) {
        if (error) throw error;

        // select map wrapper
        var mapwrapper = d3.select('#map-wrapper');

        // append svg data
        mapwrapper.html(externalSVG);

        // save svg object
        svg = mapwrapper.select("svg");

        console.log(knownLocations);
        loadFloorLocation(svg, floor);
        // load naviagiton

    });

}

function loadFloorLocation(svg, floor){
    console.log(svg);
    for (var k in knownLocations) {
        console.log(knownLocations[k]);
        if (knownLocations[k].floor == floor.split('-')[1]) {
            renderPolygons(svg, knownLocations[k]);
        }

        selectShapeByName(svg, 'tool tip room');

    }
}

/**
 *  Display know location in the sidebar of the home page
 * @param locations
 */
function fillSidebar(locations) {

    for (var l in locations) {
        $('#navsb-floor-' + locations[l].floor).append(
            $('<li>').append(
                $('<a>', {text: locations[l].name, href: '#'})
            )
        )
    }
}


function initialize() {
    $.when(getKnowLocations()).done(function (knowJSON) {

        console.log(knowJSON);
        knownLocations = JSON.parse(knowJSON);

        // display success message
        fillSidebar(knownLocations);

        // load map
        loadMap(floor);



    });
}

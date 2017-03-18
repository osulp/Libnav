var knownLocations = null;
var floor = null;
var svg = null;
var searchTerm = null;


$(function () {

    // Setting default floor
    floor = 'floor-1';

    // Initialize the libnav application
    initialize();

    // get all terms for searching
    searchableTerms = getSearchTerms();

    /*
     * On sidebar navigation click
     *  remove the current map
     *  parser id of floor link click
     *  load corresponding floor.
     */
    $('a[id*="floor-"]').on('click', function () {
        floor = this.id;
        $('#map-wrapper').empty();
        loadMap(this.id);

    });

    $('#input-search').keyup(function(event){
        if($('#input-search').val() != searchTerm){

            console.log($(this).val());

        }
        searchTerm = $('#input-search').val();
        fuseSearch(searchTerm);
        console.log(searchResults);

        for(var s in searchResults){

        }
    })

});



/**
  * Gets Navigation Grid from database
  */
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
                if(result.length!=0){
                floorGridFromDB = JSON.parse(result[0].data);
                }

                loadGridForNavigation(svg);    

            }
            else {

                loadGridForNavigation(svg);
                // display error message
                console.log('Location for retrived');
            }

        })
        .fail(function () {
            console.log("Location not retrieved");
        });
}



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
        loadFloorLocation(svg, floor);
        getGridFromDB();

    });

}

function loadFloorLocation(svg, floor){
    for (var k in knownLocations) {
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

        knownLocations = JSON.parse(knowJSON);

        // display success message
        fillSidebar(knownLocations);

        // load map
        loadMap(floor);



    });
}

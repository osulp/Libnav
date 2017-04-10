// Contains array of locaiton objects
var locations = null;

// Contains the id of the current floor
var floor = null;

// Contains floor svg object
var svg = null;

// Contains array of object from database
var searchTerm = null;

// Contains array of grid objects
var grids = null;

$(function () {

    // Setting default floor
    floor = '1';

    // Initialize the libnav application
    initialize();

    // get all grid()

    // get all terms for searching
    searchableTerms = getSearchTerms();

    /*
     * On sidebar navigation click
     *  remove the current map
     *  parser id of floor link click
     *  load corresponding floor.
     */
    $('a[id*="floor-"]').on('click', function () {
        floor = this.id.split('-')[1];
        $('#map-wrapper').empty();
        $('#navgrid').empty();
        loadMap();

    });

    $('#input-search').keyup(function(event){
        var input = $('#input-search').val();
        var searchWrapper = $('#search-results-wrapper');
        var searchUl = $('#search-results-ul');
        var visible = searchWrapper.hasClass('hidden');

        if( input != searchTerm && input != "" ){

            if(visible){
                searchWrapper.removeClass('hidden');
            }

            // remove old results
            searchUl.empty();

            // show results dropdown
            searchWrapper.removeClass('hidden');

            searchTerm = $('#input-search').val();
            fuseSearch(searchTerm);

            for(var s in searchResults){
                searchUl.append('<li><a href="#">' + searchResults[s] + '</a></li>');
            }
        }
        else if(input == ""){
            // Hide search results dropdown
            searchWrapper.addClass('hidden');
            searchUl.empty();
        }

    })

});


/**
 * Gets all grids from database
 * @returns {*}
 */
function getGrids() {
    $.ajax({
        type: "get",
        async: true,
        url: '/mapapi/grids'
    })
        .done(function (data) {
            var result = JSON.parse(data);
            grids = result;
            if (result) {

                // display success message
                if (result.length != 0) {
                    
                    floorGridFromDB = JSON.parse(result[0].data);
                    console.log(floorGridFromDB);
                }
            }
            else {
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
function getLocations() {
    return $.ajax({
        type: "get",
        async: false,
        url: '/mapapi/getAllLocation'
    });
}


/**
 * loads svg map based on id
 * @param id
 */
function loadMap() {
    var map = '/public/images/floor-' + floor + '.svg';
    d3.text(map, function (error, externalSVG) {
        if (error) throw error;

        // select map wrapper
        var mapwrapper = d3.select('#map-wrapper');

        // append svg data
        mapwrapper.html(externalSVG);

        // save svg object
        svg = mapwrapper.select("svg");
        loadLocationByFloor(svg, floor);
        // loadgird(id)
        //getGridFromDB();

    });

}

/**
 * Loads the locations for the current selected floor
 * @param svg
 * @param floor
 */
function loadLocationByFloor(svg, floor){
    for (var l in locations) {
        if (locations[l].floor == floor) {
            renderPolygons(svg, locations[l]);
        }


        //selectShapeByName(svg, 'tool tip room');

    }
    tooltipBtn();
}

/**
 *  Display know location in the sidebar of the home page
 * @param locations
 */
function fillSidebar() {
    console.log("inside locaiton");
    for (var l in locations) {

        if(locations[l]['type'] == 'known') {
            $('#navsb-floor-' + locations[l].floor).append(
                $('<li>').append(
                    $('<a>', {text: locations[l].name, href: '#'})
                )
            )
        }
    }
}


function initialize() {
    $.when(getLocations(), getGrids()).done(function (locationJSON, gridJSON) {

        locations = JSON.parse(locationJSON[0]);

        // display success message
        fillSidebar(locations);

        // load map
        loadMap(floor);



    });
}

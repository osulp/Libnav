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

//disabling element is still clickable... adding flag to stop it 
var disableStartFlag = false;

// Contains the selected location
var selectedLocaiton = null;

// Main load function
$(function () {

    // Setting default floor
    floor = '2';

    // Initialize the libnav application
    initialize();

    /*
     * On sidebar navigation click
     *  remove the current map
     *  parser id of floor link click
     *  load corresponding floor.
     */
     $('a[id*="floor-"]').on('click', function () {
        floor = this.id.split('-')[1];
        $('#map-wrapper').empty();
        loadMap();
        deleteGrid();
        switchGrids(floor);

    });

     
     // key up event for search bar
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
            fuseSearch(searchTerm, locations);
            for(var s in searchResults){

                searchUl.append('<li><a href="#" id="result-' + searchResults[s]['id'] + '">' + searchResults[s]['name'] + '</a></li>');

            }

            $('a[id*="result-"]').on('click', function () {
                id = this.id.split('-')[1];
                var searchLocation = null;

                for(var s in searchResults){
                    if( searchResults[s]['id'] ==  id){
                        searchLocation = searchResults[s];
                        break;
                    }
                    
                }
                
                if(floor != searchLocation['floor']){
                    floor = searchLocation['floor'];
                    loadMap();
                }
                console.log($('svg').ready(function(){
                    if(selectedLocaiton){
                        var temp = svg.select('#poly-' + selectedLocaiton);
                        temp.style("filter", null)
                            .style("opacity", .5);
                    }

                    var polyLocaiton = svg.select('#poly-' + searchLocation['id']);
                    polyLocaiton.style("filter", "url(#glow)")
                                .style("opacity", .8);

                    selectedLocaiton = searchLocation['id'];
                }));

             });
        }
        else if(input == ""){
            // Hide search results dropdown
            searchWrapper.addClass('hidden');
            searchUl.empty();
        }

    })

     // Click event for start navigation
     $('#nagivation-start').on('click', function(){
        if (disableStartFlag == false){
            if(startPos != null && endPos != null){
                navigate(startPos,endPos);
            }
        }
         disableStartFlag = true;
        $(this).addClass("disabled"); 
    })

     // On click event for clearing navigation
     $('#navigation-clear').on('click', function(){
        deleteGrid();
        switchGrids(floor);
        $('#nagivation-start').removeClass("disabled"); 
        disableStartFlag = false;


    })

 });


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
        buildLayers(svg);
        loadLocationByFloor(svg, floor);

        // creating glow effect 
        //Container for the gradients
        var defs = svg.append("defs");

        //Filter for the outside glow
        var filter = defs.append("filter")
        .attr("id","glow");
        
        filter.append("feGaussianBlur")
        .attr("stdDeviation","10")
        .attr("result","coloredBlur");
        
        var feMerge = filter.append("feMerge");
        
        feMerge.append("feMergeNode")
        .attr("in","coloredBlur");
        
        feMerge.append("feMergeNode")
        .attr("in","SourceGraphic");
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

    }
    tooltipBtn();
}

/**
 *  Display know location in the sidebar of the home page
 * @param locations
 */
 function fillSidebar() {
    var id = "location-";
    console.log("inside locaiton");
    for (var l in locations) {

        $('#navsb-floor-' + locations[l].floor).append(
            $('<li>').append(
                $('<a>', {text: locations[l].name, href: '#', id: id + locations[l].id})
                )
            )
    }
    $('a[id*="location-"]').on('click', function () {

        id = this.id.split('-')[1];

        if(selectedLocaiton){
            var temp = svg.select('#poly-' + selectedLocaiton);
            temp.style("filter", null)
                .style("opacity", .5);
        }

        var polyLocaiton = svg.select('#poly-' + id);
        polyLocaiton.style("filter", "url(#glow)")
                    .style("opacity", .8);

        selectedLocaiton = id;

    });
}

/**
 * Switches the grid global variabed
 * @param  {[type]} floor [id of floor]
 */
function switchGrids(floor){
     for(var g in grids){
            console.log(g);
            if(grids[g].floor == floor){
                floorGridFromDB = JSON.parse(grids[g].data);
            }
        }

}

/**
 * Initialization function for home page
 */
function initialize() {
    $.when(getLocations(), getGrids()).done(function (locationJSON, gridJSON) {

        locations = JSON.parse(locationJSON[0]);
        grids = JSON.parse(gridJSON[0]);
        console.log(grids);

        // display success message
        fillSidebar(locations);

        // load map
        loadMap(floor);

        switchGrids(floor);

    });
}

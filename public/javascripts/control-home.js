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

var selectedLocaiton = null;
$(function () {

    // Setting default floor
    floor = '2';

    // Initialize the libnav application
    initialize();

    // get all grid()

    // get all terms for searching
    //searchableTerms = getSearchTerms();

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
            // console.log("before input")
            searchTerm = $('#input-search').val();
            // console.log(searchTerm)

            fuseSearch(searchTerm, locations);
            // console.log(searchResults)
            for(var s in searchResults){
                //console.log("line70 in control home")
                //console.log(searchResults);
                // console.log(s);
                // console.log(searchResults[s]);
                searchUl.append('<li><a href="#" id="search-' + searchResults[s]['id'] + '">' + searchResults[s]['name'] + '</a></li>');

            }

            $('a[id*="search-"]').on('click', function () {
               // console.log(this)
                id = this.id.split('-')[1];
                var searchLocation = null;

                for(var s in searchResults){
                    if( searchResults[s]['id'] ==  id){
                        searchLocation = searchResults[s];
                        //if (searchResults[s]['floor'] != floor)
                            //console.log("if before load map")
                            //floor = searchResults[s]['floor'];
                            //loadMap(searchResults[s]['floor'])
                            //loadMap();
                            //console.log("after load map")
                        break;
                    }
                    
                }
                
                if(floor != searchLocation['floor']){
                    floor = searchLocation['floor'];
                    loadMap();
                }
                ($('svg').ready(function(){
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


     $('#nagivation-start').on('click', function(){
        console.log(startPos != null && endPos != null);
        if(startPos != null && endPos != null){
            drawGrid(svg);
            drawLine(startPos,endPos);
        }
    })

     $('#navigation-clear').on('click', function(){
        console.log("you clicked me");
        deleteGrid();
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
        /*.done(function (data) {
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
        });*/
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

        //if(locations[l]['type'] == 'known') {
            $('#navsb-floor-' + locations[l].floor).append(
                $('<li>').append(
                    $('<a>', {text: locations[l].name, href: '#', id: id + locations[l].id})
                    )
                )
        //}
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


function initialize() {
    $.when(getLocations(), getGrids()).done(function (locationJSON, gridJSON) {

        locations = JSON.parse(locationJSON[0]);
        grids = JSON.parse(gridJSON[0]);
        console.log(grids);

        // display success message
        fillSidebar(locations);

        // load map
        loadMap(floor);

        for(var g in grids){
            console.log(g);
            if(grids[g].floor == floor){
                floorGridFromDB = JSON.parse(grids[g].data);
            }
        }

    });
}

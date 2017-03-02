$(function () {

    // loads floor 2 map by default
    loadMap('floor-2');

    /*
     * On sidebar navigation click
     *  remove the current map
     *  parser id of floor link click
     *  load corresponding floor.
     */
    $('a[id*="floor-"]').on('click', function () {
        console.log(this.id);
        $('#map-wrapper').empty();
        loadMap(this.id);
    });

    /*
     * Get all know location from database
     * Load locations into sidebar
     */


});

/**
 * Ajax call to get all know location from database
 * @param data
 * @param url
 */
function getKnowLocations() {
    $.ajax({
        type: "get",
        async: true,
        url: '/mapapi/getAllLocation'
    })
        .done(function (data) {
            var result = JSON.parse(data);
            if (result) {

                // display success message
                fillSidebar(result);

                for(var r in result){
                    if(result[r].data_point != null) {
                        console.log(JSON.parse(result[r].data_point));
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
        mapwrapper.html(externalSVG);

        svg = mapwrapper.select("svg");
        
         getKnowLocations();
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

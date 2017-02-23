$(function () {

    loadMap('floor-1');

    $('[id*="floor-"]').on('click', function () {
        console.log(this.id);
        // remove the current map
        $('#map-wrapper').empty();
        loadMap(this.id);
    });

    getKnowLocations();

});

/**
 *
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
    var map = '/public/images/'+ id + '.svg';
    d3.xml(map, function (error, xml) {
        if (error) throw error;
        $('#map-wrapper').append(xml.documentElement);
    });
}

/**
 *  Display know location in the sidebar of the home page
 * @param locations
 */
function fillSidebar(locations) {

    for (var l in locations) {
        console.log(l);
        $('#floor-' + locations[l].floor+'-nav').append(
            $('<li>').append(
                $('<a>', {text: locations[l].name})
            )
        )
    }


    console.log(location);
}

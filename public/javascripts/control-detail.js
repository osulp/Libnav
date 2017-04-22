var locationData = null;
var confirmModal = null;
var resultModal = null;

$(function(){

    // Initialze modal
    confirmModal = $('#modal-delete').modal({'show': false});
    resultModal = $('#modal-result').modal({'show': false});
    
    $.when(getLocationInfo(id)).done(function(locationJSON){
        locationData = JSON.parse(locationJSON);

        displayLocation(locationData);

        loadmap(locationData['floor'], locationData);
    });

    // Delete btn onclick event
    $('#btn-delete').on('click', function(){
        confirmModal.modal('show');
    });

    // Delete yes btn onclick event
    $('#btn-delete-yes').on('click', function(){
        deleteLocation(id);
    })
});

function getLocationInfo(id){
    return $.ajax({
      type: "GET",
      async: true,
      url: "/dashboard/details/data/" + id
  });
};


function displayLocation(location) {
	// write location info to page
	for (var a in location) {
        if(a == 'attribute'){
            writeAttributes(location[a]);
        }
        else if (a == 'tag'){
            writeTags(location[a]);
        }
        else if (a == 'color'){
            $('#data-' + a).css('height', '20px');
            $('#data-' + a).css('background-color', location[a]);
        }
        else if (a == 'display'){
            var display = null;

            console.log(location[a]);
            if(location[a]){
                display = "True";
            }
            else {
                display = "False";
            }
            console.log(display);
            $('#data-' + a).text(display);
        }
        else if (location[a] != null && a != 'point'){
            $('#data-' + a).text(location[a]);
        }
        
        else{
            $('#wrapper-' + a).addClass('hidden');
        }
    }
}


function writeAttributes(attr){
    // write attributes
    var attrOutput = JSON.parse(attr);

    if (attrOutput != null) {
    	$('#data-attributes').text(attrOutput.join(', '));
    }
    else {
    	$('#data-attributes').addClass('hidden');
    }
}

function writeTags(tags){
    // write tags
    var tagOutput = JSON.parse(tags);

    if (tagOutput != null) {
    	$('#data-tags').text(tagOutput.join(', '));
    }
    else {
    	$('#data-tags').addClass('hidden');
    }

}

function deleteLocation(id){
    $.ajax({
        type: "GET",
        async: true,
        url: "/dashboard/location/delete/" + id
    })
    .done(function(result){
        console.log(result)
        if (result) {

                // shows modal on success
                $('#modal-result').modal('show');
                $('#modal-message-success').toggleClass('hidden');
            }
            else {
                // display error message
                // shows modal on success
                $('#modal-result').modal('show');
                $('#modal-message-warning').toggleClass('hidden');
            }

        })
    .fail(function(){

    })
}

function loadmap(id, data){
    // load map
    var map = '/public/images/floor-' + id + '.svg';
    d3.text(map, function (error, externalSVG) {
       if (error) throw error;

        // select map wrapper
        var mapwrapper = d3.select('#map-wrapper');
        mapwrapper.html(externalSVG);

        svg = mapwrapper.select("svg");

        renderPolygons(svg, data);
    });
}
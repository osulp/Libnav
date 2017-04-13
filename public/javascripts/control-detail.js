var locationData = null;
var confirmModal = null;
var resultModal = null;

$(function(){

    // Initialze modal
    confirmModal = $('#modal-delete').modal({'show': false});
    resultModal = $('#modal-result').modal({'show': false});
    
    $.when(getLocationInfo(id)).done(function(locationJSON){
        locationData = JSON.parse(locationJSON);

        displayLocation(locationData['info']);
        writeAttributes(locationData['attr']);
        writeTags(locationData['tags']);

        loadmap(locationData['info'][0]['floor'], locationData['info'][0]);
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


function displayLocation(info) {
	// write location info to page
	for (var i in info) {
		for (var k in info[i]) {
			if (info[i][k] != null && k != 'point') {
				$('#data-' + k).text(info[i][k]);
			}
			else {
				$('#wrapper-' + k).addClass('hidden');
			}
		}
	}
}


function writeAttributes(attr){
    // write attributes
    var attrOutput = [];
    for (var a in attr) {
    	for (var k in attr[a]) {
    		if (attr[a][k] != null) {
    			attrOutput.push(attr[a][k]);
    		}
    	}
    }
    if (attrOutput != null) {
    	$('#data-attributes').text(attrOutput.join(', '));
    }
    else {
    	$('#data-attributes').addClass('hidden');
    }
}

function writeTags(tags){
    // write tags
    var tagOutput = [];
    for (var t in tags) {
    	for (var k in tags[t]) {
    		if (tags[t][k] != null) {
    			tagOutput.push(tags[t][k]);
    		}
    	}
    }
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
    }).done(function(result){
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

    }).fail(function(){

    })
}

function loadmap(id, data){
    console.log(data);
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
var svg;

$(function () {

    loadMap(1);

    $('#floor').change(function () {
        // remove the current map
        $('#map-wrapper').empty();
        loadMap($(this).val());


    });

    // When form is submitted
    $('form').submit(function (event) {

        disableSaveBtn();

        var url = $('form').attr('href');

        var data = getInputData();

        // Submit data
        submitForm(data, url);

        event.preventDefault();
        return false;
    });

    $('#btn-clear').on('click', function(){
        clear(svg);
    });

    $('#btn-fill').on('click', function(){
       fill(svg);
    })


});

/**
 *
 * @param data
 * @param url
 */
function submitForm(data, url) {
    $.ajax({
        type: "POST",
        async: true,
        url: url,
        data: data
    })
        .done(function (data) {
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
            console.log("Password Check failed");
        });
}

/**
 * splits text in to array
 * removes no alphanumeric characters
 * @param text
 * @returns {Array}
 */
function splitText(text) {
    var newtext = null;

    if (text != ' ') {

        // remove non alphanumeric characters and replace with space
        text = text.replace(/[^0-9a-zA-Z, ]/gi, '');

        // split text on ',' and ' '
        text = text.split(/[ ,]+/);

        // creating new text vairiable
        newtext = [];

        // scanning parsed text for empty strings.
        for (var t in text) {
            if (text[t] != "") {
                newtext.push([null, text[t]]);
            }
        }
    }
    return newtext;
}

/**
 * Gets input data from form
 * @returns {{}}
 */
function getInputData() {
    var data = {};
    // select all form input and textares
    var inputs = $('form :input:not(:button) ');

    // get form input data
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name == 'tag' || input.name == 'attribute') {
            data[input.name] = splitText(input.value);
        }
        else {
            data[input.name] = input.value
        }
    }

    data['point'] = getPoints();


    return data;
}

/**
 * loads svg map based on id
 * @param id
 */
function loadMap(id) {
    var map = '/public/images/floor-' + id + '.svg';
    d3.text(map, function (error, externalSVG) {
        if (error) throw error;
       // console.log(externalSVG);

        // select map wrapper
        var mapwrapper = d3.select('#map-wrapper');
        mapwrapper.html(externalSVG);

        svg = mapwrapper.select("svg");

        getKnowLocations();

        //selectLocation(svg);

        document.getElementById("btn-draw").onclick = function () {  drawByButton(svg); }
        selectByShape(svg);

        svg.transition().duration(1000).delay(1000)
            .select("circle")
            .attr("r", 100);
    });
}

function disableSaveBtn() {
    $('#btn-save').attr('disabled', true);
    $('#btn-save').prop('disabled', true);
}

function getPoints() {
    points = JSON.stringify(data);
    console.log(points);
    return points;
}


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
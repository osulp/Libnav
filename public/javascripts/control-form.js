var svg;

$(function () {

    // Loads Map
    loadMap(1);

    // Initializes save result modal
    $('#modal-result').modal({'show': false});

    // Changes Floor depending on dropdown selection
    $('#floor').change(function () {
        // remove the current map
        $('#map-wrapper').empty();

        // load new map
        loadMap($(this).val());

        // hide draw location
        $('#location-draw-controls').addClass('hidden');


    });

    // When form is submitted
    $('form').submit(function (event) {

        disableBtns();

        var url = $('form').attr('href');

        var data = getInputData();

        // Submit data
        submitForm(data, url);

        event.preventDefault();
        return false;
    });

    // Clears polygon from map
    $('#btn-location-clear').on('click', function () {
        clear(svg);
    });

    // Fills map polygon
    $('#btn-location-fill').on('click', function () {
        console.log("You clicked Fill");
        fill(svg);
    });

    // Btn Draw Location
    $('#btn-location-draw').on('click', function(){
        $('#location-draw-controls').toggleClass('hidden');

        drawByButton(svg);
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

                // shows modal on success
                $('#modal-result').modal('show');
                $('#modal-message-success').toggleClass('hidden');
            }
            else {
                // display error message
                // shows modal on success
                $('#modal-result').modal('show');
                $('#modal-message-warning').toggleClass('hidden');

                // Enable buttons for editing
                enableBtns();
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
        // select map wrapper
        var mapwrapper = d3.select('#map-wrapper');
        mapwrapper.html(externalSVG);

        svg = mapwrapper.select("svg");


    });
}

function disableBtns() {

    // Disable save button
    $('#btn-save').attr('disabled', true);
    $('#btn-save').prop('disabled', true);

    // Disable clear button
    $('#btn-clear').attr('disabled', true);
    $('#btn-clear').prop('disabled', true);

    // Disable delete button
    $('#btn-cancel').attr('disabled', true);
    $('#btn-cancel').prop('disabled', true);
}

function enableBtns() {

    // Disable save button
    $('#btn-save').attr('disabled', false);
    $('#btn-save').prop('disabled', false);

    // Disable clear button
    $('#btn-clear').attr('disabled', false);
    $('#btn-clear').prop('disabled', false);

    // Disable delete button
    $('#btn-cancel').attr('disabled', false);
    $('#btn-cancel').prop('disabled', false);
}

function getPoints() {
    console.log(data);
    points = JSON.stringify(data);
    return points;
}
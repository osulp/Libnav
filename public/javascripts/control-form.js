var svg;

/**
 * Validation rules for all forms
 * @type {{name: {title: string, required: boolean, alphaNumeric: boolean}, number: {title: string, required: boolean, numeric: boolean}, capacity: {title: string, required: boolean, numeric: boolean}, url: {title: string, required: boolean, url: boolean}}}
 */
var rules = {
    'name': {
        title: 'Location Name',
        required: true,
        format: {regex: /[0-9a-zA-Z ]/}
    },
    'floor': {
        title: 'Floor',
        required: true,
        numeric: true
    },
    'number': {
        title: 'Room Number',
        required: true,
        numeric: true
    },
    'capacity': {
        title: 'Room Capacity',
        required: true,
        numeric: true
    },
    'url': {
        title: 'Service URL',
        required: false,
        url: true
    },
    'location': {
        title: 'Location',
        required: true
    },
    'entry': {
        title: 'Entry Point',
        required: true
    },
    'first':{
        title: 'Frist name',
        required: true,
        alpha: true,
    },
    'last':{
        title: 'Last name',
        required: true,
        alpha: true,
    },
    'onid':{
        title: 'Onid',
        required: true,
        alpha: true,
    }
};

/**
 * main form control load
 */
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

        // clear poly when floor switches
        clear(svg);
        
        //close grid
        hideGridForKnown();

        // hide draw location
        $('#location-draw-controls').addClass('hidden');


    });

    // When form is submitted
    $('form').submit(function (event) {

        disableBtns();

        var url = $('form').attr('href');

        var data = getInputData();

        // Submit data
        //submitForm(data, url);

        if (validateData(data)) {
            // Submit data
            submitForm(data, url);
        }
        else {
            enableBtns();
        }


        event.preventDefault();
        return false;
    });

    // Btn Clears polygon from map
    $('#btn-location-clear').on('click', function () {
        clear(svg);
    });

    // Btn Fills map polygon
    $('#btn-location-fill').on('click', function () {
        fill(svg);
    });

    // Btn Draw Location
    $('#btn-location-draw').on('click', function () {
        $('#location-draw-controls').toggleClass('hidden');
       drawByButton(svg);
    
    });

     $('#btn-box-draw').on('click', function () {
        $('#location-draw-controls').toggleClass('hidden');
    
       drawByBox(svg);
    });


    // Btn saves draw location
    $('#btn-location-save').on('click', function () {
        // save data points from drawn location.
        // Matthew put call to save method here
    });

    // Btn Shows Navigation Controls
    $('#btn-navigation').on('click',function(){
        $('#navigation-controls').toggleClass('hidden');
    });

    // Btn Select Location
    $('#btn-location-select').on('click', function () {
        selectByShape(svg);
    });


    // Btn Show Grid
    $('#btn-navigation-show').on('click', function () {
        console.log("Showing Grid");
        showGrid();
    });

    // Btn Hide Grid
    $('#btn-navigation-hide').on('click', function () {
        hideGridForKnown();
    });

    // Btn Clear Grid
    $('#btn-navigation-clear').on('click', function () {
        // Stephen put call to clear entry point method here
    });

    // Btn Save Entry Point
    $('#btn-navigation-save').on('click', function () {
        // Stephen put call to save entity point method here
        // getEntry();
    })
});

/**
 * Submits form data using ajax
 * @param data
 * @param url
 */
function submitForm(data, url) {
// for testing
    console.log(data);

    $.ajax({
        type: "POST",
        async: true,
        url: url,
        data: data
    })
        .done(function (data) {
            console.log(data)
            var result = JSON.parse(data);
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

                // Enable buttons for editing
                enableBtns();
            }

        })
        .fail(function () {
            console.log("Form submit failed");
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

    inputs.push(getLocation());
    inputs.push(getEntry());

    // get form input data
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        if (input.name in rules) {
            /**
             * validate input
             * if 'true': save input to data obj
             * if 'false': save false into data obj
             */
            if (validateInput(input)) {
                data[input.name] = input.value
            }
            else {
                data[input.name] = false;
            }
        }
        else if (input.name == 'tag' || input.name == 'attribute') {
            if (validataSearchAtt(input)) {
                data[input.name] = splitText(input.value);
            }
            else {
                data[input.name] = null;
            }

        }

    }

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

        getKnowLocations(id);
        loadGridForKnown(svg);

    });
}

/**
 * Disables form control button
 *  for save, clear, and cancel
 */
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


function getKnowLocations(id) {
    $.ajax({
        type: "get",
        async: true,
        url: '/mapapi/getAllLocation'
    })
        .done(function (data) {
            var result = JSON.parse(data);
            if (result) {

                // display success message

                for (var r in result) {

                    if (result[r].data_point != null && result[r].floor == id) {

                        renderPolygons(svg, result[r]);
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
 * Enables form control button
 *  for save, clear, and cancel
 */
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

/**
 * Gets data points from draw-polygons.js
 *  for marked locations
 */
function getLocation() {
    var input = {
        name: 'location',
        value: JSON.stringify(data)
    };
    return input;
}

/**
 * Gets the entry point for location on grid
 * @returns {{name: string, value}}
 */
function getEntry() {
    var input = {
        name: 'entry',
        value: "temp"
    };
    return input;
}

/* - - - - Validation functionality - - - - */
/**
 * Shows displays the constrains on the input field.
 * @param show
 * @param errors
 * @param name
 * @constructor
 */
function ShowError(show, errors, name) {
    var errorhelp = $('#' + name + 'Error');
    errorhelp.empty();
    if (!show) {
        var ul = $('<ul>');
        for (var e in errors) {
            ul.append($('<li>', {text: errors[e]}))
        }
        errorhelp.append(ul);
    }
}

/**
 * Added CSS styling for input errors and success
 * @param show
 * @param name
 * @constructor
 */
function ShowResults(show, name) {
    var group = $('#' + name + '-group');

    if (show == 'error') {
        group.addClass('alert alert-danger');
    }
    else if (show == 'warning') {
        group.addClass('alert alert-warning');
    }
    else if (show == 'success') {
        group.removeClass('alert alert-danger');
        group.removeClass('alert alert-warning');
        group.addClass('alert alert-success');
    }
}

/**
 * Validates all inputs of forms using validation rules.
 * @param input
 * @returns {*}
 */
function validateInput(input) {
    // validate input
    var result = approve.value(input.value, rules[input.name]);

    // Check results of input validation
    if (result.approved) {

        // success
        ShowError(result.approved, result.errors, input.name);
        ShowResults('success', input.name);

        // saves that input is validated
        //isValid[input.name] = result.approved;

        // save form data
        //formdata[input.name] = input.value;
    }
    else {

        // fail
        ShowError(result.approved, result.errors, input.name);
        ShowResults('error', input.name);

        //isValid[input.name] = result.approved;
    }
    return result.approved;
}

/**
 * Validates Tags and Attributes inputs
 * @param input
 * @returns {boolean}
 */
function validataSearchAtt(input) {
    var results = false;
    if (input.value != '') {
        results = true;
        ShowResults('success', input.name);
    }
    else {
        ShowError(0, [input.name + 's are suggested for location'], input.name);
        ShowResults('warning', input.name);
    }
    return results;
}

/**
 * Validates that all required data is inputted before submission of forms
 * @param data
 * @returns {boolean}
 */
function validateData(data) {
    var results = true;
    for (var d in data) {
        console.log(data[d]);
        if (!data[d]) {

            results = false;
            break;
        }
    }
    return results;
}


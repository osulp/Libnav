var svg;

/**
 * Validation rules for all forms
 * @type {{name: {title: string, required: boolean, alphaNumeric: boolean}, number: {title: string, required: boolean, numeric: boolean}, capacity: {title: string, required: boolean, numeric: boolean}, url: {title: string, required: boolean, url: boolean}}}
 */
var rules = {
    
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


    // Initializes save result modal
    $('#modal-result').modal({'show': false});


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

    }

    return data;
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


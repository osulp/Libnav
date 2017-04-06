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

    // initialize ui with data
    initialize(); 

    // Initializes save result modal
    $('#modal-result').modal({'show': false});

    //  New user butten even handler
    $('#btn-model-new').on('click', function(){
        clearInputs();
        enableBtns();
        resetModal();
        updateTable();
    })

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

 /** Initilizes user form with data */
 function initialize(){


   $.when(getUsers()).done(function(userJSON){
    var users = JSON.parse(userJSON);
    users = modifyUserData(users);
    buildUserTable(users);
})
}

/**
 * Submits form data using ajax
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
        console.log(data);
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
        console.log("ERROR: insert user ajax call failed");
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
 * Gets input data from form
 * @returns {{}}
 */
 function clearInputs() {
    var data = {};
    // select all form input and textares
    var inputs = $('form :input:not(:button) ');

    // get form input data
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];

        // reset input value
        input.value = "";

        // reset results
        ShowResults('clear', input.name);
    }

    return data;
}

/**
 * Resets resutls modal messages
 */
 function resetModal(){
    if(!$('#modal-message-success').hasClass('hidden')){
        $('#modal-message-success').toggleClass('hidden');
    }
    if(!$('#modal-message-warning').hasClass('hidden')){
        $('#modal-message-warning').toggleClass('hidden');
    }
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

/* - - - - Datatable functionality - - - - */

function updateTable(){
    $('#user-table tbody').empty();
    $.when(getUsers()).done(function(userJSON){
        var users = JSON.parse(userJSON);
        users = modifyUserData(users);
        buildUserTable(users);
    })
}
/**
 * Gets all user from database
 * @return Json of user objects
 */
 function getUsers(){
    return $.ajax({
        type: "GET",
        async: true,
        url: '/userapi/get'
    });
}

/**
 * Deletes user from database with id
 * @param  {[int]} id [id of user]
 * @return {[json]} results of sql query
 */
 function deleteUser(id){
    $.ajax({
        type: "GET",
        async: true,
        url: '/userapi/delete/' + id
    })
    .done(function(results){
        $('#user-row-' + id).remove()
    })
    .fail(function(){
        console.log("ERROR: delte user ajax call failed");
    })
}

/**
 * Builds table of users
 * @param  {[type]}
 */
 function buildUserTable(data){
    $('#user-table').dataTable({           
        destroy: true,
        "order": [[0, "dec"]],
        data: data,
        "columns": [
        {"data": "id"},
        {"data": "first"},
        {"data": "last"},
        {"data": "onid"},
        {"data": "options"}
        ]
    });

    // Btn delete user
    $('#user-table').on('click', '[id*="btn-delete"]', function(){
        var id = this.id.replace('btn-delete-', '');
        deleteUser(id);
    });
}
/**
 * Addes a row id and buttons to user object
 * @param  {[type]}  
 * @return {[type]} 
 */
 function modifyUserData(data){
    for(var d in data){
        data[d]['options'] = '<div id="btn-delete-'+ data[d]['id'] + '" class="btn btn-danger">Delete</div>';
        data[d]['DT_RowId'] = 'user-row-' + data[d]['id'];
    }
    return data;
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
 * @param status
 * @param name
 * @constructor
 */
 function ShowResults(status, name) {
    var group = $('#' + name + '-group');

    if (status == 'error') {
        group.addClass('alert alert-danger');
    }
    else if (status == 'warning') {
        group.addClass('alert alert-warning');
    }
    else if (status == 'success') {
        group.removeClass('alert alert-danger');
        group.removeClass('alert alert-warning');
        group.addClass('alert alert-success');
    }
    else if(status == 'clear'){
        group.removeClass('alert alert-danger');
        group.removeClass('alert alert-warning');
        group.removeClass('alert alert-success');
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
        if (!data[d]) {

            results = false;
            break;
        }
    }
    return results;
}


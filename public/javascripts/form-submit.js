$(function () {


    // When form is submitted
    $('form').submit(function (event) {
        var formdata = {};
        var url = $('form').attr('href');

        // select all form input and textares
        var inputs = $('form :input:not(:button) ');

        // get form input data
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            formdata[input.name] = input.value
        }


        event.preventDefault();
        return false;
    });

});

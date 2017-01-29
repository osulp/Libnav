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

        // Submit data
        submit(formdata, url);

        event.preventDefault();
        return false;
    });

});

/**
 *
 * @param data
 * @param url
 */
function submit(data, url) {
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
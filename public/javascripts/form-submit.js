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
            if (input.name == 'tag' || input.name == 'attribute'){
                formdata[input.name] = splitText(input.value);
            }
            else {
                formdata[input.name] = input.value
            }
        }

        // adding data array
        formdata['points'] = pointArray;

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

function splitText(text){

    // remove non alphanumeric characters and replace with space
    text = text.replace(/[^0-9a-zA-Z, ]/gi, '');

    // split text on ',' and ' '
    text = text.split(/[ ,]+/);

    // creating new text vairiable
    var newtext = [];

    // scanning parsed text for empty strings.
    for(var t in text){
        if(text[t] != ""){
            newtext.push([,text[t]]);
        }
    }
    console.log(newtext);
    return newtext;
}
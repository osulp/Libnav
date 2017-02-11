$(function () {

    loadMap(1);

    $('#floor').change(function(){
        // remove the current map
        $('#map-wrapper').empty();
        loadMap($(this).val());


    });

    // When form is submitted
    $('form').submit(function (event) {

        var url = $('form').attr('href');

        var data = getInputData();


        // Submit data
        submit(data, url);

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
    return newtext;
}

function formatPoints(points){
    var newpoints = [];
    for(var p in points){
        newpoints.push([,points[p].y, points[p].x]);
    }

    return newpoints;

}

/**
 * Gets input data from form
 * @returns {{}}
 */
function getInputData(){
    var data ={};
    // select all form input and textares
    var inputs = $('form :input:not(:button) ');

    // get form input data
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        if (input.name == 'tag' || input.name == 'attribute'){
            data[input.name] = splitText(input.value);
        }
        else {
            data[input.name] = input.value
        }
    }

    return data;
}

function loadMap(id){
    var map = '/public/images/floor-' +id + '.svg';
    d3.xml(map, function(error, xml) {
        if (error) throw error;
        $('#map-wrapper').append(xml.documentElement);
    });
}
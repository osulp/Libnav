var data; 
var imgUpload;


$(function () {

    // When form is submitted
    $('form').submit(function (event) {
       
        //setting svg as data
    
           $.ajax({
            type: "POST",
            async: true,
            url: "/dashboard/mapupload",
            data: imgUpload,
            name: 'image'
        })
            .done(function (data) {
               console.log('data');
            })
            .fail(function () {
                console.log("Grid not saved");
            });
        
        

        // prevents native form actions from firing
        event.preventDefault();
        return false;
    });

});

$('#imgUpload').change(function(){

     imgUpload = this.value;
    
});

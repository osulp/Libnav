var data; 

$(function () {

    // When form is submitted
 /*   $('form').submit(function (event) {

        var data = event.currentTarget["0"].files["0"];
  
        var url = "/dashboard/mapupload";
        
        getBase64Image()
        
        uploadImg(data,url);
        
        event.preventDefault();
        
        return false;
    });*/
    
    
});

/*


function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
*/


var uploadImg = function (data, url) {

    var formData = new FormData();
    formData.append('file', data);
    
    if (data != undefined) {
        $.ajax({
            type: 'POST',
            async: true,
            url: url,
            data: formData,
            processData: false,
            contentType: "multipart/form-data",
            mimeType: 'multipart/form-data', 
        })
            .done(function (data) {
                console.log(data);
            })
            .fail(function () {
                console.log("Grid not saved");
            });
    }
}
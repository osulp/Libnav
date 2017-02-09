 $.ajax({
            type: "GET",
            async: true,
            url: '/home/location'
        })
                .done(function (data) {
                    console.log(data);
                    var result = JSON.parse(data);
                    console.log(result);
                })
                .fail(function () {
                    console.log("Ajax Failed.");
                });

var pointsArray = [];

      
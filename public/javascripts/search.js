
//this will return everything from the database.
function queryDatabase(){
    //add ajax call to call with the search function.
    var temp = false;    
     $.ajax({
        type: "get",
        async: false,
        url: '/mapapi/getSearch'
    })
        .done(function (data) {
           console.log(data);
           result = JSON.parse(data)
           temp = result;
           //temp = data
        })
        .fail(function () {
            console.log("Ajax Failed.")
        })
        return temp;
}


function selectShapeByName(svg,id){
    var p = d3.selectAll('#poly-' + id);

    p.style('fill', 'blue')

    var result = queryDatabase();

   // console.log(result.tags[0])
    searchWithFuse('example', result);

}


function searchWithFuse(searchString, objToSearch){
     var options = {
      shouldSort: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      verbose: false,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["attr", "name", "floor", "room_number", "room_cap"]
    }

    
    var fuse = new Fuse(objToSearch, options); // "list" is the item array
    var result = fuse.search(searchString);

    console.log(result)

}
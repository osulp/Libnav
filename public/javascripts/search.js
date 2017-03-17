
var data = [];
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


function selectShapeByName(svg, id){
    var p = d3.selectAll('#poly-' + id);

    p.style('fill', 'blue')

    var result = queryDatabase();

   // console.log(result.tags[0])
    searchWithFuse('hal', result);

}


function searchWithFuse(searchString, objToSearch){
     nArray = []
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
    
    for(var r in result){
        var item = returnAllNames(r.attrid, objToSearch)
        data.push(item);
    }



}

function returnAllNames(id, objToSearch){
    var nArray =[];
    var nameObject;
    var options = { 
      shouldSort: true,
      threshold: 0.0,
      location: 0,
      distance: 100,
      verbose: false,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["id"]
    }

    var fuse = new Fuse(objToSearch, options); // "list" is the item array
    var result = fuse.search(id);    

    for(var r in result){
        nameObject = {
            name: r.name,
            id: r.id
        }
        nArray.push(nameObject)
    }

    return nArray;

}


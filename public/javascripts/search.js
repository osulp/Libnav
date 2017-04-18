var searchObjs = null;
var searchResults = {};


$(function(){
    searchObjs = getSearchTerms();
});

//this will return everything from the database.
function getSearchTerms(){
    //add ajax call to call with the search function.
    var terms = false;
     $.ajax({
        type: "get",
        async: false,
        url: '/mapapi/getSearch'
    })
        .done(function (data) {
           result = JSON.parse(data);
           terms = result;
           //temp = data
        })
        .fail(function () {
            console.log("Ajax Failed.")
        });
        return terms;
}



function fuseSearch(searchString){
    searchResults = {};
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

    for(var l in locaitonArray){
      search.append (location[l]['tag']);
      search.append (location[l]['attribute']);
    }

    {
      id: 1,
      ...
      tags: "['tag','tag', 'tag','tag']",
      attr: "['arrt','arrt','attr','attr']"
    }
    
    var fuse = new Fuse(searchObjs, options); // "list" is the item array
    var result = fuse.search(searchString);
    for(var r in result){
        var id = null;
        if('attrid' in result[r]){
            id = result[r]['attrid'];
        }
        else if('tagid' in result[r]){
            id = result[r]['tagid'];
        }
        else if('id' in result[r]){
            id = result[r]['id'];
        }
        returnAllNames(id);
    }

}

function returnAllNames(id){
    // for each object
    for(var o in searchObjs){

        // if its id
        if('id' in searchObjs[o]){

            // check if id matches
            if(id == searchObjs[o].id){
                // check if it exist in the resutls
                if(!(id in searchResults)){
                    searchResults[searchObjs[o].id] = searchObjs[o].name;
                }
            }
        }

    }

}

function selectShapeByName(svg, id){
    var p = d3.selectAll('#poly-' + id);
    p.style('fill', 'blue')

}
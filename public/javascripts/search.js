var searchObjs = null;
var searchResults = {};


function fuseSearch(searchString, var_locations){
    var thresholdVal = null;
    var minCharVal = null;
    searchResults= {};
    if (searchString.length < 5){
        console.log("in first if")
        thresholdVal = 0.2
        minCharVal = 3
    }else if (searchString.length < 9){
         console.log("in first elif")
        thresholdVal = 0.5
        minCharVal = 5
    }else if (searchString.length > 8){
         console.log("in second elif")
        thresholdVal = 0.6
        minCharVal = 6 
    }else{
        console.log("in else")
        thresholdVal = 0.5
        minCharVal = 3
    }

    console.log("done with the if statements.")

     var options = {
      shouldSort: true,
      threshold: thresholdVal,
      location: 0,
      distance: 100,
      verbose: false,
      maxPatternLength: 32,
      minMatchCharLength: minCharVal,
      keys: ["attribute", "tag", "name", "floor", "room_number", "room_cap"]
    }

    
    var fuse = new Fuse(var_locations, options); // "list" is the item array
    var result = fuse.search(searchString);
    console.log(result)
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
        returnAllNames(id,result)
    }

}

function returnAllNames(id, result){
    console.log("in returnAllNames")
    
    // for each object
    for(var o in result){

        // if its id
        if('id' in result[o]){

            // check if id matches
            if(id == result[o].id){
                // check if it exist in the resutls
                if(!(id in searchResults)){
                        searchResults[o] = {'name':result[o].name,
                        'id':result[o].id,
                        'floor':result[o].floor
                    }
                    //searchResults.push(resobj) 
                    
                   // searchResults.push(resobj)
                }
            }
        }

    }
        console.log(searchResults);

}

function selectShapeByName(svg, id){
    var p = d3.selectAll('#poly-' + id);
    p.style('fill', 'blue')

}
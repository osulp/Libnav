var searchObjs = null;
var searchResults = {};

/********************
 * fuseSearch
 * parameters:
 * searchString:the string from the front end
 * var_locations: the massive location object that is queried from the 
 * database on load.
 * finds all matches to the search string and saves directly to a variable on 
 * the front end
 */
function fuseSearch(searchString, var_locations){
    var thresholdVal = null;
    var minCharVal = null;
    searchResults= {};

    //set the options based upon the length of the search parameter
    if (searchString.length < 5){
        thresholdVal = 0.2
        minCharVal = 3
    }else if (searchString.length < 9){
        thresholdVal = 0.5
        minCharVal = 5
    }else if (searchString.length > 8){

        thresholdVal = 0.6
        minCharVal = 6 
    }else{
        thresholdVal = 0.5
        minCharVal = 3
    }

    //set all fuse options
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

    
    var fuse = new Fuse(var_locations, options); 
    var result = fuse.search(searchString);
    //get the names for the result
    for(var r in result){
        var id = null;
        if('id' in result[r]){
            id = result[r]['id'];
        }
        returnAllNames(id,result)
    }

}


/*********************************
 * returnAllNames
 * return: the name of the location with the correct id
 * parameters:
 * id: the id of the location 
 * result: the object containing all locations that have matches the search string
 * This will find all names with the proper search string and will append them 
 * to the list of search results for use by the search results in the front end.
 */
function returnAllNames(id, result){
   
    
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
                
                }
            }
        }

    }

}

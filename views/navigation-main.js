$( document ).ready(function() {

    var boxDiv = $(".boxMap");
    
var lastClicked;
var startFlag = true;
var finishFlag = false;
var notWalkFlag = false;
    
var startPos;
var finishPos;

var grid = clickableGrid(10,10,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);
    el.className='clicked';
    
    if(startFlag){
        startPos = [row,col+1];
        startFlag = false;
        finishFlag = true;
    }else if(finishFlag){
        finishPos = [row,col+1];
        finishFlag = false;
    }else{
        notWalkFlag = false;
    }
    
    if(startFlag!=true && finishFlag!=true){
        var gridCalc = new PF.Grid(11,11);
        var finder = new PF.AStarFinder();
        var path = finder.findPath(startPos[0],startPos[1],finishPos[0],finishPos[1],gridCalc);
        startFlag=false;
        finishFlag=false;
        
        
        var colorPath = [];
        for(var x = 0; x<path.length; x++){
            if(path[x][1] == 0){
                colorPath[x] = "" + path[x][0] + ""; 
            }else{
                colorPath[x] = "" + path[x][0] + path[x][1] + ""; 
            }
        }
                
        $('td').each(function(){
            var value = $(this).html();
            for(var p = 0; p<colorPath.length; p++){
                if(value == colorPath[p]){
                    $(this).addClass("clicked");
                }
            }
        });
            

    }
    
});

boxDiv.append(grid);
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            cell.innerHTML = ++i;
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}
    
    
    
    
});


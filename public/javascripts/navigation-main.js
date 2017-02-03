window.onload=function(){
    
var walkable = true;
    
    
$("#setWalkTrue").on("click",function(){
    walkable = true;    
});    
$("#setWalkFalse").on("click",function(){
    walkable = false;    
});   

   
    
$("#map").ready(function(){
    
    var a = document.getElementById("map");
    var svgDoc = a.contentDocument;
	var svgItem = svgDoc.getElementById("base"); 


$("#navGrid").ready(function(){

    var startFlag = true;
      var finishFlag = false;
      var notWalkFlag = false;
      var startPos;
      var finishPos;    
        
    
  var square = 12,
  w = svgItem.clientWidth,
  h = svgItem.clientHeight;

// create the svg
var svg = d3.select('#grid').append('svg')
  .attr({
    width: w,
    height: h
  });

    
    
    
// calculate number of rows and columns
var squaresRow = _.round(w / square);
var squaresColumn = _.round(h / square);
    
    
//set grid
var gridCalc = new PF.Grid(squaresColumn+1,squaresRow+1);
//nonwalk
_.times(squaresColumn, function(n){
    
    _.times(squaresRow,function(m){
        gridCalc.setWalkableAt(n,m,false);
        var recID = "s-" + n + "-"+ m;  
        svg.select("rect[id='"+recID+"']").attr('fill', 'grey');
    });
    
    
});
    
    
// loop over number of columns
_.times(squaresColumn, function(n) {

  // create each set of rows
  var rows = svg.selectAll('rect' + ' .row-' + (n + 1))
    .data(d3.range(squaresRow))
    .enter().append('rect').attr("fill-opacity", '.3')
    .attr({
      class: function(d, i) {
        return 'square row-' + (n + 1) + ' ' + 'col-' + (i + 1);
      },
      id: function(d, i) {
        return 's-' + (n + 1) +"-"+ (i + 1);
      },
      width: square,
      height: square,
      x: function(d, i) {
        return i * square;
      },
      y: n * square,
      stroke: '#FDBB30'
    });

    
    
    var isDragging = false;
    var allRectangles = svg.selectAll('rect');
    
    $("#hideGrid").on("click",function(){
        allRectangles.attr("stroke",'none');
        allRectangles.each(function(){
            var x = this;
            if(this.attributes.getNamedItem("path") == null){
                this.attributes.getNamedItem("fill-opacity").value = 0;
            }else{
                this.attributes.getNamedItem("fill-opacity").value = .7;
            }
        });
    }); 
    
    var makeWalkMouseDown = allRectangles.on('mousedown',function(){
      isDragging = true;
    });
     
    var makeWalkMouseDrag = allRectangles.on('mousemove',function(){
      var pos = this.id.split('-');
      var row = pos[1];
      var col = pos[2];
      if(isDragging){
        if(walkable){
            var thisRec = svg.select("rect[id='"+this.id+"']").attr('fill', 'white');
            thisRec.attr("walkable",true)
            gridCalc.setWalkableAt(row,col,true);
        }else{
            svg.select("rect[id='"+this.id+"']").attr('fill', 'grey');
            gridCalc.setWalkableAt(row,col,false);  
        }
        }
    });
     var makemouseUp = allRectangles.on('mouseup',function(){
        var wasDragging = isDragging;
            isDragging = false;
            if (!wasDragging) {
            }    
     });
    
    
    
  var drawLine = rows.on('click', function (d, i) {
      
        var pos = this.id.split('-');
        var row = pos[1];
        var col = pos[2];
        if(startFlag){
            startPos = [row,col];
            startFlag = false;
            finishFlag = true;
            d3.select(this).attr('fill', 'green');

        }else if(finishFlag){
            finishPos = [row,col];
            finishFlag = false;
            d3.select(this).attr('fill', 'red');
        }else{
            notWalkFlag = false;
        }
        
    if(startFlag!=true && finishFlag!=true){
     var finder = new PF.AStarFinder();
     var path = finder.findPath(startPos[0],startPos[1],finishPos[0],finishPos[1],gridCalc);
     startFlag=false;
     finishFlag=false;
       
        
        for(var x = 1; x<path.length-1; x++){
            var recID = "s-" +path[x][0] + "-"+ path[x][1];  
            svg.select("rect[id='"+recID+"']").attr('fill', 'blue');
        }
        
        for(var x = 0; x<path.length; x++){
            var recID = "s-" +path[x][0] + "-"+ path[x][1];  
            svg.select("rect[id='"+recID+"']").attr("path",'true');
        }    
        
    }
        
      d3.select('#grid-ref').text(function () {
        return 'row: ' + (n + 1) + ' | ' + 'column: ' + (i + 1);
      });
          
        
    });
});
    
});
    
    
    
    
    
    
    
    
    /*var a = document.getElementById("map");
    console.log(a);
	var svgDoc = a.contentDocument;
	var svgItem = svgDoc.getElementById("base"); 
    var svg = d3.select(svgItem);
    var navLayer = svg.append('g').attr('id','navLayer');
    for(var h = 0 ; h < svgItem.clientHeight; h += 11){
        for(var w = 0; w < svgItem.clientWidth; w += 20){
            if(h==0|| w == 0){
                
            }else{
               var circle = navLayer.append('circle').attr('cx', w).attr('cy', h).attr('r', 1).attr('onclick', navThis()).style("fill", "rgba(0,0,0,.5)");
               
            }
        }
    }
    
    var arryCIrc = circle.selectAll();*/
  
    
    
});

    
    
/*var lastClicked;
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
}*/
    
    
    
    
};


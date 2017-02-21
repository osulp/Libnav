window.onload = function () {

    $("#map-group").ready(function () {

        
        //select svg
        var a = document.getElementById("map-wrapper");
        var svgDoc = a.contentDocument;
        var svgChildren = svgDoc.childNodes;
        var svgItem = svgChildren[2];
        
        var mainMapSVG = d3.select(svgItem.children[1]);
        
        selectrects(mainMapSVG);
        selectpolygons(mainMapSVG);
        selectpolylines(mainMapSVG);
        selectelipses(mainMapSVG);
        
        
    });

        
    function selectrects(mainMapSVG){
        
        //select rectangles
        var rects = mainMapSVG.selectAll("rect");
        
        //give rectangles fill    
        _.times(rects._groups[0].length, function(g){
            
            rects._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        rects.on("mouseenter",function(){
                this.attributes.getNamedItem("fill").value = "lightblue";                
            });
        
        rects.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
        
        //get data on click
        rects.on("click",function(){
            
            var x = this.attributes.getNamedItem("x").value;
            var y = this.attributes.getNamedItem("y").value;
            var rectW = this.attributes.getNamedItem("width").value;
            var rectH = this.attributes.getNamedItem("height").value;
            var rectInfo = " x: " + x + " y: " + y + " rectW: " + rectW + " rectH: " + rectH;
            console.log(rectInfo);
            this.attributes.getNamedItem("fill").value = "red";          
        });

    }
        
    function selectpolygons(mainMapSVG){

        //polygons
        var polygon = mainMapSVG.selectAll("polygon");
        
            
        _.times(polygon._groups[0].length, function(g){
            
            polygon._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        polygon.on("mouseenter",function(){
                
                this.attributes.getNamedItem("fill").value = "lightgreen";
                
            });
        
        polygon.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
         polygon.on("click",function(){
            
            var points = this.attributes.getNamedItem("points").value;

            console.log(points);
            this.attributes.getNamedItem("fill").value = "red";          
        });
        
    }
    
    function selectpolylines(mainMapSVG){

         //polylines
        var polylines = mainMapSVG.selectAll("polyline");
        
            
        _.times(polylines._groups[0].length, function(g){
            
            polylines._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        polylines.on("mouseenter",function(){
                
                this.attributes.getNamedItem("fill").value = "yellow";
                
            });
        
        polylines.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
         polylines.on("click",function(){
            
            var points = this.attributes.getNamedItem("points").value;

            console.log(points);
            this.attributes.getNamedItem("fill").value = "red";          
        });
    }
    
    function selectelipses(mainMapSVG){
        
        //elipses
        
        var ellipse = mainMapSVG.selectAll("ellipse");
        
            
        _.times(ellipse._groups[0].length, function(g){
            
            ellipse._groups[0][g].attributes.getNamedItem("fill").value = "white";
            
        });
        
        ellipse.on("mouseenter",function(){
                
                this.attributes.getNamedItem("fill").value = "lightred";
                
            });
        ellipse.on("mouseleave",function(){
            this.attributes.getNamedItem("fill").value = "white";  
        });
        
         ellipse.on("click",function(){
            
            var cx = this.attributes.getNamedItem("cx").value;
            var cy = this.attributes.getNamedItem("cy").value;
            var rx = this.attributes.getNamedItem("rx").value;
            var ry = this.attributes.getNamedItem("ry").value;
            var ellipseInfo = " cx: " + cx + " cy: " + cy + " rx: " + rx + " ry: " + ry;
            console.log(ellipseInfo);
            this.attributes.getNamedItem("fill").value = "red";          
        });
    }
        
        
};
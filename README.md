# Valley Library Interactive Map

**[Progress Blog](https://github.com/NathanHealea/ValleyLibraryInteractiveMap/wiki/)**


How-to

## System Reqirements
* Operating System: Centos 6.8
* Web Service: Apache 2
* Database: MySQL v5.1.73
* PHP: v5.3.3
* Nodjs: v7.4.0
* Git: v1.7.1


### Navigation -  Navigating between two points 

* Click on the beginning location and in the tooltip select start location.
* Click on the destination and in the tooltip select the end destination.
* Then in the side bar click start and a line will appear from one location to the next.

### Navigation – changing the grids

* Once you login, click on the navigation tab
* Click on the “Walkable” button. This will allow you to designate squares on the grid as a walkable path. 
* If you want to designate a non-walkable area, click on the “Unwalkable” and mark the locations on the grid. 
* The black locations on the grid are all the entry points for the rooms. They should all be connected. 
* You can test a path by selecting the “Test” button, and then clicking on two grid squares. A line will be drawn if there is an available path between the two selected points. Hit “Clear” to clear. 
* Hit save to save the grid. It will now be used on the home page for navigation for that floor. 

### Map Upload

* Select SVG Map to upload
* Select Floor
* Hit Upload


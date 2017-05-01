# Valley Library Interactive Map

**[Progress Blog](https://github.com/NathanHealea/ValleyLibraryInteractiveMap/wiki/)**

## System Reqirements
* Operating System: Centos 6.8
* Web Service: Apache 2
* Database: MySQL v5.1.73
* PHP: v5.3.3
* Nodjs: v7.4.0
* Git: v1.7.1
* Networking:
  * This application, to have all features fully working, must be ran under the url fw-libnav.eecs.oregonstate.edu located on a Intel located at Kelly Engineering at Oregon State Universirty hardwired into the Universirty network.

## Installiation 
1. Clone repo into directory of choice. suggested /var/www/
	1. Give 775 permission to all files in cloned dicrectary.
2. CD into cloned directory
3. run npm install in directory containing the packaged.js
4. Set up database
	1. Create a mysql database ex.'libnav'
	2. Run docs/createAllTables.sql targiting the database you just created using relitive paths.
		1. mysql -u user -p mydatabase < createAllTables.sql
	3. If you would like to use demo data run the follow command using a relitive path.
		1. mysql -u user -p mydatabases < libnav-data.sql
4. Make directory 'config' with permisison 775
5. Run pm2 start bin/www
	1. The NodeJS application will be running on port 3000
6. Navigation to 'baseurl'/setup
	1. fill out information in form.
7. Restart apllicaiton by running pm2 restart 'you process id from step 5'
8. Application is fully setup.

#### Special instuction 
1. This apllicaiton uses Central Access Service (CAS), so some features do not work unless this applicaiton can utilize CAS
	1. The main user login, located on the homepage uses CAS. You can still access the dashbaord by going to the following url and entering the master username and password uesed in the setup script.
	2. 'url'/user/login/master
2. If you have access to CAS at you instituion you can change the following code to enable the login button on the homepage.
	1. ./routes/user.js
	2. Line 10: Change url in redirect to your institution redirect, but retain the follow for the call back '/user/login/authenticate'
	3. Lines 22 - 24: do the same thing as above for you institution but still retain the following for the callback '/user/login/authenticate' 
	4. These changes will different depending on how CAS is used at your institution

## Navigation -  Navigating between two points 

* Click on the beginning location and in the tooltip select start location.
* Click on the destination and in the tooltip select the end destination.
* Then in the side bar click start and a line will appear from one location to the next.

## Navigation – changing the grids

* Once you login, click on the navigation tab
* Click on the “Walkable” button. This will allow you to designate squares on the grid as a walkable path. 
* If you want to designate a non-walkable area, click on the “Unwalkable” and mark the locations on the grid. 
* The black locations on the grid are all the entry points for the rooms. They should all be connected. 
* You can test a path by selecting the “Test” button, and then clicking on two grid squares. A line will be drawn if there is an available path between the two selected points. Hit “Clear” to clear. 
* Hit save to save the grid. It will now be used on the home page for navigation for that floor. 

## Map Upload

* Select SVG Map to upload
* Select Floor
* Hit Upload


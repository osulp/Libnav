CREATE TABLE Floor(
   id INT AUTO_INCREMENT PRIMARY KEY,
   name  varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE Type (
	id int AUTO_INCREMENT PRIMARY KEY,
	type varchar(255)
);

CREATE TABLE Roles (
	id int AUTO_INCREMENT PRIMARY KEY,
	role varchar(255)
	Key PK (id)
);

CREATE TABLE Attributes (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(255)
);

CREATE TABLE IF NOT EXISTS LocationTAG (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
FOREIGN KEY (location_id) REFERENCES Location (id),
FOREIGN KEY (tag_id) REFERENCES Tag (id),
FOREIGN KEY (floor_id) REFERENCES Floor (id),
ON UPDATE CASCADE
ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS LocationAttributes (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
FOREIGN KEY (location_id) REFERENCES Location (id),
FOREIGN KEY (attribute) REFERENCES Attributes (id),
ON UPDATE CASCADE
ON DELETE CASCADE
);


CREATE TABLE Tag (
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(255)
);

CREATE TABLE IF NOT EXISTS Users (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
onid varchar(255),
FOREIGN KEY (role_ID) REFERENCES Roles (id),
ON UPDATE CASCADE
ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Gridpoint (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
x-coordinate int,
y-coordinate int,
FOREIGN KEY (location_id) REFERENCES Location (id),
ON UPDATE CASCADE
ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Location (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	floor_id int,
	type varchar(255),
	name varchar(255),
	room_number int,
	URL varchar(255),
	FOREIGN KEY (floor_id) REFERENCES Floor (id),
	ON UPDATE CASCADE
	ON DELETE CASCADE
);


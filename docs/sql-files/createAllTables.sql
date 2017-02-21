/*CREATE TABLE floor (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);*/

CREATE TABLE type (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255)
);

/*CREATE TABLE Attributes (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);*/

/*CREATE TABLE Tag (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);*/


CREATE TABLE IF NOT EXISTS location (
  id          INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  floor       INT,
  type        VARCHAR(255),
  name        VARCHAR(255),
  room_number INT,
  room_cap    INT,
  URL         VARCHAR(255),
  data_point  TEXT


);

CREATE TABLE IF NOT EXISTS gridpoint (
  id          INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  location_id INT             NOT NULL,
  x           INT,
  y           INT,
  FOREIGN KEY (location_id) REFERENCES location (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


/*CREATE TABLE IF NOT EXISTS locationtag (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  FOREIGN KEY (location_id) REFERENCES location (id),
  FOREIGN KEY (tag_id) REFERENCES Tag (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  FOREIGN KEY (floor_id) REFERENCES floor (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);*/

CREATE TABLE IF NOT EXISTS attribute (
  id          INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  location_id INT             NOT NULL,
  attr        VARCHAR(255),
  FOREIGN KEY (location_id) REFERENCES location (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tag (
  id          INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  location_id INT             NOT NULL,
  attr        VARCHAR(255),
  FOREIGN KEY (location_id) REFERENCES location (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS point (
  id          INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  location_id INT             NOT NULL,
  y           INT,
  x           INT,
  FOREIGN KEY (location_id) REFERENCES location (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);


/*CREATE TABLE roles (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(255)
);*/

/*CREATE TABLE IF NOT EXISTS users (
  id   INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  onid VARCHAR(255),
  FOREIGN KEY (role_ID) REFERENCES roles (id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);*/



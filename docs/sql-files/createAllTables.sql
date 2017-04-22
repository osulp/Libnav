CREATE TABLE IF NOT EXISTS location (
  id            INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  floor         INT,
  type          VARCHAR(255),
  name          VARCHAR(255),
  color         VARCHAR(255),
  display       BOOLEAN,
  room_number   INT,
  room_cap      INT,
  url           VARCHAR(255),
  entry_point   VARCHAR(255),
  option_config LONGTEXT,
  tag LONGTEXT,
  attribute     LONGTEXT,
  data_point    LONGTEXT

);

/*CREATE TABLE IF NOT EXISTS attribute (
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
);*/

CREATE TABLE IF NOT EXISTS grid (
  id    INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  floor INT             NOT NULL,
  data  LONGTEXT
);

/*CREATE TABLE roles (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(255)
);*/

CREATE TABLE IF NOT EXISTS user (
  id    INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  onid  VARCHAR(255),
  first VARCHAR(255),
  last  VARCHAR(255)
);



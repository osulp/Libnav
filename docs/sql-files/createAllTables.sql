CREATE TABLE `Floor` (
  `id` int,
  `name ` varchar(255),
  PRIMARY KEY (`id`)
);

CREATE TABLE `Type` (
  `id ` int,
  `type` varchar(255),
  PRIMARY KEY (`id `)
);

CREATE TABLE `Roles` (
  `id ` int,
  `role` varchar(255),
  KEY `Pk` (`id `)
);

CREATE TABLE `Atributes` (
  `id ` int,
  `name ` varchar(255),
  PRIMARY KEY (`id `)
);

CREATE TABLE `LocationTag` (
  `id ` int,
  `location_id` int,
  `tag_id` int,
  PRIMARY KEY (`id `),
  KEY `FK ` (`location_id`),
  KEY `FK` (`tag_id`)
);

CREATE TABLE `LocationAttributes` (
  `id` int,
  `location_id` int,
  `attribute` id,
  PRIMARY KEY (`id`),
  KEY `FK` (`location_id`, `attribute`)
);

CREATE TABLE `Tag` (
  `id ` int,
  `name` varchar(255),
  PRIMARY KEY (`id `)
);

CREATE TABLE `Users` (
  `Id ` int,
  `role_id` int,
  `Onid` varchar(255),
  PRIMARY KEY (`Id `),
  KEY `fk ` (`role_id`)
);

CREATE TABLE `Gridpoint` (
  `id` int,
  `Location_id` int,
  `x-corrdinate` int,
  `y-corrdinate` int,
  PRIMARY KEY (`id`),
  KEY `FK` (`Location_id`)
);

CREATE TABLE `Location` (
  `id ` int,
  `floor_id` int,
  `type` varchar(225),
  `name` varchar(255),
  `room_number` int,
  `URL` varchar(255),
  PRIMARY KEY (`id `),
  KEY `FK` (`floor_id`, `type`)
);


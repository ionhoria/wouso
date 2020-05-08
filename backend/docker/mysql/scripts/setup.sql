CREATE TABLE `QotdQuestion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) NOT NULL,
  `answers` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=395 DEFAULT CHARSET=utf8;


INSERT INTO `QotdQuestion` VALUES (1,'Pentru a crea un fișier gol în directorul curent, folosim comanda următoare:','{\"valid\": \"touch\", \"invalid\": [\"make\", \"create\", \"file\"]}','2018-12-11 19:05:00','2018-12-11 19:05:00'),(2,'Pentru a șterge directorul (gol) \"trash\" din directorul curent, folosim comanda:','{\"valid\": \"rmdir trash\", \"invalid\": [\"rm \\\"trash\\\"\", \"delete \\\"trash\\\"\", \"rm -d trash\"]}','2018-12-11 19:05:00','2018-12-11 19:05:00')
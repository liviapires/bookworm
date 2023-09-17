-- query to create the table 'addresses' in the database 'teste'

CREATE TABLE `teste`.`addresses` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `cep` varchar(8) NOT NULL,
  `street` varchar(255) NOT NULL,
  `addressNumber` varchar(10) NOT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- query to create the table 'phones' in the database 'teste'

CREATE TABLE `teste`.`phones` (
  `phoneId` int NOT NULL AUTO_INCREMENT,
  `ddd` varchar(2) NOT NULL,
  `phoneNumber` varchar(25) NOT NULL,
  `type` ENUM('Comercial', 'Casa', 'Trabalho', 'Celular') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`phoneId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- query to create cards table

CREATE TABLE `teste`.`cards` (
  `cardId` int NOT NULL AUTO_INCREMENT,
  `cardNumber` varchar(16) NOT NULL,
  `cardName` varchar(255) NOT NULL,
  `expirationDate` varchar(255) NOT NULL,
  `cardFlag` ENUM('Visa', 'Mastercard', 'Elo', 'American Express') NOT NULL,
  `cvv` varchar(3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`cardId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- query to create the table 'clients' in the database 'teste' with the foreign keys 'addressesIds' and 'phonesIds' to the tables 'addresses', 'phones' and 'cards' in the database 'teste'

CREATE TABLE `teste`.`clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `gender` ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `ranking` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `addressesIds` int NOT NULL,
  `phonesIds` int NOT NULL,
  `cardsIds` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addressesIds` (`addressesIds`),
  KEY `phonesIds` (`phonesIds`),
  KEY `cardsIds` (`cardsIds`),
  CONSTRAINT `addressIds` FOREIGN KEY (`addressesIds`) REFERENCES `addresses` (`addressId`),
  CONSTRAINT `phonesIds` FOREIGN KEY (`phonesIds`) REFERENCES `phones` (`phoneId`),
  CONSTRAINT `cardsIds` FOREIGN KEY (`cardsIds`) REFERENCES `cards` (`cardId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
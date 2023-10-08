-- create table clients

CREATE TABLE `teste`.`clients` (
  `clientId` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`clientId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table addresses with zipCode, street, addressNumber, neighborhood, city, state, country, complement, observation, createdAt, updatedAt and clientId

CREATE TABLE `addresses` (
  `addressId` int NOT NULL AUTO_INCREMENT,
  `zipCode` varchar(8) NOT NULL,
  `street` varchar(255) NOT NULL,
  `addressNumber` varchar(10) NOT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `clientId` int NOT NULL,
  PRIMARY KEY (`addressId`),
  CONSTRAINT `fk_address_clientId` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table phones with ddd, phoneNumber, type, createdAt, updatedAt and clientId

CREATE TABLE `phones` (
  `phoneId` int NOT NULL AUTO_INCREMENT,
  `ddd` varchar(2) NOT NULL,
  `phoneNumber` varchar(25) NOT NULL,
  `type` ENUM('Comercial', 'Residencial', 'Celular') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `clientId` int NOT NULL,
  PRIMARY KEY (`phoneId`),
  CONSTRAINT `fk_phone_clientId` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table cards with cardNumber, cardName, expirationDate, cardFlag, cvv, createdAt, updatedAt and clientId

CREATE TABLE `cards` (
  `cardId` int NOT NULL AUTO_INCREMENT,
  `cardNumber` varchar(16) NOT NULL,
  `cardName` varchar(255) NOT NULL,
  `expirationDate` varchar(255) NOT NULL,
  `cardFlag` ENUM('Visa', 'Mastercard', 'Elo', 'American Express') NOT NULL,
  `cvv` varchar(3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `clientId` int NOT NULL,
  PRIMARY KEY (`cardId`),
  CONSTRAINT `fk_card_clientId` FOREIGN KEY (`clientId`) REFERENCES `clients` (`clientId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table books with title, author, publisher, edition, year, pages, isbn, language, createdAt, updatedAt

CREATE TABLE `books` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `edition` varchar(255) NOT NULL,
  `year` varchar(4) NOT NULL,
  `pages` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`bookId`), ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table categories with name, createdAt, updatedAt

CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table books_categories with bookId, categoryId, createdAt, updatedAt

CREATE TABLE `books_categories` (
  `bookId` int NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`bookId`, `categoryId`),
  CONSTRAINT `fk_bookId` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
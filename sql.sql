-- create table clients

CREATE TABLE `bookworm`.`clients` (
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

CREATE TABLE `bookworm`.`addresses` (
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

CREATE TABLE `bookworm`.`phones` (
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

CREATE TABLE `bookworm`.`cards` (
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

CREATE TABLE `bookworm`.`books` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `edition` varchar(255) NOT NULL,
  `year` varchar(4) NOT NULL,
  `pages` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table categories with name, createdAt, updatedAt

CREATE TABLE `bookworm`.`categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table books_categories with bookId, categoryId, createdAt, updatedAt

CREATE TABLE `bookworm`.`books_categories` (
  `bookId` int NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`bookId`, `categoryId`),
  CONSTRAINT `fk_bookId` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- insert into categories 10 different categories

INSERT INTO `bookworm`.`categories` (`name`, `createdAt`) VALUES 
  ('Ação', '2021-05-10 00:00:00'),
  ('Aventura', '2021-05-10 00:00:00'),
  ('Biografia', '2021-05-10 00:00:00'),
  ('Comédia', '2021-05-10 00:00:00'),
  ('Drama', '2021-05-10 00:00:00'),
  ('Ficção Científica', '2021-05-10 00:00:00'),
  ('História', '2021-05-10 00:00:00'),
  ('Infantil', '2021-05-10 00:00:00'),
  ('Romance', '2021-05-10 00:00:00'),
  ('Terror', '2021-05-10 00:00:00');

-- insert into books 10 different books

INSERT INTO `bookworm`.`books` (`title`, `author`, `publisher`, `edition`, `year`, `pages`, `isbn`, `language`, `price`, `image`, `createdAt`) VALUES
('Livro 1', 'Autor 1', 'Editora 1', 'Edição 1', '2023', '300', '1234567890', 'Português', 29.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 2', 'Autor 2', 'Editora 2', 'Edição 2', '2022', '250', '0987654321', 'Inglês', 19.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 3', 'Autor 3', 'Editora 3', 'Edição 1', '2021', '320', '5432109876', 'Espanhol', 24.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 4', 'Autor 4', 'Editora 4', 'Edição 3', '2020', '280', '1357924680', 'Francês', 22.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 5', 'Autor 5', 'Editora 5', 'Edição 1', '2019', '400', '2468135790', 'Alemão', 34.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 6', 'Autor 6', 'Editora 6', 'Edição 2', '2018', '270', '9876543210', 'Italiano', 18.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 7', 'Autor 7', 'Editora 7', 'Edição 1', '2017', '350', '0123456789', 'Português', 27.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 8', 'Autor 8', 'Editora 8', 'Edição 4', '2016', '310', '5678901234', 'Inglês', 21.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 9', 'Autor 9', 'Editora 9', 'Edição 1', '2015', '290', '9870123456', 'Espanhol', 23.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW()),
('Livro 10', 'Autor 10', 'Editora 10', 'Edição 5', '2014', '260', '6789012345', 'Francês', 25.99, 'https://edit.org/images/cat/book-covers-big-2019101610.jpg', NOW());

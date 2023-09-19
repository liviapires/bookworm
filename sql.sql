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

-- create table books with title, year, publisher, edition, isbn, pages, synopsis, height, width, depth, weight, price, barcode, categoryId, createdAt, updatedAt

CREATE TABLE `teste`.`books` (
  `bookId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `year` varchar(4) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `edition` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `pages` varchar(255) NOT NULL,
  `synopsis` text NOT NULL,
  `height` varchar(255) NOT NULL,
  `width` varchar(255) NOT NULL,
  `depth` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `barcode` varchar(255) NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`bookId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- create table categories with name, createdAt, updatedAt

CREATE TABLE `teste`.`categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- insert 4 random books into the table books

INSERT INTO `teste`.`books` (`title`, `year`, `publisher`, `edition`, `isbn`, `pages`, `synopsis`, `height`, `width`, `depth`, `weight`, `price`, `barcode`, `categoryId`, `createdAt`, `updatedAt`) 
  VALUES ('O Senhor dos Anéis', '1954', 'Allen & Unwin', '1', '978-0-04-823045-6', '423', 'O Senhor dos Anéis é um romance de fantasia criado pelo escritor, professor e filólogo britânico J. R. R. Tolkien. A história começa como seqüência de um livro anterior de Tolkien, O Hobbit (1937), e logo se desenvolve numa história muito maior. Foi escrito entre 1937 e 1949, com muitas partes criadas durante a Segunda Guerra Mundial. Embora Tolkien tenha planejado realizá-lo em volume único, foi originalmente publicado em três volumes entre 1954 e 1955, e foi assim, em três volumes, que se tornou popular. Desde então foi reimpresso várias vezes e foi traduzido para mais de 40 línguas, tornando-se um dos trabalhos mais populares da literatura do século XX.', '23', '15', '3', '1', '100.00', '978-0-04-823045-6', '2', '2020-10-10 00:00:00', NULL);

INSERT INTO `teste`.`books` (`title`, `year`, `publisher`, `edition`, `isbn`, `pages`, `synopsis`, `height`, `width`, `depth`, `weight`, `price`, `barcode`, `categoryId`, `createdAt`, `updatedAt`)
  VALUES ('O Hobbit', '1937', 'Allen & Unwin', '1', '978-0-04-823045-6', '423', 'O Hobbit é um livro infantojuvenil de alta fantasia, escrito pelo filólogo e professor britânico J. R. R. Tolkien. Publicado originalmente em 21 de setembro de 1937, na Inglaterra e um ano depois nos Estados Unidos, a obra se tornou um clássico da literatura infantojuvenil e é um dos livros mais vendidos até hoje.', '23', '15', '3', '1', '55.20', '978-0-04-823045-6', '2', '2020-10-10 00:00:00', NULL);

INSERT INTO `teste`.`books` (`title`, `year`, `publisher`, `edition`, `isbn`, `pages`, `synopsis`, `height`, `width`, `depth`, `weight`, `price`, `barcode`, `categoryId`, `createdAt`, `updatedAt`)
  VALUES ('O Silmarillion', '1977', 'Allen & Unwin', '1', '978-0-04-823045-6', '423', 'O Silmarillion é uma coletânea de mitos do escritor britânico J. R. R. Tolkien, editada e publicada postumamente em 1977 por seu filho Christopher Tolkien com a ajuda de Guy Gavriel Kay. Trata-se, essencialmente, da história da criação do universo ficcional onde se passam os romances O Hobbit, O Senhor dos Anéis e O Silmarillion propriamente dito, e que é conhecido como "Terra Média".', '23', '15', '3', '1', '60.00', '978-0-04-823045-6', '2', '2020-10-10 00:00:00', NULL);

INSERT INTO `teste`.`books` (`title`, `year`, `publisher`, `edition`, `isbn`, `pages`, `synopsis`, `height`, `width`, `depth`, `weight`, `price`, `barcode`, `categoryId`, `createdAt`, `updatedAt`)
  VALUES ('O Pequeno Príncipe', '1943', 'Reynal & Hitchcock', '1', '978-0-04-823045-6', '423', 'O Pequeno Príncipe é um romance do escritor francês Antoine de Saint-Exupéry, publicado em 1943 nos Estados Unidos. A princípio, aparentando ser um livro para crianças, tem um grande teor poético e filosófico. É o livro francês mais vendido no mundo, cerca de 145 milhões de exemplares, e entre 400 a 500 edições.', '23', '15', '3', '1', '20.50', '978-0-04-823045-6', '2', '2020-10-10 00:00:00', NULL);

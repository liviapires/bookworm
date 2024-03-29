-- ************************************** `users`
CREATE TABLE `users` (
    `userId` integer NOT NULL AUTO_INCREMENT,
    `code` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `admin` tinyint NOT NULL,
    `gender` varchar(255) NOT NULL,
    `birthDate` date NOT NULL,
    `cpf` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `ranking` integer NOT NULL,
    `role` varchar(255) NOT NULL,
    `active` tinyint NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `addresses`
CREATE TABLE `addresses` (
    `addressId` integer NOT NULL AUTO_INCREMENT,
    `residenceType` varchar(255) NOT NULL,
    `street` varchar(255) NOT NULL,
    `number` varchar(255) NOT NULL,
    `neighborhood` varchar(255) NOT NULL,
    `zipCode` varchar(255) NOT NULL,
    `city` varchar(255) NOT NULL,
    `state` varchar(255) NOT NULL,
    `country` varchar(255) NOT NULL,
    `complement` text NOT NULL,
    `notes` text NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `userId` integer NOT NULL,
    PRIMARY KEY (`addressId`),
    KEY `FK_1` (`userId`),
    CONSTRAINT `FK_4` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `phones`
CREATE TABLE `phones` (
    `phoneId` integer NOT NULL AUTO_INCREMENT,
    `ddd` varchar(255) NOT NULL,
    `phoneNumber` varbinary(255) NOT NULL,
    `phoneType` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `userId` integer NOT NULL,
    PRIMARY KEY (`phoneId`),
    KEY `FK_1` (`userId`),
    CONSTRAINT `FK_5` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `creditCards`
CREATE TABLE `creditCards` (
    `cardId` integer NOT NULL AUTO_INCREMENT,
    `cardNumber` varchar(255) NOT NULL,
    `cardName` varchar(255) NOT NULL,
    `cardFlag` varchar(255) NOT NULL,
    `securityCode` varchar(255) NOT NULL,
    `expirationDate` varchar(255) NOT NULL,
    `preferred` tinyint NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `userId` integer NOT NULL,
    PRIMARY KEY (`cardId`),
    KEY `FK_1` (`userId`),
    CONSTRAINT `FK_3` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `pricingGroups`
CREATE TABLE `pricingGroups` (
    `pricingGroupId` integer NOT NULL AUTO_INCREMENT,
    `groupName` varchar(255) NOT NULL,
    `profitMargin` decimal NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`pricingGroupId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `books`
CREATE TABLE `books` (
    `bookId` integer NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `author` varchar(255) NOT NULL,
    `year` integer NOT NULL,
    `publisher` varchar(255) NOT NULL,
    `edition` varchar(255) NOT NULL,
    `isbn` varchar(255) NOT NULL,
    `numPages` integer NOT NULL,
    `synopsis` text NOT NULL,
    `height` float NOT NULL,
    `widith` float NOT NULL,
    `weight` float NOT NULL,
    `depth` float NOT NULL,
    `barcode` varchar(255) NOT NULL,
    `active` tinyint NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `pricingGroupId` integer NOT NULL,
    PRIMARY KEY (`bookId`),
    KEY `FK_1` (`pricingGroupId`),
    CONSTRAINT `FK_6` FOREIGN KEY `FK_1` (`pricingGroupId`) REFERENCES `pricingGroups` (`pricingGroupId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `categories`
CREATE TABLE `categories` (
    `categoryId` integer NOT NULL AUTO_INCREMENT,
    `categoryName` varchar(255) NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`categoryId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `bookCategories`
CREATE TABLE `bookCategories` (
    `bookCategoriesId` integer NOT NULL AUTO_INCREMENT,
    `categoryId` integer NOT NULL,
    `bookId` integer NOT NULL,
    PRIMARY KEY (`bookCategoriesId`),
    KEY `FK_1` (`bookId`),
    CONSTRAINT `FK_1` FOREIGN KEY `FK_1` (`bookId`) REFERENCES `books` (`bookId`),
    KEY `FK_2` (`categoryId`),
    CONSTRAINT `FK_2` FOREIGN KEY `FK_2` (`categoryId`) REFERENCES `categories` (`categoryId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `sales`
CREATE TABLE `sales` (
    `saleId` integer NOT NULL AUTO_INCREMENT,
    `status` enum(
        'processing, in transit, delivered, authorized for exchange, exchanged'
    ) NOT NULL,
    `purchaseDate` datetime NOT NULL,
    `paymentMethod` enum('card, coupon') NOT NULL,
    `totalQuantity` integer NOT NULL,
    `totalValue` decimal NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `userId` integer NOT NULL,
    PRIMARY KEY (`saleId`),
    KEY `FK_1` (`userId`),
    CONSTRAINT `FK_7` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `saleItems`
CREATE TABLE `saleBooks` (
    `saleItemId` integer NOT NULL AUTO_INCREMENT,
    `quantity` integer NOT NULL,
    `unitValue` decimal NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `saleId` integer NOT NULL,
    `bookId` integer NOT NULL,
    PRIMARY KEY (`saleItemId`),
    KEY `FK_1` (`saleId`),
    CONSTRAINT `FK_10` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`),
    KEY `FK_2` (`bookId`),
    CONSTRAINT `FK_11` FOREIGN KEY `FK_2` (`bookId`) REFERENCES `books` (`bookId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `exchanges`
CREATE TABLE `exchanges` (
    `exchangeId` integer NOT NULL AUTO_INCREMENT,
    `status` enum('(in exchange, exchange authorized, exchanged') NOT NULL,
    `requestDate` datetime NOT NULL,
    `reason` text NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`exchangeId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `exchangeCupons`
CREATE TABLE `exchangeCupons` (
    `exchangeCuponId` integer NOT NULL AUTO_INCREMENT,
    `value` decimal NOT NULL,
    `generationDate` datetime NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`exchangeCuponId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `saleExchanges`
CREATE TABLE `saleExchanges` (
    `saleExchangesId` integer NOT NULL AUTO_INCREMENT,
    `quantityToExchange` integer NOT NULL,
    `exchangeId` integer NOT NULL,
    `exchangeCuponId` integer NOT NULL,
    `saleId` integer NOT NULL,
    PRIMARY KEY (`saleExchangesId`),
    KEY `FK_1` (`saleId`),
    CONSTRAINT `FK_12` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`),
    KEY `FK_2` (`exchangeId`),
    CONSTRAINT `FK_13` FOREIGN KEY `FK_2` (`exchangeId`) REFERENCES `exchanges` (`exchangeId`),
    KEY `FK_3` (`exchangeCuponId`),
    CONSTRAINT `FK_14` FOREIGN KEY `FK_3` (`exchangeCuponId`) REFERENCES `exchangeCupons` (`exchangeCuponId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;


-------------------------------------------------------------------------------------------------------------------------


-- Inserção de 10 registros na tabela `pricingGroups`
INSERT INTO `pricingGroups` (`groupName`, `profitMargin`, `createdAt`, `updatedAt`)
VALUES
    ('Grupo 1', 0.1, NOW(), NOW()),
    ('Grupo 2', 0.15, NOW(), NOW()),
    ('Grupo 3', 0.2, NOW(), NOW()),
    ('Grupo 4', 0.25, NOW(), NOW()),
    ('Grupo 5', 0.3, NOW(), NOW()),
    ('Grupo 6', 0.35, NOW(), NOW()),
    ('Grupo 7', 0.4, NOW(), NOW()),
    ('Grupo 8', 0.45, NOW(), NOW()),
    ('Grupo 9', 0.5, NOW(), NOW()),
    ('Grupo 10', 0.55, NOW(), NOW());

-- Inserção de 10 registros na tabela `categories`
INSERT INTO `categories` (`categoryName`, `createdAt`, `updatedAt`)
VALUES
    ('Ficção Científica', NOW(), NOW()),
    ('Romance', NOW(), NOW()),
    ('Fantasia', NOW(), NOW()),
    ('Aventura', NOW(), NOW()),
    ('Suspense', NOW(), NOW()),
    ('Terror', NOW(), NOW()),
    ('Autoajuda', NOW(), NOW()),
    ('Biografia', NOW(), NOW()),
    ('História', NOW(), NOW()),
    ('Policial', NOW(), NOW());

-- Inserção de 10 registros na tabela `books`
INSERT INTO `books` (`title`, `author`, `year`, `publisher`, `edition`, `isbn`, `numPages`, `synopsis`, `height`, `widith`, `weight`, `depth`, `barcode`, `active`, `createdAt`, `updatedAt`, `pricingGroupId`)
VALUES
    ('Livro 1', 'Autor 1', 2020, 'Editora A', '1ª edição', '1234567890123', 300, 'Sinopse do Livro 1', 20.5, 15.2, 0.8, 3.5, '123456', 1, NOW(), NOW(), 1),
    ('Livro 2', 'Autor 2', 2019, 'Editora B', '2ª edição', '1234567890124', 250, 'Sinopse do Livro 2', 19.8, 14.5, 0.7, 3.2, '123457', 1, NOW(), NOW(), 2),
    ('Livro 3', 'Autor 3', 2018, 'Editora C', '3ª edição', '1234567890125', 400, 'Sinopse do Livro 3', 22.0, 16.0, 0.9, 3.8, '123458', 1, NOW(), NOW(), 3),
    ('Livro 4', 'Autor 4', 2017, 'Editora D', '4ª edição', '1234567890126', 350, 'Sinopse do Livro 4', 21.5, 15.5, 0.85, 3.6, '123459', 1, NOW(), NOW(), 4),
    ('Livro 5', 'Autor 5', 2016, 'Editora E', '5ª edição', '1234567890127', 320, 'Sinopse do Livro 5', 21.0, 15.8, 0.75, 3.4, '123460', 1, NOW(), NOW(), 5),
    ('Livro 6', 'Autor 6', 2015, 'Editora F', '6ª edição', '1234567890128', 280, 'Sinopse do Livro 6', 20.8, 15.4, 0.85, 3.7, '123461', 1, NOW(), NOW(), 6),
    ('Livro 7', 'Autor 7', 2014, 'Editora G', '7ª edição', '1234567890129', 330, 'Sinopse do Livro 7', 20.2, 15.0, 0.8, 3.3, '123462', 1, NOW(), NOW(), 7),
    ('Livro 8', 'Autor 8', 2013, 'Editora H', '8ª edição', '1234567890130', 290, 'Sinopse do Livro 8', 19.5, 14.7, 0.75, 3.1, '123463', 1, NOW(), NOW(), 8),
    ('Livro 9', 'Autor 9', 2012, 'Editora I', '9ª edição', '1234567890131', 380, 'Sinopse do Livro 9', 22.5, 16.5, 0.95, 3.9, '123464', 1, NOW(), NOW(), 9),
    ('Livro 10', 'Autor 10', 2011, 'Editora J', '10ª edição', '1234567890132', 270, 'Sinopse do Livro 10', 20.0, 15.6, 0.8, 3.6, '123465', 1, NOW(), NOW(), 10);

-- Inserção de 10 registros na tabela `bookCategories`
-- Relacionamento entre os livros e as categorias
INSERT INTO `bookCategories` (`categoryId`, `bookId`)
VALUES
    (1, 1),
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5),
    (6, 6),
    (7, 7),
    (8, 8),
    (9, 9),
    (10, 10);

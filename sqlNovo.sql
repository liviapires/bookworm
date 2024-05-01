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
    `preferred` tinyint NOT NULL,
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
    `phoneNumber` varchar(255) NOT NULL,
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
    `value` float NOT NULL,
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

-- ************************************** `saleAddresses`
CREATE TABLE `saleAddresses` (
    `saleAddressId` integer NOT NULL AUTO_INCREMENT,
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
    `preferred` tinyint NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`saleAddressId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `sales`
CREATE TABLE `sales` (
    `saleId` integer NOT NULL AUTO_INCREMENT,
    `code` varchar(255) NOT NULL,
    `status` varchar(255) NOT NULL,
    `purchaseDate` datetime NOT NULL,
    `totalQuantity` integer NOT NULL,
    `totalValue` float NOT NULL,
    `shipping` float NOT NULL,
    `withoutShipping` float NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `userId` integer NOT NULL,
    `saleAddressId` integer NOT NULL,
    PRIMARY KEY (`saleId`),
    KEY `FK_1` (`userId`),
    CONSTRAINT `FK_7` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`),
    KEY `FK_3` (`saleAddressId`),
    CONSTRAINT `FK_10` FOREIGN KEY `FK_3` (`saleAddressId`) REFERENCES `saleAddresses` (`saleAddressId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `salePayment`
CREATE TABLE `salePayment` (
    `salePaymentId` integer NOT NULL AUTO_INCREMENT,
    `paymentMethod` varchar(255) NOT NULL,
    `paymentValue` float NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `saleId` integer NOT NULL,
    PRIMARY KEY (`salePaymentId`),
    KEY `FK_1` (`saleId`),
    CONSTRAINT `FK_9` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `saleBooks`
CREATE TABLE `saleBooks` (
    `saleBookId` integer NOT NULL AUTO_INCREMENT,
    `quantity` integer NOT NULL,
    `unitValue` float NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `saleId` integer NOT NULL,
    `bookId` integer NOT NULL,
    PRIMARY KEY (`saleBookId`),
    KEY `FK_1` (`saleId`),
    CONSTRAINT `FK_11` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`),
    KEY `FK_2` (`bookId`),
    CONSTRAINT `FK_12` FOREIGN KEY `FK_2` (`bookId`) REFERENCES `books` (`bookId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `exchanges`
CREATE TABLE `exchanges` (
    `exchangeId` integer NOT NULL AUTO_INCREMENT,
    `status` varchar(255) NOT NULL,
    `requestDate` datetime NOT NULL,
    `reason` text NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`exchangeId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `coupons`
CREATE TABLE `coupons` (
    `couponId` integer NOT NULL AUTO_INCREMENT,
    `couponCode` varchar(255) NOT NULL,
    `couponValue` float NOT NULL,
    `couponType` varchar(255) NOT NULL,
    `generationDate` datetime NOT NULL,
    `expirationDate` datetime NOT NULL,
    `active` tinyint NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`couponId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `saleExchanges`
CREATE TABLE `saleExchanges` (
    `saleExchangesId` integer NOT NULL AUTO_INCREMENT,
    `quantityToExchange` integer NOT NULL,
    `exchangeId` integer NOT NULL,
    `couponId` integer NOT NULL,
    `saleId` integer NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    PRIMARY KEY (`saleExchangesId`),
    KEY `FK_1` (`saleId`),
    CONSTRAINT `FK_13` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`),
    KEY `FK_2` (`exchangeId`),
    CONSTRAINT `FK_14` FOREIGN KEY `FK_2` (`exchangeId`) REFERENCES `exchanges` (`exchangeId`),
    KEY `FK_3` (`couponId`),
    CONSTRAINT `FK_16` FOREIGN KEY `FK_3` (`couponId`) REFERENCES `coupons` (`couponId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;



-------------------------------------------------------------------------------------------------------------------------



-- Inserção de 10 registros na tabela `pricingGroups`
INSERT INTO `pricingGroups` (`groupName`, `value`, `createdAt`, `updatedAt`)
VALUES
    ('Grupo 01', 39.95, NOW(), NOW()),
    ('Grupo 02', 66.15, NOW(), NOW()),
    ('Grupo 03', 75.2, NOW(), NOW()),
    ('Grupo 04', 10.25, NOW(), NOW()),
    ('Grupo 05', 99.3, NOW(), NOW()),
    ('Grupo 06', 54.35, NOW(), NOW()),
    ('Grupo 07', 44.4, NOW(), NOW()),
    ('Grupo 08', 54.45, NOW(), NOW()),
    ('Grupo 09', 20.5, NOW(), NOW()),
    ('Grupo 10', 80.55, NOW(), NOW());

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


-- Inserção de 10 registros na tabela `users`
INSERT INTO `users` (`code`, `name`, `admin`, `gender`, `birthDate`, `cpf`, `email`, `password`, `ranking`, `role`, `active`, `createdAt`, `updatedAt`)
VALUES
    ('654508', 'João Silva', 0, 'M', '1990-05-15', '123.456.789-00', 'joao@example.com', 'senha123', 5, 'Cliente', 1, NOW(), NOW()),
    ('077284', 'Maria Santos', 0, 'F', '1985-08-20', '987.654.321-00', 'maria@example.com', 'senha456', 4, 'Cliente', 1, NOW(), NOW()),
    ('878786', 'José Oliveira', 0, 'M', '1978-02-10', '111.222.333-44', 'jose@example.com', 'senha789', 3, 'Cliente', 1, NOW(), NOW()),
    ('056485', 'Ana Souza', 0, 'F', '1982-11-25', '555.666.777-88', 'ana@example.com', 'senhaabc', 2, 'Cliente', 1, NOW(), NOW()),
    ('455425', 'Carlos Pereira', 0, 'M', '1995-03-05', '999.888.777-66', 'carlos@example.com', 'senhaxyz', 1, 'Cliente', 1, NOW(), NOW()),
    ('684518', 'Mariana Costa', 0, 'F', '1992-09-12', '222.333.444-55', 'mariana@example.com', 'senhaxyz', 5, 'Cliente', 1, NOW(), NOW()),
    ('754320', 'Pedro Rocha', 0, 'M', '1989-07-30', '777.888.999-00', 'pedro@example.com', 'senha321', 4, 'Cliente', 1, NOW(), NOW()),
    ('435742', 'Aline Almeida', 0, 'F', '1980-12-18', '444.555.666-77', 'aline@example.com', 'senha654', 3, 'Cliente', 1, NOW(), NOW()),
    ('706545', 'Lucas Lima', 0, 'M', '1975-04-22', '666.555.444-33', 'lucas@example.com', 'senha987', 2, 'Cliente', 1, NOW(), NOW()),
    ('425374', 'Patrícia Ferreira', 0, 'F', '1987-06-08', '333.222.111-00', 'patricia@example.com', 'senha123abc', 1, 'Cliente', 1, NOW(), NOW());


-- Inserção de informações de endereço, telefone e cartão de crédito para cada cliente

-- Cliente 1
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Casa', 'Rua A', '123', 'Bairro 1', '12345-678', 'Cidade A', 'Estado A', 'País A', 'Complemento 1', 'Observação 1', 1, NOW(), NOW(), 1);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('11', '99999-9999', 'Celular', NOW(), NOW(), 1);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('1111222233334444', 'João Silva', 'Visa', '123', '12/25', 1, NOW(), NOW(), 1);

-- Cliente 2
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Apartamento', 'Rua B', '456', 'Bairro 2', '54321-987', 'Cidade B', 'Estado B', 'País B', 'Complemento 2', 'Observação 2', 1, NOW(), NOW(), 2);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('22', '88888-8888', 'Residencial', NOW(), NOW(), 2);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('2222333344445555', 'Maria Santos', 'Mastercard', '456', '11/24', 1, NOW(), NOW(), 2);

-- Cliente 3
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Casa', 'Rua C', '789', 'Bairro 3', '98765-432', 'Cidade C', 'Estado C', 'País C', 'Complemento 3', 'Observação 3', 1, NOW(), NOW(), 3);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('33', '77777-7777', 'Celular', NOW(), NOW(), 3);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('3333444455556666', 'Antônio Oliveira', 'Visa', '789', '03/23', 1, NOW(), NOW(), 3);

-- Cliente 4
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Apartamento', 'Rua D', '1011', 'Bairro 4', '12345-678', 'Cidade D', 'Estado D', 'País D', 'Complemento 4', 'Observação 4', 1, NOW(), NOW(), 4);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('44', '66666-6666', 'Residencial', NOW(), NOW(), 4);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('4444555566667777', 'Ana Oliveira', 'Mastercard', '101', '06/25', 1, NOW(), NOW(), 4);

-- Cliente 5
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Casa', 'Rua E', '1213', 'Bairro 5', '54321-987', 'Cidade E', 'Estado E', 'País E', 'Complemento 5', 'Observação 5', 1, NOW(), NOW(), 5);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('55', '55555-5555', 'Celular', NOW(), NOW(), 5);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('5555666677778888', 'Pedro Silva', 'Visa', '121', '09/24', 1, NOW(), NOW(), 5);

-- Cliente 6
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Casa', 'Rua F', '1415', 'Bairro 6', '98765-432', 'Cidade F', 'Estado F', 'País F', 'Complemento 6', 'Observação 6', 1, NOW(), NOW(), 6);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('66', '44444-4444', 'Residencial', NOW(), NOW(), 6);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('6666777788889999', 'Laura Santos', 'Mastercard', '141', '12/23', 1, NOW(), NOW(), 6);

-- Cliente 7
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Casa', 'Rua G', '1617', 'Bairro 7', '13579-246', 'Cidade G', 'Estado G', 'País G', 'Complemento 7', 'Observação 7', 1, NOW(), NOW(), 7);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('77', '77777-7777', 'Celular', NOW(), NOW(), 7);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('7777888899990000', 'Maria Oliveira', 'Visa', '161', '03/26', 1, NOW(), NOW(), 7);

-- Cliente 8
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Apartamento', 'Rua H', '1819', 'Bairro 8', '24680-135', 'Cidade H', 'Estado H', 'País H', 'Complemento 8', 'Observação 8', 1, NOW(), NOW(), 8);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('88', '88888-8888', 'Residencial', NOW(), NOW(), 8);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('8888999900001111', 'Rafaela Silva', 'Mastercard', '181', '07/27', 1, NOW(), NOW(), 8);

-- Cliente 9
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Casa', 'Rua I', '2021', 'Bairro 9', '36912-485', 'Cidade I', 'Estado I', 'País I', 'Complemento 9', 'Observação 9', 1, NOW(), NOW(), 9);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('99', '99999-9999', 'Celular', NOW(), NOW(), 9);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('9999000011112222', 'Mateus Oliveira', 'Visa', '202', '09/25', 1, NOW(), NOW(), 9);

-- Cliente 10
INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('Apartamento', 'Rua J', '2223', 'Bairro 10', '48536-921', 'Cidade J', 'Estado J', 'País J', 'Complemento 10', 'Observação 10', 1, NOW(), NOW(), 10);

INSERT INTO `phones` (`ddd`, `phoneNumber`, `phoneType`, `createdAt`, `updatedAt`, `userId`)
VALUES ('10', '101010-1010', 'Residencial', NOW(), NOW(), 10);

INSERT INTO `creditCards` (`cardNumber`, `cardName`, `cardFlag`, `securityCode`, `expirationDate`, `preferred`, `createdAt`, `updatedAt`, `userId`)
VALUES ('1010111122223333', 'Gabriel Silva', 'Mastercard', '222', '12/24', 1, NOW(), NOW(), 10);


-- Insert de mais cartões de crédito para os clientes
INSERT INTO creditCards (cardNumber, cardName, cardFlag, securityCode, expirationDate, preferred, createdAt, updatedAt, userId)
SELECT 
    CONCAT(FLOOR(RAND() * (9999 - 1000 + 1)) + 1000, FLOOR(RAND() * (9999 - 1000 + 1)) + 1000, FLOOR(RAND() * (9999 - 1000 + 1)) + 1000, FLOOR(RAND() * (9999 - 1000 + 1)) + 1000),
    'Cardholder Name', 
    'Visa', 
    '123', 
    '12/25', 
    0, 
    NOW(), 
    NOW(), 
    userId
FROM 
    users
WHERE 
    userId BETWEEN 1 AND 10;

INSERT INTO `addresses` (`residenceType`, `street`, `number`, `neighborhood`, `zipCode`, `city`, `state`, `country`, `complement`, `notes`, `preferred`, `createdAt`, `updatedAt`, `userId`)
SELECT 
    'Casa', 
    'Rua ', 
    FLOOR(RAND() * (9999 - 1000 + 1)) + 1000, 
    'Bairro ', 
    CONCAT(FLOOR(RAND() * (99999 - 10000 + 1)) + 10000, '-', FLOOR(RAND() * (999 - 100 + 1)) + 100),
    'Cidade ', 
    'Estado ', 
    'País ', 
    'Complemento ', 
    'Observação ', 
    0, 
    NOW(), 
    NOW(), 
    userId
FROM
    users
WHERE
    userId BETWEEN 1 AND 10;
    
-- Gere 10 cupons diferentes com códigos aleatórios
INSERT INTO `coupons` (`couponCode`, `couponValue`, `couponType`, `generationDate`, `expirationDate`, `active`, `createdAt`, `updatedAt`)
VALUES
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 10.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 15.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 20.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 25.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 30.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 35.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 40.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 45.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 50.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW()),
    (CONCAT(SUBSTRING(MD5(RAND()) FROM 1 FOR 6)), 55.00, 'Discount', NOW(), NOW() + INTERVAL 30 DAY, 1, NOW(), NOW());

-- ************************************** `users`

CREATE TABLE `users`
(
 `userId`         integer NOT NULL AUTO_INCREMENT ,
 `code`           varchar(255) NOT NULL ,
 `name`           varchar(255) NOT NULL ,
 `admin`          tinyint NOT NULL ,
 `gender`         varchar(255) NOT NULL ,
 `birthDate`      date NOT NULL ,
 `cpf`            varchar(255) NOT NULL ,
 `email`          varchar(255) NOT NULL ,
 `password`       varchar(255) NOT NULL ,
 `ranking`        integer NOT NULL ,
 `role`           varchar(255) NOT NULL ,
 `active`         tinyint NOT NULL ,
 `createdAt`      datetime NOT NULL ,
 `updatedAt`      datetime NOT NULL ,

PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `addresses`

CREATE TABLE `addresses`
(
 `addressId`     integer NOT NULL AUTO_INCREMENT ,
 `residenceType` varchar(255) NOT NULL ,
 `street`        varchar(255) NOT NULL ,
 `number`        varchar(255) NOT NULL ,
 `neighborhood`  varchar(255) NOT NULL ,
 `zipCode`       varchar(255) NOT NULL ,
 `city`          varchar(255) NOT NULL ,
 `state`         varchar(255) NOT NULL ,
 `country`       varchar(255) NOT NULL ,
 `complement`    text NOT NULL ,
 `notes`         text NOT NULL ,
 `createdAt`     datetime NOT NULL ,
 `updatedAt`     datetime NOT NULL ,
 `userId`        integer NOT NULL ,

PRIMARY KEY (`addressId`),
KEY `FK_1` (`userId`),
CONSTRAINT `FK_4` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `phones`

CREATE TABLE `phones`
(
 `phoneId`     integer NOT NULL AUTO_INCREMENT ,
 `ddd`         varchar(255) NOT NULL ,
 `phoneNumber` varbinary(255) NOT NULL ,
 `phoneType`   varchar(255) NOT NULL ,
 `createdAt`   datetime NOT NULL ,
 `updatedAt`   datetime NOT NULL ,
 `userId`      integer NOT NULL ,

PRIMARY KEY (`phoneId`),
KEY `FK_1` (`userId`),
CONSTRAINT `FK_5` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `creditCards`

CREATE TABLE `creditCards`
(
 `cardId`           integer NOT NULL AUTO_INCREMENT ,
 `cardNumber`       varchar(255) NOT NULL ,
 `cardName`         varchar(255) NOT NULL ,
 `cardFlag`         varchar(255) NOT NULL ,
 `securityCode`     varchar(255) NOT NULL ,
 `expirationDate`   varchar(255) NOT NULL ,
 `preferred`        tinyint NOT NULL ,
 `createdAt`        datetime NOT NULL ,
 `updatedAt`        datetime NOT NULL ,
 `userId`           integer NOT NULL ,

PRIMARY KEY (`cardId`),
KEY `FK_1` (`userId`),
CONSTRAINT `FK_3` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `pricingGroups`

CREATE TABLE `pricingGroups`
(
 `pricingGroupId` integer NOT NULL AUTO_INCREMENT ,
 `groupName`      varchar(255) NOT NULL ,
 `profitMargin`   decimal NOT NULL ,
 `createdAt`      datetime NOT NULL ,
 `updatedAt`      datetime NOT NULL ,

PRIMARY KEY (`pricingGroupId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `books`

CREATE TABLE `books`
(
 `bookId`           integer NOT NULL AUTO_INCREMENT ,
 `title`            varchar(255) NOT NULL ,
 `author`           varchar(255) NOT NULL ,
 `year`             integer NOT NULL ,
 `publisher`        varchar(255) NOT NULL ,
 `edition`          varchar(255) NOT NULL ,
 `isbn`             varchar(255) NOT NULL ,
 `numPages`         integer NOT NULL ,
 `synopsis`         text NOT NULL ,
 `height`           float NOT NULL ,
 `widith`           float NOT NULL ,
 `weight`           float NOT NULL ,
 `depth`            float NOT NULL ,
 `barcode`          varchar(255) NOT NULL ,
 `active`           tinyint NOT NULL ,
 `createdAt`        datetime NOT NULL ,
 `updatedAt`        datetime NOT NULL ,
 `pricingGroupId`   integer NOT NULL ,

PRIMARY KEY (`bookId`),
KEY `FK_1` (`pricingGroupId`),
CONSTRAINT `FK_6` FOREIGN KEY `FK_1` (`pricingGroupId`) REFERENCES `pricingGroups` (`pricingGroupId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `categories`

CREATE TABLE `categories`
(
 `categoryId`   integer NOT NULL AUTO_INCREMENT ,
 `categoryName` varchar(255) NOT NULL ,
 `createdAt`    datetime NOT NULL ,
 `updatedAt`    datetime NOT NULL ,

PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `bookCategories`

CREATE TABLE `bookCategories`
(
 `bookCategoriesId` integer NOT NULL ,
 `categoryId`       integer NOT NULL ,
 `bookId`           integer NOT NULL ,

PRIMARY KEY (`bookCategoriesId`),
KEY `FK_1` (`bookId`),
CONSTRAINT `FK_1` FOREIGN KEY `FK_1` (`bookId`) REFERENCES `books` (`bookId`),
KEY `FK_2` (`categoryId`),
CONSTRAINT `FK_2` FOREIGN KEY `FK_2` (`categoryId`) REFERENCES `categories` (`categoryId`)
);


-- ************************************** `sales`

CREATE TABLE `sales`
(
 `saleId`        integer NOT NULL AUTO_INCREMENT ,
 `status`        enum('processing, in transit, delivered, authorized for exchange, exchanged') NOT NULL ,
 `purchaseDate`  datetime NOT NULL ,
 `paymentMethod` enum('card, coupon') NOT NULL ,
 `totalQuantity` integer NOT NULL ,
 `totalValue`    decimal NOT NULL ,
 `createdAt`     datetime NOT NULL ,
 `updatedAt`     datetime NOT NULL ,
 `userId`        integer NOT NULL ,

PRIMARY KEY (`saleId`),
KEY `FK_1` (`userId`),
CONSTRAINT `FK_7` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `saleItems`

CREATE TABLE `saleBooks`
(
 `saleItemId` integer NOT NULL AUTO_INCREMENT ,
 `quantity`   integer NOT NULL ,
 `unitValue`  decimal NOT NULL ,
 `createdAt`  datetime NOT NULL ,
 `updatedAt`  datetime NOT NULL ,
 `saleId`     integer NOT NULL ,
 `bookId`     integer NOT NULL ,

PRIMARY KEY (`saleItemId`),
KEY `FK_1` (`saleId`),
CONSTRAINT `FK_10` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`),
KEY `FK_2` (`bookId`),
CONSTRAINT `FK_11` FOREIGN KEY `FK_2` (`bookId`) REFERENCES `books` (`bookId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `exchanges`

CREATE TABLE `exchanges`
(
 `exchangeId`  integer NOT NULL AUTO_INCREMENT ,
 `status`      enum('(in exchange, exchange authorized, exchanged') NOT NULL ,
 `requestDate` datetime NOT NULL ,
 `reason`      text NOT NULL ,
 `createdAt`   datetime NOT NULL ,
 `updatedAt`   datetime NOT NULL ,

PRIMARY KEY (`exchangeId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `exchangeCupons`

CREATE TABLE `exchangeCupons`
(
 `exchangeCuponId` integer NOT NULL AUTO_INCREMENT ,
 `value`           decimal NOT NULL ,
 `generationDate`  datetime NOT NULL ,
 `createdAt`       datetime NOT NULL ,
 `updatedAt`       datetime NOT NULL ,

PRIMARY KEY (`exchangeCuponId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


-- ************************************** `saleExchanges`

CREATE TABLE `saleExchanges`
(
 `saleExchangesId`    integer NOT NULL AUTO_INCREMENT ,
 `quantityToExchange` integer NOT NULL ,
 `exchangeId`         integer NOT NULL ,
 `exchangeCuponId`    integer NOT NULL ,
 `saleId`             integer NOT NULL ,

PRIMARY KEY (`saleExchangesId`),
KEY `FK_1` (`saleId`),
CONSTRAINT `FK_12` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`),
KEY `FK_2` (`exchangeId`),
CONSTRAINT `FK_13` FOREIGN KEY `FK_2` (`exchangeId`) REFERENCES `exchanges` (`exchangeId`),
KEY `FK_3` (`exchangeCuponId`),
CONSTRAINT `FK_14` FOREIGN KEY `FK_3` (`exchangeCuponId`) REFERENCES `exchangeCupons` (`exchangeCuponId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;



-- TENTATIVA QUERY

SELECT 
	*,
    (
		SELECT CONVERT(CONCAT('[', GROUP_CONCAT(CONCAT('"', phones.phoneId, ':', "(", phones.ddd, ") " , phones.phoneNumber, '"')), ']') using utf8)
        FROM phones WHERE phones.phoneId = userId
    ) AS phones,
    (
		SELECT CONVERT(CONCAT('[', GROUP_CONCAT(CONCAT('"', adress.adressId, ':', "(", phones.ddd, ") " , phones.phoneNumber, '"')), ']') using utf8)
        FROM phones WHERE phones.phoneId = userId
    ) AS adresses
FROM
	users
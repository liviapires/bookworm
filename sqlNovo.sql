-- ************************************** `users`

CREATE TABLE `users`
(
 `userId`         integer NOT NULL ,
 `code`           varchar(45) NOT NULL ,
 `name`           varchar(45) NOT NULL ,
 `admin`          tinyint NOT NULL ,
 `gender`         varchar(45) NOT NULL ,
 `birthDate`      date NOT NULL ,
 `cpf`            varchar(45) NOT NULL ,
 `email`          varchar(45) NOT NULL ,
 `password`       varchar(45) NOT NULL ,
 `ranking`        integer NOT NULL ,
 `role`           varchar(45) NOT NULL ,
 `active`         tinyint NOT NULL ,
 `inactiveReason` text NULL ,
 `inactiveDate`   datetime NULL ,
 `createdAt`      datetime NOT NULL ,
 `updatedAt`      datetime NOT NULL ,

PRIMARY KEY (`userId`)
);


-- ************************************** `addresses`

CREATE TABLE `addresses`
(
 `addressId`     integer NOT NULL ,
 `residenceType` varchar(45) NOT NULL ,
 `street`        varchar(45) NOT NULL ,
 `number`        varchar(45) NOT NULL ,
 `neighborhood`  varchar(45) NOT NULL ,
 `zipCode`       varchar(45) NOT NULL ,
 `city`          varchar(45) NOT NULL ,
 `state`         char NOT NULL ,
 `country`       varchar(45) NOT NULL ,
 `notes`         text NOT NULL ,
 `createdAt`     datetime NOT NULL ,
 `updatedAt`     datetime NOT NULL ,
 `userId`        integer NOT NULL ,

PRIMARY KEY (`addressId`),
KEY `FK_1` (`userId`),
CONSTRAINT `FK_4` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
);


-- ************************************** `phones`

CREATE TABLE `phones`
(
 `phoneId`     integer NOT NULL ,
 `ddd`         varchar(45) NOT NULL ,
 `phoneNumber` varbinary(45) NOT NULL ,
 `phoneType`   varchar(45) NOT NULL ,
 `createdAt`   datetime NOT NULL ,
 `updatedAt`   datetime NOT NULL ,
 `userId`      integer NOT NULL ,

PRIMARY KEY (`phoneId`),
KEY `FK_1` (`userId`),
CONSTRAINT `FK_5` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
);


-- ************************************** `creditCards`

CREATE TABLE `creditCards`
(
 `cardId`       integer NOT NULL ,
 `cardNumber`   varchar(45) NOT NULL ,
 `cardName`     varchar(45) NOT NULL ,
 `cardFlag`     varchar(45) NOT NULL ,
 `securityCode` varchar(45) NOT NULL ,
 `expirationDate`   date NOT NULL ,
 `preferred`    tinyint NOT NULL ,
 `createdAt`    datetime NOT NULL ,
 `updatedAt`    datetime NOT NULL ,
 `userId`       integer NOT NULL ,

PRIMARY KEY (`cardId`),
KEY `FK_1` (`userId`),
CONSTRAINT `FK_3` FOREIGN KEY `FK_1` (`userId`) REFERENCES `users` (`userId`)
);


-- ************************************** `pricingGroups`

CREATE TABLE `pricingGroups`
(
 `pricingGroupId` integer NOT NULL ,
 `groupName`      varchar(45) NOT NULL ,
 `profitMargin`   decimal NOT NULL ,
 `createdAt`      datetime NOT NULL ,
 `updatedAt`      datetime NOT NULL ,

PRIMARY KEY (`pricingGroupId`)
);


-- ************************************** `books`

CREATE TABLE `books`
(
 `bookId`           integer NOT NULL ,
 `title`            varchar(45) NOT NULL ,
 `author`           varchar(45) NOT NULL ,
 `year`             integer NOT NULL ,
 `publisher`        varchar(45) NOT NULL ,
 `edition`          varchar(45) NOT NULL ,
 `isbn`             varchar(45) NOT NULL ,
 `numPages`         integer NOT NULL ,
 `synopsis`         text NOT NULL ,
 `height`           float NOT NULL ,
 `widith`           float NOT NULL ,
 `weight`           float NOT NULL ,
 `depth`            float NOT NULL ,
 `barcode`          varchar(45) NOT NULL ,
 `active`           tinyint NOT NULL ,
 `inactiveReason`   text NULL ,
 `inactivationDate` datetime NULL ,
 `createdAt`        datetime NOT NULL ,
 `updatedAt`        datetime NOT NULL ,
 `pricingGroupId`   integer NOT NULL ,

PRIMARY KEY (`bookId`),
KEY `FK_1` (`pricingGroupId`),
CONSTRAINT `FK_6` FOREIGN KEY `FK_1` (`pricingGroupId`) REFERENCES `pricingGroups` (`pricingGroupId`)
);


-- ************************************** `categories`

CREATE TABLE `categories`
(
 `categoryId`   integer NOT NULL ,
 `categoryName` varchar(45) NOT NULL ,
 `createdAt`    datetime NOT NULL ,
 `updatedAt`    datetime NOT NULL ,

PRIMARY KEY (`categoryId`)
);


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
 `saleId`        integer NOT NULL ,
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
);


-- ************************************** `saleItems`

CREATE TABLE `saleBooks`
(
 `saleItemId` integer NOT NULL ,
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
);


-- ************************************** `exchanges`

CREATE TABLE `exchanges`
(
 `exchangeId`  integer NOT NULL ,
 `status`      enum('(in exchange, exchange authorized, exchanged') NOT NULL ,
 `requestDate` datetime NOT NULL ,
 `reason`      text NOT NULL ,
 `createdAt`   datetime NOT NULL ,
 `updatedAt`   datetime NOT NULL ,

PRIMARY KEY (`exchangeId`)
);


-- ************************************** `exchangeCupons`

CREATE TABLE `exchangeCupons`
(
 `exchangeCuponId` integer NOT NULL ,
 `value`           decimal NOT NULL ,
 `generationDate`  datetime NOT NULL ,
 `createdAt`       datetime NOT NULL ,
 `updatedAt`       datetime NOT NULL ,

PRIMARY KEY (`exchangeCuponId`)
);


-- ************************************** `saleExchanges`

CREATE TABLE `saleExchanges`
(
 `saleExchangesId`    integer NOT NULL ,
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
);
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
    `bookImage` varchar(255) NOT NULL,
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
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
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

-- ************************************** `transactions`
CREATE TABLE `transactions` (
    `transactionId` integer NOT NULL AUTO_INCREMENT,
    `transactionCode` varchar(255) NOT NULL,
    `transactionType` varchar(255) NOT NULL,
    `status` varchar(255) NOT NULL,
    `requestDate` datetime NOT NULL,
    `reason` text NOT NULL,
    `explanation` text NOT NULL,
    `transactionValue` float NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `saleId` integer NOT NULL,
    PRIMARY KEY (`transactionId`),
    KEY `FK_1` (`saleId`),
    CONSTRAINT `FK_13` FOREIGN KEY `FK_1` (`saleId`) REFERENCES `sales` (`saleId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `couponTransactions`
CREATE TABLE `couponTransactions` (
    `couponTransactionId` integer NOT NULL AUTO_INCREMENT,
    `couponId` integer NOT NULL,
    `transactionId` integer NOT NULL,
    PRIMARY KEY (`couponTransactionId`),
    KEY `FK_1` (`couponId`),
    CONSTRAINT `FK_14` FOREIGN KEY `FK_1` (`couponId`) REFERENCES `coupons` (`couponId`),
    KEY `FK_2` (`transactionId`),
    CONSTRAINT `FK_15` FOREIGN KEY `FK_2` (`transactionId`) REFERENCES `transactions` (`transactionId`)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;

-- ************************************** `saleTransactionBooks`
CREATE TABLE `saleTransactionBooks` (
    `saleTransactionBooksId` integer NOT NULL AUTO_INCREMENT,
    `bookId` integer NOT NULL,
    `transactingQuantity` integer NOT NULL,
    `value` float NOT NULL,
    `createdAt` datetime NOT NULL,
    `updatedAt` datetime NOT NULL,
    `transactionId` integer NOT NULL,
    PRIMARY KEY (`saleTransactionBooksId`),
    KEY `FK_1` (`bookId`),
    CONSTRAINT `FK_16` FOREIGN KEY `FK_1` (`bookId`) REFERENCES `books` (`bookId`),
    KEY `FK_2` (`transactionId`),
    CONSTRAINT `FK_17` FOREIGN KEY `FK_2` (`transactionId`) REFERENCES `transactions` (`transactionId`)
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

-- Inserção de registros na tabela `categories`
INSERT INTO `categories` (`categoryName`, `createdAt`, `updatedAt`) 
VALUES
    ('Fiction', NOW(), NOW()),
    ('Non-Fiction', NOW(), NOW()),
    ('Science', NOW(), NOW()),
    ('History', NOW(), NOW()),
    ('Biography', NOW(), NOW()),
    ('Fantasy', NOW(), NOW()),
    ('Mystery', NOW(), NOW()),
    ('Thriller', NOW(), NOW()),
    ('Horror', NOW(), NOW()),
    ('Self-Help', NOW(), NOW()),
    ('Memoir', NOW(), NOW()),
    ('Science Fiction', NOW(), NOW()),
    ('Dystopian', NOW(), NOW()),
    ('Romance', NOW(), NOW()),
    ('Adventure', NOW(), NOW()),
    ('Childrens', NOW(), NOW()),
    ('Young Adult', NOW(), NOW()),
    ('Classic', NOW(), NOW()),
    ('Philosophy', NOW(), NOW()),
    ('Religion', NOW(), NOW()),
    ('Politics', NOW(), NOW()),
    ('Economics', NOW(), NOW()),
    ('Business', NOW(), NOW()),
    ('Art', NOW(), NOW()),
    ('Music', NOW(), NOW()),
    ('Sports', NOW(), NOW()),
    ('Cooking', NOW(), NOW()),
    ('Travel', NOW(), NOW()),
    ('Science Fiction', NOW(), NOW()),
    ('Dystopian', NOW(), NOW()),
    ('Romance', NOW(), NOW()),
    ('Adventure', NOW(), NOW()),
    ('Childrens', NOW(), NOW()),
    ('Young Adult', NOW(), NOW()),
    ('Classic', NOW(), NOW()),
    ('Philosophy', NOW(), NOW()),
    ('Religion', NOW(), NOW()),
    ('Politics', NOW(), NOW()),
    ('Economics', NOW(), NOW()),
    ('Business', NOW(), NOW()),
    ('Art', NOW(), NOW()),
    ('Music', NOW(), NOW()),
    ('Sports', NOW(), NOW()),
    ('Cooking', NOW(), NOW()),
    ('Travel', NOW(), NOW());


-- Inserção de registros na tabela `books`
INSERT INTO `books` (`title`, `author`, `year`, `publisher`, `edition`, `isbn`, `numPages`, `synopsis`, `height`, `widith`, `weight`, `depth`, `barcode`, `active`, `bookImage`, `createdAt`, `updatedAt`, `pricingGroupId`)
VALUES 
    ('The Great Gatsby','F. Scott Fitzgerald',1925,'Scribner','1st','9780743273565',180,'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island.',20.3,13.3,0.4,1.9,'9780743273565',1,'https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('To Kill a Mockingbird','Harper Lee',1960,'J.B. Lippincott & Co.','1st','9780061120084',281,'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',20.3,13.3,0.6,1.9,'9780061120084',1,'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('1984','George Orwell',1949,'Secker & Warburg','1st','9780451524935',328,'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.',19.8,12.9,0.4,2,'9780451524935',1,'https://m.media-amazon.com/images/I/819js3EQwbL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',2),
    ('A Brief History of Time','Stephen Hawking',1988,'Bantam Books','1st','9780553380163',212,'A landmark volume in science writing by one of the great minds of our time.',23.5,15.6,0.7,2.3,'9780553380163',1,'https://m.media-amazon.com/images/I/91ebghaV-eL._AC_UF894,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',3),
    ('The Art of War','Sun Tzu',-500,'Shambhala','1st','9781590302255',273,'An ancient Chinese military treatise dating from the Late Spring and Autumn Period.',19.1,12.6,0.3,1.7,'9781590302255',1,'https://m.media-amazon.com/images/I/71jWgemHbML._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',4),
    ('Brave New World','Aldous Huxley',1932,'Chatto & Windus','1st','9780060850524',268,'A dystopian social science fiction novel set in a futuristic World State.',20,13,0.5,1.8,'9780060850524',1,'https://m.media-amazon.com/images/I/91D4YvdC0dL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',2),
    ('The Catcher in the Rye','J.D. Salinger',1951,'Little, Brown and Company','1st','9780316769488',214,'A novel about the experiences of a young man in Manhattan after being expelled from prep school.',21,14,0.4,1.9,'9780316769488',1,'https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('Sapiens: A Brief History of Humankind','Yuval Noah Harari',2011,'Harvill Secker','1st','9780062316097',443,'An exploration of the history and impact of the human species.',24,16,0.8,2.5,'9780062316097',1,'https://m.media-amazon.com/images/I/716E6dQ4BXL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',3),
    ('The Diary of a Young Girl','Anne Frank',1947,'Contact Publishing','1st','9780553296983',283,'The writings from the Dutch language diary kept by Anne Frank.',20.5,13.5,0.6,2.1,'9780553296983',1,'https://m.media-amazon.com/images/I/71LxcogUxpL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',4),
    ('Steve Jobs','Walter Isaacson',2011,'Simon & Schuster','1st','9781451648539',656,'A biography of Steve Jobs.',24.1,16.1,0.9,3.1,'9781451648539',1,'https://m.media-amazon.com/images/I/71sVQDj0SCL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',5),
    ('The Origin of Species','Charles Darwin',1859,'John Murray','1st','9781509827695',502,'A work of scientific literature which is considered to be the foundation of evolutionary biology.',22,15,0.8,2.6,'9781509827695',1,'https://m.media-amazon.com/images/I/71ea0N8I14L._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',3),
    ('The Road','Cormac McCarthy',2006,'Alfred A. Knopf','1st','9780307387899',287,'A novel detailing the journey of a father and his young son over a period of several months, across a landscape blasted by an unspecified cataclysm.',21.2,13.8,0.4,1.9,'9780307387899',1,'https://m.media-amazon.com/images/I/51M7XGLQTBL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('Thinking, Fast and Slow','Daniel Kahneman',2011,'Farrar, Straus and Giroux','1st','9780374533557',499,'A book that dives into the two systems of thought that drive the way we think.',23,15.5,0.7,2.4,'9780374533557',1,'https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',3),
    ('Educated','Tara Westover',2018,'Random House','1st','9780399590504',334,'A memoir recounting the authors experiences growing up in a strict and abusive household in rural Idaho but eventually escaping to learn about the wider world through education.',22.5,15.2,0.6,2.3,'9780399590504',1,'https://m.media-amazon.com/images/I/71-4MkLN5jL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',5),
    ('Becoming','Michelle Obama',2018,'Crown Publishing Group','1st','9781524763138',426,'A memoir by the former First Lady of the United States.',24,16,0.9,2.7,'9781524763138',1,'https://m.media-amazon.com/images/I/81cJTmFpG-L._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',5),
    ('The Hobbit','J.R.R. Tolkien',1937,'George Allen & Unwin','1st','9780345339683',310,'A fantasy novel and childrens book by J.R.R. Tolkien.',21,14,0.6,1.8,'9780345339683',1,'https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('The Da Vinci Code','Dan Brown',2003,'Doubleday','1st','9780307474278',454,'A mystery thriller novel by Dan Brown.',23,15,0.7,2.3,'9780307474278',1,'https://m.media-amazon.com/images/I/815WORuYMML._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('A Game of Thrones','George R.R. Martin',1996,'Bantam Books','1st','9780553103540',694,'A fantasy novel by George R.R. Martin, the first in A Song of Ice and Fire series.',24,16,0.9,2.8,'9780553103540',1,'https://m.media-amazon.com/images/I/71Jzezm8CBL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('The Immortal Life of Henrietta Lacks','Rebecca Skloot',2010,'Crown Publishing Group','1st','9781400052172',370,'A non-fiction book by Rebecca Skloot.',22.8,15.3,0.8,2.4,'9781400052172',1,'https://m.media-amazon.com/images/I/81coyP8S-ZL._AC_UF894,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',2),
    ('The Silent Patient','Alex Michaelides',2019,'Celadon Books','1st','9781250301697',336,'A psychological thriller novel by Alex Michaelides.',23.5,16,0.7,2.5,'9781250301697',1,'https://m.media-amazon.com/images/I/91lslnZ-btL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('Bad Blood','John Carreyrou',2018,'Knopf','1st','9781524731656',352,'The story of the rise and fall of Theranos, the one-time multibillion-dollar biotech startup.',23,15,0.6,2.3,'9781524731656',1,'https://m.media-amazon.com/images/I/61SGSxikRUL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',2),
    ('Catch-22','Joseph Heller',1961,'Simon & Schuster','1st','9781451626650',453,'A satirical novel set during World War II by Joseph Heller.',22,14.5,0.7,2.4,'9781451626650',1,'https://m.media-amazon.com/images/I/71Ym0vDDWsL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('The Subtle Art of Not Giving a F*ck','Mark Manson',2016,'HarperOne','1st','9780062457714',224,'A self-help book by Mark Manson.',21,13.5,0.6,1.8,'9780062457714',1,'https://m.media-amazon.com/images/I/71t4GuxLCuL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',2),
    ('The Power of Habit','Charles Duhigg',2012,'Random House','1st','9780812981605',371,'A book that explores the science behind habit creation and reformation.',21,13.5,0.6,2,'9780812981605',1,'https://m.media-amazon.com/images/I/71wm29Etl4L._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',2),
    ('Moby Dick','Herman Melville',1851,'Harper & Brothers','1st','9781503280786',635,'The narrative of the sailor Ishmaels adventures aboard the whaling ship Pequod.',23,15,0.8,2.5,'9781503280786',1,'https://m.media-amazon.com/images/I/81R91ODA9DL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('War and Peace','Leo Tolstoy',1869,'The Russian Messenger','1st','9780199232765',1225,'A novel that chronicles the French invasion of Russia and the impact of the Napoleonic era.',24,16,1.2,3.5,'9780199232765',1,'https://m.media-amazon.com/images/I/71wXZB-VtBL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('The Shining','Stephen King',1977,'Doubleday','1st','9780385121675',447,'A horror novel about Jack Torrance who becomes winter caretaker of the isolated Overlook Hotel in Colorado.',23.5,16,0.9,2.7,'9780385121675',1,'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('Guns, Germs, and Steel','Jared Diamond',1997,'W.W. Norton & Company','1st','9780393317558',494,'A transdisciplinary non-fiction book that presents a history of human societies.',24.1,16.1,0.9,2.8,'9780393317558',1,'https://m.media-amazon.com/images/I/61V8g4GgqdL._AC_UF894,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',2),
    ('The Girl with the Dragon Tattoo','Stieg Larsson',2005,'Norstedts Förlag','1st','9780307269751',465,'A mystery novel about the disappearance of a wealthy patriarchs niece.',22.9,15.4,0.8,2.5,'9780307269751',1,'https://m.media-amazon.com/images/I/81TBoyb1IwL._AC_UF894,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('Pride and Prejudice','Jane Austen',1813,'T. Egerton','1st','9780192833556',279,'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',20.5,13.5,0.5,2,'9780192833556',1,'https://m.media-amazon.com/images/I/81NLDvyAHrL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1),
    ('The Fellowship of the Ring','J.R.R. Tolkien',1954,'George Allen & Unwin','1st','9780261102354',423,'The first volume of The Lord of the Rings.',23,15,0.8,2.4,'9780261102354',1,'https://m.media-amazon.com/images/I/71Ep7UNeTtL._AC_UF894,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',3),
    ('The Handmaids Tale','Margaret Atwood',1985,'McClelland and Stewart','1st','9780395404255',311,'A dystopian novel set in a totalitarian society.',22.7,15.2,0.7,2.3,'9780395404255',1,'https://m.media-amazon.com/images/I/61su39k8NUL._AC_UF1000,1000_QL80_.jpg','2024-05-29 16:38:50','2024-05-29 16:38:50',1);



-- Inserção de registros na tabela `bookCategories`
-- Relacionamento entre os livros e as categorias
-- Inserção de registros na tabela `bookCategories`
INSERT INTO `bookCategories` (`categoryId`, `bookId`, `createdAt`, `updatedAt`)
VALUES
    -- Fiction
    (1, 1, NOW(), NOW()), -- The Great Gatsby
    (1, 2, NOW(), NOW()), -- To Kill a Mockingbird
    (1, 5, NOW(), NOW()), -- Brave New World
    (1, 6, NOW(), NOW()), -- The Catcher in the Rye
    (1, 9, NOW(), NOW()), -- The Diary of a Young Girl
    (1, 11, NOW(), NOW()), -- The Road
    (1, 15, NOW(), NOW()), -- The Hobbit
    (1, 17, NOW(), NOW()), -- A Game of Thrones
    (1, 18, NOW(), NOW()), -- The Immortal Life of Henrietta Lacks
    (1, 19, NOW(), NOW()), -- The Silent Patient
    (1, 21, NOW(), NOW()), -- Catch-22
    (1, 24, NOW(), NOW()), -- The Shining
    (1, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    (1, 26, NOW(), NOW()), -- The Girl with the Dragon Tattoo
    (1, 28, NOW(), NOW()), -- The Fellowship of the Ring
    (1, 29, NOW(), NOW()), -- The Handmaid's Tale
    -- Non-Fiction
    (2, 4, NOW(), NOW()), -- A Brief History of Time
    (2, 8, NOW(), NOW()), -- Sapiens: A Brief History of Humankind
    (2, 10, NOW(), NOW()), -- Steve Jobs
    (2, 12, NOW(), NOW()), -- The Origin of Species
    (2, 13, NOW(), NOW()), -- The Power of Habit
    (2, 14, NOW(), NOW()), -- Moby Dick
    (2, 16, NOW(), NOW()), -- Educated
    (2, 20, NOW(), NOW()), -- Bad Blood
    (2, 22, NOW(), NOW()), -- The Subtle Art of Not Giving a F*ck
    -- Science
    (3, 4, NOW(), NOW()), -- A Brief History of Time
    (3, 8, NOW(), NOW()), -- Sapiens: A Brief History of Humankind
    (3, 12, NOW(), NOW()), -- The Origin of Species
    (3, 13, NOW(), NOW()), -- The Power of Habit
    (3, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    -- History
    (4, 1, NOW(), NOW()), -- The Great Gatsby
    (4, 2, NOW(), NOW()), -- To Kill a Mockingbird
    (4, 9, NOW(), NOW()), -- The Diary of a Young Girl
    (4, 16, NOW(), NOW()), -- Becoming
    (4, 20, NOW(), NOW()), -- Bad Blood
    (4, 21, NOW(), NOW()), -- Catch-22
    (4, 22, NOW(), NOW()), -- The Subtle Art of Not Giving a F*ck
    (4, 23, NOW(), NOW()), -- The Power of Habit
    (4, 24, NOW(), NOW()), -- Moby Dick
    (4, 26, NOW(), NOW()), -- The Girl with the Dragon Tattoo
    (4, 29, NOW(), NOW()), -- The Handmaid's Tale
    -- Biography
    (5, 10, NOW(), NOW()), -- Steve Jobs
    (5, 16, NOW(), NOW()), -- Educated
    (5, 18, NOW(), NOW()), -- The Immortal Life of Henrietta Lacks
    (5, 19, NOW(), NOW()), -- The Silent Patient
    -- Mystery
    (7, 2, NOW(), NOW()), -- To Kill a Mockingbird
    (7, 23, NOW(), NOW()), -- The Girl with the Dragon Tattoo
    -- Thriller
    (8, 23, NOW(), NOW()), -- The Girl with the Dragon Tattoo
    (8, 24, NOW(), NOW()), -- The Shining
    (8, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    -- Horror
    (9, 24, NOW(), NOW()), -- The Shining
    -- Self-Help
    (10, 22, NOW(), NOW()), -- The Subtle Art of Not Giving a F*ck
    (10, 23, NOW(), NOW()), -- The Power of Habit
    -- Memoir
    (11, 16, NOW(), NOW()), -- Educated
    (11, 18, NOW(), NOW()), -- The Immortal Life of Henrietta Lacks
    (11, 19, NOW(), NOW()), -- The Silent Patient
    -- Science Fiction
    (12, 5, NOW(), NOW()), -- Brave New World
    (12, 6, NOW(), NOW()), -- The Catcher in the Rye
    (12, 11, NOW(), NOW()), -- The Road
    (12, 15, NOW(), NOW()), -- The Hobbit
    (12, 17, NOW(), NOW()), -- A Game of Thrones
    -- Dystopian
    (13, 5, NOW(), NOW()), -- Brave New World
    (13, 11, NOW(), NOW()), -- The Road
    (13, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    -- Romance
    (14, 1, NOW(), NOW()), -- The Great Gatsby
    (14, 2, NOW(), NOW()), -- To Kill a Mockingbird
    (14, 17, NOW(), NOW()), -- A Game of Thrones
    (14, 29, NOW(), NOW()), -- The Handmaid's Tale
    -- Adventure
    (15, 15, NOW(), NOW()), -- The Hobbit
    (15, 17, NOW(), NOW()), -- A Game of Thrones
    (15, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    -- Childrens
    (16, 15, NOW(), NOW()), -- The Hobbit
    -- Young Adult
    (17, 1, NOW(), NOW()), -- The Great Gatsby
    (17, 5, NOW(), NOW()), -- Brave New World
    (17, 10, NOW(), NOW()), -- Sapiens: A Brief History of Humankind
    (17, 15, NOW(), NOW()), -- The Hobbit
    (17, 20, NOW(), NOW()), -- The Fellowship of the Ring
    -- Classic
    (18, 1, NOW(), NOW()), -- The Great Gatsby
    (18, 2, NOW(), NOW()), -- To Kill a Mockingbird
    (18, 4, NOW(), NOW()), -- A Brief History of Time
    (18, 5, NOW(), NOW()), -- Brave New World
    (18, 6, NOW(), NOW()), -- The Catcher in the Rye
    (18, 8, NOW(), NOW()), -- The Diary of a Young Girl
    (18, 11, NOW(), NOW()), -- The Road
    (18, 14, NOW(), NOW()), -- The Hobbit
    (18, 15, NOW(), NOW()), -- The Hobbit
    (18, 18, NOW(), NOW()), -- The Origin of Species
    (18, 22, NOW(), NOW()), -- Moby Dick
    (18, 23, NOW(), NOW()), -- The Girl with the Dragon Tattoo
    (18, 24, NOW(), NOW()), -- The Shining
    (18, 26, NOW(), NOW()), -- Catch-22
    (18, 29, NOW(), NOW()), -- The Handmaid's Tale
    -- Philosophy
    (19, 4, NOW(), NOW()), -- A Brief History of Time
    (19, 5, NOW(), NOW()), -- Brave New World
    (19, 7, NOW(), NOW()), -- The Art of War
    (19, 10, NOW(), NOW()), -- Sapiens: A Brief History of Humankind
    (19, 12, NOW(), NOW()), -- Steve Jobs
    (19, 18, NOW(), NOW()), -- The Origin of Species
    (19, 22, NOW(), NOW()), -- Moby Dick
    -- Religion
    (20, 8, NOW(), NOW()), -- The Diary of a Young Girl
    (20, 16, NOW(), NOW()), -- Educated
    (20, 19, NOW(), NOW()), -- The Silent Patient
    -- Politics
    (21, 3, NOW(), NOW()), -- 1984
    (21, 4, NOW(), NOW()), -- A Brief History of Time
    (21, 5, NOW(), NOW()), -- Brave New World
    (21, 7, NOW(), NOW()), -- The Art of War
    (21, 10, NOW(), NOW()), -- Sapiens: A Brief History of Humankind
    (21, 11, NOW(), NOW()), -- The Road
    (21, 15, NOW(), NOW()), -- The Hobbit
    (21, 20, NOW(), NOW()), -- The Fellowship of the Ring
    -- Economics
    (22, 4, NOW(), NOW()), -- A Brief History of Time
    (22, 5, NOW(), NOW()), -- Brave New World
    (22, 10, NOW(), NOW()), -- Sapiens: A Brief History of Humankind
    -- Business
    (23, 12, NOW(), NOW()), -- Steve Jobs
    (23, 13, NOW(), NOW()), -- The Origin of Species
    (23, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    -- Art
    (24, 5, NOW(), NOW()), -- Brave New World
    (24, 9, NOW(), NOW()), -- The Art of War
    (24, 12, NOW(), NOW()), -- Steve Jobs
    (24, 13, NOW(), NOW()), -- The Origin of Species
    (24, 21, NOW(), NOW()), -- The Fellowship of the Ring
    (24, 22, NOW(), NOW()), -- Moby Dick
    (24, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    (24, 26, NOW(), NOW()), -- Catch-22
    (24, 29, NOW(), NOW()), -- The Handmaid's Tale
    -- Music
    (25, 12, NOW(), NOW()), -- Steve Jobs
    (25, 22, NOW(), NOW()), -- Moby Dick
    -- Sports
    (26, 12, NOW(), NOW()), -- Steve Jobs
    -- Cooking
    (27, 12, NOW(), NOW()), -- Steve Jobs
    -- Travel
    (28, 1, NOW(), NOW()), -- The Great Gatsby
    (28, 2, NOW(), NOW()), -- To Kill a Mockingbird
    (28, 11, NOW(), NOW()), -- The Road
    (28, 15, NOW(), NOW()), -- The Hobbit
    (28, 20, NOW(), NOW()), -- The Fellowship of the Ring
    (28, 24, NOW(), NOW()), -- The Shining
    (28, 25, NOW(), NOW()), -- Guns, Germs, and Steel
    (28, 26, NOW(), NOW()), -- Catch-22
    (28, 29, NOW(), NOW()); -- The Handmaid's Tale


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

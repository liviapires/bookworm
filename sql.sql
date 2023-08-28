-- query to select all the data from the table 'clients' in the database 'teste' LEFT joined with the table 'addresses' in the database 'teste' and the table 'phones' in the database 'teste' 

SELECT * FROM `teste`.`clients` 
    LEFT JOIN `teste`.`addresses` ON `teste`.`clients`.`addressesIds` = `teste`.`addresses`.`id` 
    LEFT JOIN `teste`.`phones` ON `teste`.`clients`.`phonesIds` = `teste`.`phones`.`id`;

-- query to insert data into the table 'phones' in the database 'teste'

INSERT INTO `teste`.`phones` (`ddd`, `number`, `type`, `createdAt`) VALUES ('11','1234567890', 'Comercial', '2019-01-01 00:00:00');

-- query to insert data into the table 'addresses' in the database 'teste'

INSERT INTO `teste`.`addresses` (`cep`, `street`, `number`, `neighborhood`, `complement`, `city`, `state`, `country`, `observation`,  `createdAt`) VALUES ('12345678', 'Rua Teste', '123', 'Bairro Teste', 'Complemento Teste', 'Cidade Teste', 'Estado Teste', 'País Teste', 'Observação Teste', '2019-01-01 00:00:00');

-- query to insert data into the table 'clients' in the database 'teste'

INSERT INTO `teste`.`clients` (`code`, `name`, `birthDate`, `gender`, `cpf`, `email`, `password`, `ranking`, `status`, `deleted`, `createdAt`, `addressesIds`, `phonesIds`)
    VALUES ('1234567890', 'Nome Teste', '2019-01-01 00:00:00', 'MASCULINO', '12345678901', 'aa@bb.com', '123456', '1', 'ATIVO', '0', '2019-01-01 00:00:00', '1', '3');

-- query to create the table 'addresses' in the database 'teste'

CREATE TABLE `teste`.`addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cep` varchar(8) NOT NULL,
  `street` varchar(255) NOT NULL,
  `number` varchar(10) NOT NULL,
  `neighborhood` varchar(255) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- query to create the table 'phones' in the database 'teste'

CREATE TABLE `teste`.`phones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ddd` varchar(2) NOT NULL,
  `number` varchar(25) NOT NULL,
  `type` ENUM('Comercial', 'Casa', 'Trabalho') NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- query to create the table 'clients' in the database 'teste' with the foreign keys 'addressesIds' and 'phonesIds' to the tables 'addresses' and 'phones' in the database 'teste'

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
  `status` ENUM('Ativo', 'Inativo') NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `addressesIds` int NOT NULL,
  `phonesIds` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addressesIds` (`addressesIds`),
  KEY `phonesIds` (`phonesIds`),
  CONSTRAINT `addressesIds` FOREIGN KEY (`addressesIds`) REFERENCES `addresses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `phonesIds` FOREIGN KEY (`phonesIds`) REFERENCES `phones` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: rentall_cars_v_3_0
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AdminPrivileges`
--

DROP TABLE IF EXISTS `AdminPrivileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminPrivileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` int NOT NULL,
  `previlegeId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `adminprivileges_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `AdminRoles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminPrivileges`
--

LOCK TABLES `AdminPrivileges` WRITE;
/*!40000 ALTER TABLE `AdminPrivileges` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminPrivileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminReviews`
--

DROP TABLE IF EXISTS `AdminReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminReviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `reviewContent` text,
  `image` varchar(255) DEFAULT NULL,
  `isEnable` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminReviews`
--

LOCK TABLES `AdminReviews` WRITE;
/*!40000 ALTER TABLE `AdminReviews` DISABLE KEYS */;
INSERT INTO `AdminReviews` VALUES (1,'Hennry','Earn extra cash by renting out your car. We assist you in every step of the rental process and keep you up to date with various suggestions and improvements to boost your income.\n','6356667cea8c8dea0b27a9126fe90bf7.png',1,'2023-08-18 08:37:15','2023-08-18 08:37:15'),(2,'Mary','Earn extra cash by renting out your car. We assist you in every step of the rental process and keep you up to date with various suggestions and improvements to boost your income.\n','2a25c01c1f1d3cb4d50a3e51fcba25fa.png',1,'2023-08-18 08:37:27','2023-08-18 08:37:27'),(3,'Joe','Earn extra cash by renting out your car. We assist you in every step of the rental process and keep you up to date with various suggestions and improvements to boost your income.\n','3c9ee357146de6718e72e9fc9b0a928d.png',1,'2023-08-18 08:37:50','2023-08-18 08:37:50');
/*!40000 ALTER TABLE `AdminReviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminRoles`
--

DROP TABLE IF EXISTS `AdminRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminRoles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminRoles`
--

LOCK TABLES `AdminRoles` WRITE;
/*!40000 ALTER TABLE `AdminRoles` DISABLE KEYS */;
/*!40000 ALTER TABLE `AdminRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AdminUser`
--

DROP TABLE IF EXISTS `AdminUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AdminUser` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `isSuperAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admin_user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AdminUser`
--

LOCK TABLES `AdminUser` WRITE;
/*!40000 ALTER TABLE `AdminUser` DISABLE KEYS */;
INSERT INTO `AdminUser` VALUES ('8b16c890-c205-11e6-a2c7-4195de507451','admin@radicalstart.com','$2a$08$SR.h58BFMCbcHbl3y9tvYe9UM.q1SMXh43M51po7FDXQrOcMpQxLy',1,1,'2016-12-14 13:59:34','2016-12-14 13:59:34',NULL);
/*!40000 ALTER TABLE `AdminUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banner`
--

DROP TABLE IF EXISTS `Banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banner`
--

LOCK TABLES `Banner` WRITE;
/*!40000 ALTER TABLE `Banner` DISABLE KEYS */;
INSERT INTO `Banner` VALUES (1,'Lorum Ipsum.','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',1,'2019-03-27 11:53:46','2023-08-18 07:35:56','5530fe8519a0415c2f127f189811b74a.png');
/*!40000 ALTER TABLE `Banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BedTypes`
--

DROP TABLE IF EXISTS `BedTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BedTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `bedCount` int DEFAULT NULL,
  `bedType` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `bedType` (`bedType`),
  CONSTRAINT `BedTypes_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BedTypes_ibfk_2` FOREIGN KEY (`bedType`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BedTypes`
--

LOCK TABLES `BedTypes` WRITE;
/*!40000 ALTER TABLE `BedTypes` DISABLE KEYS */;
INSERT INTO `BedTypes` VALUES (2,1,1,16,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(4,2,1,16,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(8,4,1,16,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(129,3,1,16,'2019-09-13 04:30:11','2019-09-13 04:30:11'),(145,5,1,16,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(154,6,1,16,'2019-09-14 10:34:07','2019-09-14 10:34:07');
/*!40000 ALTER TABLE `BedTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BlogDetails`
--

DROP TABLE IF EXISTS `BlogDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BlogDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `footerCategory` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BlogDetails`
--

LOCK TABLES `BlogDetails` WRITE;
/*!40000 ALTER TABLE `BlogDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `BlogDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cancellation`
--

DROP TABLE IF EXISTS `Cancellation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cancellation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `policyName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `policyContent` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `priorDays` int NOT NULL,
  `accommodationPriorCheckIn` float NOT NULL,
  `accommodationBeforeCheckIn` float NOT NULL,
  `accommodationDuringCheckIn` float NOT NULL,
  `guestFeePriorCheckIn` float NOT NULL,
  `guestFeeBeforeCheckIn` float NOT NULL,
  `guestFeeDuringCheckIn` float NOT NULL,
  `hostFeePriorCheckIn` float NOT NULL,
  `hostFeeBeforeCheckIn` float NOT NULL,
  `hostFeeDuringCheckIn` float NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cancellation`
--

LOCK TABLES `Cancellation` WRITE;
/*!40000 ALTER TABLE `Cancellation` DISABLE KEYS */;
INSERT INTO `Cancellation` VALUES (1,'Flexible','Cancel up to 1 day prior to arrival and get a 100% refund',1,100,100,100,100,100,0,100,100,100,1,'2017-06-09 22:43:35','2017-06-09 22:43:35'),(2,'Moderate','Cancel up to 5 days prior to arrival and get a 100% refund',5,100,50,50,100,100,0,100,100,100,1,'2017-06-09 22:46:10','2017-06-09 22:46:10'),(3,'Strict','Cancel up to 1 week prior to arrival and get a 50% refund',7,50,0,0,100,0,0,100,100,100,1,'2017-06-09 22:47:38','2017-06-09 22:47:38');
/*!40000 ALTER TABLE `Cancellation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CancellationDetails`
--

DROP TABLE IF EXISTS `CancellationDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CancellationDetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `cancellationPolicy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `refundToGuest` float NOT NULL,
  `payoutToHost` float NOT NULL,
  `guestServiceFee` float NOT NULL,
  `hostServiceFee` float NOT NULL,
  `total` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cancelledBy` enum('host','guest') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `CancellationDetails_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CancellationDetails`
--

LOCK TABLES `CancellationDetails` WRITE;
/*!40000 ALTER TABLE `CancellationDetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `CancellationDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClaimImages`
--

DROP TABLE IF EXISTS `ClaimImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClaimImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClaimImages`
--

LOCK TABLES `ClaimImages` WRITE;
/*!40000 ALTER TABLE `ClaimImages` DISABLE KEYS */;
/*!40000 ALTER TABLE `ClaimImages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Country`
--

DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT '2018-09-29 11:22:19',
  `updatedAt` datetime DEFAULT '2018-09-29 11:22:19',
  `dialCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Country`
--

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;
INSERT INTO `Country` VALUES (1,'DZ','Algeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+213'),(2,'AF','Afghanistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+93'),(3,'AL','Albania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+355'),(4,'AS','AmericanSamoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 684'),(5,'AD','Andorra',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+376'),(6,'AO','Angola',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+244'),(7,'AI','Anguilla',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 264'),(8,'AQ','Antarctica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(9,'AG','Antigua and Barbuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1268'),(10,'AR','Argentina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+54'),(11,'AM','Armenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+374'),(12,'AW','Aruba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+297'),(13,'AU','Australia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(14,'AT','Austria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+43'),(15,'AZ','Azerbaijan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+994'),(16,'BS','Bahamas',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 242'),(17,'BH','Bahrain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+973'),(18,'BD','Bangladesh',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+880'),(19,'BB','Barbados',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 246'),(20,'BY','Belarus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+375'),(21,'BE','Belgium',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+32'),(22,'BZ','Belize',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+501'),(23,'BJ','Benin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+229'),(24,'BM','Bermuda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 441'),(25,'BT','Bhutan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+975'),(26,'BO','Bolivia, Plurinational State of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+591'),(27,'BA','Bosnia and Herzegovina',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+387'),(28,'BW','Botswana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+267'),(29,'BR','Brazil',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+55'),(30,'IO','British Indian Ocean Territory',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+246'),(31,'BN','Brunei Darussalam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+673'),(32,'BG','Bulgaria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+359'),(33,'BF','Burkina Faso',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+226'),(34,'BI','Burundi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+257'),(35,'KH','Cambodia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+855'),(36,'CM','Cameroon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+237'),(37,'CA','Canada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(38,'CV','Cape Verde',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+238'),(39,'KY','Cayman Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+ 345'),(40,'CF','Central African Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+236'),(41,'TD','Chad',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+235'),(42,'CL','Chile',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+56'),(43,'CN','China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+86'),(44,'CX','Christmas Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(45,'CC','Cocos (Keeling) Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+61'),(46,'CO','Colombia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+57'),(47,'KM','Comoros',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+269'),(48,'CG','Congo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+242'),(49,'CD','Congo, The Democratic Republic of the',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+243'),(50,'CK','Cook Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+682'),(51,'CR','Costa Rica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+506'),(52,'CI','Cote d\'Ivoire',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+225'),(53,'HR','Croatia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+385'),(54,'CU','Cuba',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+53'),(55,'CY','Cyprus',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+537'),(56,'CZ','Czech Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+420'),(57,'DK','Denmark',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+45'),(58,'DJ','Djibouti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+253'),(59,'DM','Dominica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 767'),(60,'DO','Dominican Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 849'),(61,'EC','Ecuador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+593'),(62,'EG','Egypt',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+20'),(63,'SV','El Salvador',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+503'),(64,'GQ','Equatorial Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+240'),(65,'ER','Eritrea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+291'),(66,'EE','Estonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+372'),(67,'ET','Ethiopia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+251'),(68,'FK','Falkland Islands (Malvinas)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(69,'FO','Faroe Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+298'),(70,'FJ','Fiji',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+679'),(71,'FI','Finland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358'),(72,'FR','France',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+33'),(73,'GF','French Guiana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+594'),(74,'PF','French Polynesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+689'),(75,'GA','Gabon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+241'),(76,'GM','Gambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+220'),(77,'GE','Georgia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+995'),(78,'DE','Germany',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+49'),(79,'GH','Ghana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+233'),(80,'GI','Gibraltar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+350'),(81,'GR','Greece',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+30'),(82,'GL','Greenland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+299'),(83,'GD','Grenada',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 473'),(84,'GP','Guadeloupe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(85,'GU','Guam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 671'),(86,'GT','Guatemala',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+502'),(87,'GG','Guernsey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(88,'GN','Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+224'),(89,'GW','Guinea-Bissau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+245'),(90,'GY','Guyana',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(91,'HT','Haiti',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+509'),(92,'VA','Holy See (Vatican City State)',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+379'),(93,'HN','Honduras',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+504'),(94,'HK','Hong Kong',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+852'),(95,'HU','Hungary',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+36'),(96,'IS','Iceland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+354'),(97,'IN','India',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+91'),(98,'ID','Indonesia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+62'),(99,'IR','Iran, Islamic Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+98'),(100,'IQ','Iraq',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+964'),(101,'IE','Ireland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+353'),(102,'IM','Isle of Man',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(103,'IL','Israel',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+972'),(104,'IT','Italy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+39'),(105,'JM','Jamaica',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 876'),(106,'JP','Japan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+81'),(107,'JE','Jersey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(108,'JO','Jordan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+962'),(109,'KZ','Kazakhstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7 7'),(110,'KE','Kenya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+254'),(111,'KI','Kiribati',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+686'),(112,'KP','Korea, Democratic People\'s Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+850'),(113,'KR','Korea, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+82'),(114,'KW','Kuwait',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+965'),(115,'KG','Kyrgyzstan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+996'),(116,'LA','Lao People\'s Democratic Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+856'),(117,'LV','Latvia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+371'),(118,'LB','Lebanon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+961'),(119,'LS','Lesotho',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+266'),(120,'LR','Liberia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+231'),(121,'LY','Libyan Arab Jamahiriya',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+218'),(122,'LI','Liechtenstein',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+423'),(123,'LT','Lithuania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+370'),(124,'LU','Luxembourg',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+352'),(125,'MO','Macao',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+853'),(126,'MK','Macedonia, The Former Yugoslav Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+389'),(127,'MG','Madagascar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+261'),(128,'MW','Malawi',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+265'),(129,'MY','Malaysia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+60'),(130,'MV','Maldives',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+960'),(131,'ML','Mali',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+223'),(132,'MT','Malta',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+356'),(133,'MH','Marshall Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+692'),(134,'MQ','Martinique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+596'),(135,'MR','Mauritania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+222'),(136,'MU','Mauritius',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+230'),(137,'YT','Mayotte',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(138,'MX','Mexico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+52'),(139,'FM','Micronesia, Federated States of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+691'),(140,'MD','Moldova, Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+373'),(141,'MC','Monaco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+377'),(142,'MN','Mongolia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+976'),(143,'ME','Montenegro',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+382'),(144,'MS','Montserrat',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1664'),(145,'MA','Morocco',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+212'),(146,'MZ','Mozambique',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+258'),(147,'MM','Myanmar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+95'),(148,'NA','Namibia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+264'),(149,'NR','Nauru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+674'),(150,'NP','Nepal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+977'),(151,'NL','Netherlands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+31'),(152,'AN','Netherlands Antilles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+599'),(153,'NC','New Caledonia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+687'),(154,'NZ','New Zealand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+64'),(155,'NI','Nicaragua',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+505'),(156,'NE','Niger',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+227'),(157,'NG','Nigeria',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+234'),(158,'NU','Niue',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+683'),(159,'NF','Norfolk Island',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+672'),(160,'MP','Northern Mariana Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 670'),(161,'NO','Norway',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(162,'OM','Oman',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+968'),(163,'PK','Pakistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+92'),(164,'PW','Palau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+680'),(165,'PS','Palestinian Territory, Occupied',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+970'),(166,'PA','Panama',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+507'),(167,'PG','Papua New Guinea',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+675'),(168,'PY','Paraguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+595'),(169,'PE','Peru',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+51'),(170,'PH','Philippines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+63'),(171,'PN','Pitcairn',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+872'),(172,'PL','Poland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+48'),(173,'PT','Portugal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+351'),(174,'PR','Puerto Rico',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 939'),(175,'QA','Qatar',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+974'),(176,'RO','Romania',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+40'),(177,'RU','Russia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+7'),(178,'RW','Rwanda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+250'),(179,'RE','Réunion',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+262'),(180,'BL','Saint Barthélemy',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(181,'SH','Saint Helena, Ascension and Tristan Da Cunha',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+290'),(182,'KN','Saint Kitts and Nevis',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 869'),(183,'LC','Saint Lucia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 758'),(184,'MF','Saint Martin',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+590'),(185,'PM','Saint Pierre and Miquelon',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+508'),(186,'VC','Saint Vincent and the Grenadines',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 784'),(187,'WS','Samoa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+685'),(188,'SM','San Marino',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+378'),(189,'ST','Sao Tome and Principe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+239'),(190,'SA','Saudi Arabia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+966'),(191,'SN','Senegal',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+221'),(192,'RS','Serbia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+381'),(193,'SC','Seychelles',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+248'),(194,'SL','Sierra Leone',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+232'),(195,'SG','Singapore',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+65'),(196,'SK','Slovakia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+421'),(197,'SI','Slovenia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+386'),(198,'SB','Solomon Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+677'),(199,'SO','Somalia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+252'),(200,'ZA','South Africa',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+27'),(201,'GS','South Georgia and the South Sandwich Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+500'),(202,'ES','Spain',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+34'),(203,'LK','Sri Lanka',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+94'),(204,'SD','Sudan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+249'),(205,'SR','Suriname',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+597'),(206,'SJ','Svalbard and Jan Mayen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+47'),(207,'SZ','Swaziland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+268'),(208,'SE','Sweden',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+46'),(209,'CH','Switzerland',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+41'),(210,'SY','Syrian Arab Republic',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+963'),(211,'TW','Taiwan, Province of China',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+886'),(212,'TJ','Tajikistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+992'),(213,'TZ','Tanzania, United Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+255'),(214,'TH','Thailand',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+66'),(215,'TL','Timor-Leste',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+670'),(216,'TG','Togo',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+228'),(217,'TK','Tokelau',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+690'),(218,'TO','Tonga',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+676'),(219,'TT','Trinidad and Tobago',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 868'),(220,'TN','Tunisia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+216'),(221,'TR','Turkey',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+90'),(222,'TM','Turkmenistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+993'),(223,'TC','Turks and Caicos Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 649'),(224,'TV','Tuvalu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+688'),(225,'UG','Uganda',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+256'),(226,'UA','Ukraine',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+380'),(227,'AE','United Arab Emirates',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+971'),(228,'GB','United Kingdom',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+44'),(229,'US','United States',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1'),(230,'UY','Uruguay',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+598'),(231,'UZ','Uzbekistan',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+998'),(232,'VU','Vanuatu',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+678'),(233,'VE','Venezuela, Bolivarian Republic of',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+58'),(234,'VN','Viet Nam',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+84'),(235,'VG','Virgin Islands, British',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 284'),(236,'VI','Virgin Islands, U.S.',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+1 340'),(237,'WF','Wallis and Futuna',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+681'),(238,'YE','Yemen',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+967'),(239,'ZM','Zambia',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+260'),(240,'ZW','Zimbabwe',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+263'),(241,'AX','Åland Islands',1,'2019-03-27 11:53:47','2018-09-29 11:22:19','+358');
/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Currencies`
--

DROP TABLE IF EXISTS `Currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Currencies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `isBaseCurrency` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPayment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Currencies`
--

LOCK TABLES `Currencies` WRITE;
/*!40000 ALTER TABLE `Currencies` DISABLE KEYS */;
INSERT INTO `Currencies` VALUES (1,'AUD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(2,'BGN',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(3,'BRL',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(4,'CAD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(5,'CHF',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(6,'CNY',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(7,'CZK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(8,'DKK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(9,'EUR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(10,'GBP',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(11,'HKD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(12,'HRK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(13,'HUF',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(14,'IDR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(15,'ILS',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(16,'INR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(17,'JPY',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(18,'KRW',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(19,'MXN',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(20,'MYR',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(21,'NOK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(22,'NZD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(23,'PHP',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(24,'PLN',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(25,'RON',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(26,'RUB',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(27,'SEK',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0),(28,'SGD',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(29,'THB',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(30,'TRY',1,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(31,'USD',1,1,'2019-03-27 11:53:47','2019-09-17 07:33:08',1),(32,'ZAR',0,0,'2019-03-27 11:53:47','2019-09-17 07:33:08',0);
/*!40000 ALTER TABLE `Currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CurrencyRates`
--

DROP TABLE IF EXISTS `CurrencyRates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CurrencyRates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currencyCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` float NOT NULL,
  `isBase` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=437 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CurrencyRates`
--

LOCK TABLES `CurrencyRates` WRITE;
/*!40000 ALTER TABLE `CurrencyRates` DISABLE KEYS */;
INSERT INTO `CurrencyRates` VALUES (1,'AED',3.67307,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(2,'AFN',84.9318,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(3,'ALL',97.083,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(4,'AMD',386.497,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(5,'ANG',1.79598,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(6,'AOA',827.5,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(7,'ARS',349.927,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(8,'AWG',1.8025,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(9,'AZN',1.7,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(10,'BAM',1.79782,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(11,'BBD',2,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(12,'BDT',109.433,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(13,'BGN',1.79994,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(14,'BHD',0.376976,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(15,'BIF',2833.52,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(16,'BMD',1,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(17,'BND',1.35814,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(18,'BOB',6.92106,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(19,'BRL',4.977,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(20,'BSD',1,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(21,'BTN',83.1137,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(22,'BWP',13.6032,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(23,'BYN',2.52364,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(24,'BYR',25236.4,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(25,'BZD',2.01605,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(26,'CAD',1.3542,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(27,'CDF',2471.76,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(28,'CHF',0.879462,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(29,'CLF',0.0313479,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(30,'CLP',866.11,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(31,'CNY',7.28487,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(32,'COP',4117.98,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(33,'CRC',534.313,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(34,'CUC',1,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(35,'CVE',101.455,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(36,'CZK',22.1189,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(37,'DJF',177.836,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(38,'DKK',6.85355,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(39,'DOP',56.6889,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(40,'DZD',135.96,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(41,'EGP',30.8911,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(42,'ETB',55.022,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(43,'EUR',0.919723,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(44,'FJD',2.27157,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(45,'FKP',0.786724,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(46,'GBP',0.786716,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(47,'GEL',2.618,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(48,'GHS',11.2579,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(49,'GIP',0.786725,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(50,'GMD',60.5618,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(51,'GNF',8635.03,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(52,'GTQ',7.85187,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(53,'GYD',209.296,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(54,'HKD',7.82808,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(55,'HNL',24.6064,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(56,'HRK',6.9283,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(57,'HTG',135.785,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(58,'HUF',353.889,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(59,'IDR',15311.9,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(60,'ILS',3.78869,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(61,'INR',83.1114,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(62,'IQD',1309.13,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(63,'ISK',132.15,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(64,'JMD',154.612,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(65,'JOD',0.7086,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(66,'JPY',145.343,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(67,'KES',144.283,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(68,'KGS',88.27,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(69,'KHR',4135.26,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(70,'KMF',452.504,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(71,'KRW',1339.06,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(72,'KWD',0.307904,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(73,'KYD',0.833289,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(74,'KZT',461.987,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(75,'LAK',19382.7,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(76,'LBP',15039.8,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(77,'LKR',322.979,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(78,'LRD',186.235,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(79,'LSL',19.0698,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(80,'LYD',4.82003,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(81,'MAD',9.92255,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(82,'MDL',17.6802,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(83,'MGA',4509.4,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(84,'MKD',56.5902,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(85,'MMK',2100.32,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(86,'MNT',3461.21,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(87,'MOP',8.06255,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(88,'MRO',379.092,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(89,'MUR',45.3999,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(90,'MVR',15.3763,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(91,'MWK',1080.86,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(92,'MXN',17.0986,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(93,'MYR',4.645,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(94,'MZN',63.8525,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(95,'NAD',19.0755,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(96,'NGN',767.97,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(97,'NIO',36.5665,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(98,'NOK',10.5865,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(99,'NPR',133.001,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(100,'NZD',1.68646,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(101,'OMR',0.384997,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(102,'PAB',1,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(103,'PEN',3.72323,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(104,'PGK',3.60537,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(105,'PHP',56.2798,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(106,'PKR',296.119,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(107,'PLN',4.10984,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(108,'PYG',7268.35,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(109,'QAR',3.64092,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(110,'RON',4.5457,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(111,'RSD',107.794,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(112,'RUB',93.6416,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(113,'RWF',1189.01,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(114,'SAR',3.75029,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(115,'SBD',8.36952,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(116,'SCR',13.5088,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(117,'SDG',601,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(118,'SEK',10.9366,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(119,'SHP',0.786724,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(120,'SKK',27.7094,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(121,'SLL',20341.5,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(122,'SOS',568.756,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(123,'SRD',38.2092,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(124,'STD',22486.3,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(125,'SVC',8.74919,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(126,'SZL',19.0629,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(127,'THB',35.4125,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(128,'TJS',10.9833,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(129,'TMT',3.5,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(130,'TND',3.09007,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(131,'TOP',2.39168,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(132,'TRY',27.1095,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(133,'TTD',6.7821,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(134,'TWD',31.919,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(135,'TZS',2502.04,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(136,'UAH',36.9329,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(137,'UGX',3734.28,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(138,'UYU',37.9138,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(139,'UZS',12071.7,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(140,'VES',31.6193,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(141,'VND',23817.8,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(142,'VUV',115.864,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(143,'WST',2.75312,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(144,'XAF',606.266,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(145,'XAG',0.0439793,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(146,'XAU',0.000528298,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(147,'XCD',2.70127,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(148,'XOF',603.096,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(149,'XPD',0.0008149,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(150,'XPF',109.748,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(151,'XPT',0.00111751,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(152,'YER',250.3,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(153,'ZAR',19.0381,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(154,'ZMK',5252.55,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(155,'ZMW',19.4235,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(156,'JEP',0.786724,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(157,'GGP',0.786724,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(158,'IMP',0.786724,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(159,'CNH',7.30475,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(160,'EEK',14.3914,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(161,'LTL',3.17582,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(162,'LVL',0.646434,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(163,'TMM',17500,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(164,'ZWD',374.8,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(165,'VEF',3157220,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(166,'SGD',1.35761,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(167,'AUD',1.5606,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(168,'USD',1,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(169,'BTC',0.000037714,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(170,'BCH',0.00537953,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(171,'BSV',0.0344245,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(172,'ETH',0.000591198,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(173,'ETH2',0.000591198,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(174,'ETC',0.063674,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(175,'LTC',0.015294,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(176,'ZRX',5.77441,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(177,'USDC',1,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(178,'BAT',5.8782,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(179,'LOOM',25.4137,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(180,'MANA',3.27386,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(181,'KNC',1.86029,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(182,'LINK',0.16009,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(183,'DNT',38.835,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(184,'MKR',0.000914064,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(185,'CVC',13.9762,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(186,'OMG',2.15848,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(187,'GNT',6.01074,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(188,'DAI',0.99995,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(189,'SNT',47.3149,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(190,'ZEC',0.0401849,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(191,'XRP',1.93686,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(192,'REP',0.772218,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(193,'XLM',8.72951,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(194,'EOS',1.71321,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(195,'XTZ',1.43781,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(196,'ALGO',10.5374,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(197,'DASH',0.0378644,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(198,'ATOM',0.13197,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(199,'OXT',19.1022,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(200,'COMP',0.0238124,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(201,'ENJ',4.10678,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(202,'REPV2',0.772218,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(203,'BAND',1.00301,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(204,'NMR',0.0873362,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(205,'CGLD',2.36128,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(206,'UMA',0.705467,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(207,'LRC',5.37634,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(208,'YFI',0.000182964,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(209,'UNI',0.198866,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(210,'BAL',0.273224,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(211,'REN',21.4362,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(212,'WBTC',0.0000376956,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(213,'NU',16.2566,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(214,'YFII',0.00226415,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(215,'FIL',0.285796,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(216,'AAVE',0.0177085,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(217,'BNT',2.49221,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(218,'GRT',10.9649,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(219,'SNX',0.471921,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(220,'STORJ',4.3802,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(221,'SUSHI',1.68549,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(222,'MATIC',1.71556,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(223,'SKL',45.7666,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(224,'ADA',3.77216,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(225,'ANKR',51.1378,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(226,'CRV',1.99382,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(227,'ICP',0.284172,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(228,'NKN',11.5207,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(229,'OGN',13.1165,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(230,'1INCH',4.158,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(231,'USDT',1.00027,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(232,'FORTH',0.38835,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(233,'CTSI',8.05477,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(234,'TRB',0.098912,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(235,'POLY',8.17327,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(236,'MIR',71.1419,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(237,'RLC',0.960984,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(238,'DOT',0.221926,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(239,'SOL',0.0452796,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(240,'DOGE',16.0681,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(241,'MLN',0.0603682,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(242,'GTC',1.15607,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(243,'AMP',479.616,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(244,'SHIB',118413,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(245,'CHZ',15.6128,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(246,'KEEP',11.1807,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(247,'LPT',0.157729,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(248,'QNT',0.0101667,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(249,'BOND',0.381679,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(250,'RLY',122.186,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(251,'CLV',31.2989,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(252,'FARM',0.0474271,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(253,'MASK',0.379507,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(254,'ANT',0.22831,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(255,'FET',5.18538,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(256,'PAX',1.00609,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(257,'ACH',70.804,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(258,'ASM',116.55,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(259,'PLA',5.89449,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(260,'RAI',0.367647,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(261,'TRIBE',3.62942,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(262,'ORN',1.80832,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(263,'IOTX',68.918,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(264,'UST',85.2878,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(265,'QUICK',0.021395,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(266,'AXS',0.205761,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(267,'REQ',14.9365,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(268,'WLUNA',15880.9,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(269,'TRU',33.8409,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(270,'RAD',0.749064,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(271,'COTI',25,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(272,'DDX',4.02576,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(273,'SUKU',26.1097,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(274,'RGT',1.07988,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(275,'XYO',308.642,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(276,'ZEN',0.136426,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(277,'AST',11.8906,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(278,'AUCTION',0.215517,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(279,'BUSD',0.999228,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(280,'JASMY',298.954,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(281,'WCFG',4.158,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(282,'BTRST',3.5524,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(283,'AGLD',2.00562,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(284,'AVAX',0.091954,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(285,'FX',7.77303,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(286,'TRAC',4.47427,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(287,'LCX',23.2288,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(288,'ARPA',24.8447,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(289,'BADGER',0.472813,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(290,'KRL',4.45534,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(291,'PERP',2.40616,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(292,'RARI',1.07527,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(293,'DESO',0.114613,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(294,'API3',1.04439,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(295,'NCT',120.627,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(296,'SHPING',444.346,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(297,'UPI',717.931,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(298,'CRO',19.2123,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(299,'MTL',0.88968,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(300,'ABT',13.2714,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(301,'CVX',0.356062,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(302,'AVT',1.14943,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(303,'MDT',26.3505,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(304,'VGX',7.88644,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(305,'ALCX',0.0904977,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(306,'COVAL',132.1,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(307,'FOX',38.5356,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(308,'MUSD',1.00337,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(309,'CELR',85.6531,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(310,'GALA',50.9003,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(311,'POWR',7.64234,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(312,'GYEN',145.582,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(313,'ALICE',1.35501,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(314,'INV',0.0305437,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(315,'LQTY',1.24316,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(316,'PRO',3.41239,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(317,'SPELL',2573.67,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(318,'ENS',0.12285,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(319,'DIA',4.4959,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(320,'BLZ',12.012,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(321,'CTX',1.07527,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(322,'ERN',0.677966,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(323,'IDEX',23.015,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(324,'MCO2',1.02041,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(325,'POLS',3.88199,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(326,'SUPER',12.0904,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(327,'UNFI',0.263505,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(328,'STX',2.09996,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(329,'KSM',0.0482393,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(330,'GODS',5.75027,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(331,'IMX',1.66833,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(332,'RBN',4.22101,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(333,'BICO',4.65116,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(334,'GFI',2.96868,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(335,'ATA',15.015,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(336,'GLM',6.02773,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(337,'MPL',0.217865,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(338,'PLU',0.160772,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(339,'SWFTC',893.256,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(340,'SAND',3.03859,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(341,'OCEAN',3.32392,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(342,'GNO',0.00987898,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(343,'FIDA',6.08458,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(344,'ORCA',1.19868,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(345,'CRPT',11.8835,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(346,'QSP',100.756,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(347,'RNDR',0.697861,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(348,'NEST',122.324,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(349,'PRQ',12.945,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(350,'HOPR',22.1976,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(351,'JUP',255.395,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(352,'MATH',13.86,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(353,'SYN',2.03874,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(354,'AIOZ',80.6452,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(355,'WAMPL',0.352113,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(356,'AERGO',11.2676,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(357,'INDEX',0.892857,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(358,'TONE',101.885,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(359,'HIGH',0.888099,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(360,'GUSD',1.0005,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(361,'FLOW',2.20751,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(362,'ROSE',23.9607,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(363,'OP',0.716332,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(364,'APE',0.652316,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(365,'MINA',2.442,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(366,'MUSE',0.218245,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(367,'SYLO',813.339,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(368,'CBETH',0.000565945,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(369,'DREP',4.17885,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(370,'ELA',0.672495,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(371,'FORT',9.15332,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(372,'ALEPH',12.5471,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(373,'DEXT',1.91369,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(374,'FIS',4.111,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(375,'BIT',2.38863,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(376,'GMT',6.1106,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(377,'GST',95.7488,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(378,'MEDIA',0.158983,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(379,'C98',7.43218,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(380,'ARB',0.98401,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(381,'T',52.8262,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(382,'APT',0.174216,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(383,'AXL',2.63331,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(384,'HBAR',17.632,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(385,'FLR',78.8333,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(386,'SUI',2.096,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(387,'PNG',45.9876,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(388,'MULTI',0.783085,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(389,'OSMO',2.26321,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(390,'WAXL',2.63748,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(391,'EUROC',0.91954,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(392,'DAR',12.2699,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(393,'TIME',0.0647668,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(394,'SPA',236.044,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(395,'MAGIC',1.65934,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(396,'AUDIO',6.5189,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(397,'TVK',47.6758,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(398,'XMON',0.00083994,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(399,'INJ',0.131865,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(400,'LDO',0.601685,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(401,'GHST',1.29116,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(402,'ILV',0.0221852,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(403,'GAL',0.923361,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(404,'MXC',137.741,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(405,'LIT',1.8031,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(406,'PUNDIX',3.03582,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(407,'PRIME',0.30446,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(408,'AURORA',15.748,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(409,'MONA',0.00329968,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(410,'POND',127.307,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(411,'BOBA',8.01603,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(412,'NEAR',0.875657,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(413,'PYR',0.297974,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(414,'VOXEL',7.73395,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(415,'RPL',0.0387747,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(416,'ACS',460.204,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(417,'MSOL',0.0402334,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(418,'MNDE',24.1051,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(419,'EGLD',0.0362911,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(420,'KAVA',1.44238,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(421,'LSETH',0.000569734,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(422,'OOKI',436.11,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(423,'SEI',5.96837,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(424,'STG',1.83004,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(425,'QI',185.322,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(426,'RARE',16.7224,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(427,'HFT',3.17612,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(428,'LOKA',5.05561,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(429,'XCN',1197.6,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(430,'HNT',0.552944,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(431,'METIS',0.0748503,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(432,'DYP',7.65052,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(433,'BLUR',4.78813,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(434,'00',12.3762,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(435,'DIMO',13.7476,0,'2023-08-18 07:00:02','2023-08-18 07:00:02'),(436,'USD',1,1,'2023-08-18 07:00:02','2023-08-18 07:00:02');
/*!40000 ALTER TABLE `CurrencyRates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DocumentVerification`
--

DROP TABLE IF EXISTS `DocumentVerification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocumentVerification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `documentStatus` enum('pending','approved') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocumentVerification`
--

LOCK TABLES `DocumentVerification` WRITE;
/*!40000 ALTER TABLE `DocumentVerification` DISABLE KEYS */;
/*!40000 ALTER TABLE `DocumentVerification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EmailToken`
--

DROP TABLE IF EXISTS `EmailToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EmailToken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `EmailToken_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EmailToken`
--

LOCK TABLES `EmailToken` WRITE;
/*!40000 ALTER TABLE `EmailToken` DISABLE KEYS */;
INSERT INTO `EmailToken` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','1553672955896','2019-03-27 07:49:16','2019-03-27 07:49:16'),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','1553675005475','2019-03-27 08:23:25','2019-03-27 08:23:25');
/*!40000 ALTER TABLE `EmailToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FailedTransactionHistory`
--

DROP TABLE IF EXISTS `FailedTransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FailedTransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payoutType` enum('claimPayout','payout') COLLATE utf8mb4_unicode_ci DEFAULT 'payout',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `failedtransactionhistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FailedTransactionHistory`
--

LOCK TABLES `FailedTransactionHistory` WRITE;
/*!40000 ALTER TABLE `FailedTransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `FailedTransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FindYourVehicleBlock`
--

DROP TABLE IF EXISTS `FindYourVehicleBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FindYourVehicleBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `value` text,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FindYourVehicleBlock`
--

LOCK TABLES `FindYourVehicleBlock` WRITE;
/*!40000 ALTER TABLE `FindYourVehicleBlock` DISABLE KEYS */;
INSERT INTO `FindYourVehicleBlock` VALUES (1,'heading','Book your car anywhere, anytime','2023-08-17 13:51:21','2023-08-18 08:38:52'),(2,'buttonLabel','Find your car','2023-08-17 13:51:21','2023-08-18 08:38:52'),(3,'buttonLink','/s','2023-08-17 13:51:21','2023-08-18 08:38:52'),(4,'content1','Take your pick from a wide range of cars with state of the art features and take them for a spin.','2023-08-17 13:51:21','2023-08-18 08:38:52'),(5,'content2','Experience the joys of owning a car without the hassles that accompany ownership.','2023-08-17 13:51:21','2023-08-18 08:38:52'),(6,'content3','Select the favorite cars of your choice from our wide range of cars book.','2023-08-17 13:51:21','2023-08-18 08:38:52'),(7,'content4',NULL,'2023-08-17 13:51:21','2023-08-18 08:38:52'),(8,'content5',NULL,'2023-08-17 13:51:21','2023-08-18 08:38:52'),(9,'image','86694af7da484631f2733a28aa20504a.png','2023-08-17 13:51:21','2023-08-18 08:38:52');
/*!40000 ALTER TABLE `FindYourVehicleBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FooterBlock`
--

DROP TABLE IF EXISTS `FooterBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FooterBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content1` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content2` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content3` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FooterBlock`
--

LOCK TABLES `FooterBlock` WRITE;
/*!40000 ALTER TABLE `FooterBlock` DISABLE KEYS */;
INSERT INTO `FooterBlock` VALUES (1,'24/7 customer support','Lorem Ipsum is simply dummy text of the printing and typesetting industry 000 000 0000 000.','Verified ID','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','Security Assurance','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',1,'2018-05-22 11:12:19','2019-09-16 17:43:41'),(2,'one','hkh','one ','jkjh','one ','nknk',1,'2018-05-22 11:14:18','2018-05-22 11:14:18'),(3,'one','hkhih','one ','nhjlkhk','one ','klnklh',1,'2018-05-22 11:15:07','2018-05-22 11:15:07'),(4,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdssdfds',1,'2018-05-22 11:34:58','2018-05-22 11:34:58'),(5,'fdf','fdsfds','fdsfd','fdsfds','fdsff','fdss',1,'2018-05-22 11:35:14','2018-05-22 11:35:14'),(6,'fdf','fdsfds','fdsf','fdsfd','fds','fdss',1,'2018-05-22 11:39:06','2018-05-22 11:39:06');
/*!40000 ALTER TABLE `FooterBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ForgotPassword`
--

DROP TABLE IF EXISTS `ForgotPassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ForgotPassword` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `ForgotPassword_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ForgotPassword`
--

LOCK TABLES `ForgotPassword` WRITE;
/*!40000 ALTER TABLE `ForgotPassword` DISABLE KEYS */;
/*!40000 ALTER TABLE `ForgotPassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ImageBanner`
--

DROP TABLE IF EXISTS `ImageBanner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ImageBanner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `buttonLabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `buttonLabel2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buttonLink2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buttonLink1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ImageBanner`
--

LOCK TABLES `ImageBanner` WRITE;
/*!40000 ALTER TABLE `ImageBanner` DISABLE KEYS */;
INSERT INTO `ImageBanner` VALUES (1,'Lorem Ipsum is simply dummy text','Lorem Ipsum is simply dummy text of the printing and typesetting industry.',' Book you car','88c35210374d163eb7eb0e0f6ac479e9.png','2019-03-27 11:53:47','2023-08-18 08:34:35','Become an owner','/why-become-owner','/s');
/*!40000 ALTER TABLE `ImageBanner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListBlockedDates`
--

DROP TABLE IF EXISTS `ListBlockedDates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListBlockedDates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `calendarId` int DEFAULT NULL,
  `calendarStatus` enum('available','blocked','reservation') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isSpecialPrice` double DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `ListBlockedDates_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ListBlockedDates_ibfk_2` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListBlockedDates`
--

LOCK TABLES `ListBlockedDates` WRITE;
/*!40000 ALTER TABLE `ListBlockedDates` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListBlockedDates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListCalendar`
--

DROP TABLE IF EXISTS `ListCalendar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListCalendar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListCalendar_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListCalendar`
--

LOCK TABLES `ListCalendar` WRITE;
/*!40000 ALTER TABLE `ListCalendar` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListCalendar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListPhotos`
--

DROP TABLE IF EXISTS `ListPhotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListPhotos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `isCover` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListPhotos_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListPhotos`
--

LOCK TABLES `ListPhotos` WRITE;
/*!40000 ALTER TABLE `ListPhotos` DISABLE KEYS */;
INSERT INTO `ListPhotos` VALUES (1,1,'ecb5d99011fefb489dda1143f3afae38.jpeg','image/jpeg',0,'2019-08-23 12:02:52','2019-08-23 12:02:52'),(2,1,'a5386c08cbbb82e6bf898bdc554879b7.jpeg','image/jpeg',0,'2019-08-23 12:02:52','2019-08-23 12:02:52'),(3,1,'77bbfc7f942856fad4c7d3cb2ea6a8e4.jpeg','image/jpeg',0,'2019-08-23 12:02:53','2019-08-23 12:02:53'),(4,1,'bea34f1da17b45c76ebef17621c2635a.jpeg','image/jpeg',0,'2019-08-23 12:02:53','2019-08-23 12:02:53'),(5,1,'4f5ead9ad6c69e987ecf6c0db935db5f.jpeg','image/jpeg',0,'2019-08-23 12:02:54','2019-08-23 12:02:54'),(6,1,'14906d68cb79f41ea8c6a3bf6784403e.jpeg','image/jpeg',0,'2019-08-23 12:02:54','2019-08-23 12:02:54'),(7,1,'e36036a0710fdb1e3f0bec1469c63d9d.jpeg','image/jpeg',0,'2019-08-23 12:02:54','2019-08-23 12:02:54'),(8,2,'51ca34d7f610ce94eb9daa8194c06f4e.jpeg','image/jpeg',0,'2019-08-23 12:19:09','2019-08-23 12:19:09'),(9,2,'afead55fd0cb6593b076943999af8a8b.jpeg','image/jpeg',0,'2019-08-23 12:19:09','2019-08-23 12:19:09'),(10,2,'6a0a0b69bf6e0068f619606f2c2a80e5.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(11,2,'ee44a200cb12ef1de6bd930ccac0b627.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(12,2,'fc2cb2a1924dcc49945178073bdba98c.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(13,2,'7fd621cfc1a51897126ff78c25abe83a.jpeg','image/jpeg',0,'2019-08-23 12:19:11','2019-08-23 12:19:11'),(14,2,'03789c9a5eb7d854e030ff8f14b650d2.jpeg','image/jpeg',0,'2019-08-23 12:19:12','2019-08-23 12:19:12'),(15,2,'bade3862dc1bbc136d0f987c459aa7a4.jpeg','image/jpeg',0,'2019-08-23 12:19:12','2019-08-23 12:19:12'),(16,3,'20a1cb739030ba33199c41555c662eef.jpeg','image/jpeg',0,'2019-08-23 12:32:00','2019-08-23 12:32:00'),(17,3,'d5b4a7c80510f17bc1b1b1de6330a2aa.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(18,3,'0edd8ab9237aafac9d6e67005e65bb60.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(19,3,'11f91b61b0dae42e40597319337a8b3c.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(20,3,'d9e8c4c3ca1ba5a0f94108858b1b868b.jpeg','image/jpeg',0,'2019-08-23 12:32:01','2019-08-23 12:32:01'),(21,4,'60b7cdc8c51efbaa25eec15cd16b9eb9.jpeg','image/jpeg',0,'2019-08-23 12:42:08','2019-08-23 12:42:08'),(22,4,'f58ff61a00b80b09a376186b3e76c796.jpeg','image/jpeg',0,'2019-08-23 12:42:09','2019-08-23 12:42:09'),(23,4,'efdd5280e0e27e8d731021d8aaa917b4.jpeg','image/jpeg',0,'2019-08-23 12:42:19','2019-08-23 12:42:19'),(24,4,'5fc52f50e65b21dfef6952f2cca8cc0f.jpeg','image/jpeg',0,'2019-08-23 12:42:19','2019-08-23 12:42:19'),(25,4,'4139106eec569f688d6c1bbb6316da6a.jpeg','image/jpeg',0,'2019-08-23 12:42:52','2019-08-23 12:42:52'),(26,5,'b1a4d30b8e56ea6ac74d3483825b2c4b.jpeg','image/jpeg',0,'2019-08-23 12:49:24','2019-08-23 12:49:24'),(27,5,'3e19b74558bc0c36ceda752ab965d644.jpeg','image/jpeg',0,'2019-08-23 12:49:24','2019-08-23 12:49:24'),(28,5,'439b6934fa28ec34f707aeb8eb6e7e45.jpeg','image/jpeg',0,'2019-08-23 12:49:24','2019-08-23 12:49:24'),(29,5,'b5a9cefcb30adb7c2c30fd773c604c49.jpeg','image/jpeg',0,'2019-08-23 12:49:25','2019-08-23 12:49:25'),(30,5,'96175d30e3e8169eb57f831e205d618b.jpeg','image/jpeg',0,'2019-08-23 12:49:25','2019-08-23 12:49:25'),(31,5,'7ffe31219c3314238ea17d5e68049270.jpeg','image/jpeg',0,'2019-08-23 12:49:26','2019-08-23 12:49:26'),(32,6,'ae49af4d2244e22cb4ca51d9fbc24258.jpeg','image/jpeg',0,'2019-08-23 13:02:09','2019-08-23 13:02:09'),(33,6,'08b769956ac55aa9d710f7d88f924914.jpeg','image/jpeg',0,'2019-08-23 13:02:09','2019-08-23 13:02:09'),(34,6,'f3a661de64a322ebab3c7eac26054f4b.jpeg','image/jpeg',0,'2019-08-23 13:02:27','2019-08-23 13:02:27'),(35,6,'f8485b6b1119624133cb54535b9a447c.jpeg','image/jpeg',0,'2019-08-23 13:02:27','2019-08-23 13:02:27');
/*!40000 ALTER TABLE `ListPhotos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettings`
--

DROP TABLE IF EXISTS `ListSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeId` int NOT NULL,
  `itemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otherItemName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `maximum` int DEFAULT NULL,
  `minimum` int DEFAULT NULL,
  `startValue` int DEFAULT NULL,
  `endValue` int DEFAULT NULL,
  `step` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `itemDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `makeType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `ListSettings_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `ListSettingsTypes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettings`
--

LOCK TABLES `ListSettings` WRITE;
/*!40000 ALTER TABLE `ListSettings` DISABLE KEYS */;
INSERT INTO `ListSettings` VALUES (5,3,'Ford Figo',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:35','2019-08-07 05:08:52',NULL,'136'),(6,3,'Renault Kwid',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:42','2019-08-07 05:08:06',NULL,'136'),(7,3,'Toyota Camry',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:46:49','2019-08-10 05:00:42',NULL,'130'),(10,4,'2012',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:23','2019-08-23 07:58:56',NULL,NULL),(11,4,'2013',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:49:35','2019-08-23 07:58:49',NULL,NULL),(14,5,'bedroom  ','bedrooms ',NULL,NULL,1,10,NULL,'1','2017-01-09 07:53:04','2018-05-02 04:54:59',NULL,NULL),(15,6,'bed','beds',NULL,NULL,1,16,NULL,'1','2017-01-09 07:53:48','2018-04-28 04:50:39',NULL,NULL),(16,7,'Single',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:47','2017-01-09 07:59:47',NULL,NULL),(17,7,'Double',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 07:59:57','2017-01-09 07:59:57',NULL,NULL),(18,7,'Queen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:05','2017-01-09 08:00:05',NULL,NULL),(19,7,'King',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:13','2017-01-09 08:00:13',NULL,NULL),(20,7,'Bunk bed',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:00:20','2017-01-09 08:00:20',NULL,NULL),(21,8,'bathroom','bathrooms',NULL,NULL,1,8,NULL,'1','2017-01-09 08:12:24','2018-04-10 07:04:01',NULL,NULL),(22,9,'Private Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:16','2017-01-09 08:31:16',NULL,NULL),(23,9,'Shared Room',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:28','2017-01-09 08:31:28',NULL,NULL),(24,9,'Other',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:31:32','2017-01-09 08:31:32',NULL,NULL),(25,10,'Multiple 12V power outlets',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:32','2019-08-07 05:12:18',NULL,NULL),(26,10,'Fog lamps',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:42','2019-08-07 05:12:06',NULL,NULL),(27,10,'Traction control',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:43:51','2019-08-07 05:11:49',NULL,NULL),(28,10,'Head restraints',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:00','2019-08-07 05:11:39',NULL,NULL),(29,11,'Smoke detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:17','2017-01-09 08:44:17',NULL,NULL),(30,11,'Carbon monoxide detector',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:25','2017-01-09 08:44:25',NULL,NULL),(31,11,'First aid kit ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:33','2017-01-09 08:44:33',NULL,NULL),(32,11,'Safety card',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 08:44:41','2017-01-09 08:44:41',NULL,NULL),(33,12,'Kitchen',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:19','2017-01-09 09:05:19',NULL,NULL),(34,12,'Laundry – washer ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:26','2017-01-09 09:05:26',NULL,NULL),(35,12,'Laundry – dryer',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:33','2017-01-09 09:05:33',NULL,NULL),(36,12,'Parking',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-09 09:05:40','2017-01-09 09:05:40',NULL,NULL),(39,2,'guest','guests',NULL,NULL,1,20,NULL,'1','2017-01-09 10:51:56','2018-05-22 08:47:42',NULL,NULL),(45,13,'Payment information',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 07:48:16','2019-09-05 15:36:11',NULL,NULL),(46,13,'Agree to your Car Rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:20','2019-08-08 09:45:23',NULL,NULL),(47,13,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 08:02:29','2019-09-02 04:51:02',NULL,NULL),(48,14,'Don\'t smoke while driving',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:20','2019-09-02 04:51:49',NULL,NULL),(49,14,'All Trunks Must Include Internal Release SystemTrunks Must Include Internal Release System',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:28','2019-08-09 06:52:27',NULL,NULL),(50,14,'Bans Winter Driving Without Proper Tires',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:35','2019-08-09 06:51:26',NULL,NULL),(51,14,'A seatbelt must be worn during every car trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:41','2019-08-09 06:50:28',NULL,NULL),(52,14,'Never share seatbelts',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 10:00:56','2019-09-02 04:51:33',NULL,NULL),(53,15,'Meet RentALL’s renter requirements',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:08','2019-08-10 09:40:40',NULL,NULL),(54,15,'Agree to your car rules',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:16','2019-08-08 06:02:44',NULL,NULL),(55,15,'Tell you their trip purpose',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:01:25','2017-01-18 11:01:25',NULL,NULL),(56,15,'Let you know how many people are coming on the trip',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 11:03:00','2018-05-02 04:57:56',NULL,NULL),(58,16,'1 day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:43','2019-09-02 04:52:27',NULL,NULL),(59,16,'2 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:48','2017-01-18 15:19:48',NULL,NULL),(60,16,'3 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:19:58','2017-01-18 15:19:58',NULL,NULL),(61,16,'7 days',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 15:20:03','2017-01-18 15:20:03',NULL,NULL),(62,17,'Dates unavailable by default',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:01','2017-01-18 18:01:01',NULL,NULL),(63,17,'Any time',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:16','2017-01-18 18:01:16',NULL,NULL),(64,17,'3 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:22','2017-01-18 18:01:22',NULL,NULL),(65,17,'6 months',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:29','2017-01-18 18:01:29',NULL,NULL),(66,17,'1 year',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-01-18 18:01:42','2017-01-18 18:01:42',NULL,NULL),(67,18,'day min','days min',NULL,NULL,0,100,NULL,'1','2017-01-18 18:18:28','2019-08-19 11:47:28',NULL,NULL),(68,19,'day max','days max',NULL,NULL,0,100,NULL,'1','2017-01-18 18:19:00','2019-08-24 06:55:56',NULL,NULL),(73,10,'Defogger',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 11:36:34','2019-08-07 05:11:25',NULL,NULL),(74,1,'Sedan',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-28 14:21:14','2019-09-02 04:37:44',NULL,NULL),(76,1,'Convertible',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:13','2019-09-02 04:37:41',NULL,NULL),(77,1,'SUV',NULL,NULL,NULL,NULL,NULL,NULL,'1','2017-07-30 04:24:18','2019-09-02 04:37:39',NULL,NULL),(102,4,'2014',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-10 08:57:40','2019-08-23 07:58:42',NULL,NULL),(105,4,'2015',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-12 08:08:55','2019-08-23 07:58:38',NULL,NULL),(113,1,'Maruti ',NULL,NULL,NULL,NULL,NULL,NULL,'0','2018-04-24 02:28:41','2019-09-02 04:36:37',NULL,NULL),(118,10,'Airbags',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:13','2019-08-07 05:10:39',NULL,NULL),(119,10,'Reverse sensing system',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-24 02:33:23','2019-08-07 05:10:30',NULL,NULL),(126,4,'2016',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:49:12','2019-08-23 07:58:33',NULL,NULL),(128,16,'Same day',NULL,NULL,NULL,NULL,NULL,NULL,'1','2018-04-28 04:55:21','2018-04-30 21:33:25',NULL,NULL),(129,20,'Suzuki',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:07:17','2019-08-07 06:05:09',NULL,NULL),(130,20,'Toyota',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:07:53','2019-08-06 10:07:53',NULL,NULL),(131,3,'Skoda ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:08:47','2019-08-06 10:08:47',NULL,'129'),(132,3,'Maruti Swift',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:09:15','2019-08-07 05:05:31',NULL,'137'),(133,21,'50k - 25k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:21:52','2019-08-23 08:05:06',NULL,NULL),(134,21,'100k - 75k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:21:58','2019-08-23 08:05:01',NULL,NULL),(136,20,'Hatchback',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-06 10:54:54','2019-08-06 10:54:54',NULL,NULL),(137,20,'Maruti ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-07 05:03:27','2019-08-07 05:03:27',NULL,NULL),(143,3,'Innova crista',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-16 04:59:08','2019-08-16 04:59:08',NULL,'130'),(144,4,'2017',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-16 04:59:30','2019-08-23 07:58:29',NULL,NULL),(145,21,'150k - 125k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-16 04:59:47','2019-08-23 08:04:56',NULL,NULL),(146,1,'Hatchback',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:45:21','2019-09-02 04:37:36',NULL,NULL),(147,20,'Maruti Suzuki Swift',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:46:20','2019-08-23 07:46:20',NULL,NULL),(148,3,'Volkswagen Polo GTI (Upcoming), MINI Cooper S 3 Door',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:46:37','2019-08-23 07:46:37',NULL,'147'),(149,1,'Sedan',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 07:46:45','2019-09-02 04:38:38',NULL,NULL),(150,20,'Maruti Suzuki Ciaz',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:21','2019-08-23 07:47:21',NULL,NULL),(151,3,'Maruti Suzuki Ciaz',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:35','2019-08-23 07:47:35',NULL,'150'),(152,3,' Hyundai Elantra',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:40','2019-08-23 07:47:40',NULL,'150'),(153,1,'MPV',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:49','2019-09-02 04:37:28',NULL,NULL),(154,20,'Datsun GO+',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:47:58','2019-08-23 07:47:58',NULL,NULL),(155,3,'Maruti Suzuki Omni',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:19','2019-08-23 07:48:19',NULL,'154'),(156,3,'Maruti Suzuki Eeco',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:28','2019-08-23 07:48:28',NULL,'154'),(157,1,'SUV',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:39','2019-09-02 04:37:07',NULL,NULL),(158,20,'Land Rover Discovery Sport',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:48:51','2019-08-23 07:48:51',NULL,NULL),(159,3,'Honda CR-V',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:12','2019-08-23 07:49:12',NULL,'158'),(160,3,'Renault Duster',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:21','2019-08-23 07:49:21',NULL,'158'),(161,3,'Skoda Yeti',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:29','2019-08-23 07:49:29',NULL,'158'),(162,1,'Crossover',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:40','2019-09-02 04:37:25',NULL,NULL),(163,20,'Volvo S60 Cross Country',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:49:48','2019-08-23 07:49:48',NULL,NULL),(164,3,'Maruti Suzuki S-Cross',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:06','2019-08-23 07:50:06',NULL,'163'),(165,3,'Volvo S60 Cross Country',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:15','2019-08-23 07:50:15',NULL,'163'),(166,3,'Hyundai i20 Active',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:26','2019-08-23 07:50:26',NULL,'163'),(167,1,'Coupe',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:37','2019-09-02 04:37:23',NULL,NULL),(168,20,'Mercedes-Benz ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:50:49','2019-08-23 10:43:36',NULL,NULL),(169,3,'Ford Mustang',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:51:04','2019-08-23 07:51:04',NULL,'168'),(170,3,'Audi R8',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:51:14','2019-08-23 07:51:14',NULL,'168'),(171,3,' Mercedes-Benz GLE Coupe',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:51:23','2019-08-23 07:51:23',NULL,'168'),(172,20,'Audi A3 Cabriolet',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 07:51:46','2019-09-02 04:39:16',NULL,NULL),(173,3,'Mercedes-AMG SLC 43',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:52:06','2019-08-23 07:52:06',NULL,'172'),(174,3,'Audi A3 Cabriolet',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 07:52:14','2019-09-14 10:54:27',NULL,'172'),(175,4,'2018',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:55:58','2019-08-23 07:58:24',NULL,NULL),(176,4,'2019',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 07:56:27','2019-09-02 04:40:12',NULL,NULL),(177,21,'175k - 150k Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 08:04:29','2019-08-23 08:04:51',NULL,NULL),(178,21,'200k+ Kilometre',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 08:04:43','2019-08-23 08:04:43',NULL,NULL),(179,1,'Mercedes-Benz ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 10:43:13','2019-09-02 04:37:20',NULL,NULL),(180,3,'Mercedes-Benz S-Class',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 10:43:45','2019-08-23 10:43:45',NULL,'168'),(181,20,'Jaguar',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:17:27','2019-08-23 12:17:31',NULL,NULL),(182,3,'Jaguar XJ',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 12:17:45','2019-09-16 09:56:19',NULL,'181'),(183,20,'Tesla ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:31:01','2019-08-23 12:31:01',NULL,NULL),(184,3,'Tesla Model s',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:31:10','2019-08-23 12:31:10',NULL,'183'),(185,20,'BMW ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:46:49','2019-08-23 12:46:49',NULL,NULL),(186,3,'BMW 7 Series',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 12:46:57','2019-09-16 09:55:16',NULL,'185'),(187,20,'Lexus ',NULL,NULL,NULL,NULL,NULL,NULL,'1','2019-08-23 12:56:39','2019-08-23 12:56:39',NULL,NULL),(188,3,'Lexus LS',NULL,NULL,NULL,NULL,NULL,NULL,'0','2019-08-23 12:56:44','2019-09-16 09:54:15',NULL,'187');
/*!40000 ALTER TABLE `ListSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListSettingsTypes`
--

DROP TABLE IF EXISTS `ListSettingsTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListSettingsTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fieldType` enum('stringType','numberType') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'stringType',
  `step` int DEFAULT '1',
  `isEnable` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `typeLabel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMultiValue` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListSettingsTypes`
--

LOCK TABLES `ListSettingsTypes` WRITE;
/*!40000 ALTER TABLE `ListSettingsTypes` DISABLE KEYS */;
INSERT INTO `ListSettingsTypes` VALUES (1,'carType','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Trailer type',0),(2,'personCapacity','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Person capacity',0),(3,'model','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Model',0),(4,'year','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Year',0),(5,'bedrooms','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Bed rooms',0),(6,'beds','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Beds',0),(7,'bedType','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Vehicle colors',0),(8,'bathrooms','numberType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Bathrooms',0),(9,'bathroomType','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Bathroom type',0),(10,'carFeatures','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Car features',1),(11,'safetyAmenities','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Safety amenities',1),(12,'spaces','stringType',1,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Spaces',1),(13,'guestRequirements','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Renter requirements',0),(14,'carRules','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Car rules',1),(15,'reviewGuestBook','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Review how renters book',0),(16,'bookingNoticeTime','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Booking notice time',0),(17,'maxDaysNotice','stringType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Maximum days notice',0),(18,'minNight','numberType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Minimum days',0),(19,'maxNight','numberType',3,'1','2019-03-27 11:53:47','2019-08-06 09:21:54','Maximum days',0),(20,'make','stringType',1,'1','2019-08-06 09:21:54','2019-08-06 09:21:54','Make',0),(21,'odometer','stringType',1,'1','2019-08-06 09:21:54','2019-08-06 09:21:54','Odometer',0);
/*!40000 ALTER TABLE `ListSettingsTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListViews`
--

DROP TABLE IF EXISTS `ListViews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListViews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListViews`
--

LOCK TABLES `ListViews` WRITE;
/*!40000 ALTER TABLE `ListViews` DISABLE KEYS */;
INSERT INTO `ListViews` VALUES (1,6,'977bc550-5069-11e9-a14e-635e0fd3bfa6','2020-02-26 17:13:50','2020-02-26 17:13:50'),(2,4,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2023-08-18 08:51:42','2023-08-18 08:51:42'),(3,3,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2023-08-18 08:51:43','2023-08-18 08:51:43'),(4,2,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2023-08-18 08:52:01','2023-08-18 08:52:01'),(5,1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','2023-08-18 08:52:02','2023-08-18 08:52:02');
/*!40000 ALTER TABLE `ListViews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Listing`
--

DROP TABLE IF EXISTS `Listing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Listing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `houseType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transmission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedrooms` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingSize` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bedType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `bathrooms` float DEFAULT NULL,
  `bathroomType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buildingName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lng` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isMapTouched` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `coverPhoto` int DEFAULT NULL,
  `bookingType` enum('request','instant') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instant',
  `isPublished` tinyint(1) NOT NULL DEFAULT '0',
  `isReady` tinyint(1) NOT NULL DEFAULT '0',
  `reviewsCount` tinyint(1) DEFAULT '0',
  `lastUpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Listing_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Listing`
--

LOCK TABLES `Listing` WRITE;
/*!40000 ALTER TABLE `Listing` DISABLE KEYS */;
INSERT INTO `Listing` VALUES (1,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'FR','Dépose Minute Terminal 1',NULL,'Seine-et-Marne','Île-de-France','95700','49.00828310407196','2.549126129638694',1,'2019-08-23 12:02:21','2023-08-18 08:00:00','Drive Symphony excellence of Audi A8','Design: The first of its kind, the A8 features new ASF aluminum construction whose amazing weight-saving technology allows for ultimate performance. It features LED headlamps and taillights, power soft-closing doors, a power trunk with hands-free release and a headlight washing system.\nremaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\nFeatures:  Its spacious, plush interior features a BOSE surround sound system, MMI navigation system with voice control and handwriting-recognition technology, rain and light sensor for automatic windshield and headlights, leather, heated and memory capable front seats.\nEasy Parking: With Audi\'s Advanced Parking System, you never have to worry about parallel parking or fitting into tight spots with your luxury car rental from Audi.All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',7,'request',1,1,0,'2023-08-17 13:51:41'),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'AE','8 Brentwood Road',NULL,'Chatham Township','NJ','07928','25.202364191897132','55.27241358308106',1,'2019-08-23 12:18:41','2023-08-18 08:00:00','Jaguar Recreates iconic JCB Stunt car','Jaguar is now a luxury vehicle brand of Jaguar Land Rover and was owned by the Indian company Tata Motors since 2008. With an impressive iconic style and the most cutting-edge technology, Jaguar is now the world’s most recognized premium car brands synonymous with luxury sports cars. Set out on your trip with a Jaguar car rental to enjoy a top quality yet affordable drive towards your ideal destination.\n\n',13,'instant',1,1,0,'2023-08-17 13:51:41'),(3,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'PE','425 Avenida Antonio Miroquesada',NULL,'Provincia de Lima','Municipalidad Metropolitana de Lima','15076','-12.0953738','-77.0597327',1,'2019-08-23 12:31:41','2023-08-18 08:00:00','Model s Tasla is Latest update \'handover party\' ','The Ipsum Tesla Model S has been the flagship model for the brand and has been helping Tesla beat its competition such as the BMW 7-Series, Audi A8 and Mercedes-Benz S-Class in not only the United States but also in the European markets on several occasions. It is a long established fact that a reader will be distracted by the readable content. The electric sedan with the liftback design form is available in a choice of three variants- 75D, 100D, and the P100D Various versions have evolved over the years, sometimes by accident, sometimes on purpose.',17,'request',1,1,0,'2023-08-17 13:51:41'),(4,'977bc550-5069-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'ZA','25 Hill Street',NULL,'City of Johannesburg Metropolitan Municipality','GP','2194','-26.09437358383807','27.99047656289065',1,'2019-08-23 12:41:43','2023-08-18 08:00:00','Experience with Luxury Mercedes-Benz','Drive-in luxury wherever you go with a Mercedes-Benz rental car from SIXT. This famous German car brand is renowned for creating vehicles that are both high in quality and style. Combining precision engineering and high-end aesthetics,\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable sourceMercedes-Benz has become one of the top luxury car producers in the world. From the F-015 to the S-Class Cabriolet you can expect to enjoy a smooth ride in any Mercedes-Benz luxury car model as they all offer impressive comforts and capabilities. SIXT will ensure you a stress-free rental experience with excellent customer service and advice, attractive offers and a wide fleet of top quality rental cars.',NULL,'instant',1,1,0,'2023-08-17 13:51:41'),(5,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'1','1',NULL,NULL,1,1,1,NULL,'FI','13 Mannerheimintie sam',NULL,'Helsinki','HS','00100','60.17342419999999','24.9340315',1,'2019-08-23 12:49:08','2023-08-18 08:00:00','2018 BMW 7 530HP V8 M Sport Exhaust Tech ','Audi is among the most recognized luxury car brand around the world. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. The German manufacturers have an unparalleled reputation for producing exquisite vehicles offering exceptional performance and comforts. Their sophisticated exteriors are aerodynamic and highlight the interplay of light and line. Audi models are equipped with the latest technologies and innovative features. Its no surprise that the brand has succeeded at world champion racing events like the Le Mans with their sports car models. Sixt is delighted to offer you the chance to experience the refinement and pleasures of an Audi car rental.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham',27,'request',1,1,0,'2023-08-17 13:51:41'),(6,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',NULL,NULL,'2','1',NULL,NULL,1,1,1,NULL,'PH','Russia',NULL,'Parañaque','NCR','1709','14.49017615899127','121.03435629242722',1,'2019-08-23 12:57:24','2023-08-18 08:00:00','Grass Burgesses of Lexus Sedan','Founded in 1983, Lexus is a global luxury car make owned by Japan\'s Toyota Motor group. It only took a decade for the brand to surpass sales volume of Mercedes-Benzes and BMW in North America. Be it a luxurious four-door sedan or a cool two-door hardtop sports car, each Lexus is sophisticated in design and meticulously constructed with incredible quality management to ensure you have the best driving experience.\nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\nWith EasyRentCars you can enjoy the best customer service and delight in the experience of renting and driving a Lexus without needing to burn a hole in your pockets. Choose from premium cars, luxury sedans, SUVs and sports cars, enjoying all the advantages that EasyRentCars bring of these spectacular vehicles.',35,'instant',1,1,0,'2023-08-17 13:51:41');
/*!40000 ALTER TABLE `Listing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListingData`
--

DROP TABLE IF EXISTS `ListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `bookingNoticeTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checkInStart` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `checkInEnd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Flexible',
  `minDay` int DEFAULT NULL,
  `maxDay` int DEFAULT NULL,
  `priceMode` tinyint(1) DEFAULT NULL,
  `basePrice` double DEFAULT '0',
  `maxPrice` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hostingFrequency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weeklyDiscount` float DEFAULT '0',
  `monthlyDiscount` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `delivery` double DEFAULT '0',
  `maxDaysNotice` enum('unavailable','3months','6months','9months','12months','available') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unavailable',
  `cancellationPolicy` int DEFAULT '1',
  `securityDeposit` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `ListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListingData`
--

LOCK TABLES `ListingData` WRITE;
/*!40000 ALTER TABLE `ListingData` DISABLE KEYS */;
INSERT INTO `ListingData` VALUES (1,1,'61','10','23',1,9,NULL,2500,NULL,'USD',NULL,4,8,'2019-08-23 12:14:50','2019-08-24 05:14:25',75,'available',3,0),(2,2,'60','13','16',0,16,NULL,1750,NULL,'USD',NULL,0,0,'2019-08-23 12:22:03','2019-08-24 05:14:17',125,'available',2,0),(3,3,'61','10','19',1,7,NULL,2500,NULL,'USD',NULL,10,25,'2019-08-23 12:35:49','2019-08-24 05:14:31',320,'available',3,0),(4,4,'60','10','18',2,0,NULL,3500,NULL,'USD',NULL,5,8,'2019-08-23 12:44:19','2019-08-24 05:14:00',125,'available',1,0),(5,5,'59','14','20',6,0,NULL,4500,NULL,'USD',NULL,15,35,'2019-08-23 12:52:03','2019-08-23 12:52:03',250,'12months',3,0),(6,6,'59','13','24',0,0,NULL,1500,NULL,'USD',NULL,0,0,'2019-08-23 13:04:28','2019-09-13 16:12:59',100,'9months',1,0);
/*!40000 ALTER TABLE `ListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentMethods`
--

DROP TABLE IF EXISTS `PaymentMethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentMethods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `processedIn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fees` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentType` tinyint(1) DEFAULT '1',
  `paymentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentMethods`
--

LOCK TABLES `PaymentMethods` WRITE;
/*!40000 ALTER TABLE `PaymentMethods` DISABLE KEYS */;
INSERT INTO `PaymentMethods` VALUES (1,'PayPal','3–4 hours','PayPal withdrawal fees','USD','Connect your existing PayPal account.',1,'2017-04-18 20:13:25','2017-04-18 20:13:25',1,'PayPal'),(2,'Bank account','5–7 business days','No fees','EUR','Add your bank details',1,'2018-01-04 17:26:45','2018-01-04 17:26:45',2,'Stripe');
/*!40000 ALTER TABLE `PaymentMethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PaymentSettings`
--

DROP TABLE IF EXISTS `PaymentSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PaymentSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentStatus` enum('true','false') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'false',
  `paymentMode` enum('live','sandbox') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'sandbox',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIUserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APIPassword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `APISecret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AppId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PaymentSettings`
--

LOCK TABLES `PaymentSettings` WRITE;
/*!40000 ALTER TABLE `PaymentSettings` DISABLE KEYS */;
INSERT INTO `PaymentSettings` VALUES (1,'paypal','false','sandbox','admin@gmail.com','Hello User Id','Hello password','Hello Secret','Hello Id','2019-03-27 11:53:47','2017-02-24 11:29:31');
/*!40000 ALTER TABLE `PaymentSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payout`
--

DROP TABLE IF EXISTS `Payout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `methodId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `address2` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `last4Digits` int DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Payout_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payout`
--

LOCK TABLES `Payout` WRITE;
/*!40000 ALTER TABLE `Payout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Payout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PopularLocation`
--

DROP TABLE IF EXISTS `PopularLocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PopularLocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `locationAddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isEnable` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PopularLocation`
--

LOCK TABLES `PopularLocation` WRITE;
/*!40000 ALTER TABLE `PopularLocation` DISABLE KEYS */;
INSERT INTO `PopularLocation` VALUES (1,'Texas','198 Gambler Lane, Clarksburg, WV, USA','519192873f2fc585c84ba25fe6d80d92.jpeg',1,'2019-03-27 10:17:45','2019-08-07 12:28:15'),(2,'Oristano','Viale della Croce Rossa, 96, Palermo, Province of Palermo, Italy','c7697235886d6c345568e58fbc8e2734.jpeg',1,'2019-03-27 10:20:32','2019-08-10 09:12:07'),(3,'Basse-Normandie','46 rue Ernest-Renan, Paris, France','16d68863a62a85841898aeaa3bb1fdfe.jpeg',1,'2019-03-27 10:27:32','2019-08-06 12:45:11'),(4,'Fergus Falls','328 East Fir Avenue, Atwater, CA, USA','c150329784f7e83bc2355692517964ad.jpeg',1,'2019-03-27 10:28:56','2019-08-23 13:05:38'),(5,'Shiels','76 Russell Rd, Nottingham, UK','ace1ea00d0f2f376b93b4f1641803f0f.jpeg',1,'2019-03-27 10:30:17','2019-09-17 07:32:56'),(6,'YunYan ','Guizhou Province Architectural Design & Research Institute, Nanming, Guiyang, Guizhou, China','a40e22f3dd84688089d557cd895cfc41.jpeg',1,'2019-03-27 10:32:23','2019-08-23 13:05:53');
/*!40000 ALTER TABLE `PopularLocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Privileges`
--

DROP TABLE IF EXISTS `Privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Privileges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilege` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Privileges`
--

LOCK TABLES `Privileges` WRITE;
/*!40000 ALTER TABLE `Privileges` DISABLE KEYS */;
INSERT INTO `Privileges` VALUES (1,'Manage Site Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(2,'Manage Users','2021-08-26 07:39:31','2021-08-26 07:39:31'),(3,'Manage Cars','2021-08-26 07:39:31','2021-08-26 07:39:31'),(4,'Manage Reservations','2021-08-26 07:39:31','2021-08-26 07:39:31'),(5,'Manage Reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(6,'Manage Admin Reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(7,'Manage Service Fee','2021-08-26 07:39:31','2021-08-26 07:39:31'),(8,'Manage Document Verification','2021-08-26 07:39:31','2021-08-26 07:39:31'),(9,'Manage Messages','2021-08-26 07:39:31','2021-08-26 07:39:31'),(10,'Manage Report','2021-08-26 07:39:31','2021-08-26 07:39:31'),(11,'Manage Payout','2021-08-26 07:39:31','2021-08-26 07:39:31'),(12,'Manage Payment Gateway','2021-08-26 07:39:31','2021-08-26 07:39:31'),(13,'Manage Currency','2021-08-26 07:39:31','2021-08-26 07:39:31'),(14,'Manage Search Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(15,'Manage Home Page Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(16,'Manage Why Become Owner Page','2021-08-26 07:39:31','2021-08-26 07:39:31'),(17,'Manage Car Settings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(18,'Manage Content','2021-08-26 07:39:31','2021-08-26 07:39:31'),(19,'Manage Static Content','2021-08-26 07:39:31','2021-08-26 07:39:31'),(20,'Manage Security Deposit','2022-12-22 12:49:36','2022-12-22 12:49:36');
/*!40000 ALTER TABLE `Privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PrivilegesURL`
--

DROP TABLE IF EXISTS `PrivilegesURL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PrivilegesURL` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilegeId` int NOT NULL,
  `permittedUrls` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PrivilegesURL`
--

LOCK TABLES `PrivilegesURL` WRITE;
/*!40000 ALTER TABLE `PrivilegesURL` DISABLE KEYS */;
INSERT INTO `PrivilegesURL` VALUES (1,1,'/siteadmin/settings/site','2021-08-26 07:39:31','2021-08-26 07:39:31'),(2,2,'/siteadmin/users','2021-08-26 07:39:31','2021-08-26 07:39:31'),(3,2,'/siteadmin/users','2021-08-26 07:39:31','2021-08-26 07:39:31'),(4,2,'/siteadmin/profileView/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(5,3,'/become-a-owner/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(6,3,'/siteadmin/listings','2021-08-26 07:39:31','2021-08-26 07:39:31'),(7,4,'/siteadmin/viewreservation/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(8,4,'/siteadmin/reservations','2021-08-26 07:39:31','2021-08-26 07:39:31'),(9,5,'/siteadmin/user-reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(10,5,'/siteadmin/management-reviews/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(11,6,'/siteadmin/reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(12,6,'/siteadmin/edit-review/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(13,6,'/siteadmin/write-reviews','2021-08-26 07:39:31','2021-08-26 07:39:31'),(14,7,'/siteadmin/settings/servicefees','2021-08-26 07:39:31','2021-08-26 07:39:31'),(15,8,'/siteadmin/document','2021-08-26 07:39:31','2021-08-26 07:39:31'),(16,9,'/siteadmin/messages','2021-08-26 07:39:31','2021-08-26 07:39:31'),(17,10,'/siteadmin/reportUser','2021-08-26 07:39:31','2021-08-26 07:39:31'),(18,11,'/siteadmin/payout','2021-08-26 07:39:31','2021-08-26 07:39:31'),(19,11,'/siteadmin/failed-payout/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(20,11,'/siteadmin/viewpayout/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(21,12,'/siteadmin/payment-gateway-section','2021-08-26 07:39:31','2021-08-26 07:39:31'),(22,13,'/siteadmin/currency','2021-08-26 07:39:31','2021-08-26 07:39:31'),(23,14,'/siteadmin/settings/search','2021-08-26 07:39:31','2021-08-26 07:39:31'),(24,15,'/siteadmin/home/caption','2021-08-26 07:39:31','2021-08-26 07:39:31'),(25,15,'/siteadmin/home/banner','2021-08-26 07:39:31','2021-08-26 07:39:31'),(26,15,'/siteadmin/home/footer-block','2021-08-26 07:39:31','2021-08-26 07:39:31'),(27,15,'/siteadmin/popularlocation','2021-08-26 07:39:31','2021-08-26 07:39:31'),(28,15,'/siteadmin/popularlocation/add','2021-08-26 07:39:31','2021-08-26 07:39:31'),(29,15,'/siteadmin/edit/popularlocation/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(30,15,'/siteadmin/home/static-info-block','2021-08-26 07:39:31','2021-08-26 07:39:31'),(31,16,'/siteadmin/whyHost/Block1','2021-08-26 07:39:31','2021-08-26 07:39:31'),(32,16,'/siteadmin/whyHost/Block2','2021-08-26 07:39:31','2021-08-26 07:39:31'),(33,16,'/siteadmin/whyHost/Block3','2021-08-26 07:39:31','2021-08-26 07:39:31'),(34,16,'/siteadmin/whyHost/Block4','2021-08-26 07:39:31','2021-08-26 07:39:31'),(35,16,'/siteadmin/whyHost/Block5','2021-08-26 07:39:31','2021-08-26 07:39:31'),(36,16,'/siteadmin/whyHost/Block6','2021-08-26 07:39:31','2021-08-26 07:39:31'),(37,17,'/siteadmin/listsettings/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(38,18,'/siteadmin/content-management','2021-08-26 07:39:31','2021-08-26 07:39:31'),(39,18,'/siteadmin/page/add','2021-08-26 07:39:31','2021-08-26 07:39:31'),(40,18,'/siteadmin/edit/page/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(41,19,'/siteadmin/staticpage/management','2021-08-26 07:39:31','2021-08-26 07:39:31'),(42,19,'/siteadmin/edit/staticpage/','2021-08-26 07:39:31','2021-08-26 07:39:31'),(43,9,'/message/','2022-07-12 05:46:37','2022-07-12 05:46:37'),(44,20,'/siteadmin/manage-security-deposit','2022-12-22 12:49:36','2022-12-22 12:49:36'),(45,15,'/siteadmin/home/find-your-car','2023-08-17 13:49:09','2023-08-17 13:49:09'),(46,1,'/siteadmin/settings/config','2023-08-17 13:51:25','2023-08-17 13:51:25'),(47,16,'/siteadmin/whyHost/review','2023-08-17 13:51:46','2023-08-17 13:51:46'),(48,16,'/siteadmin/whyHost/Block7','2023-08-17 13:51:53','2023-08-17 13:51:53');
/*!40000 ALTER TABLE `PrivilegesURL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recommend`
--

DROP TABLE IF EXISTS `Recommend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recommend` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recommend`
--

LOCK TABLES `Recommend` WRITE;
/*!40000 ALTER TABLE `Recommend` DISABLE KEYS */;
INSERT INTO `Recommend` VALUES (1,5,'2019-08-23 13:07:25','2019-08-23 13:07:25'),(2,6,'2019-08-23 13:07:26','2019-08-23 13:07:26'),(3,4,'2019-08-23 13:07:26','2019-08-23 13:07:26'),(4,3,'2019-08-23 13:07:28','2019-08-23 13:07:28'),(5,2,'2019-08-23 13:07:29','2019-08-23 13:07:29'),(6,1,'2019-08-23 13:07:29','2019-08-23 13:07:29');
/*!40000 ALTER TABLE `Recommend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReportUser`
--

DROP TABLE IF EXISTS `ReportUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReportUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reporterId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reportType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReportUser`
--

LOCK TABLES `ReportUser` WRITE;
/*!40000 ALTER TABLE `ReportUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReportUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservation`
--

DROP TABLE IF EXISTS `Reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `hostId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checkIn` datetime NOT NULL,
  `checkOut` datetime NOT NULL,
  `guests` int DEFAULT '1',
  `message` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `basePrice` float NOT NULL,
  `delivery` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` float DEFAULT NULL,
  `discountType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestServiceFee` float DEFAULT NULL,
  `hostServiceFee` float DEFAULT NULL,
  `total` float NOT NULL,
  `confirmationCode` int DEFAULT NULL,
  `paymentState` enum('pending','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `payoutId` int DEFAULT NULL,
  `reservationState` enum('pending','approved','declined','completed','cancelled','expired') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  `cancellationPolicy` int DEFAULT NULL,
  `isSpecialPriceAverage` float DEFAULT NULL,
  `dayDifference` float DEFAULT NULL,
  `startTime` float DEFAULT NULL,
  `endTime` float DEFAULT NULL,
  `licenseNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firstName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `middleName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentIntentId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isHold` tinyint(1) NOT NULL DEFAULT '0',
  `paymentAttempt` int NOT NULL DEFAULT '0',
  `securityDeposit` float NOT NULL DEFAULT '0',
  `claimStatus` enum('pending','approved','requested','fullyRefunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `claimAmount` float NOT NULL DEFAULT '0',
  `claimPayout` float NOT NULL DEFAULT '0',
  `claimRefund` float NOT NULL DEFAULT '0',
  `claimReason` longtext COLLATE utf8mb4_unicode_ci,
  `isClaimCancelStatus` tinyint(1) DEFAULT '0',
  `listTitle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isClaimPaidOut` tinyint(1) DEFAULT '0',
  `claimRequestDate` datetime DEFAULT NULL,
  `claimPaymentAttempt` int DEFAULT '0',
  `isClaimRefunded` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reservation`
--

LOCK TABLES `Reservation` WRITE;
/*!40000 ALTER TABLE `Reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ReservationSpecialPricing`
--

DROP TABLE IF EXISTS `ReservationSpecialPricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ReservationSpecialPricing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int DEFAULT NULL,
  `reservationId` int DEFAULT NULL,
  `blockedDates` datetime NOT NULL,
  `isSpecialPrice` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ReservationSpecialPricing`
--

LOCK TABLES `ReservationSpecialPricing` WRITE;
/*!40000 ALTER TABLE `ReservationSpecialPricing` DISABLE KEYS */;
/*!40000 ALTER TABLE `ReservationSpecialPricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `listId` int NOT NULL,
  `authorId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reviewContent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rating` float NOT NULL,
  `privateFeedback` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `parentId` int DEFAULT '0',
  `automated` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `isAdminEnable` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Reviews_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SearchSettings`
--

DROP TABLE IF EXISTS `SearchSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SearchSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minPrice` float NOT NULL,
  `maxPrice` float NOT NULL,
  `PriceRangecurrency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SearchSettings`
--

LOCK TABLES `SearchSettings` WRITE;
/*!40000 ALTER TABLE `SearchSettings` DISABLE KEYS */;
INSERT INTO `SearchSettings` VALUES (1,10,10000,'USD','2019-03-27 11:53:47','2019-09-16 04:33:40');
/*!40000 ALTER TABLE `SearchSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20180804061511-addUserBanStatus.js'),('20180804062523-addIsReadColumnInThreads.js'),('20180809095644-createBedTypeTable.js'),('20180919114144-addBanUserDefault.js'),('20180924105437-updateUserLoginTable.js'),('20180924130941-addNewUserLoginTable.js'),('20180929101729-updateNulledBanUserStatus.js'),('20180929110523-addColumnsForSmsVerification.js'),('20180929112313-updateCountyListWithDialCodes.js'),('20190105123130-addHomePageTypeSiteSettings.js'),('20190202071052-addIsListActiveField.js'),('20190202103305-updatePaymentMethods.js'),('20190206111430-createReportUser.js'),('20190223073145-addIsDeleteAtField.js'),('20190225042333-addReviewsCountInListing.js'),('20190322050510-addSiteSettingsField.js'),('20190325035946-addListBlockedDates.js'),('20190429092459-addColumNewThread.js'),('20190430110742-changeListingDataCloum.js'),('20190503052141-addColumnItemDescriptionListSettingsTable.js'),('20190513044345-addMetaFields.js'),('20190513070310-insertStaticpage.js'),('20190514121558-addCancellationPolicyReservation.js'),('20190525050311-changeDataTypeForItemDescription.js'),('20190527125405-addIsAdminEnableReviews.js'),('20190531062204-addReservationSpecialPricing.js'),('20190603083234-modifyBlogAndStaticPage.js'),('20190603102231-deleteInboxItem.js'),('20190604051522-addReservationFields.js'),('20190607044315-changeListSettings.js'),('20190607094422-addListingTypes.js'),('20190607112310-addListSetting.js'),('20190610100457-changeListing.js'),('20190611070958-changeListingFields.js'),('20190614110520-addPhoneStatus.js'),('20190615092318-addCountryNameInUserProfile.js'),('20190622051622-changeColumnLocationUserProfile.js'),('20190701041011-changeColumnTypeInSiteSettingsValue.js'),('20190701065456-updateColumnNameInListSettingsTable.js'),('20190701091311-updateColumnForBecomeAHostColumnValues.js'),('20190712094239-deleteCoverPhotoRecordsFromListingTable.js'),('20190805111323-addTimeFields.js'),('20190807083025-changeTextInListSettings.js'),('20190809065537-updateTextReeviewRenterBook.js'),('20190809084848-createReservationFields.js'),('20190813055213-UpdateTextInListSettingTypes.js'),('20190814055241-changeNightFieldToday.js'),('20190819101022-changeTextForNightAdminSide.js'),('20190820043310-addTimeFieldsThreadItems.js'),('20190914094440-DropTableStaticPage.js'),('20190914094443-InsertStaticContentData.js'),('20200206113038-addPaymentIntentIdToReservation.js'),('20200214090746-addHomeLogoWidthAndHeightAtSiteSettings.js'),('20200217052735-addIsVerifiedToPayoutTable.js'),('20200227041812-addIsVerifiedToPayoutTable.js'),('20200318093354-addImageColumnAtBanner.js'),('20200318132644-addStaticBlockInfo.js'),('20200323045106-appAvailableStatus.js'),('20200324090446-contactPageManage.js'),('20200324140549-addWhyHostInfoBlockss.js'),('20200325121758-addHelpStaticContent.js'),('20200328053102-changeStaticPageCharacterSet.js'),('20200410134737-changeColumnValueAtWhyHostInfoBlock.js'),('20200421150200-changeColumnAtStaticInfoBlock.js'),('20200622131909-addColumnsinReservationTable.js'),('20200701045757-addPaymentNameColumnInPaymentMethods.js'),('20200701050534-addValuesForPaymentName.js'),('20200707112614-updateCancellationContent.js'),('20200713131816-renamePayPalValueInPaypal.js'),('20210419132836-addStripeKey.js'),('20210517131000-changePayoutCurrency.js'),('20210630081331-updatePaymentMethodColumnData.js'),('20210813082455-addRoleId.js'),('20210817161853-addPrivileges.js'),('20210817161858-addPrivilegesURL.js'),('20211028092138-addURL.js'),('20220324171651-changeCountry.js'),('20220608085726-deleteUser.js'),('20220701103002-veriicationUpdatedAt.js'),('20220816060417-addingSecurityDepositInListingData.js'),('20220816071040-addingSecurityDepositInReservation.js'),('20220819054554-addingSecurityDepositThreadItems.js'),('20220820061554-addingSecurityDepositPrivileges.js'),('20220906100106-changePriceType.js'),('20220906104530-changePricingType.js'),('20220915054259-addingClaimRefundInTransaction.js'),('20221025041250-createSiteSettings.js'),('20221214065613-addClaimstatus.js'),('20230125113826-addImageBannerData.js'),('20230125122240-addFindYourCarPrivilegesURL.js'),('20230125130452-addFindYourCarBlock.js'),('20230214080035-addCofigSettings.js'),('20230412065416-reservationListTile.js'),('20230421065642-addPlatformKey.js'),('20230428071636-ChangeSecurityDepositColumn.js'),('20230513085601-addWhyHostData.js'),('20230516051458-changeDateFormat.js'),('20230517065546-ChangeColumnInReservation.js'),('20230522070409-addColumnLastUpdate.js'),('20230522091232-lastUpdateListing.js'),('20230525120535-addBecomeOwnerBlock1.js'),('20230525125821-addBecomeOwnerBlock3.js'),('20230529112255-changePaymentMethods.js'),('20230605051759-addWorkTitleImages.js'),('20230605091817-addWhyhostReviewPrivileges.js'),('20230608122404-renameFindYourBlock.js'),('20230609071404-changeCancellationPocilyContent.js'),('20230614042048-changeClaimreason.js'),('20230706132135-fcmPushNotificationKey.js'),('20230713123540-addPrivilegesURL.js'),('20230718072647-addClaimColumn.js'),('20230719065641-addColumnforClaim.js'),('20230719092520-updateClaimPayoutStatus.js'),('20230720121659-changePaymentName.js'),('20230803060314-defaultValueListingData.js'),('20230803103242-changeListSettingsType.js'),('20230807090936-updateCancellation.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceFees`
--

DROP TABLE IF EXISTS `ServiceFees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceFees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `guestType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guestValue` float NOT NULL,
  `hostType` enum('fixed','percentage') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hostValue` float NOT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceFees`
--

LOCK TABLES `ServiceFees` WRITE;
/*!40000 ALTER TABLE `ServiceFees` DISABLE KEYS */;
INSERT INTO `ServiceFees` VALUES (1,'percentage',7,'percentage',3,'USD','2019-09-05 18:44:00','2019-09-05 18:44:00');
/*!40000 ALTER TABLE `ServiceFees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SiteSettings`
--

DROP TABLE IF EXISTS `SiteSettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SiteSettings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SiteSettings`
--

LOCK TABLES `SiteSettings` WRITE;
/*!40000 ALTER TABLE `SiteSettings` DISABLE KEYS */;
INSERT INTO `SiteSettings` VALUES (1,'Site Name','siteName','Your Site','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(2,'Site Title','siteTitle','Your Site Title','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(3,'Meta Keyword','metaKeyword','Your Site Meta Keyword','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(4,'Meta Discription','metaDescription','Your Site Meta Description','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(10,'Facebook Link','facebookLink','https://www.facebook.com/yoursite/','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(11,'Twitter Link','twitterLink','https://twitter.com/yoursite','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(12,'Instagram Link','instagramLink','https://www.instagram.com/?hl=en','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(64,'Logo Height','logoHeight','63','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:46'),(65,'Logo Width','logoWidth','105','site_settings','2019-03-27 11:53:47','2022-12-22 14:05:47'),(66,'Home Page Banner Layout','homePageType','4','site_settings','2019-03-27 11:53:47','2023-08-18 06:22:40'),(67,'Video URL','videoLink','https://www.youtube.com/watch?v=5y2P4z7DM88','site_settings','2019-08-06 09:20:42','2023-08-18 06:22:40'),(68,'Phone Number Status','phoneNumberStatus','1','site_settings','2019-08-06 09:21:54','2023-08-18 06:22:40'),(75,'Home Page Logo Height','homePageLogoHeight','63','site_settings','2020-02-26 16:58:46','2022-12-22 14:05:50'),(76,'Home Page Logo Width','homePageLogoWidth','105','site_settings','2020-02-26 16:58:46','2022-12-22 14:05:52'),(78,'App Available Status','appAvailableStatus','1','site_settings','2020-04-21 13:55:00','2023-08-18 06:22:40'),(79,'PlayStore URL','playStoreUrl','https://play.google.com/store?hl=en','site_settings','2020-04-21 13:55:00','2023-08-18 06:22:40'),(80,'AppStore URL','appStoreUrl','https://www.apple.com/ios/app-store/','site_settings','2020-04-21 13:55:00','2023-08-18 06:22:40'),(81,'email','email','support@yoursite.com','site_settings','2020-04-21 13:55:00','2023-08-18 06:22:40'),(82,'Phone Number','phoneNumber','000000000','site_settings','2020-04-21 13:55:00','2023-08-18 06:22:40'),(83,'Address','address','Location, State, Country','site_settings','2020-04-21 13:55:00','2023-08-18 06:22:40'),(84,'Stripe Publishable Key','stripePublishableKey','pk_test_C5ukBJM7qr5P1F8dY4XKhdyp','config_settings','2021-08-12 13:37:43','2023-08-18 07:29:47'),(86,'Favicon Logo','faviconLogo','31ce85192391c07ccf94c52461608a0d.png','site_settings','2022-12-22 12:49:55','2023-08-18 06:22:11'),(88,'Platform secret key','platformSecretKey','JjQI:gHf+^=D','secret_settings','2023-05-11 11:27:37','2023-05-11 11:27:37'),(89,'PushNotification Key','pushNotificationKey','AAAAK5aHG3c:APA91bG60ridFhKm7c4uAR-y_zON1wfhHpcgQWmbsU9byWDBky-7h-EEyulelmQq3CyQMOTuR347cmuXgxHruPKuU5THav1-UB440V5mRVbbfzLFZm34CB2APfDApkY7FagkrkZz796Q','config_settings','2023-08-17 13:51:25','2023-08-17 13:51:25'),(90,'Deep link Bundle Id','deepLinkBundleId','Your deep link bundle ID','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(91,'Smtp Host','smtpHost','your SMTP host','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(92,'Smtp Port','smtpPort','your SMTP port','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(93,'Smpt Email','smptEmail','your SMTP email','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(94,'Smtp Sender','smtpSender','your SMTP sender','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(95,'Smtp Sender Email','smtpSenderEmail','yourSMTP@gmail.com','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(96,'Smtp Password','smtpPassWord','your SMTP password','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(97,'Twillio Accounts Id','twillioAccountSid','Your twilio SID','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(98,'Twillio Auth Token','twillioAuthToken','Your twilio token','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(99,'Twillio Phonenumber','twillioPhone','+00000000','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(100,'Paypal Email','paypalEmail','Youremail@gmail.com','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(101,'Paypal Client Id','paypalClientId','Your PayPal client ID','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(102,'Paypal Secret','paypalSecret','Your PayPal secret key','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(103,'Paypal Host','paypalHost','api.sandbox.paypal.com','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(104,'Paypal Host Mode','paypalHostMode','sandbox','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(105,'Maximum image upload size','maxUploadSize','10','site_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(106,'Facebook App Id','facebookAppId','Your Facebook App Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(107,'Facebook Secret Id','facebookSecretId','Your Facebook Secret Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(108,'Google Secret Id','googleSecretId',' Your Google Secret Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(109,'Google Client Id','googleClientId','Your Google Client Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(110,'Facebook App Id','facebookAppId','Your Facebook App Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(111,'Facebook Secret Id','facebookSecretId','Your Facebook Secret Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(112,'Google Secret Id','googleSecretId',' Your Google Secret Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(113,'Google Client Id','googleClientId','Your Google Client Id','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(114,'Force Update','appForceUpdate','true','appSettings','2023-08-17 13:51:25','2023-08-18 06:22:40'),(115,'Android Version','androidVersion','1.0','appSettings','2023-08-17 13:51:25','2023-08-18 06:22:40'),(116,'iOS Version','iosVersion','1.0','appSettings','2023-08-17 13:51:25','2023-08-18 06:22:40'),(117,'Deep link JSON content','deepLinkContent','Your deep link JSON content','config_settings','2023-08-17 13:51:25','2023-08-18 07:29:47'),(118,'Fcm PushNotification Key','fcmPushNotificationKey','Your FCM push notification key\n','config_settings','2023-08-17 13:51:53','2023-08-18 07:29:47'),(119,'Logo','Logo','c7230535a1aa8b026b0956c562ee761a.png','site_settings','2023-08-18 06:18:55','2023-08-18 06:22:40'),(120,'Home Page Logo','homePageLogo','e6160264a4ec2d7c93e167918560f657.png','site_settings','2023-08-18 06:21:42','2023-08-18 06:21:42'),(121,'Email Logo','emailLogo','ec598b1443c369299b5edf1f08ef96f0.png','site_settings','2023-08-18 06:22:08','2023-08-18 06:22:08');
/*!40000 ALTER TABLE `SiteSettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticInfoBlock`
--

DROP TABLE IF EXISTS `StaticInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticInfoBlock`
--

LOCK TABLES `StaticInfoBlock` WRITE;
/*!40000 ALTER TABLE `StaticInfoBlock` DISABLE KEYS */;
INSERT INTO `StaticInfoBlock` VALUES (1,'CarCounterTitle1','carCounterTitle1','Contrary to popular belief','2020-04-21 13:54:58','2023-08-18 08:34:56'),(2,'CarCounterContent1','carCounterContent1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2023-08-18 08:34:56'),(3,'CarCounterTitle2','carCounterTitle2','Contrary to popular belief','2020-04-21 13:54:58','2023-08-18 08:34:56'),(4,'CarCounterImage1','carCounterImage1','42009e0de0a73802cf07f2dfcd5b0830.png','2020-04-21 13:54:58','2020-04-21 14:29:30'),(5,'CarBlockTitle1','carBlockTitle1','Lorem Ipsum is simply dummy text','2020-04-21 13:54:58','2023-08-18 08:34:57'),(6,'CarBlockTitle2','carBlockTitle2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2023-08-18 08:34:57'),(7,'CarCounterContent2','carCounterContent2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2023-08-18 08:34:56'),(8,'CarCounterTitle3','carCounterTitle3','Lorem Ipsum is simply dummy text','2020-04-21 13:54:58','2023-08-18 08:34:56'),(9,'CarBlockContent1','carBlockContent1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.','2020-04-21 13:54:58','2023-08-18 08:34:57'),(10,'CarBlockImage1','carBlockImage1','51c2e3696949677f552c7f7d601afa43.jpeg','2020-04-21 13:54:58','2020-04-21 14:35:06'),(11,'CarTripTitle1','carTripTitle1','There are many variations of passages of Lorem Ipsum','2020-04-21 13:54:58','2023-08-18 08:34:57'),(12,'CarTripContent1','carTripContent1','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system','2020-04-21 13:54:58','2023-08-18 08:34:57'),(13,'CarTripTitle2','carTripTitle2','Sed ut perspiciatis unde omnis iste natus','2020-04-21 13:54:58','2023-08-18 08:34:58'),(14,'CarTripContent2','carTripContent2','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system','2020-04-21 13:54:58','2023-08-18 08:34:58'),(15,'CarTripTitle3','carTripTitle3','Sed ut perspiciatis unde omnis iste natus','2020-04-21 13:54:58','2023-08-18 08:34:58'),(16,'CarTripContent3','carTripContent3','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system','2020-04-21 13:54:58','2023-08-18 08:34:58'),(17,'CarTripImage1','carTripImage1','ef17a1aa69fbf6f88518878ad8d846c0.png','2020-04-21 13:54:58','2023-08-18 08:34:50'),(18,'CarTripImage2','carTripImage2','95a1bcc6b400cad391c0725d3bd76356.png','2020-04-21 13:54:58','2023-08-18 08:34:54');
/*!40000 ALTER TABLE `StaticInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `StaticPage`
--

DROP TABLE IF EXISTS `StaticPage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `StaticPage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaTitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `metaDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `StaticPage`
--

LOCK TABLES `StaticPage` WRITE;
/*!40000 ALTER TABLE `StaticPage` DISABLE KEYS */;
INSERT INTO `StaticPage` VALUES (1,'About Us','<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p>','About Us','About Us','2019-09-14 10:25:58','2019-09-16 09:53:17'),(2,'Trust & Safety','<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>','Trust & Safety','Trust & Safety','2019-09-14 10:25:58','2019-09-14 10:35:47'),(3,'Travel Credit','<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>','Travel Credit','Travel Credit','2019-09-14 10:25:58','2019-09-14 10:36:10'),(4,'Terms & Privacy','<p>Privacy Policy</p><p>This Privacy Policy describes how your personal information is collected, used, and shared when you use our &lt;YOUR_SITE&gt; Cars application.</p><p>RadicalStart InfoLab Private Limited built the &lt;YOUR_SITE&gt; Cars app as a Free app. This SERVICE is provided by RadicalStart InfoLab Private Limited at no cost and is intended for use as it is.</p><p>This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.</p><p>If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p><p>Information Collection and Use</p><p>For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including email address, profile picture and first name. The information that we request will be retained by us and used as described in this privacy policy.</p><p>This app collects the user’s identifiable information such as email address, first name and profile picture from the third party social websites when the user tries to register an account with third party social websites such as “Google” and “Facebook”.</p><p>We don\'t share your information with any third-party services.</p><p>Log Data</p><p>We want to inform you that whenever you use our Service, in case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.</p><p>Cookies</p><p>Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device\'s internal memory.</p><p>This Service does not use these “cookies” explicitly. However, the app may use a third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.</p><p>Security</p><p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p><p>Changes to This Privacy Policy</p><p>We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.</p><p>&nbsp;</p><p>Contact Us</p><p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@yoursite.com.</p>','Terms & Privacy','Terms & Privacy','2019-09-14 10:25:58','2021-08-12 16:07:30'),(5,'Help','<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>','Help','Help','2020-04-21 13:55:01','2020-04-21 15:08:21');
/*!40000 ALTER TABLE `StaticPage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ThreadItems`
--

DROP TABLE IF EXISTS `ThreadItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ThreadItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `threadId` int NOT NULL,
  `sentBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `isRead` tinyint(1) DEFAULT NULL,
  `type` enum('message','inquiry','preApproved','declined','approved','pending','cancelledByHost','cancelledByGuest','intantBooking','requestToBook','confirmed','expired','completed','claimRequested','claimRefunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'message',
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `personCapacity` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `reservationId` int DEFAULT NULL,
  `startTime` float DEFAULT NULL,
  `endTime` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `threadId` (`threadId`),
  CONSTRAINT `ThreadItems_ibfk_1` FOREIGN KEY (`threadId`) REFERENCES `Threads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ThreadItems`
--

LOCK TABLES `ThreadItems` WRITE;
/*!40000 ALTER TABLE `ThreadItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `ThreadItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Threads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guest` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isRead` tinyint(1) DEFAULT NULL,
  `messageUpdatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `Threads_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Threads`
--

LOCK TABLES `Threads` WRITE;
/*!40000 ALTER TABLE `Threads` DISABLE KEYS */;
/*!40000 ALTER TABLE `Threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Transaction`
--

DROP TABLE IF EXISTS `Transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `payerEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payerId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `receiverId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `total` float NOT NULL,
  `transactionFee` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipn_track_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentType` enum('booking','cancellation','host','claimRefund') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'booking',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `paymentMethodId` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `Transaction_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Transaction`
--

LOCK TABLES `Transaction` WRITE;
/*!40000 ALTER TABLE `Transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionHistory`
--

DROP TABLE IF EXISTS `TransactionHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TransactionHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payoutId` int NOT NULL,
  `payoutEmail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` float NOT NULL,
  `fees` float DEFAULT NULL,
  `currency` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `transactionId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paymentMethodId` tinyint(1) DEFAULT NULL,
  `payoutType` enum('claimPayout','payout') COLLATE utf8mb4_unicode_ci DEFAULT 'payout',
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `TransactionHistory_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `Reservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionHistory`
--

LOCK TABLES `TransactionHistory` WRITE;
/*!40000 ALTER TABLE `TransactionHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `TransactionHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailConfirmed` tinyint(1) DEFAULT '0',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userBanStatus` tinyint(1) DEFAULT '0',
  `userDeletedAt` datetime DEFAULT NULL,
  `userDeletedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6','qa@radicalstart.com','$2a$08$lqcmo6OgjVbcioD1uDAlueCdu6JYBwZe2xaoc1dEparRYKDjFrv9y',1,'email','2019-03-27 08:23:25','2019-03-27 08:23:25',0,NULL,NULL),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6','demo@radicalstart.com','$2a$08$jkiXGz2lM41L47LdWFTBZuLhwT3dTLDK3Nmhjx6PrRydp0DEEb9gG',1,'email','2019-03-27 07:49:15','2019-03-27 07:49:15',0,NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserAmenities`
--

DROP TABLE IF EXISTS `UserAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `amenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=516 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserAmenities`
--

LOCK TABLES `UserAmenities` WRITE;
/*!40000 ALTER TABLE `UserAmenities` DISABLE KEYS */;
INSERT INTO `UserAmenities` VALUES (1,1,27,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(2,1,119,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(3,1,26,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(4,1,25,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(5,2,26,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(6,2,119,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(7,2,73,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(8,2,25,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(9,2,118,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(13,4,28,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(14,4,26,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(15,4,25,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(16,4,119,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(476,3,28,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(477,3,25,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(478,3,119,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(515,5,25,'2019-09-14 05:43:42','2019-09-14 05:43:42');
/*!40000 ALTER TABLE `UserAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserClaim`
--

DROP TABLE IF EXISTS `UserClaim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserClaim` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserClaim_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserClaim`
--

LOCK TABLES `UserClaim` WRITE;
/*!40000 ALTER TABLE `UserClaim` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserClaim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserHouseRules`
--

DROP TABLE IF EXISTS `UserHouseRules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserHouseRules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `houseRulesId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `houseRulesId` (`houseRulesId`),
  CONSTRAINT `UserHouseRules_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserHouseRules_ibfk_2` FOREIGN KEY (`houseRulesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserHouseRules`
--

LOCK TABLES `UserHouseRules` WRITE;
/*!40000 ALTER TABLE `UserHouseRules` DISABLE KEYS */;
INSERT INTO `UserHouseRules` VALUES (9,5,'2019-08-23 12:52:03','2019-08-23 12:52:03',48),(10,5,'2019-08-23 12:52:03','2019-08-23 12:52:03',51),(11,5,'2019-08-23 12:52:03','2019-08-23 12:52:03',49),(20,4,'2019-08-24 05:14:00','2019-08-24 05:14:00',48),(21,4,'2019-08-24 05:14:00','2019-08-24 05:14:00',51),(22,4,'2019-08-24 05:14:00','2019-08-24 05:14:00',50),(25,2,'2019-08-24 05:14:17','2019-08-24 05:14:17',49),(26,1,'2019-08-24 05:14:25','2019-08-24 05:14:25',50),(27,1,'2019-08-24 05:14:25','2019-08-24 05:14:25',51),(28,3,'2019-08-24 05:14:31','2019-08-24 05:14:31',50),(29,3,'2019-08-24 05:14:31','2019-08-24 05:14:31',49),(246,6,'2019-09-13 16:12:59','2019-09-13 16:12:59',49),(247,6,'2019-09-13 16:12:59','2019-09-13 16:12:59',52),(248,6,'2019-09-13 16:12:59','2019-09-13 16:12:59',50);
/*!40000 ALTER TABLE `UserHouseRules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingData`
--

DROP TABLE IF EXISTS `UserListingData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingData` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `settingsId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingData_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=771 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingData`
--

LOCK TABLES `UserListingData` WRITE;
/*!40000 ALTER TABLE `UserListingData` DISABLE KEYS */;
INSERT INTO `UserListingData` VALUES (6,1,162,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(7,1,5,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(8,1,10,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(9,1,136,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(10,1,177,'2019-08-23 12:02:31','2019-08-23 12:02:31'),(16,2,149,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(17,2,182,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(18,2,144,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(19,2,181,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(20,2,178,'2019-08-23 12:19:02','2019-08-23 12:19:02'),(36,4,167,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(37,4,180,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(38,4,10,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(39,4,168,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(40,4,133,'2019-08-23 12:41:51','2019-08-23 12:41:51'),(641,3,162,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(642,3,184,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(643,3,10,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(644,3,183,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(645,3,178,'2019-09-13 04:30:10','2019-09-13 04:30:10'),(721,5,162,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(722,5,5,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(723,5,10,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(724,5,136,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(725,5,133,'2019-09-14 05:43:42','2019-09-14 05:43:42'),(766,6,149,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(767,6,188,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(768,6,175,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(769,6,187,'2019-09-14 10:34:07','2019-09-14 10:34:07'),(770,6,177,'2019-09-14 10:34:07','2019-09-14 10:34:07');
/*!40000 ALTER TABLE `UserListingData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserListingSteps`
--

DROP TABLE IF EXISTS `UserListingSteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserListingSteps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `step1` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step2` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `step3` enum('inactive','active','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserListingSteps_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserListingSteps`
--

LOCK TABLES `UserListingSteps` WRITE;
/*!40000 ALTER TABLE `UserListingSteps` DISABLE KEYS */;
INSERT INTO `UserListingSteps` VALUES (1,1,'completed','completed','completed','2019-08-23 12:02:21','2019-08-23 12:14:50'),(2,2,'completed','completed','completed','2019-08-23 12:18:41','2019-08-23 12:22:03'),(3,3,'completed','completed','completed','2019-08-23 12:31:41','2019-08-23 12:35:49'),(4,4,'completed','completed','completed','2019-08-23 12:41:44','2019-08-23 12:44:19'),(5,5,'completed','completed','completed','2019-08-23 12:49:08','2019-08-23 12:52:03'),(6,6,'completed','completed','completed','2019-08-23 12:57:24','2019-08-23 13:04:28');
/*!40000 ALTER TABLE `UserListingSteps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLogin`
--

DROP TABLE IF EXISTS `UserLogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLogin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `userId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceType` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deviceDetail` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLogin`
--

LOCK TABLES `UserLogin` WRITE;
/*!40000 ALTER TABLE `UserLogin` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserLogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserProfile`
--

DROP TABLE IF EXISTS `UserProfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfile` (
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `profileId` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `displayName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dateOfBirth` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredLanguage` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferredCurrency` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `location` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `stripeCusId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` int DEFAULT NULL,
  `verificationCode` int DEFAULT NULL,
  `countryCode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codeUpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `profileId` (`profileId`),
  UNIQUE KEY `UserProfile_profileId_unique` (`profileId`),
  CONSTRAINT `UserProfile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserProfile`
--

LOCK TABLES `UserProfile` WRITE;
/*!40000 ALTER TABLE `UserProfile` DISABLE KEYS */;
INSERT INTO `UserProfile` VALUES ('977bc550-5069-11e9-a14e-635e0fd3bfa6',2,'Radical','QA','Radical QA','1-2000-1','47b183fc3b5f918e007dea359dfcf3a7.jpeg','Female',NULL,'en','EUR','I always wanted to be a great writer, like Victor Hugo who wrote \"Les Miserable\", or like Roman Roland who wrote \"John Christopher\". They have influenced millions of people through their books. I also wanted to be a great psychologist, like William James or Sigmund Freud, who could read people’s mind. Of course, I am nowhere close to these people, yet. I am just someone who does some teaching, some research, and some writing. But my dream is still alive.','Lives in The City, United Kingdom','2019-03-27 08:23:25','2020-04-21 15:12:40',NULL,NULL,NULL,NULL,NULL,NULL),('d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,'Demo','User','Demo User','10-1994-5','0079fd330f0ff0eda9dfd043052ef6f2.jpeg','Male',NULL,'en','USD','I am a person who is positive about every aspect of life. There are many things I like to do, to see, and to experience. I like to read, I like to write; I like to think, I like to dream; I like to talk, I like to listen. I like to see the sunrise in the morning, I like to see the moonlight at night; I like to feel the music flowing on my face, I like to smell the wind coming from the ocean. I like to look at the clouds in the sky with a blank mind, I like to do thought experiment when I cannot sleep in the middle of the night. I like flowers in spring, rain in summer, leaves in autumn, and snow in winter. I like to sleep early, I like to get up late; I like to be alone, I like to be surrounded by people. I like country’s peace, I like metropolis’ noise; I like the beautiful west lake in Hangzhou, I like the flat cornfield in Campaign. I like delicious food and comfortable shoes; I like good books and romantic movies. I like the land and the nature, I like people. And, I like to laugh.','Architect based in Los Angeles,  CA.','2019-03-27 07:49:16','2019-08-23 12:46:02',NULL,NULL,NULL,'+91',NULL,NULL);
/*!40000 ALTER TABLE `UserProfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSafetyAmenities`
--

DROP TABLE IF EXISTS `UserSafetyAmenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSafetyAmenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `safetyAmenitiesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `UserSafetyAmenities_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSafetyAmenities`
--

LOCK TABLES `UserSafetyAmenities` WRITE;
/*!40000 ALTER TABLE `UserSafetyAmenities` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSafetyAmenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserSpaces`
--

DROP TABLE IF EXISTS `UserSpaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserSpaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `listId` int NOT NULL,
  `spacesId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  KEY `spacesId` (`spacesId`),
  CONSTRAINT `UserSpaces_ibfk_1` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserSpaces_ibfk_2` FOREIGN KEY (`spacesId`) REFERENCES `ListSettings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserSpaces`
--

LOCK TABLES `UserSpaces` WRITE;
/*!40000 ALTER TABLE `UserSpaces` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserSpaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVerifiedInfo`
--

DROP TABLE IF EXISTS `UserVerifiedInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserVerifiedInfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isEmailConfirmed` tinyint(1) DEFAULT '0',
  `isFacebookConnected` tinyint(1) DEFAULT '0',
  `isGoogleConnected` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isIdVerification` tinyint(1) DEFAULT '0',
  `isPhoneVerified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserVerifiedInfo_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVerifiedInfo`
--

LOCK TABLES `UserVerifiedInfo` WRITE;
/*!40000 ALTER TABLE `UserVerifiedInfo` DISABLE KEYS */;
INSERT INTO `UserVerifiedInfo` VALUES (1,'d1d6d5a0-5064-11e9-a14e-635e0fd3bfa6',1,0,1,'2019-03-27 07:49:16','2019-09-12 04:48:18',0,0),(2,'977bc550-5069-11e9-a14e-635e0fd3bfa6',1,0,0,'2019-03-27 08:23:25','2020-04-21 15:12:41',0,0);
/*!40000 ALTER TABLE `UserVerifiedInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WhyHost`
--

DROP TABLE IF EXISTS `WhyHost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WhyHost` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageName` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `buttonLabel` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WhyHost`
--

LOCK TABLES `WhyHost` WRITE;
/*!40000 ALTER TABLE `WhyHost` DISABLE KEYS */;
INSERT INTO `WhyHost` VALUES (1,'bdf194c06f529b2ef7db7f5b39a7d2e0.png','Loreum LoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreum','Loreum','2023-08-17 13:51:27','2023-08-17 13:51:27'),(2,'4f31b483bd8114e75edbfae9205f22f7.png','LoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreum','Loreum','2023-08-17 13:51:27','2023-08-17 13:51:27'),(3,'ca5ce8edcea9e0c56fbf2a4bc42e43cf.png','LoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreumLoreum','Loreum','2023-08-17 13:51:27','2023-08-17 13:51:27');
/*!40000 ALTER TABLE `WhyHost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WhyHostInfoBlock`
--

DROP TABLE IF EXISTS `WhyHostInfoBlock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WhyHostInfoBlock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WhyHostInfoBlock`
--

LOCK TABLES `WhyHostInfoBlock` WRITE;
/*!40000 ALTER TABLE `WhyHostInfoBlock` DISABLE KEYS */;
INSERT INTO `WhyHostInfoBlock` VALUES (1,'Host Banner Title 1','hostBannerTitle1','Lorem ipsum dolor sit amet','2020-04-21 13:55:00','2023-08-18 08:41:18'),(2,'Host Banner Content 1','hostBannerContent1','consectetur adipiscing elit, sed do                 ','2020-04-21 13:55:00','2023-08-18 08:41:18'),(3,'Host Banner Image 1','hostBannerImage1','b1e788592658bacc938369d4892716c4.png','2020-04-21 13:55:00','2023-08-18 08:41:18'),(4,'Earn Block Title 1','earnBlockTitle1','Lorem ipsum dolor sit amet','2020-04-21 13:55:00','2023-08-18 08:41:18'),(5,'Earn Block Content 1','earnBlockContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2023-08-18 08:41:18'),(6,'Earn Block Content 2','earnBlockContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2023-08-18 08:41:18'),(7,'Why Block Title 1','whyBlockTitle1','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2023-08-18 08:41:18'),(8,'Why Block Title 2','whyBlockTitle2','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2023-08-18 08:41:18'),(9,'Why Block Content 1','whyBlockContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2023-08-18 08:41:18'),(10,'Why Block Content 2','whyBlockContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2023-08-18 08:41:18'),(11,'Easy Host Title 1','easyHostTitle1','Lorem ipsum dolor sit amet, consectetur adipiscing elit','2020-04-21 13:55:00','2023-08-18 08:41:18'),(12,'Easy Host Content 1','easyHostContent1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2023-08-18 08:41:18'),(13,'Easy Host Content 2','easyHostContent2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2020-04-21 13:55:00','2023-08-18 08:41:18'),(14,'Work Title Heading','workTitleHeading','Sed ut perspiciatis unde omnis iste natus error sit voluptatem','2020-04-21 13:55:00','2023-08-18 08:41:18'),(15,'Work Title 1','workTitle1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem','2020-04-21 13:55:00','2023-08-18 08:41:18'),(16,'Work Title 2','workTitle2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem','2020-04-21 13:55:00','2023-08-18 08:41:18'),(17,'Work Content 1','workContent1','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam','2020-04-21 13:55:00','2023-08-18 08:41:18'),(18,'Work Content 2','workContent2','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam','2020-04-21 13:55:00','2023-08-18 08:41:18'),(19,'Work Image 1','workImage1','2af27aa827713d0239b1c4fec10b71f1.png','2020-04-21 13:55:00','2023-08-18 08:41:18'),(20,'Peace Title Heading','peaceTitleHeading','Why car sharing?  ','2020-04-21 13:55:00','2023-08-18 08:41:18'),(21,'Peace Title 1','peaceTitle1','At vero eos et accusamus et iusto odio dignissimos','2020-04-21 13:55:00','2023-08-18 08:41:18'),(22,'Peace Title 2','peaceTitle2','At vero eos et accusamus et iusto odio dignissimos','2020-04-21 13:55:00','2023-08-18 08:41:18'),(23,'Peace Title 3','peaceTitle3','Sharing is the futures','2020-04-21 13:55:00','2023-08-18 08:41:18'),(24,'Peace Content 1','peaceContent1','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti','2020-04-21 13:55:00','2023-08-18 08:41:18'),(25,'Peace Content 2','peaceContent2','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti','2020-04-21 13:55:00','2023-08-18 08:41:18'),(26,'Peace Content 3','peaceContent3','Experience the endless possibilities of car-sharing with us.','2020-04-21 13:55:00','2023-08-18 08:41:18'),(27,'Host banner content #2','hostBannerContent2','Make money now!','2023-08-17 13:51:42','2023-08-18 08:41:18'),(28,'Host banner image #2','hostBannerImage2','c0b31266d3000dec1b33153cd5b7af0a.png','2023-08-17 13:51:42','2023-08-18 08:41:18'),(29,'Why-host block image #1','whyBlockImage1','c6823714e2d49142c9a82488dc0c75d6.png','2023-08-17 13:51:43','2023-08-18 08:41:18'),(30,'Why-host block image #2','whyBlockImage2','f7067f3c383959d77594dd2e7bbcd359.png','2023-08-17 13:51:43','2023-08-18 08:41:18'),(31,'Worktitle image #2','workImage2','e7d486204198ceeee0268db737c6e552.png','2023-08-17 13:51:45','2023-08-18 08:41:18'),(32,'Worktitle image #3','workImage3','4b2e51def60c6c2b7e4eec003c5c4a01.png','2023-08-17 13:51:45','2023-08-18 08:41:18'),(33,'Worktitle image #4','workImage4','e0f60cae61f12ece32a2900f29da55b2.png','2023-08-17 13:51:45','2023-08-18 08:41:18');
/*!40000 ALTER TABLE `WhyHostInfoBlock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishList`
--

DROP TABLE IF EXISTS `WishList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishList` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wishListGroupId` int NOT NULL,
  `listId` int NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isListActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wishListGroupId` (`wishListGroupId`),
  KEY `listId` (`listId`),
  CONSTRAINT `WishList_ibfk_1` FOREIGN KEY (`wishListGroupId`) REFERENCES `WishListGroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WishList_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `Listing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishList`
--

LOCK TABLES `WishList` WRITE;
/*!40000 ALTER TABLE `WishList` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WishListGroup`
--

DROP TABLE IF EXISTS `WishListGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `WishListGroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isPublic` int DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WishListGroup`
--

LOCK TABLES `WishListGroup` WRITE;
/*!40000 ALTER TABLE `WishListGroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `WishListGroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 14:28:00

-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: database-group-12.cxyime46mesp.us-east-2.rds.amazonaws.com    Database: coogtunes
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `adminID` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`adminID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Kevin','Macedo','admin@synth.com','admin123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_notifications`
--

DROP TABLE IF EXISTS `admin_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_notifications` (
  `notificationID` int NOT NULL AUTO_INCREMENT,
  `songID` int DEFAULT NULL,
  `notificationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `artistName` varchar(45) DEFAULT NULL,
  `songTitle` varchar(45) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `adminID` int DEFAULT '1',
  `artistID` int DEFAULT NULL,
  `albumID` int DEFAULT NULL,
  PRIMARY KEY (`notificationID`),
  KEY `fk_admin_adminID` (`adminID`),
  KEY `admin_notifications_ibfk_1` (`songID`),
  CONSTRAINT `admin_notifications_ibfk_1` FOREIGN KEY (`songID`) REFERENCES `song` (`songID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_admin_adminID` FOREIGN KEY (`adminID`) REFERENCES `admin` (`adminID`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_notifications`
--

LOCK TABLES `admin_notifications` WRITE;
/*!40000 ALTER TABLE `admin_notifications` DISABLE KEYS */;
INSERT INTO `admin_notifications` VALUES (42,107,'2024-04-18 06:03:52','Hozier','Nina Cried Power','https://upload.wikimedia.org/wikipedia/en/0/00/Hozier_-_Wasteland%2C_Baby%21.png',1,1,10);
/*!40000 ALTER TABLE `admin_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `albumID` int NOT NULL AUTO_INCREMENT,
  `albumName` varchar(45) NOT NULL,
  `releaseDate` date DEFAULT NULL,
  `cover` varchar(255) DEFAULT 'https://static.4sync.com/images/4sh_music_embed_player_default_cover.png?ver=-790556520',
  `artistID` int DEFAULT NULL,
  `time_posted` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`albumID`),
  KEY `album_ibfk_1` (`artistID`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artist` (`artistID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (10,'Wasteland, Baby!','2019-03-01','https://upload.wikimedia.org/wikipedia/en/0/00/Hozier_-_Wasteland%2C_Baby%21.png',1,'2024-04-13 19:55:07'),(27,'Views','2016-04-29','https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg',51,'2024-04-13 19:55:07'),(32,'White Pony','2000-01-01','https://m.media-amazon.com/images/I/51BXwSNRwIL._UF1000,1000_QL80_.jpg',59,'2024-04-13 19:55:07'),(33,'Around The Fur','0000-00-00','https://images.genius.com/f2e68e770b170b64a2efb9b945345564.1000x1000x1.png',59,'2024-04-13 19:55:07'),(34,'Diamond Eyes','2010-05-04','https://m.media-amazon.com/images/I/71m2m4kGPXL._UF1000,1000_QL80_.jpg',59,'2024-04-13 19:55:07'),(35,'SOS','2022-10-09','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_dFnc8nn9YN3VOuoubPs9y7Yr08ApDX5t3Wcerm_OKA&s',58,'2024-04-13 19:55:07'),(36,'Ctrl','2017-06-09','https://upload.wikimedia.org/wikipedia/en/b/bf/SZA_-_Ctrl_cover.png',58,'2024-04-13 19:55:07'),(37,'Z','2014-04-08','https://upload.wikimedia.org/wikipedia/en/f/f4/SZA_-_Z.png',58,'2024-04-13 19:55:07'),(38,'Yours Truly','2013-08-30','https://m.media-amazon.com/images/I/61nIR7pU23L._UF1000,1000_QL80_.jpg',56,'2024-04-13 19:55:07'),(39,'My Everything','2014-08-22','https://m.media-amazon.com/images/I/71l3DZZM+KL._UF1000,1000_QL80_.jpg',56,'2024-04-13 19:55:07'),(40,'Dangerous Woman','2016-05-20','https://upload.wikimedia.org/wikipedia/en/4/4b/Ariana_Grande_-_Dangerous_Woman_%28Official_Album_Cover%29.png',56,'2024-04-13 19:55:07'),(41,'Sweetener','2018-08-17','https://upload.wikimedia.org/wikipedia/en/7/7a/Sweetener_album_cover.png',56,'2024-04-13 19:55:07'),(42,'Take Care','2011-11-15','https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Drake_-_Take_Care_cover.jpg/220px-Drake_-_Take_Care_cover.jpg',51,'2024-04-15 01:37:21'),(43,'Hozier','2014-08-19','https://cloudfront-eu-central-1.images.arcpublishing.com/irishtimes/RIAVFZG2EAU3TAOGA3Z3THBP6Q.jpg',1,'2024-04-18 08:17:07'),(44,'Unreal Unearth','2023-08-18','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAWfvSW1bKNRV9pCQIdHUro0Vn1GUxw8YdTWIV1r7mbg&s',1,'2024-04-18 08:19:03'),(45,'Unheard','2024-03-22','https://images.genius.com/540267f20416960ce544a3265faa6a5a.1000x1000x1.png',1,'2024-04-18 08:26:19'),(46,'Thank Me Later','2010-06-15','https://upload.wikimedia.org/wikipedia/en/9/9c/Drake_-_Thank_Me_Later_cover.jpg',51,'2024-04-18 08:30:22'),(52,'Graduation','2007-09-11','https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg',54,'2024-04-20 14:21:11'),(53,'The College Dropout','2004-02-10','https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78',54,'2024-04-20 14:34:53'),(54,'My Beautiful Dark Twisted Fantasy','2010-11-22','https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',54,'2024-04-20 14:42:07'),(55,'Illmatic','1994-04-19','https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg',62,'2024-04-20 14:53:37'),(56,'It Was Written','1996-07-02','https://upload.wikimedia.org/wikipedia/en/c/cc/Nas-it-was-written-music-album.jpg',62,'2024-04-20 15:14:46'),(57,'YHLQMDLG','2020-02-29','https://upload.wikimedia.org/wikipedia/en/3/3f/Bad_Bunny_-_Yhlqmdlg.png',63,'2024-04-20 15:20:02'),(58,'Un Verano Sin Ti','2022-05-06','https://upload.wikimedia.org/wikipedia/en/6/60/Bad_Bunny_-_Un_Verano_Sin_Ti.png',63,'2024-04-20 15:56:30'),(60,'Last Day of Summer','2018-10-19','https://upload.wikimedia.org/wikipedia/en/b/ba/Last_day_of_summer.png',53,'2024-04-20 23:43:35'),(61,'Positions','2020-10-30','https://upload.wikimedia.org/wikipedia/en/a/a0/Ariana_Grande_-_Positions.png',56,'2024-04-21 01:28:51'),(62,'Eternal Sunshine','2024-03-08','https://media.pitchfork.com/photos/65e5fbbaed9239d330ef9040/master/w_1280%2Cc_limit/eternal%2520sunshine.jpeg',56,'2024-04-21 01:31:00'),(63,'SAWAYAMA','2020-04-17','https://upload.wikimedia.org/wikipedia/en/8/83/Sawayama_by_Rina_Sawayama_album_cover_%28digital%29.png',57,'2024-04-21 02:58:28');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `album_like`
--

DROP TABLE IF EXISTS `album_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album_like` (
  `albumID` int NOT NULL,
  `listenerID` int NOT NULL,
  `time_liked` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`albumID`,`listenerID`),
  KEY `album_like_ibfk_2` (`listenerID`),
  CONSTRAINT `album_like_ibfk_1` FOREIGN KEY (`albumID`) REFERENCES `album` (`albumID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `album_like_ibfk_2` FOREIGN KEY (`listenerID`) REFERENCES `listener` (`listenerID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album_like`
--

LOCK TABLES `album_like` WRITE;
/*!40000 ALTER TABLE `album_like` DISABLE KEYS */;
INSERT INTO `album_like` VALUES (10,3,'2024-04-15 05:47:52'),(27,3,'2024-04-16 19:58:34'),(32,34,'2024-04-15 20:15:56'),(34,35,'2024-04-15 18:56:32'),(35,3,'2024-04-19 00:32:19'),(36,36,'2024-04-15 20:29:05'),(37,3,'2024-04-19 00:40:47'),(38,36,'2024-04-15 20:28:46'),(39,36,'2024-04-15 20:28:50'),(40,34,'2024-04-15 20:16:06'),(40,35,'2024-04-15 18:56:43'),(42,34,'2024-04-15 20:17:01'),(42,35,'2024-04-15 18:56:12');
/*!40000 ALTER TABLE `album_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `artistID` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `artistName` varchar(45) NOT NULL,
  `genre` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `DoB` date NOT NULL,
  `profilePic` varchar(255) DEFAULT 'https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg',
  `timeJoined` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `num_followers` int DEFAULT '0',
  `verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`artistID`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'Andrew','Hozier-Byrne','Hozier','Alternative','hozier@gmail.com','Hozier123','1990-01-01','https://www.usatoday.com/gcdn/authoring/authoring-images/2023/08/14/USAT/70591044007-hozier-new-press-photo-ruth-medjber.jpg?crop=1509,1509,x912,y949','2024-04-14 23:00:25',2,0),(51,'Aubrey','Graham','Drake','Rap','drake@ovo.com','12345','1986-10-24','https://image.mymixtapez.com/artists/5808/profile/medium','2024-04-14 23:00:25',1,0),(53,'Summer','Walker','Summer Walker','R&B','summerwalker@synth.com','summerwalkerpass','1996-04-11','https://www.the-sun.com/wp-content/uploads/sites/6/2023/01/EP_SUMMER_WALKER_KIDS_EXPL_OFFPLATFORM.jpg?strip=all&quality=100&w=1080&h=1080&crop=1','2024-04-14 23:00:25',1,0),(54,'Kanye','West','Kanye West','Rap','kanye@yeezy.com','12345','1977-06-08','https://hips.hearstapps.com/hmg-prod/images/kanye-west-attends-the-christian-dior-show-as-part-of-the-paris-fashion-week-womenswear-fall-winter-2015-2016-on-march-6-2015-in-paris-france-photo-by-dominique-charriau-wireimage-square.jpg','2024-04-14 23:00:25',1,0),(56,'Ariana','Grande','Ariana Grande','Pop','arianagrande@synth.com','arianagrande123','1993-06-26','https://i.scdn.co/image/ab6761610000e5eb40b5c07ab77b6b1a9075fdc0','2024-04-14 23:00:25',51,1),(57,'Rina','Sawayama','Rina Sawayama','Alternative','rinasawayama@synth.com','rinasawyama123','1990-08-16','https://i.scdn.co/image/ab6761610000e5eb8cb645e0a77bf015feda7fb9','2024-04-14 23:00:25',2,0),(58,'Solana','Rowe','SZA','R&B','sza@synth.com','sza123','1989-11-08','https://i.scdn.co/image/ab6761610000e5eb0895066d172e1f51f520bc65','2024-04-14 23:00:25',1,0),(59,'Chino','Moreno','Deftones','Rock','deftones@synth.com','deftones123','1973-06-20','https://i.scdn.co/image/ab6761610000e5eb4b2da0b72cab26ac518f1f0d','2024-04-14 23:00:25',2,0),(62,'Nasir','Jones','Nas','Hip-Hop','nas@synth.com','12345','1973-09-14','https://static01.nyt.com/images/2015/06/25/t-magazine/25nas-moss/25nas-moss-superJumbo.jpg','2024-04-20 14:50:49',0,0),(63,'Benito','Ocasio','Bad Bunny','Latin','badbunny@synth.com','12345','1994-03-10','https://i.scdn.co/image/ab676161000051749ad50e478a469448c6f369df','2024-04-20 15:19:09',0,0);
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_follower`
--

DROP TABLE IF EXISTS `artist_follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist_follower` (
  `listenerID` int NOT NULL,
  `artistID` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`listenerID`,`artistID`),
  KEY `artistID` (`artistID`),
  CONSTRAINT `artist_follower_ibfk_1` FOREIGN KEY (`artistID`) REFERENCES `artist` (`artistID`),
  CONSTRAINT `artist_follower_ibfk_2` FOREIGN KEY (`listenerID`) REFERENCES `listener` (`listenerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_follower`
--

LOCK TABLES `artist_follower` WRITE;
/*!40000 ALTER TABLE `artist_follower` DISABLE KEYS */;
INSERT INTO `artist_follower` VALUES (2,1,'2024-04-15 20:30:19'),(2,53,'2024-04-15 20:30:19'),(2,56,'2024-04-14 08:30:00'),(3,1,'2024-04-21 02:27:18'),(3,56,'2024-04-15 20:30:19'),(3,57,'2024-04-20 01:24:06'),(3,58,'2024-04-19 00:32:16'),(3,59,'2024-04-20 01:06:50'),(33,56,'2024-04-14 10:45:00'),(34,1,'2024-04-15 20:30:19'),(34,57,'2024-04-15 20:30:19'),(35,51,'2024-04-15 20:30:19'),(35,59,'2024-04-15 20:30:19'),(36,53,'2024-04-15 20:30:19'),(36,54,'2024-04-15 20:30:19'),(36,56,'2024-04-15 20:30:19'),(37,56,'2024-04-17 10:15:00'),(39,56,'2024-04-19 15:16:00'),(40,56,'2024-04-15 11:30:00'),(41,56,'2024-04-16 14:45:00'),(43,56,'2024-04-17 10:20:00'),(44,56,'2024-04-18 17:50:00'),(45,56,'2024-04-16 08:15:00'),(46,56,'2024-04-14 00:00:00'),(49,56,'2024-04-14 17:00:00'),(50,56,'2024-04-17 13:00:00'),(51,56,'2024-04-18 00:00:00'),(54,56,'2024-04-19 09:15:00'),(55,56,'2024-04-18 15:15:00'),(57,56,'2024-04-17 15:25:00'),(58,56,'2024-04-18 00:00:00'),(59,56,'2024-04-18 00:00:00'),(60,56,'2024-04-18 17:52:00'),(61,56,'2024-04-19 13:21:00'),(62,56,'2024-04-17 14:31:00'),(63,56,'2024-04-18 07:13:00'),(64,56,'2024-04-18 20:15:00'),(65,56,'2024-04-14 14:20:00'),(66,56,'2024-04-19 16:32:00'),(67,56,'2024-04-15 00:00:00'),(68,56,'2024-04-16 00:00:00'),(69,56,'2024-04-19 03:29:00'),(70,56,'2024-04-15 13:49:00'),(71,56,'2024-04-17 08:00:00'),(72,56,'2024-04-15 13:45:00'),(73,56,'2024-04-17 17:50:00'),(75,56,'2024-04-19 00:00:00'),(76,56,'2024-04-14 00:00:00'),(77,56,'2024-04-20 00:00:00'),(78,56,'2024-04-16 10:50:00'),(80,56,'2024-04-15 00:59:00'),(81,56,'2024-04-17 20:15:00'),(82,56,'2024-04-15 13:32:00'),(83,56,'2024-04-16 00:00:00'),(84,56,'2024-04-16 13:25:00'),(85,56,'2024-04-20 00:00:00'),(86,56,'2024-04-17 00:00:00'),(87,56,'2024-04-20 00:00:00'),(88,56,'2024-04-14 17:10:00'),(89,56,'2024-04-19 11:05:00'),(90,56,'2024-04-14 12:10:00'),(91,56,'2024-04-20 00:00:00'),(93,56,'2024-04-18 08:10:00'),(97,56,'2024-04-15 09:00:00'),(99,56,'2024-04-19 13:30:00'),(101,56,'2024-04-16 16:00:00'),(105,56,'2024-04-18 10:35:00'),(107,56,'2024-04-19 16:05:00'),(110,56,'2024-04-15 16:20:00'),(111,56,'2024-04-19 18:40:00'),(113,56,'2024-04-16 21:20:00'),(116,56,'2024-04-18 13:00:00'),(118,56,'2024-04-15 19:05:00');
/*!40000 ALTER TABLE `artist_follower` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `update_artist_verification` AFTER INSERT ON `artist_follower` FOR EACH ROW BEGIN
    DECLARE follower_count INT;

    -- Get the number of followers for the artist
    SELECT num_followers INTO follower_count
    FROM artist
    WHERE artistID = NEW.artistID;

    -- Update the verification status if follower count reaches 50 or more
    IF follower_count >= 50 THEN
        UPDATE artist
        SET verified = TRUE
        WHERE artistID = NEW.artistID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `flag`
--

DROP TABLE IF EXISTS `flag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flag` (
  `songID` int NOT NULL,
  `listenerID` int NOT NULL,
  `reason` enum('Abusive Behavior','Quality Control','Technical Issues','Copyright Infringement','Misrepresentation/Impersonation') NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`songID`,`listenerID`,`reason`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flag`
--

LOCK TABLES `flag` WRITE;
/*!40000 ALTER TABLE `flag` DISABLE KEYS */;
INSERT INTO `flag` VALUES (107,3,'Abusive Behavior','2024-04-20 22:17:32'),(107,3,'Technical Issues','2024-04-20 22:17:32'),(107,3,'Misrepresentation/Impersonation','2024-04-20 22:17:32');
/*!40000 ALTER TABLE `flag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listener`
--

DROP TABLE IF EXISTS `listener`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `listener` (
  `listenerID` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(45) DEFAULT NULL,
  `lname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `DoB` date DEFAULT NULL,
  `profilePic` varchar(255) DEFAULT 'https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg',
  `gender` enum('F','M','OTHER') DEFAULT 'OTHER',
  `age` int DEFAULT NULL,
  `timeJoined` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`listenerID`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listener`
--

LOCK TABLES `listener` WRITE;
/*!40000 ALTER TABLE `listener` DISABLE KEYS */;
INSERT INTO `listener` VALUES (2,'Jane','Smith','janesmith@example.com','janesmith','$2b$10$zK0tas6VBd790dXfo1et2e0ENluLxO8LeycaZE','1995-05-05','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',14,'2024-04-14 23:00:50'),(3,'John','Doe','jona@gmail.com','cooldanery','Odie1010','1990-01-01','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',59,'2024-04-14 23:00:50'),(33,'Zahra','Bukhari','zahrabukhari@gmail.com','zahrabukhari','zahrabukhari123','2001-01-17','','OTHER',33,'2024-04-14 23:50:56'),(34,'Cynthia','Khan','cynthiakhan@gmail.com','NernieBear','cynthiakhan123','1977-01-20','','F',59,'2024-04-14 23:55:53'),(35,'Mike','Oxlong','mikeox@gmail.com','MikeOxlong','mikeoxlong123','1969-04-20','','M',35,'2024-04-15 18:55:32'),(36,'Patty','Haddox','patty@gmail.com','PattyHaddox','pattyhaddox123','1988-04-29','','F',78,'2024-04-15 20:28:25'),(37,'Emily','Johnson','emily.johnson@example.com','emily_j','securepassword123','1995-08-20','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',29,'2024-04-16 03:35:23'),(38,'Michael','Smith','michael.smith@example.com','michael_s','password123','1988-05-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',36,'2024-04-16 03:35:40'),(39,'Sophia','Brown','sophia.brown@example.com','sophia_b','pass123','1993-11-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',31,'2024-04-16 03:36:48'),(40,'Daniel','Martinez','daniel.martinez@example.com','daniel_m','danielpass','1985-09-25','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',39,'2024-04-16 03:36:50'),(41,'Olivia','Garcia','olivia.garcia@example.com','olivia_g','olivia123','1990-03-08','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',48,'2024-04-16 03:36:52'),(42,'Ethan','Lopez','ethan.lopez@example.com','ethan_l','ethanpass','1982-07-20','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',38,'2024-04-16 03:36:54'),(43,'Ava','Rodriguez','ava.rodriguez@example.com','ava_r','avapass123','1998-04-30','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',26,'2024-04-16 03:36:56'),(44,'Noah','Perez','noah.perez@example.com','noah_p','noahpass','1987-12-12','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',37,'2024-04-16 03:36:58'),(45,'Isabella','Gonzalez','isabella.gonzalez@example.com','isabella_g','bellapass','1994-06-05','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',30,'2024-04-16 03:37:01'),(46,'Liam','Torres','liam.torres@example.com','liam_t','liampassword','1984-02-18','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',40,'2024-04-16 03:37:03'),(47,'Mia','Rivera','mia.rivera@example.com','mia_r','miapass123','1996-10-22','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',28,'2024-04-16 03:37:05'),(48,'James','Hernandez','james.hernandez@example.com','james_h','jamespass','1989-08-07','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',35,'2024-04-16 03:37:07'),(49,'David','Ramirez','david.ramirez@example.com','david_r','davidpass123','1988-01-25','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',36,'2024-04-16 03:38:17'),(50,'Evelyn','Ali','evelyn.ali@example.com','evelyn_a','evelynpass','1990-06-18','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',34,'2024-04-16 03:38:20'),(51,'Matthew','Gupta','matthew.gupta@example.com','matthew_g','mattpass123','1981-03-29','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',51,'2024-04-16 03:38:22'),(52,'Harper','Wong','harper.wong@example.com','harper_w','harperpass','1992-11-20','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',32,'2024-04-16 03:38:24'),(53,'Benjamin','Patel','benjamin.patel@example.com','benjamin_p','benjaminpass','1980-04-05','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',40,'2024-04-16 03:38:26'),(54,'Amelia','Singh','amelia.singh@example.com','amelia_s','ameliapass123','1999-02-17','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',23,'2024-04-16 03:38:29'),(55,'William','Chen','william.chen@example.com','william_c','williampass','1983-09-09','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',49,'2024-04-16 03:38:33'),(56,'Charlotte','Kim','charlotte.kim@example.com','charlotte_k','charpass123','1997-05-28','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',25,'2024-04-16 03:38:34'),(57,'Alexander','Nguyen','alexander.nguyen@example.com','alexander_n','alexpass','1986-07-14','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',38,'2024-04-16 03:38:37'),(58,'Emma','Flores','emma.flores@example.com','emma_f','emmapassword','1991-12-03','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',33,'2024-04-16 03:38:39'),(59,'Liam','Smith','liam.smith@example.com','liam_s','liampass123','1995-08-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',29,'2024-04-14 08:20:45'),(60,'Ava','Jones','ava.jones@example.com','ava_j','avapassword','1990-11-25','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',33,'2024-04-15 12:45:30'),(61,'Noah','Taylor','noah.taylor@example.com','noah_t','noahpass123','1988-04-03','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',36,'2024-04-16 18:10:22'),(62,'Olivia','Brown','olivia.brown@example.com','olivia_b','oliviapass','1993-07-19','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',30,'2024-04-17 05:55:15'),(63,'Ethan','Garcia','ethan.garcia@example.com','ethan_g','ethanpassword','1987-09-28','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',36,'2024-04-18 10:30:55'),(64,'Isabella','Martinez','isabella.martinez@example.com','isabella_m','isabellapass','1996-02-14','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',34,'2024-04-19 14:20:40'),(65,'Mason','Rodriguez','mason.rodriguez@example.com','mason_r','masonpass123','1992-05-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',32,'2024-04-20 20:15:10'),(66,'Sophia','Hernandez','sophia.hernandez@example.com','sophia_h','sophiapassword','1985-12-07','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',38,'2024-04-14 16:40:30'),(67,'William','Lopez','william.lopez@example.com','william_l','williampass123','1989-10-22','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',34,'2024-04-15 22:05:20'),(68,'Emily','Gonzalez','emily.gonzalez@example.com','emily_g','emilypass','1997-03-29','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',27,'2024-04-16 03:38:17'),(69,'Niamh','Callaghan','niamh.callaghan@example.com','niamh_c','niamhpass123','1995-08-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',29,'2024-04-14 08:20:45'),(70,'Soren','Bjornsen','soren.bjornsen@example.com','soren_b','sorenpass','1990-11-25','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',33,'2024-04-15 12:45:30'),(71,'Astrid','Nordstrom','astrid.nordstrom@example.com','astrid_n','astridpass123','1988-04-03','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',36,'2024-04-16 18:10:22'),(72,'Thaddeus','Fairbanks','thaddeus.fairbanks@example.com','thaddeus_f','thaddeuspass','1993-07-19','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',40,'2024-04-17 05:55:15'),(73,'Lyra','Whitaker','lyra.whitaker@example.com','lyra_w','lyrapass123','1987-09-28','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',36,'2024-04-18 10:30:55'),(74,'Cormac','Donnelly','cormac.donnelly@example.com','cormac_d','cormacpass','1996-02-14','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',34,'2024-04-19 14:20:40'),(75,'Freyja','Thorvaldsdottir','freyja.thorvaldsdottir@example.com','freyja_t','freyjapass123','1992-05-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',32,'2024-04-20 20:15:10'),(76,'Jorah','Rothschild','jorah.rothschild@example.com','jorah_r','jorahpass123','1985-12-07','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',38,'2024-04-14 16:40:30'),(77,'Elowen','Montgomery','elowen.montgomery@example.com','elowen_m','elowenpass','1989-10-22','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',34,'2024-04-15 22:05:20'),(78,'Emeric','Von Haussmann','emeric.vonhaussmann@example.com','emeric_v','emericpass123','1997-03-29','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',41,'2024-04-16 03:38:17'),(79,'Zephyr','Davenport','zephyr.davenport@example.com','zephyr_d','zephyrpass123','1995-08-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',29,'2024-04-14 08:20:45'),(80,'Isla','McLeod','isla.mcleod@example.com','isla_m','islapass','1990-11-25','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',33,'2024-04-15 12:45:30'),(81,'Bodhi','Harrington','bodhi.harrington@example.com','bodhi_h','bodhipass123','1988-04-03','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',36,'2024-04-16 18:10:22'),(82,'Lilith','Mercer','lilith.mercer@example.com','lilith_m','lilithpass','1993-07-19','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',30,'2024-04-17 05:55:15'),(83,'Caspian','Hayward','caspian.hayward@example.com','caspian_h','casppass123','1987-09-28','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',36,'2024-04-18 10:30:55'),(84,'Ezri','Pierce','ezri.pierce@example.com','ezri_p','ezripass','1996-02-14','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',28,'2024-04-19 14:20:40'),(85,'Kai','Fletcher','kai.fletcher@example.com','kai_f','kaipass123','1992-05-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',32,'2024-04-20 20:15:10'),(86,'Elara','Montgomery','elara.montgomery@example.com','elara_m','elarapass123','1985-12-07','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',38,'2024-04-14 16:40:30'),(87,'Cyrus','Malone','cyrus.malone@example.com','cyrus_m','cyruspass','1989-10-22','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',34,'2024-04-15 22:05:20'),(88,'Nova','Hawkins','nova.hawkins@example.com','nova_h','novapass123','1997-03-29','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',27,'2024-04-16 03:38:17'),(89,'Zephyr','Jensen','zephyr.jensen@example.com','zephyr_j','zephyrpass','1994-08-13','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',29,'2024-04-17 08:50:05'),(90,'Lachlan','OReilly','lachlan.oreilly@example.com','lachlan_o','lachlanpass123','1990-06-25','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',31,'2024-04-14 09:30:15'),(91,'Seraphina','Nguyen','seraphina.nguyen@example.com','seraphina_n','seraphinapass','1993-09-18','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',28,'2024-04-15 11:20:30'),(92,'Cassius','McCarthy','cassius.mccarthy@example.com','cassius_m','cassiuspass123','1988-03-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',47,'2024-04-16 13:45:22'),(93,'Aurora','Andersen','aurora.andersen@example.com','aurora_a','aurorapass','1996-11-05','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',29,'2024-04-17 16:00:45'),(94,'Cyril','Ismail','cyril.ismail@example.com','cyril_i','cyrilpass123','1992-02-28','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',29,'2024-04-18 18:20:10'),(95,'Octavia','Vargas','octavia.vargas@example.com','octavia_v','octaviapass','1987-07-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',34,'2024-04-19 20:35:30'),(96,'Darius','Wong','darius.wong@example.com','darius_w','dariuspass123','1994-10-22','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',41,'2024-04-20 22:40:55'),(97,'Zara','Larsen','zara.larsen@example.com','zara_l','zarapass','1991-05-17','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',30,'2024-04-14 10:50:20'),(98,'Orson','Abraham','orson.abraham@example.com','orson_a','orsonpass123','1986-12-02','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',35,'2024-04-15 12:05:40'),(99,'Esme','Galloway','esme.galloway@example.com','esme_g','esmepass','1997-08-09','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',24,'2024-04-16 14:30:15'),(100,'Caspian','Montgomery','caspian.montgomery@example.com','caspian_m','caspianpass123','1993-03-28','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',28,'2024-04-14 15:20:45'),(101,'Evelina','Silva','evelina.silva@example.com','evelina_s','evelinapass','1990-09-11','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',31,'2024-04-15 17:35:30'),(102,'Aurelian','Thompson','aurelian.thompson@example.com','aurelian_t','aurelianpass123','1988-02-18','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',33,'2024-04-16 19:50:22'),(103,'Thalia','Nguyen','thalia.nguyen@example.com','thalia_n','thaliapass','1995-11-07','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',26,'2024-04-17 22:05:45'),(104,'Castiel','Chang','castiel.chang@example.com','castiel_c','castielpass123','1991-04-22','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',30,'2024-04-18 10:20:10'),(105,'Lyra','Mendoza','lyra.mendoza@example.com','lyra_m','lyrapass','1987-08-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',34,'2024-04-19 12:35:30'),(106,'Cassian','Ramos','cassian.ramos@example.com','cassian_r','cassianpass123','1994-05-12','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',27,'2024-04-20 14:50:55'),(107,'Isolde','Gallagher','isolde.gallagher@example.com','isolde_g','isoldepass','1992-10-27','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',29,'2024-04-14 16:10:20'),(108,'Emrys','Ramirez','emrys.ramirez@example.com','emrys_r','emryspass123','1989-12-14','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','M',32,'2024-04-15 18:25:40'),(109,'Thora','Holmes','thora.holmes@example.com','thora_h','thorapass','1996-07-31','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','F',29,'2024-04-16 20:40:15'),(110,'Rowan','Singh','rowan.singh@example.com','rowan_s','rowanpass123','1992-03-25','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',30,'2024-04-14 10:30:45'),(111,'Phoenix','Baker','phoenix.baker@example.com','phoenix_b','phoenixpass','1984-09-18','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',37,'2024-04-15 12:45:30'),(112,'Sage','Wu','sage.wu@example.com','sage_w','sagepass123','1997-05-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',24,'2024-04-16 15:00:22'),(113,'Indigo','Patel','indigo.patel@example.com','indigo_p','indigopass','1988-04-05','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',33,'2024-04-17 18:20:45'),(114,'River','Santos','river.santos@example.com','river_s','riverpass123','1995-07-20','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',26,'2024-04-18 20:35:10'),(115,'Sawyer','Nguyen','sawyer.nguyen@example.com','sawyer_n','sawyerpass','1990-11-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',31,'2024-04-19 22:50:30'),(116,'Remy','Chang','remy.chang@example.com','remy_c','remypass123','1996-02-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',29,'2024-04-20 11:10:55'),(117,'Finley','Gupta','finley.gupta@example.com','finley_g','finleypass','1993-01-15','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',28,'2024-04-14 12:25:20'),(118,'Ellis','Kumar','ellis.kumar@example.com','ellis_k','ellispass123','1985-12-10','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',36,'2024-04-15 14:40:40'),(119,'Harley','Lopez','harley.lopez@example.com','harley_l','harleypass','1990-06-05','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',31,'2024-04-16 16:55:15'),(120,'Quinn','Das','quinn.das@example.com','quinn_d','quinnpass123','1981-10-30','https://i1.sndcdn.com/avatars-000339644685-3ctegw-t500x500.jpg','OTHER',40,'2024-04-17 19:10:30');
/*!40000 ALTER TABLE `listener` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song` (
  `songID` int NOT NULL AUTO_INCREMENT,
  `songTitle` varchar(45) NOT NULL,
  `albumID` int NOT NULL,
  `filePath` varchar(255) NOT NULL DEFAULT 'https://storage.googleapis.com/bucket-tester-2/basic-199126.mp3',
  `songDuration` varchar(5) DEFAULT NULL,
  `flag` int DEFAULT '0',
  `numLikes` int DEFAULT '0',
  `streams` int DEFAULT '0',
  PRIMARY KEY (`songID`),
  KEY `albumID` (`albumID`),
  CONSTRAINT `fk_album_id` FOREIGN KEY (`albumID`) REFERENCES `album` (`albumID`) ON DELETE CASCADE,
  CONSTRAINT `song_ibfk_1` FOREIGN KEY (`albumID`) REFERENCES `album` (`albumID`)
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (83,'U With Me',27,'https://storage.googleapis.com/bucket-tester-2/Drake%20-%20U%20With%20Me_.mp3','0',6,1,0),(84,'Keep the Family Close',27,'https://storage.googleapis.com/bucket-tester-2/Drake%20-%20Keep%20the%20Family%20Close.mp3','0',3,3,1),(85,'9',27,'https://storage.googleapis.com/bucket-tester-2/Drake%20-%209.mp3','0',1,2,0),(106,'Nobody',10,'https://storage.googleapis.com/bucket-tester-2/Hozier%20-%20Nobody%20(Audio).mp3','3:50',28,3,0),(107,'Nina Cried Power',10,'https://storage.googleapis.com/bucket-tester-2/Hozier%20-%20Nina%20Cried%20Power%20ft.%20Mavis%20Staples.mp3','4:18',36,1,0),(108,'Almost',10,'https://storage.googleapis.com/bucket-tester-2/Hozier%20-%20Almost%20(Sweet%20Music)%20(Audio).mp3','4:00',52,2,6),(148,'Faithful',27,'https://storage.googleapis.com/bucket-tester-2/1713649450692-Drake - Faithful ft. Pimp C & dvsn.mp3','4:51',0,0,0),(150,'Marvin\'s Room',42,'https://storage.googleapis.com/bucket-tester-2/1713649646465-Marvins Room [ ezmp3.cc ].mp3','5:47',0,0,0),(151,'Over My Dead Body',42,'https://storage.googleapis.com/bucket-tester-2/1713649901852-Over My Dead Body [ ezmp3.cc ].mp3','4:33',0,0,0),(152,'The Resistance',46,'https://storage.googleapis.com/bucket-tester-2/1713650921235-The Resistance [ ezmp3.cc ].mp3','3:45',0,0,0),(153,'Show Me A Good Time',46,'https://storage.googleapis.com/bucket-tester-2/1713651042129-Show Me A Good Time [ ezmp3.cc ].mp3','3:30',0,0,0),(155,'Up All Night',46,'https://storage.googleapis.com/bucket-tester-2/1713651192312-Up All Night [ ezmp3.cc ].mp3','3:54',0,0,0),(156,'Crew Love',42,'https://storage.googleapis.com/bucket-tester-2/1713651269405-Crew Love [ ezmp3.cc ].mp3','3:28',0,0,0),(157,'Homecoming',52,'https://storage.googleapis.com/bucket-tester-2/1713651419654-Homecoming [ ezmp3.cc ].mp3','3:23',0,0,0),(158,'Big Brother',52,'https://storage.googleapis.com/bucket-tester-2/1713651485397-Big Brother [ ezmp3.cc ].mp3','4:47',0,0,0),(159,'Flashing Lights',52,'https://storage.googleapis.com/bucket-tester-2/1713651541516-Flashing Lights [ ezmp3.cc ].mp3','3:57',0,0,0),(160,'All Falls Down',53,'https://storage.googleapis.com/bucket-tester-2/1713651701517-All Falls Down [ ezmp3.cc ].mp3','3:43',0,0,0),(161,'Spaceship',53,'https://storage.googleapis.com/bucket-tester-2/1713651760464-Spaceship [ ezmp3.cc ].mp3','5:24',0,0,0),(162,'Never Let Me Down',53,'https://storage.googleapis.com/bucket-tester-2/1713651837431-Never Let Me Down [ ezmp3.cc ].mp3','5:24',0,0,0),(163,'Dark Fantasy',54,'https://storage.googleapis.com/bucket-tester-2/1713651918413-Dark Fantasy [ ezmp3.cc ].mp3','1:02',0,0,0),(164,'Gorgeous',54,'https://storage.googleapis.com/bucket-tester-2/1713651982757-Gorgeous [ ezmp3.cc ].mp3','5:57',0,0,0),(165,'Runaway',54,'https://storage.googleapis.com/bucket-tester-2/1713652085543-Kanye West - Runaway [Full Version] [Explicit] [ ezmp3.cc ].mp3','9:07',0,0,0),(166,'La Difícil',57,'https://storage.googleapis.com/bucket-tester-2/1713652203528-LA DIFIÌCIL- BAD BUNNY ( AUDIO OFFICIAL) [ ezmp3.cc ].mp3','2:43',0,0,0),(167,'25/8',57,'https://storage.googleapis.com/bucket-tester-2/1713652288644-8 - Bad Bunny (Audio Oficial) _ YHLQMDLG [ ezmp3.cc ].mp3','4:03',0,0,0),(168,'Está Cabrón Ser Yo',57,'https://storage.googleapis.com/bucket-tester-2/1713652448750-EstaÌ CabroÌn Ser Yo - Bad Bunny x Anuel AA (Audio Oficial) _ YHLQMDLG [ ezmp3.cc ].mp3','3:47',0,0,0),(169,'Moscow Mule',58,'https://storage.googleapis.com/bucket-tester-2/1713654500896-Moscow Mule [ ezmp3.cc ].mp3','4:05',0,0,0),(170,'Ojitos Lindos',58,'https://storage.googleapis.com/bucket-tester-2/1713654586277-Ojitos Lindos [ ezmp3.cc ].mp3','4:18',0,0,0),(171,'Un Verano Sin Ti',58,'https://storage.googleapis.com/bucket-tester-2/1713654646449-Un Verano Sin Ti [ ezmp3.cc ].mp3','3:18',0,0,0),(172,'N.Y. State of Mind',55,'https://storage.googleapis.com/bucket-tester-2/1713654760882-Nas - N.Y. State of Mind (Official Audio) [ ezmp3.cc ].mp3','4:53',0,0,0),(173,'The World Is Yours',55,'https://storage.googleapis.com/bucket-tester-2/1713654817449-The World Is Yours [ ezmp3.cc ].mp3','4:50',0,0,0),(174,'Halftime',55,'https://storage.googleapis.com/bucket-tester-2/1713654939305-Halftime [ ezmp3.cc ].mp3','4:20',0,0,0),(175,'The Message',56,'https://storage.googleapis.com/bucket-tester-2/1713655408925-The Message [ ezmp3.cc ].mp3','3:54',0,0,0),(176,'Street Dreams',56,'https://storage.googleapis.com/bucket-tester-2/1713655534182-Nas - Street Dreams [HQ & CD Quality] [ ezmp3.cc ].mp3','4:39',0,0,0),(177,'Honeymoon Avenue',38,'https://storage.googleapis.com/bucket-tester-2/1713663701069-HONEYMOON AVENUE.mp3','5:40',0,0,0),(178,'Baby I',38,'https://storage.googleapis.com/bucket-tester-2/1713663733803-BABY I.mp3','3:17',0,0,0),(179,'Right There',38,'https://storage.googleapis.com/bucket-tester-2/1713663756757-RIGHT THERE.mp3','4:06',0,0,0),(180,'Tattooed Heart',38,'https://storage.googleapis.com/bucket-tester-2/1713663783638-TATTOOED HEART.mp3','3:15',0,0,0),(181,'Lovin\' It',38,'https://storage.googleapis.com/bucket-tester-2/1713663851590-LOVIN\' IT.mp3','3:01',0,0,0),(182,'Piano',38,'https://storage.googleapis.com/bucket-tester-2/1713663871677-PIANO.mp3','3:55',0,0,0),(183,'Daydreamin\'',38,'https://storage.googleapis.com/bucket-tester-2/1713663907566-DAYDREAMIN\'.mp3','3:32',0,0,0),(184,'The Way',38,'https://storage.googleapis.com/bucket-tester-2/1713663926945-THE WAY.mp3','3:45',0,0,0),(185,'Almost is Never Enough',38,'https://storage.googleapis.com/bucket-tester-2/1713664010056-ALMOST IS NEVER ENOUGH.mp3','5:28',0,0,0),(186,'Girls Need Love',60,'https://storage.googleapis.com/bucket-tester-2/1713667330818-Girls Need Love (Remix) [ ezmp3.cc ].mp3','3:42',0,0,0),(187,'CPR',60,'https://storage.googleapis.com/bucket-tester-2/1713667458548-Summer Walker - CPR (Last Day of Summer) [ ezmp3.cc ].mp3','3:23',0,0,0),(188,'Karma',60,'https://storage.googleapis.com/bucket-tester-2/1713667837932-Summer Walker - Karma (Official Audio) [ ezmp3.cc ].mp3','3:08',0,0,0),(190,'XS',63,'https://storage.googleapis.com/bucket-tester-2/1713668539291-Rina Sawayama - XS [ ezmp3.cc ].mp3','3:21',0,0,0),(191,'Comme Des Garçons (Like The Boys)',63,'https://storage.googleapis.com/bucket-tester-2/1713668610563-Comme Des GarcÌ§ons (Like The Boys) [ ezmp3.cc ].mp3','3:02',0,0,0),(192,'Bad Friend',63,'https://storage.googleapis.com/bucket-tester-2/1713668731193-Rina Sawayama - Bad Friend [ ezmp3.cc ].mp3','3:28',0,0,0),(193,'Snooze',35,'https://storage.googleapis.com/bucket-tester-2/1713669157105-SZA - Snooze (Audio) [ ezmp3.cc ].mp3','3:21',0,0,0),(194,'Kill Bill',35,'https://storage.googleapis.com/bucket-tester-2/1713669241209-SZA - Kill Bill (Audio) [ ezmp3.cc ].mp3','2:33',0,0,0),(195,'Good Days',35,'https://storage.googleapis.com/bucket-tester-2/1713669353470-SZA - Good Days (Audio) [ ezmp3.cc ].mp3','4:38',0,0,0),(196,'Love Galore',36,'https://storage.googleapis.com/bucket-tester-2/1713669567321-Love Galore [ ezmp3.cc ].mp3','4:35',0,0,0),(197,'The Weekend',36,'https://storage.googleapis.com/bucket-tester-2/1713669720721-SZA - The Weekend (Official Audio) [ ezmp3.cc ].mp3','4:32',0,0,0),(198,'Broken Clocks',36,'https://storage.googleapis.com/bucket-tester-2/1713669957199-SZA - Broken Clocks (Official Audio) [ ezmp3.cc ].mp3','3:51',0,0,0),(199,'Child\'s Play',37,'https://storage.googleapis.com/bucket-tester-2/1713670064249-SZA - Child\'s Play (ft. Chance The Rapper) [ ezmp3.cc ].mp3','3:36',0,0,0),(200,'Babylon',37,'https://storage.googleapis.com/bucket-tester-2/1713670163314-SZA - Babylon ft. Kendrick Lamar (Z) [ ezmp3.cc ].mp3','3:54',0,0,0),(201,'Sweet November',37,'https://storage.googleapis.com/bucket-tester-2/1713670275443-Sweet November [ ezmp3.cc ].mp3','4:03',0,0,0),(202,'Digital Bash',32,'https://storage.googleapis.com/bucket-tester-2/1713670561212-Digital Bath [ ezmp3.cc ].mp3','4:15',0,0,0),(203,'Change (In the House of Flies)',32,'https://storage.googleapis.com/bucket-tester-2/1713670942337-Change (In the House of Flies) [ ezmp3.cc ].mp3','4:59',0,0,0),(204,'Passenger',32,'https://storage.googleapis.com/bucket-tester-2/1713671016553-Passenger [ ezmp3.cc ].mp3','6:08',0,0,0),(205,'Be Quiet And Drive (Far Away)',33,'https://storage.googleapis.com/bucket-tester-2/1713671143636-Deftones - Be Quiet And Drive (Far Away) [ ezmp3.cc ].mp3','4:59',0,0,0),(206,'Macara',33,'https://storage.googleapis.com/bucket-tester-2/1713671195999-Mascara [ ezmp3.cc ].mp3','3:45',0,0,0),(208,'My Own Summer (Shove It)',33,'https://storage.googleapis.com/bucket-tester-2/1713671466276-Deftones - My Own Summer (Shove It) - HQ - Lyrics [ ezmp3.cc ] (1).mp3','3:34',0,0,0),(209,'Beauty School',34,'https://storage.googleapis.com/bucket-tester-2/1713671954225-deftones - Beauty School [ ezmp3.cc ].mp3','4:47',0,0,0),(210,'Risk',34,'https://storage.googleapis.com/bucket-tester-2/1713672023891-Deftones â  Risk (Official Visualizer) [ ezmp3.cc ].mp3','3:38',0,0,0),(211,'Royal',34,'https://storage.googleapis.com/bucket-tester-2/1713672169673-Deftones â Royal (Official Visualizer) [ ezmp3.cc ].mp3','3:32',0,0,0);
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `insert_admin_notification` AFTER UPDATE ON `song` FOR EACH ROW BEGIN
    DECLARE notification_count INT;
    SELECT COUNT(*) INTO notification_count FROM admin_notifications WHERE songID = NEW.songID;
    
    IF NEW.flag >= 5 AND notification_count = 0 THEN
        INSERT INTO admin_notifications (songID, cover, artistName, songTitle, artistID, albumID)
        SELECT s.songID, a.cover, ar.artistName, s.songTitle, ar.artistID, a.albumID
        FROM song AS s
        INNER JOIN album AS a ON s.albumID = a.albumID
        INNER JOIN artist AS ar ON a.artistID = ar.artistID
        WHERE s.songID = NEW.songID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `delete_song_like_trigger` AFTER DELETE ON `song` FOR EACH ROW BEGIN
    DELETE FROM song_like WHERE songID = OLD.songID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `delete_admin_notification` AFTER DELETE ON `song` FOR EACH ROW BEGIN
    DELETE FROM admin_notifications WHERE songID = OLD.songID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `song_like`
--

DROP TABLE IF EXISTS `song_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song_like` (
  `songID` int NOT NULL,
  `listenerID` int NOT NULL,
  `time_liked` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`songID`,`listenerID`),
  KEY `listenerID` (`listenerID`),
  CONSTRAINT `song_like_ibfk_1` FOREIGN KEY (`songID`) REFERENCES `song` (`songID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `song_like_ibfk_2` FOREIGN KEY (`songID`) REFERENCES `song` (`songID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_like`
--

LOCK TABLES `song_like` WRITE;
/*!40000 ALTER TABLE `song_like` DISABLE KEYS */;
INSERT INTO `song_like` VALUES (83,38,'2024-04-16 11:29:59'),(84,3,'2024-04-19 00:32:02'),(84,33,'2024-04-19 04:46:18'),(84,40,'2024-04-15 01:40:12'),(85,3,'2024-04-14 10:08:26'),(85,36,'2024-04-19 07:24:07'),(106,2,'2024-04-16 10:03:58'),(106,3,'2024-04-19 20:54:01'),(106,39,'2024-04-16 20:11:22'),(107,41,'2024-04-16 08:50:09'),(108,3,'2024-04-16 00:10:48'),(108,34,'2024-04-17 06:42:45');
/*!40000 ALTER TABLE `song_like` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `song_AFTER_INSERT` AFTER INSERT ON `song_like` FOR EACH ROW BEGIN
UPDATE song
    SET numLikes = (
        SELECT COUNT(*)
        FROM song_like
        WHERE song_like.songID = NEW.songID
    )
    WHERE song.songID = NEW.songID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `song_like_AFTER_DELETE` AFTER DELETE ON `song_like` FOR EACH ROW BEGIN
UPDATE song
    SET numLikes = (
        SELECT COUNT(*)
        FROM song_like
        WHERE song_like.songID = OLD.songID
    )
    WHERE song.songID = OLD.songID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'coogtunes'
--

--
-- Dumping routines for database 'coogtunes'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 23:37:12

-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smart_bus_pass
-- ------------------------------------------------------
-- Server version	8.0.42

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

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `admin_type` enum('SuperAdmin','Manager','Support') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `Username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'pmpml_superadmin','adminpass','SuperAdmin','2025-07-19 03:41:57',NULL),(2,'swargate_mgr','$2a$10$CytpbEZ.E8oJeRiA5NiZl.wIm/VXIV72QAqqdSvlipkyGHRt4nq.C','Manager','2025-07-19 03:41:57','virat@example.com'),(3,'pune_support','supportpass','Support','2025-07-19 03:41:57','pune@gmail.com'),(4,'admin','Pass@123','Support','2025-07-19 03:41:58','admin@gmail.com'),(5,'zoro','$2a$10$hWmY6aoKnsH2ooII3mZVnes33lXsqYRQ5zsLI6o28/k88l1L.Xmw6','Support','2025-07-19 03:41:58','zoro@gmail.com'),(6,'udit','Pass@123','Support','2025-08-07 10:18:14','udit@gmail.com'),(8,'Pratiksha ','$2a$10$7a0Ql3mS32rGfo31E0dsEOdrECxMLlwKac9rehXIvIyliLW1oZbrC','Support','2025-08-07 10:29:26','pratiksha@gmail.com'),(9,'Bindu','$2a$10$uL8q5/3.LHyh3AyOMd443.bk07bhNbgUBcrcr/jYm.WuifUJl9rAq','Support','2025-08-07 10:30:06','bindu@gmail.com'),(10,'Ankita','$2a$10$gqY7SbN4TjkdR5vJebKl4utbA6NYORuDtd8MQxIqHEz/4iN1zEzNa','Support','2025-08-07 10:45:38','ankita@gmail.com'),(13,'Udit Garg','$2a$10$FK.RdSo34at.riagGiG4nu2bYYb5CrT4Fn42/JbSVg4jXmBmfm2YG','Support','2025-08-07 13:18:20','uditgarg@gmail.com'),(14,'OmGavhane','$2a$10$O9XW0mQOWh6/.oSjzvEmUO91BKzCu5deE.jtG4tKjL9njJoGFMXXO','Support','2025-08-07 19:21:17','om123@gmail.com'),(15,'shm','$2a$10$1l7n1ohYvWAOBX.xu6oUPOiVD4oyqBzX42OqU/8U7s/wJ6NLMXOk6','Support','2025-08-07 19:23:14','shm@gmail.com'),(16,'omgahane','$2a$10$aiEXgg9FoyhJI/mWXZpuzO/yrb6SF4qCBclxewfAXf1ItjRNJU9Li','Support','2025-08-07 20:07:56','om@example.com'),(17,'omjiji','$2a$10$/8anWpAc5qnGYJL1myRWS.UoJvd/NjGqWCxI5XNHfYHcx4/.dwr1q','SuperAdmin','2025-08-07 20:10:09','om12@gmail.com'),(18,'om','$2a$10$yi.9pLWhsWFhCUIeHrSvtOTBB4sxAJTolcXzXZdlxnMBIIoWUYEr2','Support','2025-08-07 20:10:09','om1@gmail.com');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-08 13:46:56

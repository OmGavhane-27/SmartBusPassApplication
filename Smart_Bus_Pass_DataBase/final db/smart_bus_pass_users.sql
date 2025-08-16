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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `student_id` varchar(100) DEFAULT NULL,
  `aadhar_number` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Email` (`email`),
  UNIQUE KEY `PhoneNumber` (`phone_number`),
  UNIQUE KEY `phone_number` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Isha Patil','isha.p@example.com','pass123','9822011114','Female','2003-07-22','Aundh, Near Westend Mall, Pune, 411007',NULL,NULL),(6,'Ananya Pawar','ananya.p@example.com','pass123','9822011116','Female','1999-04-10','Hadapsar, Magarpatta City, Pune, 411028',NULL,NULL),(9,'Rohit Sharma','rs45@example.com','pass123','4545451818','Male','1988-04-30','101 Kothrud Depot, Pune, 411038',NULL,NULL),(14,'virat kohli','vk@example.com','pass123','9822011155','Male','1988-11-05','mumbai',NULL,NULL),(15,'Pratiksha Patil','pp.p@example.com','pass123','9822011184','Female','2003-04-28','Aundh, Near Westend Mall, Pune, 411007','250240120128',NULL),(24,'Vegita','prince@gmail.com','$2a$10$s0eqjkn3i6wkke5XKvsbmeUghjcbxH4AT4qVXmigEmNQE.nZ1s/WC','7418529630','Male','2025-08-01','japannnnnn',NULL,'987654321000'),(25,'Luffy','luffy@gmail.com','$2a$10$DXlvpbNiwOsYHRTvRjcK.OYBPEWGV9908IFz.5QeP/xt6Wb7gSz4K','3434343434','Male','2025-08-01','haihhghhihhhdhiah',NULL,'098765432112'),(29,'nami','nami@gmail.com','$2a$10$jHOmOUCMr/ii7t.QpoljhOoq7QlfrKvz8a89vFgTXIrXBafpWYSmK','7412589630','Female','2025-07-24','aundh',NULL,'014785236989'),(30,'robin','robin@gmail.com','$2a$10$FC7AP60mH8JFcBBl/.n/1eEbCeuTi2tjj/5BWjxIZn3HNboY8o./e','9632587410','Female','2025-07-16','mumbai',NULL,'258963014789'),(31,'pratik','pratik@gmail.com','$2a$10$8fMn5W57e97H6.oDAqcOGeMUy1D3aHUa1/t7uBfEVVO1ToyYR0J76','4545454545','Male','2025-08-02','nighdi',NULL,'654321987012'),(32,'deep','deep@gmail.com','$2a$10$TLirggpEhUxjuV/4iaw4EeisMM9Zw6vSY2xO.YrhHZ5SVukz7VBay','7895632410','Male','2025-07-11','pune',NULL,'223311665544'),(33,'hemant','hemant@gmail.com','$2a$10$hKFHMj0C.POXkLyIR0ocJOirQjluG36cTpRGs4Gdh7kUw9jU2HBq.','8989898989','Male','2025-06-20','washim',NULL,'747474747474'),(34,'ankita','akka@gmail.com','$2a$10$uQYY6KXy/wnR2NV8MlgAtulQjrDtnHk0e5Tcjek0wfnSzqO6uJeyq','7845129630','Female','2025-07-14','wakad',NULL,'232356568989'),(35,'ashwini','ash@gmail.com','$2a$10$EG8xuUN7VbDwp2pTfzMPreYqO5xMpMIxRRVfa1vqBMvbEBlVN6t0a','7845129631','Female','2001-04-19','wardha',NULL,'123654985674'),(36,'om','om1@gmail.com','$2a$10$yi.9pLWhsWFhCUIeHrSvtOTBB4sxAJTolcXzXZdlxnMBIIoWUYEr2','74992 30844','Male','2001-12-27','pulgao',NULL,'784563219587'),(37,'satyam','satyam@gmail.com','$2a$10$BUREjLoO9xzLH//6LGGP.uju7x/SgcW9gegO3r/taxOPd0b2hiok2','7499230841','Male','2025-02-23','mohali',NULL,'789456123578'),(38,'udit','udit@gmail.com','$2a$10$cekUNEp1/UKw5G2AnvNqxeBBLMq4mxZ2glluw6DxEcP/jL6MBz/zi','7845123658','Male','2025-05-14','haryana',NULL,'784563219545'),(39,'bindu','bindu@gmail.com','$2a$10$McQ6eSr/.An7DF1kag/U2.aFHm7GIgjCWiwWMO7LPgDsGtlkJI5Vm','7412536897','Female','2025-02-06','benguluru',NULL,'789456123423'),(41,'Rutukesh','rutukesh@gmail.com','$2a$10$4KZaXTSRxZ8q7Hd6W6zxT.Abg/bgpP0oFIBX8LOrcOe0helIX19vG','7584236914','Male','2024-08-15','Pune','',NULL),(42,'thor','thor@gmail.com','$2a$10$PTgtsdcQ74QEsGGAHTmt.OnOd4EQnw21zUKMwEIAUSZlCsppAqklO','7878787878','Male','2025-08-01','hohoho',NULL,'748596142536'),(43,'Ankita','ankita@gmail.com','$2a$10$SUXzOtkPURz6ZQhL7iK46.pu.tyBok5n3AdyxZmZ6yZyGMQ.C2Cm6','9765682011','Female','2025-08-01','\nWakad','250240120019','728501135564'),(44,'dj','dj@gmail.com','$2a$10$Q3N.0K/I9HPRltXiVXzq2.EiSGHv7h/IkWtGjm7lpwiKO5mpUlgpO','7458961234','Male','2025-07-16','Pune',NULL,'748512354196'),(46,'Udit aggarwal','udit123@gmail.com','$2a$10$fmuHlqnfO7hYGzdfUik2eO0OKTQ2o8oqUTJ4NH5i925M/GoNancJW','1233567890','Male','2025-08-07','Bengaluru, Karnataka,560063',NULL,'6969-6969-6969'),(47,'John Doe','john@example.com','$2a$10$qJDTwme5RhaoN2pGpvxbEOz.GrtOYQyJ3vdoO/truIYm2wpF9.UJu','9876543210','Male','1995-08-07','123 Main Street, City, State',NULL,'1234-5678-9012'),(49,'Reddy Himabindu','himabindu.crc@gmail.com','$2a$10$8zNrx1NHIYRZu5noShLgdOTm2FZRs8YkmQOZ0lvfgH5JewT0HSdqG','9996050653','Female','2025-07-27','173/3, 6th main vinayaka nagar opposite big market bagalur cross',NULL,'1234-1234-1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-08 13:46:57

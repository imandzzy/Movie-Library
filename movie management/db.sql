-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movie-library
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Action'),(2,'Adventure'),(5,'Animation'),(4,'Comedy'),(12,'Crime'),(3,'Drama'),(13,'Family'),(6,'Fantasy'),(8,'Horror'),(11,'Mystery'),(9,'Romance'),(7,'Sci-fi'),(10,'Thriller');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(120) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `release_year` int DEFAULT NULL,
  `poster` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `duration` int NOT NULL,
  `trailer` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `rating` decimal(4,2) DEFAULT NULL,
  `imdb` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`movie_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (77,'John Wick','An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him',2014,'https://static.cinemagia.ro/img/resize/db/movie/59/18/35/john-wick-615155l-1600x1200-n-ab92d6e1.jpg',101,'https://www.youtube.com/embed/2AUmvWm5ZDQ',7.40,'tt2911666'),(78,'Avengers: Endgame','After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',2019,'https://static.cinemagia.ro/img/resize/db/movie/59/20/39/avengers-endgame-260505l-1600x1200-n-4500b908.jpg',181,'https://youtube.com/embed/TcMBFSGVi1c',8.40,'tt4154796'),(97,'Transformers: The Last Knight','A deadly threat from Earth\'s history reappears and a hunt for a lost artifact takes place between Autobots and Decepticons, while Optimus Prime encounters his creator in space.',2017,'https://static.cinemagia.ro/img/resize/db/movie/59/12/54/transformers-the-last-knight-410334l-1600x1200-n-b298b6b9.jpg',154,'https://youtube.com/embed/AntcyqJ6brc',5.30,'tt3371366'),(144,'The Hobbit: The Battle of the Five Armies','Bilbo and company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.',2014,'https://static.cinemagia.ro/img/resize/db/movie/57/87/19/the-hobbit-the-battle-of-the-five-armies-591158l-1600x1200-n-e6fbb4e8.jpg',144,'https://youtube.com/embed/iVAgTiBrrDA',7.40,'tt2310332'),(145,'Morbius','Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.',2022,'https://m.media-amazon.com/images/M/MV5BYjlhNTA3Y2ItYjhiYi00NTBiLTg5MDMtZDJjMDZjNzVjNjJmXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg',104,'https://youtube.com/embed/oZ6iiRrz1SY',5.20,'tt5108870'),(146,'Despicable Me 3','Gru meets his long-lost, charming, cheerful, and more successful twin brother Dru, who wants to team up with him for one last criminal heist.',2017,'https://static.cinemagia.ro/img/db/movie/59/10/37/despicable-me-3-542691l.jpg?ts=1495705576',89,'https://youtube.com/embed/6DBi41reeF0',6.20,'tt3469046'),(147,'Doctor Strange in the Multiverse of Madness','Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff.',2022,'https://m.media-amazon.com/images/M/MV5BNWM0ZGJlMzMtZmYwMi00NzI3LTgzMzMtNjMzNjliNDRmZmFlXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_QL75_UX380_CR0,0,380,562_.jpg',126,'https://www.youtube.com/embed/aWzlQ2N6qqg',8.40,'tt9419884'),(148,'Fantastic Beasts: The Secrets of Dumbledore','Albus Dumbledore assigns Newt and his allies with a mission related to the rising power of Grindelwald.',2022,'https://static.cinemagia.ro/img/resize/db/movie/12/13/847/fantastic-beasts-the-secrets-of-dumbledore-522204l-1600x1200-n-b9da56ec.jpg',142,'https://www.youtube.com/embed/Y9dr2zw-TXQ',6.50,'tt4123432');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_genre`
--

DROP TABLE IF EXISTS `movie_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_genre` (
  `movie_id` int DEFAULT NULL,
  `genre_id` int DEFAULT NULL,
  KEY `fk1_idx` (`genre_id`),
  KEY `fk2_idx` (`movie_id`),
  CONSTRAINT `fk1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`movie_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_genre`
--

LOCK TABLES `movie_genre` WRITE;
/*!40000 ALTER TABLE `movie_genre` DISABLE KEYS */;
INSERT INTO `movie_genre` VALUES (146,2),(146,4),(146,5),(144,3),(144,7),(144,8),(97,1),(97,2),(97,3),(78,1),(78,2),(78,3),(77,1),(77,10),(77,12),(145,1),(145,2),(145,8),(147,1),(147,2),(147,6),(148,2),(148,6),(148,13);
/*!40000 ALTER TABLE `movie_genre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-29 18:20:37

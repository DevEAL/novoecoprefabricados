-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: rxpjfcmy_novo
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `nv_contact`
--

DROP TABLE IF EXISTS `nv_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nv_contact` (
  `idnv_contact` int(11) NOT NULL AUTO_INCREMENT,
  `nv_name` varchar(45) DEFAULT NULL,
  `nv_email` varchar(45) DEFAULT NULL,
  `nv_phone` varchar(15) DEFAULT NULL,
  `nv_company` varchar(25) DEFAULT NULL,
  `nv_position` varchar(20) DEFAULT NULL,
  `nv_message` text,
  PRIMARY KEY (`idnv_contact`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nv_contact`
--

LOCK TABLES `nv_contact` WRITE;
/*!40000 ALTER TABLE `nv_contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `nv_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nv_cotizar`
--

DROP TABLE IF EXISTS `nv_cotizar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nv_cotizar` (
  `idnv_cotizar` int(11) NOT NULL AUTO_INCREMENT,
  `nv_name` varchar(45) DEFAULT NULL,
  `nv_color` varchar(45) DEFAULT 'default',
  `nv_cantidad` varchar(10) DEFAULT NULL,
  `nv_idProducto` int(4) DEFAULT NULL,
  `nv_idRegistro` int(11) NOT NULL,
  PRIMARY KEY (`idnv_cotizar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nv_cotizar`
--

LOCK TABLES `nv_cotizar` WRITE;
/*!40000 ALTER TABLE `nv_cotizar` DISABLE KEYS */;
/*!40000 ALTER TABLE `nv_cotizar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nv_parameters`
--

DROP TABLE IF EXISTS `nv_parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nv_parameters` (
  `idnv_Parameters` int(11) NOT NULL AUTO_INCREMENT,
  `nv_name` varchar(45) DEFAULT NULL,
  `nv_status` int(11) DEFAULT NULL,
  `nv_value` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idnv_Parameters`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nv_parameters`
--

LOCK TABLES `nv_parameters` WRITE;
/*!40000 ALTER TABLE `nv_parameters` DISABLE KEYS */;
INSERT INTO `nv_parameters` VALUES (1,'Email_contacto',1,'backend@enalgunlugarestudio.com');
/*!40000 ALTER TABLE `nv_parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nv_registro`
--

DROP TABLE IF EXISTS `nv_registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nv_registro` (
  `nv_idRegistro` int(11) NOT NULL AUTO_INCREMENT,
  `nv_CantidadProductos` varchar(45) NOT NULL,
  `nv_fechaRegistro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nv_name` varchar(45) DEFAULT NULL,
  `nv_email` varchar(45) DEFAULT NULL,
  `nv_phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nv_idRegistro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nv_registro`
--

LOCK TABLES `nv_registro` WRITE;
/*!40000 ALTER TABLE `nv_registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `nv_registro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-30 15:19:15

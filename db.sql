-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

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
-- Table structure for table `attribute_values`
--

DROP TABLE IF EXISTS `attribute_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `attribute_id` int DEFAULT NULL,
  `display_value` varchar(45) DEFAULT NULL,
  `value` varchar(45) DEFAULT NULL,
  `attribute_value_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_values`
--

LOCK TABLES `attribute_values` WRITE;
/*!40000 ALTER TABLE `attribute_values` DISABLE KEYS */;
INSERT INTO `attribute_values` VALUES (1,1,'256GB','256GB','256GB'),(2,1,'512GB','512GB','512GB'),(3,2,'Yes','Yes','Yes'),(4,2,'No','No','No'),(5,3,'Yes','Yes','Yes'),(6,3,'No','No','No'),(7,4,'512G','512G','512G'),(8,4,'1T','1T','1T'),(9,5,'Green','#44FF03','Green'),(10,5,'Cyan','#03FFF7','Cyan'),(11,5,'Blue','#030BFF','Blue'),(12,5,'Black','#000000','Black'),(13,5,'White','#FFFFFF','White'),(14,6,'40','40','40'),(15,6,'41','41','41'),(16,6,'42','42','42'),(17,6,'43','43','43'),(18,7,'Small','S','Small'),(19,7,'Medium','M','Medium'),(20,7,'Large','L','Large'),(21,7,'Extra Large','XL','Extra Large'),(22,8,'Green','#44FF03','Green'),(23,8,'Cyan','#03FFF7','Cyan'),(24,8,'Blue','#030BFF','Blue'),(25,8,'Black','#000000','Black'),(26,8,'White','#FFFFFF','White'),(27,9,'512G','512G','512G'),(28,9,'1T','1T','1T'),(29,10,'Green','#44FF03','Green'),(30,10,'Cyan','#03FFF7','Cyan'),(31,10,'Blue','#030BFF','Blue'),(32,10,'Black','#000000','Black'),(33,10,'White','#FFFFFF','White'),(34,11,'512G','512G','512G'),(35,11,'1T','1T','1T');
/*!40000 ALTER TABLE `attribute_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attributes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(45) DEFAULT NULL,
  `attribute_type` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `types` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES (1,'apple-imac-2021','Capacity','Capacity','text'),(2,'apple-imac-2021','With USB 3 ports','With USB 3 ports','text'),(3,'apple-imac-2021','Touch ID in keyboard','Touch ID in keyboard','text'),(4,'apple-iphone-12-pro','Capacity','Capacity','text'),(5,'apple-iphone-12-pro','Color','Color','swatch'),(6,'huarache-x-stussy-le','Size','Size','text'),(7,'jacket-canada-goosee','Size','Size','text'),(8,'ps-5','Color','Color','swatch'),(9,'ps-5','Capacity','Capacity','text'),(10,'xbox-series-s','Color','Color','swatch'),(11,'xbox-series-s','Capacity','Category','text');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `__typename` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'all','Category'),(2,'clothes','Category'),(3,'tech','Category');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `currency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(3) DEFAULT NULL,
  `symbol` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES (1,'USD','$');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(45) DEFAULT NULL,
  `link` text,
  PRIMARY KEY (`id`),
  KEY `fk_gallery_products_idx` (`product_id`),
  CONSTRAINT `fk_gallery_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (1,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'),(2,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087'),(3,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087'),(4,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087'),(5,'huarache-x-stussy-le','https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087'),(6,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg'),(7,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg'),(8,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg'),(9,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg'),(10,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg'),(11,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png'),(12,'jacket-canada-goosee','https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png'),(13,'ps-5','https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg'),(14,'ps-5','https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg'),(15,'ps-5','https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg'),(16,'ps-5','https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg'),(17,'ps-5','https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg'),(18,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg'),(19,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg'),(20,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg'),(21,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg'),(22,'xbox-series-s','https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg'),(23,'apple-imac-2021','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000'),(24,'apple-iphone-12-pro','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000'),(25,'apple-airpods-pro','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000'),(26,'apple-airtag','https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_list`
--

DROP TABLE IF EXISTS `order_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_list`
--

LOCK TABLES `order_list` WRITE;
/*!40000 ALTER TABLE `order_list` DISABLE KEYS */;
INSERT INTO `order_list` VALUES (1,'2025-06-10 13:03:22'),(2,'2025-06-10 14:57:23'),(3,'2025-06-10 14:59:06'),(4,'2025-06-10 14:59:48'),(5,'2025-06-10 15:00:54'),(6,'2025-06-10 15:03:15'),(7,'2025-06-10 15:03:27'),(8,'2025-06-10 15:04:04'),(9,'2025-06-10 15:10:12'),(10,'2025-06-10 15:11:51'),(11,'2025-06-10 15:12:20'),(12,'2025-06-10 15:13:20'),(13,'2025-06-10 15:13:56'),(14,'2025-06-10 15:14:39'),(15,'2025-06-10 15:31:16'),(16,'2025-06-10 15:31:17'),(17,'2025-06-10 15:31:57'),(18,'2025-06-10 15:32:40'),(19,'2025-06-10 15:32:58'),(20,'2025-06-10 15:37:50'),(21,'2025-06-10 15:45:14'),(22,'2025-06-10 15:45:49'),(23,'2025-06-10 15:49:42'),(24,'2025-06-10 15:53:01'),(25,'2025-06-10 15:53:13');
/*!40000 ALTER TABLE `order_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_list_items`
--

DROP TABLE IF EXISTS `order_list_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_list_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_list_id` int NOT NULL,
  `product_id` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  `selected_category_name` varchar(45) NOT NULL,
  `selected_category_value` varchar(45) NOT NULL,
  `cart_item_id` varchar(45) NOT NULL COMMENT 'For grouping items as there will be duplicate product_id to store different selected attributes, but they are basically one item',
  PRIMARY KEY (`id`),
  KEY `fk_order_list_items_order_list_idx` (`order_list_id`),
  KEY `fk_order_list_items_1_products_idx` (`product_id`),
  CONSTRAINT `fk_order_list_items_1_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_order_list_items_order_list` FOREIGN KEY (`order_list_id`) REFERENCES `order_list` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_list_items`
--

LOCK TABLES `order_list_items` WRITE;
/*!40000 ALTER TABLE `order_list_items` DISABLE KEYS */;
INSERT INTO `order_list_items` VALUES (41,14,'huarache-x-stussy-le',1,'Size','40','0'),(42,18,'apple-airtag',1,' ',' ','0'),(43,19,'apple-imac-2021',1,'Capacity','256GB','0'),(44,19,'apple-imac-2021',1,'With USB 3 ports','Yes','0'),(45,19,'apple-imac-2021',1,'Touch ID in keyboard','Yes','0'),(46,20,'apple-imac-2021',4,'Capacity','256GB','0'),(47,20,'apple-imac-2021',4,'With USB 3 ports','Yes','0'),(48,20,'apple-imac-2021',4,'Touch ID in keyboard','Yes','0'),(49,20,'apple-airtag',1,' ',' ','1'),(50,20,'apple-imac-2021',1,'Capacity','512GB','2'),(51,20,'apple-imac-2021',1,'With USB 3 ports','No','2'),(52,20,'apple-imac-2021',1,'Touch ID in keyboard','Yes','2'),(53,21,'huarache-x-stussy-le',1,'Size','40','0'),(54,21,'apple-airtag',1,' ',' ','1'),(55,22,'huarache-x-stussy-le',1,'Size','40','0'),(56,22,'apple-airtag',1,' ',' ','1'),(57,23,'huarache-x-stussy-le',1,'Size','40','0'),(58,23,'apple-airtag',1,' ',' ','1'),(59,24,'huarache-x-stussy-le',1,'Size','40','0'),(60,24,'apple-airtag',1,' ',' ','1'),(61,25,'huarache-x-stussy-le',1,'Size','40','0'),(62,25,'apple-airtag',1,' ',' ','1');
/*!40000 ALTER TABLE `order_list_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `inStock` tinyint(1) DEFAULT NULL,
  `description` text,
  `category` varchar(45) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `currency_id` int DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_currency_idx` (`currency_id`),
  CONSTRAINT `fk_products_currency` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('apple-airpods-pro','AirPods Pro',0,'\\n<h3>Magic like you’ve never heard</h3>\\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.\\n\\n<h3>Active Noise Cancellation</h3>\\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.\\n\\n<h3>Transparency mode</h3>\\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>\\n\\n<h3>All-new design</h3>\\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\\n\\n<h3>Amazing audio quality</h3>\\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\\n\\n<h3>Even more magical</h3>\\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>\\n','tech',300.23,1,'Apple'),('apple-airtag','AirTag',1,'\\n<h1>Lose your knack for losing things.</h1>\\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\\n','tech',120.57,1,'Apple'),('apple-imac-2021','iMac 2021',1,'The new iMac!','tech',1688.03,1,'Apple'),('apple-iphone-12-pro','iPhone 12 Pro',1,'This is iPhone 12. Nothing else to say.','tech',1000.76,1,'Apple'),('huarache-x-stussy-le','Nike Air Huarache Le',1,'<p>Great sneakers for everyday use!</p>','clothes',144.69,1,'Nike x Stussy'),('jacket-canada-goosee','Jacket',1,'<p>Awesome winter jacket</p>','clothes',518.47,1,'Canada Goose'),('ps-5','PlayStation 5',1,'<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>','tech',844.02,1,'Sony'),('xbox-series-s','Xbox Series S 512GB',0,'\\n<div>\\n    <ul>\\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>\\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\\n        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>\\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>\\n    </ul>\\n</div>','tech',333.99,1,'Microsoft');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-11 17:50:54

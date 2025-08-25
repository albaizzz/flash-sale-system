-- flash_sale.flash_sales definition

CREATE TABLE `flash_sales` (
  `flash_sale_id` int NOT NULL AUTO_INCREMENT,
  `status_flash_sale` tinyint DEFAULT '0',
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`flash_sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- flash_sale.products definition

CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_code` varchar(50) NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `gallery` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_code` (`product_code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- flash_sale.users definition

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- flash_sale.orders definition

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `flash_sale_id` int DEFAULT NULL,
  `order_status` varchar(50) DEFAULT 'pending',
  `total_price` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `fk_orders_users` (`user_id`),
  KEY `fk_orders_flashsales` (`flash_sale_id`),
  CONSTRAINT `fk_orders_flashsales` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`flash_sale_id`) ON DELETE SET NULL,
  CONSTRAINT `fk_orders_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- flash_sale.skus definition

CREATE TABLE `skus` (
  `sku_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `sku_code` varchar(50) NOT NULL,
  `stock` int DEFAULT '0',
  `price` decimal(12,2) DEFAULT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `dimension` varchar(100) DEFAULT NULL,
  `status` tinyint DEFAULT '1',
  `name_sku` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sku_id`),
  UNIQUE KEY `sku_code` (`sku_code`),
  KEY `fk_skus_products` (`product_id`),
  CONSTRAINT `fk_skus_products` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- flash_sale.flash_sale_skus definition

CREATE TABLE `flash_sale_skus` (
  `flash_sale_sku_id` int NOT NULL AUTO_INCREMENT,
  `flash_sale_id` int NOT NULL,
  `sku_id` int NOT NULL,
  `product_id` int NOT NULL,
  `price_flash_sale` decimal(12,2) DEFAULT NULL,
  `stock_flash_sale` int DEFAULT '0',
  `max_per_user` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`flash_sale_sku_id`),
  KEY `fk_flashsale_stocks_flashsales` (`flash_sale_id`),
  KEY `fk_flashsale_stocks_skus` (`sku_id`),
  CONSTRAINT `fk_flashsale_stocks_flashsales` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`flash_sale_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_flashsale_stocks_skus` FOREIGN KEY (`sku_id`) REFERENCES `skus` (`sku_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- flash_sale.order_items definition

CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `sku_id` int NOT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `subtotal` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_item_id`),
  KEY `fk_orderitems_orders` (`order_id`),
  KEY `fk_orderitems_skus` (`sku_id`),
  CONSTRAINT `fk_orderitems_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_orderitems_skus` FOREIGN KEY (`sku_id`) REFERENCES `skus` (`sku_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO flash_sale.flash_sale_skus
(flash_sale_sku_id, flash_sale_id, sku_id, product_id, price_flash_sale, stock_flash_sale, max_per_user, created_at, updated_at)
VALUES(0, 0, 0, 0, 0, 0, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO flash_sale.flash_sales
(flash_sale_id, status_flash_sale, start_time, end_time, created_at, updated_at)
VALUES(0, 0, '', '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO flash_sale.order_items
(order_item_id, order_id, sku_id, price, quantity, subtotal, created_at, updated_at)
VALUES(0, 0, 0, 0, 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO flash_sale.orders
(order_id, user_id, flash_sale_id, order_status, total_price, created_at, updated_at)
VALUES(0, 0, 0, 'pending', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO flash_sale.products
(product_id, product_code, product_name, description, image_url, gallery, created_at, updated_at)
VALUES(0, '', '', '', '', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO flash_sale.skus
(sku_id, product_id, sku_code, stock, price, weight, dimension, status, name_sku, created_at, updated_at)
VALUES(0, 0, '', 0, 0, 0, '', 1, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO flash_sale.users
(user_id, username, Password, created_at)
VALUES(0, '', '', CURRENT_TIMESTAMP);

INSERT INTO flash_sale.products
(product_id, product_code, product_name, description, image_url, gallery, created_at, updated_at)
VALUES(0, '', '', '', '', ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO flash_sale.skus
(sku_id, product_id, sku_code, stock, price, weight, dimension, status, name_sku, created_at, updated_at)
VALUES(0, 0, '', 0, 0, 0, '', 1, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
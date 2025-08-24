-- =====================================
-- USERS
-- =====================================
INSERT INTO users (username, role) VALUES
('albai', 'customer'),
('asya', 'customer'),
('admin', 'admin');

-- =====================================
-- PRODUCTS
-- =====================================
INSERT INTO products (product_code, name_product, description, image_url, gallery) VALUES
('P001', 'iPhone 15 Pro', 'Smartphone terbaru dengan chip A17', 'https://example.com/iphone15.jpg', JSON_ARRAY('https://example.com/iphone15-1.jpg', 'https://example.com/iphone15-2.jpg')),
('P002', 'MacBook Pro M3', 'Laptop untuk profesional dengan Apple M3 chip', 'https://example.com/macbook.jpg', JSON_ARRAY('https://example.com/macbook-1.jpg')),
('P003', 'Sony WH-1000XM5', 'Headphone noise cancelling terbaik', 'https://example.com/sony.jpg', JSON_ARRAY('https://example.com/sony-1.jpg', 'https://example.com/sony-2.jpg'));

-- =====================================
-- SKUS
-- =====================================
INSERT INTO skus (product_id, sku_code, stock, price, weight, dimension, status, name_sku) VALUES
(1, 'SKU-IP15-BLK-128', 100, 19999.99, 200, '146x70x7mm', 1, 'iPhone 15 Pro 128GB Black'),
(1, 'SKU-IP15-WHT-256', 50, 22999.99, 200, '146x70x7mm', 1, 'iPhone 15 Pro 256GB White'),
(2, 'SKU-MBP-M3-16', 20, 34999.99, 1500, '312x221x15mm', 1, 'MacBook Pro 14 M3 16GB RAM'),
(3, 'SKU-SONY-BLK', 200, 5999.99, 300, '200x180x80mm', 1, 'Sony WH-1000XM5 Black');

-- =====================================
-- FLASH SALES
-- =====================================
INSERT INTO flash_sales (status_flash_sale, start_time, end_time) VALUES
(1, '2025-08-23 10:00:00', '2025-08-23 12:00:00'),
(0, '2025-08-25 10:00:00', '2025-08-25 12:00:00');

-- =====================================
-- FLASH SALE STOCKS
-- =====================================
INSERT INTO flash_sale_skus (flash_sale_id, sku_id, product_id, price_flash_sale, stock_flash_sale, max_per_user) VALUES
(1, 1, 1, 17999.99, 10,1), -- iPhone 15 Pro 128GB Black
(1, 4, 3, 4999.99, 20,1);  -- Sony Headphone

-- =====================================
-- ORDERS
-- =====================================
INSERT INTO orders (user_id, flash_sale_id, order_status, total_price) VALUES
(1, 1, 'paid', 17999.99),
(2, NULL, 'pending', 5999.99);

-- =====================================
-- ORDER ITEMS
-- =====================================
INSERT INTO order_items (order_id, sku_id, price, quantity, subtotal) VALUES
(1, 1, 17999.99, 1, 17999.99), -- Albai beli iPhone via flash sale
(2, 4, 5999.99, 1, 5999.99);  -- Asya beli headphone normal price

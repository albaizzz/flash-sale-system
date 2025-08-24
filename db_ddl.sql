-- =====================================
-- USERS
-- =====================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================
-- PRODUCTS
-- =====================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) NOT NULL UNIQUE,
    name_product VARCHAR(255),
    description TEXT,
    image_url VARCHAR(255),
    gallery JSON, -- bisa juga VARCHAR kalau MySQL < 5.7
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================
-- SKUS
-- =====================================
CREATE TABLE skus (
    sku_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    sku_code VARCHAR(50) NOT NULL UNIQUE,
    stock INT DEFAULT 0,
    price DECIMAL(12,2),
    weight DECIMAL(10,2),
    dimension VARCHAR(100),
    status TINYINT DEFAULT 1,
    name_sku VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_skus_products FOREIGN KEY (product_id) 
        REFERENCES products(product_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================
-- FLASH SALES
-- =====================================
CREATE TABLE flash_sales (
    flash_sale_id INT AUTO_INCREMENT PRIMARY KEY,
    status_flash_sale TINYINT DEFAULT 0, -- 0=draft,1=active,2=ended
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================
-- FLASH SALE STOCKS
-- (tanpa product_id, karena sudah bisa via sku -> product)
-- =====================================
CREATE TABLE flash_sale_skus (
    flash_sale_sku_id INT AUTO_INCREMENT PRIMARY KEY,
    flash_sale_id INT NOT NULL,
    sku_id INT NOT NULL,
    product_id INT NOT NULL,
    price_flash_sale DECIMAL(12,2),
    stock_flash_sale INT DEFAULT 0,
    max_per_user INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_flashsale_stocks_flashsales FOREIGN KEY (flash_sale_id) 
        REFERENCES flash_sales(flash_sale_id) ON DELETE CASCADE,
    CONSTRAINT fk_flashsale_stocks_skus FOREIGN KEY (sku_id) 
        REFERENCES skus(sku_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================
-- ORDERS
-- =====================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    flash_sale_id INT NULL,
    order_status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_users FOREIGN KEY (user_id) 
        REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_orders_flashsales FOREIGN KEY (flash_sale_id) 
        REFERENCES flash_sales(flash_sale_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================================
-- ORDER ITEMS
-- (tanpa product_id, karena sudah bisa via sku -> product)
-- =====================================
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    sku_id INT NOT NULL,
    price DECIMAL(12,2), -- harga saat order
    quantity INT DEFAULT 1,
    subtotal DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orderitems_orders FOREIGN KEY (order_id) 
        REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_orderitems_skus FOREIGN KEY (sku_id) 
        REFERENCES skus(sku_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

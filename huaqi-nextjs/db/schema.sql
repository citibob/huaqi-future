-- Products (Gem Packs)
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name_jp TEXT NOT NULL,
    name_cn TEXT NOT NULL,
    name_en TEXT NOT NULL,
    vol TEXT NOT NULL,
    code TEXT NOT NULL,
    price_jpy INTEGER NOT NULL,
    is_sealed BOOLEAN DEFAULT 1,
    is_hot BOOLEAN DEFAULT 0,
    image_url TEXT,
    description_jp TEXT,
    description_cn TEXT,
    stock_count INTEGER DEFAULT 0
);

-- Inquiries (B2B)
CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    category TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orders (B2C)
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    stripe_session_id TEXT,
    amount_jpy INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, paid, shipped, cancelled
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price_jpy INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

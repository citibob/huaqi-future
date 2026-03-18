-- huaqi.jp B2B/B2C Platform Database Schema
-- Created: 2026-03-17

-- Users table
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    user_type TEXT NOT NULL DEFAULT 'customer' CHECK(user_type IN ('customer', 'business', 'admin')),
    company_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'suspended')),
    email_verified INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- User addresses table
CREATE TABLE addresses (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    prefecture TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'JP',
    is_default INTEGER DEFAULT 0,
    address_type TEXT NOT NULL DEFAULT 'shipping' CHECK(address_type IN ('shipping', 'billing')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Categories table
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name_jp TEXT NOT NULL,
    name_cn TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description_jp TEXT,
    description_cn TEXT,
    image_url TEXT,
    parent_id TEXT,
    sort_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active', 'hidden')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Products table
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    sku TEXT UNIQUE NOT NULL,
    title_jp TEXT NOT NULL,
    title_cn TEXT NOT NULL,
    description_jp TEXT,
    description_cn TEXT,
    price_jpy INTEGER NOT NULL,
    price_cny INTEGER,
    cost_jpy INTEGER,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    reserved_quantity INTEGER NOT NULL DEFAULT 0,
    images TEXT NOT NULL DEFAULT '[]',
    category_id TEXT,
    attributes TEXT DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'active', 'out_of_stock', 'discontinued')),
    weight_grams INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Product search index (FTS5)
CREATE VIRTUAL TABLE products_fts USING fts5(
    title_jp, title_cn, description_jp, description_cn, sku,
    content='products',
    content_rowid='rowid'
);

-- Orders table
CREATE TABLE orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    subtotal_jpy INTEGER NOT NULL,
    subtotal_cny INTEGER NOT NULL,
    shipping_jpy INTEGER NOT NULL DEFAULT 0,
    shipping_cny INTEGER NOT NULL DEFAULT 0,
    discount_jpy INTEGER NOT NULL DEFAULT 0,
    discount_cny INTEGER NOT NULL DEFAULT 0,
    total_jpy INTEGER NOT NULL,
    total_cny INTEGER NOT NULL,
    shipping_address_id TEXT,
    billing_address_id TEXT,
    shipping_method TEXT DEFAULT 'standard' CHECK(shipping_method IN ('standard', 'express', 'free')),
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending' CHECK(payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_id TEXT,
    notes TEXT,
    shipped_at TEXT,
    delivered_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shipping_address_id) REFERENCES addresses(id),
    FOREIGN KEY (billing_address_id) REFERENCES addresses(id)
);

-- Order items table
CREATE TABLE order_items (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price_jpy INTEGER NOT NULL,
    unit_price_cny INTEGER NOT NULL,
    subtotal_jpy INTEGER NOT NULL,
    subtotal_cny INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Shopping cart (for logged-in users)
CREATE TABLE cart_items (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE(user_id, product_id)
);

-- Business customer pricing
CREATE TABLE business_pricing (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    discount_percent INTEGER NOT NULL DEFAULT 0,
    fixed_price_jpy INTEGER,
    valid_from TEXT,
    valid_until TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE(user_id, product_id)
);

-- Email verification tokens
CREATE TABLE verification_tokens (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    token_type TEXT NOT NULL DEFAULT 'email_verify' CHECK(token_type IN ('email_verify', 'password_reset')),
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_cart_items_user ON cart_items(user_id);
CREATE INDEX idx_addresses_user ON addresses(user_id);

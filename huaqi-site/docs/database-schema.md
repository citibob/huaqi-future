# HUAQI B2B/B2C 平台 - 数据库设计

## D1 数据库 Schema

### 表1: users (用户表)
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,           -- UUID
  email TEXT UNIQUE NOT NULL,     -- 邮箱
  password_hash TEXT NOT NULL,    -- 密码哈希
  name TEXT,                      -- 姓名
  company TEXT,                   -- 公司名(B2B)
  phone TEXT,                    -- 电话
  role TEXT DEFAULT 'customer',  -- customer/b2b/admin
  status TEXT DEFAULT 'active',   -- active/suspended
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 表2: user_addresses (用户地址)
```sql
CREATE TABLE user_addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT,                     -- 地址名称(公司/家庭)
  recipient TEXT NOT NULL,        -- 收货人
  phone TEXT NOT NULL,
  prefecture TEXT,                -- 神奈川
  city TEXT,                      -- 横滨
  district TEXT,                  -- 港南区上永谷
  detail TEXT,                    -- 详细地址
  postal_code TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 表3: categories (商品分类)
```sql
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,            -- 宝可梦卡/原神/游戏
  name_ja TEXT,                  -- 日语名
  slug TEXT UNIQUE,
  parent_id TEXT,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 表4: products (商品)
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  category_id TEXT,
  sku TEXT UNIQUE,
  name TEXT NOT NULL,
  name_ja TEXT,
  description TEXT,
  description_ja TEXT,
  price_jpy INTEGER NOT NULL,   -- 日元价格
  stock_quantity INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',  -- active/draft/archived
  images TEXT,                   -- JSON数组
  tags TEXT,                     -- JSON数组
  is_b2b_only BOOLEAN DEFAULT FALSE,
  b2b_price_jpy INTEGER,         -- B2B批发价
  min_order_quantity INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 表5: orders (订单)
```sql
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending/paid/shipped/completed/cancelled
  subtotal_jpy INTEGER,
  shipping_jpy INTEGER,
  tax_jpy INTEGER,
  total_jpy INTEGER,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'unpaid',
  shipping_address_id TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (shipping_address_id) REFERENCES user_addresses(id)
);
```

### 表6: order_items (订单明细)
```sql
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price_jpy INTEGER NOT NULL,
  subtotal_jpy INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

## 索引
```sql
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
```

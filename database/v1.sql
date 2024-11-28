CREATE TYPE role_types AS ENUM ('admin', 'sales', 'engineering', 'manager');
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(80) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    password VARCHAR(200),
    role role_types,
    supervisor_id INT REFERENCES users(id) ON DELETE CASCADE, 
    is_active boolean DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enquiry (
    id SERIAL PRIMARY KEY,
    enquiry_number NUMERIC UNIQUE,
    employee_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_name VARCHAR(50),
    product_price VARCHAR(50),
    is_active boolean DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE estimation (
    id SERIAL PRIMARY KEY,
    estimation_number NUMERIC UNIQUE,
    employee_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_name VARCHAR(50),
    product_price VARCHAR(50),
    is_active boolean DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
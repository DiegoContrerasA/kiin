-- Create reservations table with all fields
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    external_ref_id VARCHAR(255) NOT NULL UNIQUE,
    reservation_id VARCHAR(255),
    start_date VARCHAR(255),
    end_date VARCHAR(255),
    deposit DECIMAL(10, 2),
    payment_status VARCHAR(255),
    room_name VARCHAR(255),
    transaction_id VARCHAR(255),
    nights INT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_external_ref_id (external_ref_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

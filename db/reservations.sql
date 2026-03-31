-- Create reservations table with all fields
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reservation_id VARCHAR(255),
    external_ref_id VARCHAR(255) NOT NULL UNIQUE,
    hotel_id VARCHAR(255),
    
    -- User data
    user_name VARCHAR(255),
    user_last_name VARCHAR(255),
    document_type VARCHAR(255),
    document_number VARCHAR(100),
    gender VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    nationality VARCHAR(100),
    country VARCHAR(100),
    social_media_profile VARCHAR(500),
    airport_pickup BOOLEAN DEFAULT FALSE,
    pet_fee BOOLEAN DEFAULT FALSE,
    
    -- Typology as JSON
    typology JSON,
    
    -- Reservation details
    reservation_typology VARCHAR(255),
    reservation_date_start DATE,
    reservation_date_end DATE,
    reservation_adults INT DEFAULT 1,
    reservation_children INT DEFAULT 0,
    reservation_with_pet BOOLEAN DEFAULT FALSE,
    reservation_with_transfer BOOLEAN DEFAULT FALSE,
    reservation_special_request TEXT,
    
    -- Payment data (updated via webhook)
    payment JSON,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_reservation_id (reservation_id),
    INDEX idx_email (email),
    UNIQUE INDEX idx_external_ref_id (external_ref_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

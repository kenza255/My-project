CREATE TABLE company (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255)
);

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    role ENUM('jobseeker', 'recruiter', 'admin') DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE ad (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idcompany INT,
    title VARCHAR(255),
    short_description VARCHAR(255),
    description VARCHAR(255),
    location VARCHAR(255),
    wages VARCHAR(255),
    working_time VARCHAR(255),
    contract_type VARCHAR(255),
    remote VARCHAR(255),
    advantages VARCHAR(255),
    profil_searched VARCHAR(255),
    pre_requisit VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idcompany) REFERENCES company (id)
);

CREATE TABLE appliance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idad INT,
    idcompany INT,
    idjobseeker INT,
    date DATETIME,
    name VARCHAR(255),
    phone_number INT,
    email VARCHAR(255),
    message VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idad) REFERENCES ad (id),
    FOREIGN KEY (idjobseeker) REFERENCES jobseeker (id),
    FOREIGN KEY (idcompany) REFERENCES company (id)
);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    role ENUM('jobseeker', 'recruiter', 'admin') DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
); 
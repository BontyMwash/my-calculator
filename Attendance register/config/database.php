<?php
// Database configuration
$host = 'localhost';
$username = 'root';
$password = '';
$database = 'attendance_register';

// Create connection
$conn = new mysqli($host, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if database exists, if not create it
$sql = "CREATE DATABASE IF NOT EXISTS $database";
if ($conn->query($sql) !== TRUE) {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($database);

// Create tables if they don't exist
$tables = [
    "CREATE TABLE IF NOT EXISTS `teachers` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(100) NOT NULL,
        `username` VARCHAR(50) NOT NULL UNIQUE,
        `password` VARCHAR(255) NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    
    "CREATE TABLE IF NOT EXISTS `classes` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `name` VARCHAR(50) NOT NULL,
        `teacher_id` INT NOT NULL,
        `term` VARCHAR(20) NOT NULL,
        `year` INT NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )",
    
    "CREATE TABLE IF NOT EXISTS `students` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `admission_number` VARCHAR(20) NOT NULL,
        `name` VARCHAR(100) NOT NULL,
        `date_of_birth` DATE NOT NULL,
        `gender` ENUM('Male', 'Female') NOT NULL,
        `class_id` INT NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (class_id) REFERENCES classes(id)
    )",
    
    "CREATE TABLE IF NOT EXISTS `attendance` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `student_id` INT NOT NULL,
        `class_id` INT NOT NULL,
        `date` DATE NOT NULL,
        `morning_status` ENUM('present', 'absent') NOT NULL,
        `afternoon_status` ENUM('present', 'absent') NOT NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (class_id) REFERENCES classes(id)
    )"
];

// Execute table creation queries
foreach ($tables as $sql) {
    if ($conn->query($sql) !== TRUE) {
        die("Error creating table: " . $conn->error);
    }
}

// Check if default admin exists, if not create one
$checkAdmin = $conn->query("SELECT id FROM teachers WHERE username = 'MR MWANGI'");
if ($checkAdmin->num_rows == 0) {
    $defaultPassword = password_hash('BONTY', PASSWORD_DEFAULT);
    $sql = "INSERT INTO teachers (name, username, password) VALUES ('Mr Mwangi', 'MR MWANGI', '$defaultPassword')";
    if ($conn->query($sql) !== TRUE) {
        die("Error creating default admin: " . $conn->error);
    }
}
?>

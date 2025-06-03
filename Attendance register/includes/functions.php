<?php
// Common functions for the attendance register system

/**
 * Get total number of students
 */
function getTotalStudents() {
    global $conn;
    $result = $conn->query("SELECT COUNT(*) as total FROM students");
    $row = $result->fetch_assoc();
    return $row['total'];
}

/**
 * Get total attendance for today
 */
function getTodayAttendance() {
    global $conn;
    $today = date('Y-m-d');
    $result = $conn->query("SELECT COUNT(*) as total FROM attendance WHERE date = '$today' AND (morning_status = 'present' OR afternoon_status = 'present')");
    $row = $result->fetch_assoc();
    return $row['total'];
}

/**
 * Get all classes
 */
function getAllClasses() {
    global $conn;
    $classes = [];
    $result = $conn->query("SELECT * FROM classes ORDER BY name ASC");
    while ($row = $result->fetch_assoc()) {
        $classes[] = $row;
    }
    return $classes;
}

/**
 * Get class by ID
 */
function getClassById($id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM classes WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

/**
 * Get students by class ID
 */
function getStudentsByClass($classId) {
    global $conn;
    $students = [];
    $stmt = $conn->prepare("SELECT * FROM students WHERE class_id = ? ORDER BY name ASC");
    $stmt->bind_param("i", $classId);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    return $students;
}

/**
 * Get student by ID
 */
function getStudentById($id) {
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM students WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

/**
 * Get attendance for a specific date and class
 */
function getAttendanceByDateAndClass($date, $classId) {
    global $conn;
    $attendance = [];
    $stmt = $conn->prepare("SELECT a.*, s.name, s.admission_number 
                           FROM attendance a 
                           JOIN students s ON a.student_id = s.id 
                           WHERE a.date = ? AND a.class_id = ?");
    $stmt->bind_param("si", $date, $classId);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $attendance[] = $row;
    }
    return $attendance;
}

/**
 * Check if attendance exists for a specific date and class
 */
function checkAttendanceExists($date, $classId) {
    global $conn;
    $stmt = $conn->prepare("SELECT COUNT(*) as count FROM attendance WHERE date = ? AND class_id = ?");
    $stmt->bind_param("si", $date, $classId);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row['count'] > 0;
}

/**
 * Get attendance statistics for a class in a date range
 */
function getAttendanceStats($classId, $startDate, $endDate) {
    global $conn;
    $stats = [];
    
    // Get total days in the date range
    $start = new DateTime($startDate);
    $end = new DateTime($endDate);
    $interval = $start->diff($end);
    $totalDays = $interval->days + 1;
    
    // Get students in the class
    $students = getStudentsByClass($classId);
    
    foreach ($students as $student) {
        $stmt = $conn->prepare("SELECT 
                              SUM(CASE WHEN morning_status = 'present' THEN 1 ELSE 0 END) as morning_present,
                              SUM(CASE WHEN afternoon_status = 'present' THEN 1 ELSE 0 END) as afternoon_present
                              FROM attendance 
                              WHERE student_id = ? AND class_id = ? AND date BETWEEN ? AND ?");
        $stmt->bind_param("iiss", $student['id'], $classId, $startDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        $morningPresent = $row['morning_present'] ?: 0;
        $afternoonPresent = $row['afternoon_present'] ?: 0;
        $totalSessions = $totalDays * 2; // Morning and afternoon
        $totalPresent = $morningPresent + $afternoonPresent;
        $attendancePercentage = ($totalSessions > 0) ? ($totalPresent / $totalSessions) * 100 : 0;
        
        $stats[] = [
            'student_id' => $student['id'],
            'name' => $student['name'],
            'admission_number' => $student['admission_number'],
            'morning_present' => $morningPresent,
            'afternoon_present' => $afternoonPresent,
            'total_present' => $totalPresent,
            'total_sessions' => $totalSessions,
            'attendance_percentage' => round($attendancePercentage, 2)
        ];
    }
    
    return $stats;
}

/**
 * Format date for display
 */
function formatDate($date) {
    return date('d M Y', strtotime($date));
}

/**
 * Sanitize input data
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>

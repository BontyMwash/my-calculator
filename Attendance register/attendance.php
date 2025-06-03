<?php
session_start();
require_once 'config/database.php';
require_once 'includes/functions.php';

// Check if user is logged in
if (!isset($_SESSION['teacher_id'])) {
    header("Location: login.php");
    exit();
}

$message = '';
$classes = getAllClasses();
$selectedClass = isset($_GET['class_id']) ? $_GET['class_id'] : (count($classes) > 0 ? $classes[0]['id'] : 0);
$selectedDate = isset($_GET['date']) ? $_GET['date'] : date('Y-m-d');

// Process attendance form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit_attendance'])) {
    $date = $_POST['date'];
    $classId = $_POST['class_id'];
    $studentIds = $_POST['student_id'];
    $morningStatus = $_POST['morning_status'];
    $afternoonStatus = $_POST['afternoon_status'];
    
    // Begin transaction
    $conn->begin_transaction();
    
    try {
        // Delete existing attendance records for this date and class
        $stmt = $conn->prepare("DELETE FROM attendance WHERE date = ? AND class_id = ?");
        $stmt->bind_param("si", $date, $classId);
        $stmt->execute();
        
        // Insert new attendance records
        $stmt = $conn->prepare("INSERT INTO attendance (student_id, class_id, date, morning_status, afternoon_status) VALUES (?, ?, ?, ?, ?)");
        
        foreach ($studentIds as $key => $studentId) {
            $morning = isset($morningStatus[$studentId]) ? 'present' : 'absent';
            $afternoon = isset($afternoonStatus[$studentId]) ? 'present' : 'absent';
            
            $stmt->bind_param("iisss", $studentId, $classId, $date, $morning, $afternoon);
            $stmt->execute();
        }
        
        // Commit transaction
        $conn->commit();
        $message = '<div class="alert alert-success">Attendance has been saved successfully!</div>';
    } catch (Exception $e) {
        // Rollback transaction on error
        $conn->rollback();
        $message = '<div class="alert alert-danger">Error: ' . $e->getMessage() . '</div>';
    }
    
    // Redirect to avoid form resubmission
    header("Location: attendance.php?class_id=$classId&date=$date&success=1");
    exit();
}

// Check if success message should be displayed
if (isset($_GET['success']) && $_GET['success'] == 1) {
    $message = '<div class="alert alert-success">Attendance has been saved successfully!</div>';
}

// Get students for selected class
$students = [];
if ($selectedClass > 0) {
    $students = getStudentsByClass($selectedClass);
}

// Get existing attendance data
$attendanceData = [];
if ($selectedClass > 0 && !empty($selectedDate)) {
    $existingAttendance = getAttendanceByDateAndClass($selectedDate, $selectedClass);
    foreach ($existingAttendance as $record) {
        $attendanceData[$record['student_id']] = [
            'morning_status' => $record['morning_status'],
            'afternoon_status' => $record['afternoon_status']
        ];
    }
}

// Get class details
$classDetails = $selectedClass > 0 ? getClassById($selectedClass) : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Take Attendance - Student Attendance Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.php">Attendance Register</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="students.php">Students</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="attendance.php">Take Attendance</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="reports.php">Reports</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <span class="navbar-text me-3">
                        Welcome, <?php echo $_SESSION['teacher_name']; ?>
                    </span>
                    <a href="logout.php" class="btn btn-light btn-sm">Logout</a>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">Take Attendance</h4>
                    </div>
                    <div class="card-body">
                        <?php echo $message; ?>
                        
                        <form method="get" action="" class="row mb-4">
                            <div class="col-md-5">
                                <label for="class_id" class="form-label">Select Class:</label>
                                <select name="class_id" id="class_id" class="form-select" required>
                                    <option value="">Select Class</option>
                                    <?php foreach ($classes as $class): ?>
                                        <option value="<?php echo $class['id']; ?>" <?php echo ($selectedClass == $class['id']) ? 'selected' : ''; ?>>
                                            <?php echo $class['name'] . ' (' . $class['term'] . ' - ' . $class['year'] . ')'; ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="col-md-5">
                                <label for="date" class="form-label">Select Date:</label>
                                <input type="date" name="date" id="date" class="form-control" value="<?php echo $selectedDate; ?>" required>
                            </div>
                            <div class="col-md-2 d-flex align-items-end">
                                <button type="submit" class="btn btn-primary w-100">Load</button>
                            </div>
                        </form>
                        
                        <?php if ($selectedClass > 0 && count($students) > 0): ?>
                            <form method="post" action="">
                                <input type="hidden" name="class_id" value="<?php echo $selectedClass; ?>">
                                <input type="hidden" name="date" value="<?php echo $selectedDate; ?>">
                                
                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped">
                                        <thead class="table-primary">
                                            <tr>
                                                <th rowspan="2" class="text-center align-middle">No.</th>
                                                <th rowspan="2" class="text-center align-middle">Adm. No.</th>
                                                <th rowspan="2" class="text-center align-middle">Student Name</th>
                                                <th colspan="2" class="text-center">Attendance</th>
                                            </tr>
                                            <tr>
                                                <th class="text-center">Morning</th>
                                                <th class="text-center">Afternoon</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php $counter = 1; foreach ($students as $student): ?>
                                                <input type="hidden" name="student_id[]" value="<?php echo $student['id']; ?>">
                                                <tr>
                                                    <td class="text-center"><?php echo $counter++; ?></td>
                                                    <td><?php echo $student['admission_number']; ?></td>
                                                    <td><?php echo $student['name']; ?></td>
                                                    <td class="text-center">
                                                        <div class="form-check d-flex justify-content-center">
                                                            <input class="form-check-input" type="checkbox" 
                                                                name="morning_status[<?php echo $student['id']; ?>]" 
                                                                id="morning_<?php echo $student['id']; ?>"
                                                                <?php echo (isset($attendanceData[$student['id']]) && $attendanceData[$student['id']]['morning_status'] == 'present') ? 'checked' : ''; ?>>
                                                        </div>
                                                    </td>
                                                    <td class="text-center">
                                                        <div class="form-check d-flex justify-content-center">
                                                            <input class="form-check-input" type="checkbox" 
                                                                name="afternoon_status[<?php echo $student['id']; ?>]" 
                                                                id="afternoon_<?php echo $student['id']; ?>"
                                                                <?php echo (isset($attendanceData[$student['id']]) && $attendanceData[$student['id']]['afternoon_status'] == 'present') ? 'checked' : ''; ?>>
                                                        </div>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                                    <button type="submit" name="submit_attendance" class="btn btn-success">
                                        <i class="bi bi-save"></i> Save Attendance
                                    </button>
                                </div>
                            </form>
                        <?php elseif ($selectedClass > 0 && count($students) == 0): ?>
                            <div class="alert alert-info">
                                No students found in this class. <a href="students.php?class_id=<?php echo $selectedClass; ?>">Add students</a> to take attendance.
                            </div>
                        <?php elseif (count($classes) == 0): ?>
                            <div class="alert alert-info">
                                No classes found. <a href="classes.php">Add a class</a> first to take attendance.
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="mt-5 py-3 bg-light">
        <div class="container text-center">
            <p class="mb-0">&copy; <?php echo date('Y'); ?> Student Attendance Register</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>

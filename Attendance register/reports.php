<?php
session_start();
require_once 'config/database.php';
require_once 'includes/functions.php';

// Check if user is logged in
if (!isset($_SESSION['teacher_id'])) {
    header("Location: login.php");
    exit();
}

$classes = getAllClasses();
$selectedClass = isset($_GET['class_id']) ? $_GET['class_id'] : (count($classes) > 0 ? $classes[0]['id'] : 0);
$startDate = isset($_GET['start_date']) ? $_GET['start_date'] : date('Y-m-01'); // First day of current month
$endDate = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-t'); // Last day of current month

// Get class details
$classDetails = $selectedClass > 0 ? getClassById($selectedClass) : null;

// Get attendance statistics
$attendanceStats = [];
if ($selectedClass > 0 && !empty($startDate) && !empty($endDate)) {
    $attendanceStats = getAttendanceStats($selectedClass, $startDate, $endDate);
}

// Calculate summary statistics
$totalStudents = count($attendanceStats);
$totalBoys = 0;
$totalGirls = 0;
$totalAttendance = 0;
$totalSessions = 0;

if ($totalStudents > 0) {
    foreach ($attendanceStats as $stat) {
        // Get student gender
        $student = getStudentById($stat['student_id']);
        if ($student['gender'] == 'Male') {
            $totalBoys++;
        } else {
            $totalGirls++;
        }
        
        $totalAttendance += $stat['total_present'];
        $totalSessions += $stat['total_sessions'];
    }
    
    // Calculate average attendance percentage
    $averageAttendance = ($totalSessions > 0) ? ($totalAttendance / $totalSessions) * 100 : 0;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance Reports - Student Attendance Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <style>
        @media print {
            .no-print {
                display: none !important;
            }
            .print-only {
                display: block !important;
            }
            .container {
                width: 100% !important;
                max-width: 100% !important;
            }
            body {
                font-size: 12pt;
            }
            .table {
                width: 100% !important;
            }
            .card {
                border: none !important;
            }
            .card-header {
                background-color: #f8f9fa !important;
                color: #000 !important;
            }
            .table-primary {
                background-color: #f8f9fa !important;
            }
        }
        .print-only {
            display: none;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary no-print">
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
                        <a class="nav-link" href="attendance.php">Take Attendance</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="reports.php">Reports</a>
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
        <!-- Print Header - Only visible when printing -->
        <div class="row print-only">
            <div class="col-12 text-center mb-4">
                <h2>Student Attendance Register</h2>
                <?php if ($classDetails): ?>
                <h4><?php echo $classDetails['name'] . ' - ' . $classDetails['term'] . ' (' . $classDetails['year'] . ')'; ?></h4>
                <p>Period: <?php echo formatDate($startDate) . ' to ' . formatDate($endDate); ?></p>
                <?php endif; ?>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h4 class="mb-0">Attendance Reports</h4>
                        <button type="button" class="btn btn-light btn-sm no-print" onclick="window.print()">
                            <i class="bi bi-printer"></i> Print Report
                        </button>
                    </div>
                    <div class="card-body">
                        <form method="get" action="" class="row mb-4 no-print">
                            <div class="col-md-4">
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
                            <div class="col-md-3">
                                <label for="start_date" class="form-label">Start Date:</label>
                                <input type="date" name="start_date" id="start_date" class="form-control" value="<?php echo $startDate; ?>" required>
                            </div>
                            <div class="col-md-3">
                                <label for="end_date" class="form-label">End Date:</label>
                                <input type="date" name="end_date" id="end_date" class="form-control" value="<?php echo $endDate; ?>" required>
                            </div>
                            <div class="col-md-2 d-flex align-items-end">
                                <button type="submit" class="btn btn-primary w-100">Generate</button>
                            </div>
                        </form>
                        
                        <?php if ($selectedClass > 0 && count($attendanceStats) > 0): ?>
                            <div class="row mb-4">
                                <div class="col-md-8">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped">
                                            <thead class="table-primary">
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Adm. No.</th>
                                                    <th>Student Name</th>
                                                    <th>Morning Present</th>
                                                    <th>Afternoon Present</th>
                                                    <th>Total Present</th>
                                                    <th>Attendance %</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php $counter = 1; foreach ($attendanceStats as $stat): ?>
                                                    <tr>
                                                        <td><?php echo $counter++; ?></td>
                                                        <td><?php echo $stat['admission_number']; ?></td>
                                                        <td><?php echo $stat['name']; ?></td>
                                                        <td class="text-center"><?php echo $stat['morning_present']; ?></td>
                                                        <td class="text-center"><?php echo $stat['afternoon_present']; ?></td>
                                                        <td class="text-center"><?php echo $stat['total_present']; ?></td>
                                                        <td class="text-center"><?php echo $stat['attendance_percentage']; ?>%</td>
                                                    </tr>
                                                <?php endforeach; ?>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="card">
                                        <div class="card-header bg-light">
                                            <h5 class="mb-0">Term Summary</h5>
                                        </div>
                                        <div class="card-body">
                                            <table class="table table-bordered">
                                                <tbody>
                                                    <tr>
                                                        <th colspan="2" class="text-center bg-light">ATTENDANCE</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Attendance</td>
                                                        <td class="text-center"><?php echo $totalAttendance; ?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Sessions</td>
                                                        <td class="text-center"><?php echo $totalSessions; ?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Percentage of Average Attendance</td>
                                                        <td class="text-center"><?php echo round($averageAttendance, 2); ?>%</td>
                                                    </tr>
                                                    <tr>
                                                        <th colspan="2" class="text-center bg-light">NUMBER OF PUPILS</th>
                                                    </tr>
                                                    <tr>
                                                        <td>Boys</td>
                                                        <td class="text-center"><?php echo $totalBoys; ?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Girls</td>
                                                        <td class="text-center"><?php echo $totalGirls; ?></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td class="text-center"><?php echo $totalStudents; ?></td>
                                                    </tr>
                                                    <tr>
                                                        <th colspan="2" class="text-center bg-light">CHECKED</th>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="2" style="height: 80px;"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php elseif ($selectedClass > 0 && count($attendanceStats) == 0): ?>
                            <div class="alert alert-info">
                                No attendance records found for the selected class and date range.
                            </div>
                        <?php elseif (count($classes) == 0): ?>
                            <div class="alert alert-info">
                                No classes found. <a href="classes.php" class="no-print">Add a class</a> first to generate reports.
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="mt-5 py-3 bg-light no-print">
        <div class="container text-center">
            <p class="mb-0">&copy; <?php echo date('Y'); ?> Student Attendance Register</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>

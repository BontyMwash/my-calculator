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

// Process student form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit_student'])) {
    $admissionNumber = sanitizeInput($_POST['admission_number']);
    $name = sanitizeInput($_POST['name']);
    $dateOfBirth = $_POST['date_of_birth'];
    $gender = $_POST['gender'];
    $classId = $_POST['class_id'];
    
    // Validate inputs
    if (empty($admissionNumber) || empty($name) || empty($dateOfBirth) || empty($gender) || empty($classId)) {
        $message = '<div class="alert alert-danger">All fields are required!</div>';
    } else {
        // Check if student with same admission number already exists
        $stmt = $conn->prepare("SELECT id FROM students WHERE admission_number = ? AND class_id = ?");
        $stmt->bind_param("si", $admissionNumber, $classId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $message = '<div class="alert alert-danger">A student with this admission number already exists in this class!</div>';
        } else {
            // Insert new student
            $stmt = $conn->prepare("INSERT INTO students (admission_number, name, date_of_birth, gender, class_id) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssi", $admissionNumber, $name, $dateOfBirth, $gender, $classId);
            
            if ($stmt->execute()) {
                $message = '<div class="alert alert-success">Student has been added successfully!</div>';
                // Clear form data
                $admissionNumber = $name = $dateOfBirth = '';
            } else {
                $message = '<div class="alert alert-danger">Error: ' . $stmt->error . '</div>';
            }
        }
    }
}

// Process student deletion
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $studentId = $_GET['delete'];
    
    // Check if student exists
    $stmt = $conn->prepare("SELECT id FROM students WHERE id = ?");
    $stmt->bind_param("i", $studentId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        // Delete student's attendance records first
        $stmt = $conn->prepare("DELETE FROM attendance WHERE student_id = ?");
        $stmt->bind_param("i", $studentId);
        $stmt->execute();
        
        // Delete student
        $stmt = $conn->prepare("DELETE FROM students WHERE id = ?");
        $stmt->bind_param("i", $studentId);
        
        if ($stmt->execute()) {
            $message = '<div class="alert alert-success">Student has been deleted successfully!</div>';
        } else {
            $message = '<div class="alert alert-danger">Error: ' . $stmt->error . '</div>';
        }
    } else {
        $message = '<div class="alert alert-danger">Student not found!</div>';
    }
}

// Get students for selected class
$students = [];
if ($selectedClass > 0) {
    $students = getStudentsByClass($selectedClass);
}

// Get class details
$classDetails = $selectedClass > 0 ? getClassById($selectedClass) : null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Students - Student Attendance Register</title>
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
                        <a class="nav-link active" href="students.php">Students</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="attendance.php">Take Attendance</a>
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
                        <h4 class="mb-0">Manage Students</h4>
                        <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addStudentModal">
                            <i class="bi bi-plus-circle"></i> Add New Student
                        </button>
                    </div>
                    <div class="card-body">
                        <?php echo $message; ?>
                        
                        <form method="get" action="" class="row mb-4">
                            <div class="col-md-10">
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
                            <div class="col-md-2 d-flex align-items-end">
                                <button type="submit" class="btn btn-primary w-100">Load</button>
                            </div>
                        </form>
                        
                        <?php if ($selectedClass > 0): ?>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped">
                                    <thead class="table-primary">
                                        <tr>
                                            <th>No.</th>
                                            <th>Admission No.</th>
                                            <th>Name</th>
                                            <th>Date of Birth</th>
                                            <th>Gender</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php if (count($students) > 0): ?>
                                            <?php $counter = 1; foreach ($students as $student): ?>
                                                <tr>
                                                    <td><?php echo $counter++; ?></td>
                                                    <td><?php echo $student['admission_number']; ?></td>
                                                    <td><?php echo $student['name']; ?></td>
                                                    <td><?php echo formatDate($student['date_of_birth']); ?></td>
                                                    <td><?php echo $student['gender']; ?></td>
                                                    <td>
                                                        <a href="edit_student.php?id=<?php echo $student['id']; ?>" class="btn btn-sm btn-primary">
                                                            <i class="bi bi-pencil"></i>
                                                        </a>
                                                        <a href="students.php?class_id=<?php echo $selectedClass; ?>&delete=<?php echo $student['id']; ?>" 
                                                           class="btn btn-sm btn-danger" 
                                                           onclick="return confirm('Are you sure you want to delete this student?')">
                                                            <i class="bi bi-trash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        <?php else: ?>
                                            <tr>
                                                <td colspan="6" class="text-center">No students found in this class.</td>
                                            </tr>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php elseif (count($classes) == 0): ?>
                            <div class="alert alert-info">
                                No classes found. <a href="classes.php">Add a class</a> first to manage students.
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Student Modal -->
    <div class="modal fade" id="addStudentModal" tabindex="-1" aria-labelledby="addStudentModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form method="post" action="">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="addStudentModalLabel">Add New Student</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="class_id_modal" class="form-label">Class</label>
                            <select name="class_id" id="class_id_modal" class="form-select" required>
                                <option value="">Select Class</option>
                                <?php foreach ($classes as $class): ?>
                                    <option value="<?php echo $class['id']; ?>" <?php echo ($selectedClass == $class['id']) ? 'selected' : ''; ?>>
                                        <?php echo $class['name'] . ' (' . $class['term'] . ' - ' . $class['year'] . ')'; ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="admission_number" class="form-label">Admission Number</label>
                            <input type="text" class="form-control" id="admission_number" name="admission_number" required>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" name="name" required>
                        </div>
                        <div class="mb-3">
                            <label for="date_of_birth" class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="date_of_birth" name="date_of_birth" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Gender</label>
                            <div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender" id="male" value="Male" required>
                                    <label class="form-check-label" for="male">Male</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="gender" id="female" value="Female" required>
                                    <label class="form-check-label" for="female">Female</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" name="submit_student" class="btn btn-primary">Save Student</button>
                    </div>
                </form>
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

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

// Process class form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit_class'])) {
    $name = sanitizeInput($_POST['name']);
    $term = sanitizeInput($_POST['term']);
    $year = (int)$_POST['year'];
    $teacherId = $_SESSION['teacher_id'];
    
    // If name is empty but form and stream are provided, construct the name
    if (empty($name) && isset($_POST['form']) && isset($_POST['stream']) && $_POST['form'] !== 'OTHER') {
        $form = sanitizeInput($_POST['form']);
        $stream = sanitizeInput($_POST['stream']);
        if (!empty($form) && !empty($stream)) {
            $name = $form . ' ' . $stream;
        }
    } else if (empty($name) && isset($_POST['form']) && $_POST['form'] === 'OTHER' && isset($_POST['custom_name'])) {
        $name = sanitizeInput($_POST['custom_name']);
    }
    
    // Validate inputs
    if (empty($name) || empty($term) || empty($year)) {
        $message = '<div class="alert alert-danger">All fields are required!</div>';
    } else {
        // Check if class with same name, term and year already exists
        $stmt = $conn->prepare("SELECT id FROM classes WHERE name = ? AND term = ? AND year = ?");
        $stmt->bind_param("ssi", $name, $term, $year);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $message = '<div class="alert alert-danger">A class with this name, term and year already exists!</div>';
        } else {
            // Insert new class
            $stmt = $conn->prepare("INSERT INTO classes (name, term, year, teacher_id) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssii", $name, $term, $year, $teacherId);
            
            if ($stmt->execute()) {
                $message = '<div class="alert alert-success">Class has been added successfully!</div>';
                // Clear form data
                $name = $term = '';
                $year = date('Y');
            } else {
                $message = '<div class="alert alert-danger">Error: ' . $stmt->error . '</div>';
            }
        }
    }
}

// Process class deletion
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $classId = $_GET['delete'];
    
    // Check if class exists
    $stmt = $conn->prepare("SELECT id FROM classes WHERE id = ?");
    $stmt->bind_param("i", $classId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        // Check if class has students
        $stmt = $conn->prepare("SELECT COUNT(*) as count FROM students WHERE class_id = ?");
        $stmt->bind_param("i", $classId);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        
        if ($row['count'] > 0) {
            $message = '<div class="alert alert-danger">Cannot delete class with students. Remove all students first.</div>';
        } else {
            // Delete class
            $stmt = $conn->prepare("DELETE FROM classes WHERE id = ?");
            $stmt->bind_param("i", $classId);
            
            if ($stmt->execute()) {
                $message = '<div class="alert alert-success">Class has been deleted successfully!</div>';
            } else {
                $message = '<div class="alert alert-danger">Error: ' . $stmt->error . '</div>';
            }
        }
    } else {
        $message = '<div class="alert alert-danger">Class not found!</div>';
    }
}

// Get all classes
$classes = getAllClasses();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classes - Student Attendance Register</title>
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
                        <a class="nav-link" href="attendance.php">Take Attendance</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="reports.php">Reports</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="classes.php">Classes</a>
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
                        <h4 class="mb-0">Manage Classes</h4>
                        <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#addClassModal">
                            <i class="bi bi-plus-circle"></i> Add New Class
                        </button>
                    </div>
                    <div class="card-body">
                        <?php echo $message; ?>
                        
                        <div class="mb-4">
                            <a href="setup_classes.php" class="btn btn-success">
                                <i class="bi bi-plus-circle"></i> Setup Standard Classes and Streams
                            </a>
                        </div>
                        
                        <div class="accordion mb-4" id="classAccordion">
                            <?php 
                            // Group classes by form
                            $formGroups = [];
                            foreach ($classes as $class) {
                                $nameParts = explode(' ', $class['name']);
                                if (count($nameParts) >= 2) {
                                    $form = $nameParts[0] . ' ' . $nameParts[1]; // FORM 2, FORM 3, etc.
                                    $stream = implode(' ', array_slice($nameParts, 2)); // CAMBRIDGE, etc.
                                    if (!isset($formGroups[$form])) {
                                        $formGroups[$form] = [];
                                    }
                                    $formGroups[$form][] = [
                                        'class' => $class,
                                        'stream' => $stream
                                    ];
                                } else {
                                    // For classes that don't follow the FORM X STREAM format
                                    if (!isset($formGroups['Other'])) {
                                        $formGroups['Other'] = [];
                                    }
                                    $formGroups['Other'][] = [
                                        'class' => $class,
                                        'stream' => ''
                                    ];
                                }
                            }
                            
                            $formCounter = 1;
                            foreach ($formGroups as $form => $formClasses):
                            ?>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="heading<?php echo $formCounter; ?>">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                                            data-bs-target="#collapse<?php echo $formCounter; ?>" 
                                            aria-expanded="true" aria-controls="collapse<?php echo $formCounter; ?>">
                                        <strong><?php echo $form; ?></strong> - <?php echo count($formClasses); ?> Streams
                                    </button>
                                </h2>
                                <div id="collapse<?php echo $formCounter; ?>" class="accordion-collapse collapse show" 
                                     aria-labelledby="heading<?php echo $formCounter; ?>" data-bs-parent="#classAccordion">
                                    <div class="accordion-body p-0">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped mb-0">
                                                <thead class="table-primary">
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Stream</th>
                                                        <th>Term</th>
                                                        <th>Year</th>
                                                        <th>Students</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <?php $streamCounter = 1; foreach ($formClasses as $formClass): 
                                                        $class = $formClass['class'];
                                                        $stream = $formClass['stream'];
                                                        
                                                        // Get student count for this class
                                                        $stmt = $conn->prepare("SELECT COUNT(*) as count FROM students WHERE class_id = ?");
                                                        $stmt->bind_param("i", $class['id']);
                                                        $stmt->execute();
                                                        $result = $stmt->get_result();
                                                        $row = $result->fetch_assoc();
                                                        $studentCount = $row['count'];
                                                    ?>
                                                    <tr>
                                                        <td><?php echo $streamCounter++; ?></td>
                                                        <td><?php echo $stream ?: $class['name']; ?></td>
                                                        <td><?php echo $class['term']; ?></td>
                                                        <td><?php echo $class['year']; ?></td>
                                                        <td><?php echo $studentCount; ?></td>
                                                        <td>
                                                            <a href="students.php?class_id=<?php echo $class['id']; ?>" class="btn btn-sm btn-info">
                                                                <i class="bi bi-people"></i> Students
                                                            </a>
                                                            <a href="attendance.php?class_id=<?php echo $class['id']; ?>" class="btn btn-sm btn-success">
                                                                <i class="bi bi-calendar-check"></i> Attendance
                                                            </a>
                                                            <a href="edit_class.php?id=<?php echo $class['id']; ?>" class="btn btn-sm btn-primary">
                                                                <i class="bi bi-pencil"></i> Edit
                                                            </a>
                                                            <a href="classes.php?delete=<?php echo $class['id']; ?>" 
                                                               class="btn btn-sm btn-danger" 
                                                               onclick="return confirm('Are you sure you want to delete this class?')">
                                                                <i class="bi bi-trash"></i> Delete
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <?php endforeach; ?>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php 
                            $formCounter++;
                            endforeach; 
                            
                            if (count($classes) == 0):
                            ?>
                            <div class="alert alert-info">
                                No classes found. Use the "Setup Standard Classes and Streams" button above or add classes manually.
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Class Modal -->
    <div class="modal fade" id="addClassModal" tabindex="-1" aria-labelledby="addClassModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form method="post" action="">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="addClassModalLabel">Add New Class</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="form" class="form-label">Form</label>
                            <select class="form-select" id="form" name="form" required>
                                <option value="">Select Form</option>
                                <option value="FORM 2">FORM 2</option>
                                <option value="FORM 3">FORM 3</option>
                                <option value="FORM 4">FORM 4</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="stream" class="form-label">Stream</label>
                            <select class="form-select" id="stream" name="stream">
                                <option value="">Select Stream</option>
                                <option value="CAMBRIDGE">CAMBRIDGE</option>
                                <option value="STANFORD">STANFORD</option>
                                <option value="YALE">YALE</option>
                                <option value="PRINCETON">PRINCETON</option>
                                <option value="HARVARD">HARVARD</option>
                                <option value="ZURICH">ZURICH</option>
                                <option value="EDINBERG">EDINBERG</option>
                                <option value="BOSTON">BOSTON</option>
                                <option value="OXFORD">OXFORD</option>
                            </select>
                        </div>
                        <div class="mb-3" id="customNameContainer" style="display: none;">
                            <label for="custom_name" class="form-label">Custom Class Name</label>
                            <input type="text" class="form-control" id="custom_name" name="custom_name">
                        </div>
                        <input type="hidden" id="name" name="name" value="">
                        <div class="mb-3">
                            <label for="term" class="form-label">Term</label>
                            <select class="form-select" id="term" name="term" required>
                                <option value="">Select Term</option>
                                <option value="Term 1">Term 1</option>
                                <option value="Term 2">Term 2</option>
                                <option value="Term 3">Term 3</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="year" class="form-label">Year</label>
                            <input type="number" class="form-control" id="year" name="year" min="2000" max="2100" value="<?php echo date('Y'); ?>" required>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" name="submit_class" class="btn btn-primary">Save Class</button>
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
    <script>
        // Handle form and stream selection
        document.addEventListener('DOMContentLoaded', function() {
            const formSelect = document.getElementById('form');
            const streamSelect = document.getElementById('stream');
            const customNameContainer = document.getElementById('customNameContainer');
            const customNameInput = document.getElementById('custom_name');
            const nameInput = document.getElementById('name');
            
            function updateClassName() {
                const form = formSelect.value;
                const stream = streamSelect.value;
                const customName = customNameInput.value;
                
                if (form === 'OTHER') {
                    nameInput.value = customName;
                } else if (form && stream) {
                    nameInput.value = form + ' ' + stream;
                } else {
                    nameInput.value = '';
                }
            }
            
            formSelect.addEventListener('change', function() {
                if (this.value === 'OTHER') {
                    customNameContainer.style.display = 'block';
                    streamSelect.disabled = true;
                } else {
                    customNameContainer.style.display = 'none';
                    streamSelect.disabled = false;
                }
                updateClassName();
            });
            
            streamSelect.addEventListener('change', updateClassName);
            customNameInput.addEventListener('input', updateClassName);
        });
    </script>
</body>
</html>

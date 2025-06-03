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
$classId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

// Check if class exists
$stmt = $conn->prepare("SELECT * FROM classes WHERE id = ?");
$stmt->bind_param("i", $classId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    header("Location: classes.php");
    exit();
}

$class = $result->fetch_assoc();

// Process class form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit_class'])) {
    $name = sanitizeInput($_POST['name']);
    $term = sanitizeInput($_POST['term']);
    $year = (int)$_POST['year'];
    
    // Validate inputs
    if (empty($name) || empty($term) || empty($year)) {
        $message = '<div class="alert alert-danger">All fields are required!</div>';
    } else {
        // Check if class with same name, term and year already exists (excluding current class)
        $stmt = $conn->prepare("SELECT id FROM classes WHERE name = ? AND term = ? AND year = ? AND id != ?");
        $stmt->bind_param("ssii", $name, $term, $year, $classId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $message = '<div class="alert alert-danger">A class with this name, term and year already exists!</div>';
        } else {
            // Update class
            $stmt = $conn->prepare("UPDATE classes SET name = ?, term = ?, year = ? WHERE id = ?");
            $stmt->bind_param("ssii", $name, $term, $year, $classId);
            
            if ($stmt->execute()) {
                $message = '<div class="alert alert-success">Class has been updated successfully!</div>';
                $class['name'] = $name;
                $class['term'] = $term;
                $class['year'] = $year;
            } else {
                $message = '<div class="alert alert-danger">Error: ' . $stmt->error . '</div>';
            }
        }
    }
}

// Parse class name to get form and stream
$nameParts = explode(' ', $class['name']);
$form = '';
$stream = '';
$customName = '';

if (count($nameParts) >= 2 && ($nameParts[0] == 'FORM')) {
    $form = $nameParts[0] . ' ' . $nameParts[1]; // FORM 2, FORM 3, etc.
    $stream = implode(' ', array_slice($nameParts, 2)); // CAMBRIDGE, etc.
} else {
    $form = 'OTHER';
    $customName = $class['name'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Class - Student Attendance Register</title>
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
                    <div class="card-header bg-primary text-white">
                        <h4 class="mb-0">Edit Class</h4>
                    </div>
                    <div class="card-body">
                        <?php echo $message; ?>
                        
                        <form method="post" action="">
                            <div class="mb-3">
                                <label for="form" class="form-label">Form</label>
                                <select class="form-select" id="form" name="form" required>
                                    <option value="">Select Form</option>
                                    <option value="FORM 2" <?php echo ($form == 'FORM 2') ? 'selected' : ''; ?>>FORM 2</option>
                                    <option value="FORM 3" <?php echo ($form == 'FORM 3') ? 'selected' : ''; ?>>FORM 3</option>
                                    <option value="FORM 4" <?php echo ($form == 'FORM 4') ? 'selected' : ''; ?>>FORM 4</option>
                                    <option value="OTHER" <?php echo ($form == 'OTHER') ? 'selected' : ''; ?>>Other</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="stream" class="form-label">Stream</label>
                                <select class="form-select" id="stream" name="stream" <?php echo ($form == 'OTHER') ? 'disabled' : ''; ?>>
                                    <option value="">Select Stream</option>
                                    <option value="CAMBRIDGE" <?php echo ($stream == 'CAMBRIDGE') ? 'selected' : ''; ?>>CAMBRIDGE</option>
                                    <option value="STANFORD" <?php echo ($stream == 'STANFORD') ? 'selected' : ''; ?>>STANFORD</option>
                                    <option value="YALE" <?php echo ($stream == 'YALE') ? 'selected' : ''; ?>>YALE</option>
                                    <option value="PRINCETON" <?php echo ($stream == 'PRINCETON') ? 'selected' : ''; ?>>PRINCETON</option>
                                    <option value="HARVARD" <?php echo ($stream == 'HARVARD') ? 'selected' : ''; ?>>HARVARD</option>
                                    <option value="ZURICH" <?php echo ($stream == 'ZURICH') ? 'selected' : ''; ?>>ZURICH</option>
                                    <option value="EDINBERG" <?php echo ($stream == 'EDINBERG') ? 'selected' : ''; ?>>EDINBERG</option>
                                    <option value="BOSTON" <?php echo ($stream == 'BOSTON') ? 'selected' : ''; ?>>BOSTON</option>
                                    <option value="OXFORD" <?php echo ($stream == 'OXFORD') ? 'selected' : ''; ?>>OXFORD</option>
                                </select>
                            </div>
                            <div class="mb-3" id="customNameContainer" style="display: <?php echo ($form == 'OTHER') ? 'block' : 'none'; ?>;">
                                <label for="custom_name" class="form-label">Custom Class Name</label>
                                <input type="text" class="form-control" id="custom_name" name="custom_name" value="<?php echo $customName; ?>">
                            </div>
                            <input type="hidden" id="name" name="name" value="<?php echo $class['name']; ?>">
                            <div class="mb-3">
                                <label for="term" class="form-label">Term</label>
                                <select class="form-select" id="term" name="term" required>
                                    <option value="">Select Term</option>
                                    <option value="Term 1" <?php echo ($class['term'] == 'Term 1') ? 'selected' : ''; ?>>Term 1</option>
                                    <option value="Term 2" <?php echo ($class['term'] == 'Term 2') ? 'selected' : ''; ?>>Term 2</option>
                                    <option value="Term 3" <?php echo ($class['term'] == 'Term 3') ? 'selected' : ''; ?>>Term 3</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="year" class="form-label">Year</label>
                                <input type="number" class="form-control" id="year" name="year" min="2000" max="2100" value="<?php echo $class['year']; ?>" required>
                            </div>
                            <div class="d-flex justify-content-between">
                                <a href="classes.php" class="btn btn-secondary">Cancel</a>
                                <button type="submit" name="submit_class" class="btn btn-primary">Update Class</button>
                            </div>
                        </form>
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
                    nameInput.value = '<?php echo $class['name']; ?>';
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

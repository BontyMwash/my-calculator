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
$imported = 0;
$skipped = 0;
$errors = 0;

// Find the class ID for FORM 2 STANFORD
$stmt = $conn->prepare("SELECT id FROM classes WHERE name = 'FORM 2 STANFORD'");
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    $message = '<div class="alert alert-danger">Class FORM 2 STANFORD not found. Please run the setup_classes.php script first.</div>';
} else {
    $classRow = $result->fetch_assoc();
    $classId = $classRow['id'];
    
    // Student data from the image
    $students = [
        ['admission_number' => '12649', 'name' => 'JOSHUA MUSYOKA KENYA', 'gender' => 'Male'],
        ['admission_number' => '12658', 'name' => 'ZACHARIA GATOGO KINGORI', 'gender' => 'Male'],
        ['admission_number' => '12656', 'name' => 'DANSON MUGAMBI RITHIA', 'gender' => 'Male'],
        ['admission_number' => '12419', 'name' => 'KARAGU LEWIS MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12547', 'name' => 'NDERITU LINKON MATHENGE', 'gender' => 'Male'],
        ['admission_number' => '12633', 'name' => 'MUTURI JUSTIN KARANJA', 'gender' => 'Male'],
        ['admission_number' => '12684', 'name' => 'PATRICK IRUNGU KAMAU', 'gender' => 'Male'],
        ['admission_number' => '12527', 'name' => 'WAMBAA SAMUEL CHEGE', 'gender' => 'Male'],
        ['admission_number' => '12651', 'name' => 'KAIYA LEON SIMON MUCHAA', 'gender' => 'Male'],
        ['admission_number' => '12640', 'name' => 'AMOS MAINA MUGUNA', 'gender' => 'Male'],
        ['admission_number' => '12269', 'name' => 'MWANGI SAMUEL IRUNGU', 'gender' => 'Male'],
        ['admission_number' => '12614', 'name' => 'WAITITU ELVIS MACHARIA', 'gender' => 'Male'],
        ['admission_number' => '12630', 'name' => 'GITHOMI SAMUEL MBUGUA', 'gender' => 'Male'],
        ['admission_number' => '12706', 'name' => 'Brian Mwangi Ngugi', 'gender' => 'Male'],
        ['admission_number' => '12559', 'name' => 'KAMAU AUSTINE MAINA', 'gender' => 'Male'],
        ['admission_number' => '12638', 'name' => 'KARANI KELVIN MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12240', 'name' => 'GATAUA JOHN NDUATI', 'gender' => 'Male'],
        ['admission_number' => '12444', 'name' => 'Charles Kariuki Macharia', 'gender' => 'Male'],
        ['admission_number' => '12462', 'name' => 'SAMUEL GITAU MURAGE', 'gender' => 'Male'],
        ['admission_number' => '12671', 'name' => 'DAVID THORE WAMBUI', 'gender' => 'Male'],
        ['admission_number' => '12635', 'name' => 'Murugo Austin Ngugi', 'gender' => 'Male'],
        ['admission_number' => '12619', 'name' => 'IRUNGU KELVIN MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12644', 'name' => 'PATRICK KIMIRI MBURU', 'gender' => 'Male'],
        ['admission_number' => '12337', 'name' => 'MWANGI MAXWELL KAHURIA', 'gender' => 'Male'],
        ['admission_number' => '12335', 'name' => 'CHARLES WANGAI GITHINJI', 'gender' => 'Male'],
        ['admission_number' => '12343', 'name' => 'KARINGA BLESSIOUS MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12336', 'name' => 'MWIRARIA BRAISON KIMANI', 'gender' => 'Male'],
        ['admission_number' => '12427', 'name' => 'MWANGI LOUIS KIMARI', 'gender' => 'Male'],
        ['admission_number' => '12395', 'name' => 'NGUGI JEFF MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12682', 'name' => 'MAINA ALVIN MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12405', 'name' => 'NYAMBURA STANLEY CHEGE', 'gender' => 'Male'],
        ['admission_number' => '12669', 'name' => 'DANCAN MWANGI NDEGWA', 'gender' => 'Male'],
        ['admission_number' => '12610', 'name' => 'LEVIS MWANGI IRUNGU', 'gender' => 'Male'],
        ['admission_number' => '12683', 'name' => 'KIRUBI LINUS MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12645', 'name' => 'JOHN GITHUMBI MUNGE', 'gender' => 'Male'],
        ['admission_number' => '12292', 'name' => 'JOHN MUIRURI KURIA', 'gender' => 'Male'],
        ['admission_number' => '12483', 'name' => 'KIHUNYU JAMES KAMAU', 'gender' => 'Male'],
        ['admission_number' => '12268', 'name' => 'NDIRANGU DAVID THUO', 'gender' => 'Male'],
        ['admission_number' => '12557', 'name' => 'MWANGI DAVIN KIMANI', 'gender' => 'Male'],
        ['admission_number' => '12602', 'name' => 'MWANGI VICTOR NJOGU', 'gender' => 'Male'],
        ['admission_number' => '12624', 'name' => 'NJIHIA JOHN NDIRANGU', 'gender' => 'Male'],
        ['admission_number' => '12398', 'name' => 'THIONG\'O ERIC MWATI', 'gender' => 'Male'],
        ['admission_number' => '12349', 'name' => 'NJERI LEE ROY MAINA', 'gender' => 'Male'],
        ['admission_number' => '12308', 'name' => 'Macharia John Mwangi', 'gender' => 'Male'],
        ['admission_number' => '12258', 'name' => 'IRUNGU JOHNSTON MWANGI', 'gender' => 'Male'],
        ['admission_number' => '12426', 'name' => 'OLAKITAR CYRUS EKAKORO', 'gender' => 'Male'],
        ['admission_number' => '12434', 'name' => 'NDEGWA STEPHEN MAINA', 'gender' => 'Male'],
        ['admission_number' => '12435', 'name' => 'KAGAI BRIAN MUNENE', 'gender' => 'Male'],
        ['admission_number' => '12661', 'name' => 'WAINA ORION GATUNI', 'gender' => 'Male']
    ];
    
    // Check if processing form submission
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['import'])) {
        // Import students
        foreach ($students as $student) {
            // Check if student already exists by admission number
            $stmt = $conn->prepare("SELECT id FROM students WHERE admission_number = ?");
            $stmt->bind_param("s", $student['admission_number']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                // Student already exists, skip
                $skipped++;
            } else {
                // Insert new student
                $stmt = $conn->prepare("INSERT INTO students (admission_number, name, gender, class_id, date_of_birth) VALUES (?, ?, ?, ?, '2000-01-01')");
                $stmt->bind_param("sssi", $student['admission_number'], $student['name'], $student['gender'], $classId);
                
                if ($stmt->execute()) {
                    $imported++;
                } else {
                    $errors++;
                }
            }
        }
        
        if ($errors > 0) {
            $message = '<div class="alert alert-warning">Imported ' . $imported . ' students, skipped ' . $skipped . ' existing students, and encountered ' . $errors . ' errors.</div>';
        } else {
            $message = '<div class="alert alert-success">Successfully imported ' . $imported . ' students and skipped ' . $skipped . ' existing students.</div>';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Import Students - Student Attendance Register</title>
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
                    <li class="nav-item">
                        <a class="nav-link" href="classes.php">Classes</a>
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
                        <h4 class="mb-0">Import Students - FORM 2 STANFORD</h4>
                        <a href="students.php" class="btn btn-light btn-sm">Back to Students</a>
                    </div>
                    <div class="card-body">
                        <?php echo $message; ?>
                        
                        <form method="post" action="">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped">
                                    <thead class="table-primary">
                                        <tr>
                                            <th>Admission Number</th>
                                            <th>Name</th>
                                            <th>Gender</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($students as $student): ?>
                                            <tr>
                                                <td><?php echo $student['admission_number']; ?></td>
                                                <td><?php echo $student['name']; ?></td>
                                                <td><?php echo $student['gender']; ?></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="mt-3">
                                <p>Total students to import: <?php echo count($students); ?></p>
                                <button type="submit" name="import" class="btn btn-primary">
                                    <i class="bi bi-upload"></i> Import Students
                                </button>
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
</body>
</html>

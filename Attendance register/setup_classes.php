<?php
// Setup script to pre-populate the database with classes and streams
require_once 'config/database.php';

// Define the classes and streams
$classes = [
    'FORM 2' => [
        'CAMBRIDGE', 'STANFORD', 'YALE', 'PRINCETON', 'HARVARD', 
        'ZURICH', 'EDINBERG', 'BOSTON', 'OXFORD'
    ],
    'FORM 3' => [
        'CAMBRIDGE', 'STANFORD', 'YALE', 'HARVARD', 'EDINBERG', 'OXFORD'
    ],
    'FORM 4' => [
        'CAMBRIDGE', 'STANFORD', 'YALE', 'HARVARD', 'EDINBERG', 'OXFORD'
    ]
];

// Get the teacher ID (assuming the first teacher in the database)
$result = $conn->query("SELECT id FROM teachers LIMIT 1");
if ($result->num_rows == 0) {
    die("No teachers found in the database. Please login first to create a teacher account.");
}
$teacher = $result->fetch_assoc();
$teacherId = $teacher['id'];

// Current year and term
$currentYear = date('Y');
$currentTerm = 'Term 2'; // You can change this as needed

// Function to check if a class already exists
function classExists($conn, $name) {
    $stmt = $conn->prepare("SELECT id FROM classes WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    return $result->num_rows > 0;
}

// Insert classes and streams
$classesAdded = 0;
$classesSkipped = 0;

foreach ($classes as $form => $streams) {
    foreach ($streams as $stream) {
        $className = "$form $stream";
        
        // Check if class already exists
        if (!classExists($conn, $className)) {
            // Insert the class
            $stmt = $conn->prepare("INSERT INTO classes (name, term, year, teacher_id) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssii", $className, $currentTerm, $currentYear, $teacherId);
            
            if ($stmt->execute()) {
                echo "Added class: $className<br>";
                $classesAdded++;
            } else {
                echo "Error adding class $className: " . $stmt->error . "<br>";
            }
        } else {
            echo "Class $className already exists. Skipped.<br>";
            $classesSkipped++;
        }
    }
}

echo "<hr>";
echo "Summary: Added $classesAdded new classes, skipped $classesSkipped existing classes.";
echo "<hr>";
echo "<a href='classes.php' class='btn btn-primary'>Go to Classes</a>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup Classes - Student Attendance Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #0d6efd;
            margin-bottom: 20px;
        }
        hr {
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Setup Classes</h1>
        <!-- PHP output will appear here -->
    </div>
</body>
</html>

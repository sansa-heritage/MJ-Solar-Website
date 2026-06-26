<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS Headers
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit();
}

$id = isset($input['id']) ? intval($input['id']) : 0;

if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid ID']);
    exit();
}

// Database configuration - UPDATE THESE
$host = 'localhost';
$dbname = 'mj_energy';
$username = 'root';
$password = 'root'; // Change this to your MySQL password

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM contact_submissions WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Submission deleted successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Delete failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS Headers - Must be first!
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit();
}

$id = isset($input['id']) ? intval($input['id']) : 0;
$status = isset($input['status']) ? $input['status'] : 'pending';

if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'Invalid ID']);
    exit();
}

// Database configuration - UPDATE THESE
$host = 'localhost';
$dbname = 'mj_energy';
$username = 'root';
$password = 'root'; // Change this to your MySQL password

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    exit();
}

// Update status
$stmt = $conn->prepare("UPDATE contact_submissions SET status = ? WHERE id = ?");
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Status updated successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Update failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
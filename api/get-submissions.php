<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$host = 'localhost';
$dbname = 'mj_energy';
$username = 'root';
$password = 'root'; // Change to your MySQL password

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit();
}

$result = $conn->query("SELECT * FROM contact_submissions ORDER BY id DESC");

$submissions = [];
while ($row = $result->fetch_assoc()) {
    $submissions[] = $row;
}

echo json_encode(['success' => true, 'data' => $submissions]);

$conn->close();

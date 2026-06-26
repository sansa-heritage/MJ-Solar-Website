<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: text/html");

// Update these with your actual MySQL Workbench credentials
$host = 'localhost';
$port = 3306; // Default MySQL port
$username = 'root'; // Your MySQL username
$password = 'root'; // YOUR ACTUAL MySQL Workbench password
$dbname = 'mj_energy';

echo "<h2>Testing MySQL Connection</h2>";

// Test connection without database
$conn = new mysqli($host, $username, $password, '', $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "✅ Connected to MySQL Server successfully!<br>";

// Check if database exists
if ($conn->select_db($dbname)) {
    echo "✅ Database '$dbname' exists<br>";
} else {
    echo "⚠️ Database '$dbname' does not exist. Creating it...<br>";
    $conn->query("CREATE DATABASE IF NOT EXISTS $dbname");
    $conn->select_db($dbname);
    echo "✅ Database created<br>";
}

// Check if table exists
$table_check = $conn->query("SHOW TABLES LIKE 'contact_submissions'");
if ($table_check->num_rows > 0) {
    echo "✅ Table 'contact_submissions' exists<br>";
    
    // Show table structure
    $result = $conn->query("DESCRIBE contact_submissions");
    echo "<br>Table structure:<br>";
    echo "<table border='1' cellpadding='5'>";
    echo "<tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['Field'] . "</td>";
        echo "<td>" . $row['Type'] . "</td>";
        echo "<td>" . $row['Null'] . "</td>";
        echo "<td>" . $row['Key'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "❌ Table 'contact_submissions' does not exist!<br>";
    echo "Please create it using MySQL Workbench with the SQL provided earlier.";
}

$conn->close();
?>
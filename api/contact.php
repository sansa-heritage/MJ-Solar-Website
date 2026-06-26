<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// ========== DATABASE CONFIGURATION - UPDATE THESE ==========
$host = 'localhost';
$port = 3306; // Default MySQL port
$dbname = 'mj_energy';
$username = 'root'; // Your MySQL username
$password = 'root'; // ⚠️ CHANGE THIS TO YOUR MYSQL WORKBENCH PASSWORD

// ========== EMAIL CONFIGURATION ==========
$admin_email = 'maajogomayaenergy@gmail.com';
$company_name = 'MAA JOGOMAYA ENERGY';
$from_email = 'noreply@maajogomayaenergy.com';

try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) $input = $_POST;
    
    // Validate required fields
    $required_fields = ['name', 'phone', 'email', 'city', 'message'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            throw new Exception("Please fill all required fields");
        }
    }
    
    // Sanitize inputs
    $name = htmlspecialchars(strip_tags(trim($input['name'])));
    $phone = htmlspecialchars(strip_tags(trim($input['phone'])));
    $email = htmlspecialchars(strip_tags(trim($input['email'])));
    $city = htmlspecialchars(strip_tags(trim($input['city'])));
    $message = htmlspecialchars(strip_tags(trim($input['message'])));
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email address");
    }
    
    // Validate phone
    $phone_clean = preg_replace('/[^0-9]/', '', $phone);
    if (strlen($phone_clean) < 10 || strlen($phone_clean) > 13) {
        throw new Exception("Please enter a valid phone number (10-13 digits)");
    }
    
    // ========== DATABASE CONNECTION ==========
    // Connect with port
    $conn = new mysqli($host, $username, $password, $dbname, $port);
    
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }
    
    $conn->set_charset("utf8mb4");
    
    // Prepare and execute insert
    $stmt = $conn->prepare("INSERT INTO contact_submissions (name, phone, email, city, message, ip_address, user_agent, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')");
    $stmt->bind_param("sssssss", $name, $phone, $email, $city, $message, $ip_address, $user_agent);
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to save data to database: " . $stmt->error);
    }
    
    $inserted_id = $stmt->insert_id;
    $stmt->close();
    $conn->close();
    
    // ========== SEND EMAILS ==========
    
    // Email to Admin (HTML Format)
    $admin_subject = "New Contact Form Submission - #$inserted_id";
    $admin_message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #5B3DF5, #7B4DFF); padding: 20px; text-align: center; color: white; }
            .content { padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { background: #f5f5f5; padding: 8px; border-radius: 6px; margin-top: 5px; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>✨ New Contact Request</h2>
                <p>$company_name</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>📋 Query ID:</div>
                    <div class='value'>#$inserted_id</div>
                </div>
                <div class='field'>
                    <div class='label'>👤 Name:</div>
                    <div class='value'>$name</div>
                </div>
                <div class='field'>
                    <div class='label'>📞 Phone:</div>
                    <div class='value'>$phone</div>
                </div>
                <div class='field'>
                    <div class='label'>✉️ Email:</div>
                    <div class='value'>$email</div>
                </div>
                <div class='field'>
                    <div class='label'>🏙️ City:</div>
                    <div class='value'>$city</div>
                </div>
                <div class='field'>
                    <div class='label'>💬 Message:</div>
                    <div class='value'>" . nl2br($message) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>🌐 IP Address:</div>
                    <div class='value'>$ip_address</div>
                </div>
            </div>
            <div class='footer'>
                <p>Submitted on " . date('Y-m-d H:i:s') . "</p>
                <p>© " . date('Y') . " $company_name</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: $company_name <$from_email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    $admin_mail_sent = @mail($admin_email, $admin_subject, $admin_message, $headers);
    
    // Auto-reply to Customer
    $customer_subject = "Thank you for contacting $company_name";
    $customer_message = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 500px; margin: auto; padding: 20px; text-align: center; }
            .header { background: linear-gradient(135deg, #5B3DF5, #7B4DFF); padding: 20px; color: white; border-radius: 12px 12px 0 0; }
            .content { padding: 20px; }
            .info { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Thank You, $name! 🙏</h2>
            </div>
            <div class='content'>
                <p>We have received your inquiry and will get back to you within <strong>24 hours</strong>.</p>
                <div class='info'>
                    <p><strong>📋 Query ID:</strong> #$inserted_id</p>
                    <p><strong>📞 Need immediate help?</strong><br>Call: <strong>+91 8280508088</strong></p>
                    <p><strong>📧 Email:</strong> maajogomayaenergy@gmail.com</p>
                </div>
                <p>Best regards,<br><strong>$company_name Team</strong></p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $customer_headers = "MIME-Version: 1.0\r\n";
    $customer_headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $customer_headers .= "From: $company_name <$from_email>\r\n";
    
    $customer_mail_sent = @mail($email, $customer_subject, $customer_message, $customer_headers);
    
    // ========== SUCCESS RESPONSE ==========
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your query has been submitted successfully. Our team will contact you soon.',
        'query_id' => $inserted_id,
        'database_saved' => true,
        'emails_sent' => [
            'admin' => $admin_mail_sent,
            'customer' => $customer_mail_sent
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} catch (Error $e) {
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred: ' . $e->getMessage()
    ]);
}
?>
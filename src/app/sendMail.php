<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204); // No Content
  exit();
}

// Get POST data
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

$name = isset($data['name']) ? $data['name'] : 'No Name Provided';
$message = isset($data['message']) ? $data['message'] : 'No Message Provided';

// Email details
$to = ""; // ✅ Replace with your actual email address
$subject = "New Form Submission Received";

$body = "You have received a new form submission:\n\n";
$body .= "Name: $name\n";
$body .= "Message:\n$message\n";

$headers = "From: noreply@yourdomain.com" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Send mail
if (mail($to, $subject, $body, $headers)) {
  echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
} else {
  echo json_encode(['success' => false, 'message' => 'Email sending failed.']);
}
?>

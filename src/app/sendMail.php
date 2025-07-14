<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

$name = isset($data['name']) ? $data['name'] : '';
$message = isset($data['message']) ? $data['message'] : '';

// Email details
$to = "receiver@example.com";
$subject = "Test Email via MailHog";
$body = "Name: $name\nMessage: $message";
$headers = "From: noreply@yourdomain.com";

// Send mail
if (mail($to, $subject, $body, $headers)) {
  file_put_contents(__DIR__ . '/mailhog_debug.log', "Mail sent successfully.\n", FILE_APPEND);
  echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);
} else {
  file_put_contents(__DIR__ . '/mailhog_debug.log', "Mail sending failed.\n", FILE_APPEND);
  echo json_encode(['success' => false, 'message' => 'Email sending failed.']);
}
?>

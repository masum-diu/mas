<?php
// Set max execution time to 30 seconds for mail operations
set_time_limit(30);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $message = $input['message'] ?? '';
    $appointmentDate = $input['appointmentDate'] ?? '';

    // Email configuration
    $to = 'info@masoutfits.com';
    $subject = "New Contact Form Submission from $name";

    $emailBody = "
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> $name</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Phone:</strong> $phone</p>
    <p><strong>Appointment Date:</strong> " . ($appointmentDate ?: 'Not specified') . "</p>
    <p><strong>Message:</strong><br> $message</p>
    <hr>
    <p><em>This message was sent from the MAS Outfits contact form.</em></p>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: info@masoutfits.com" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";

    if (mail($to, $subject, $emailBody, $headers)) {
        echo json_encode(['message' => 'Email sent successfully!']);
    } else {
        echo json_encode(['message' => 'Failed to send email. Please try again.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method Not Allowed']);
}

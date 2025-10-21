<?php
// Set max execution time to 30 seconds for mail operations
set_time_limit(30);

// Simple email sending script
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $name = $input['name'] ?? '';
    $email = $input['email'] ?? '';
    $phone = $input['phone'] ?? '';
    $message = $input['message'] ?? '';
    $appointmentDate = $input['appointmentDate'] ?? '';

    $to = 'info@masoutfits.com';
    $subject = "Contact Form: $name";
    $body = "Name: $name\nEmail: $email\nPhone: $phone\nDate: $appointmentDate\nMessage: $message";

    $headers = "From: $email\r\nReply-To: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

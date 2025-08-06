<?php

exit();

if (!isset($user)) {
    echo "No user data provided.";
    exit;
}


// Format email content with user data
$to = $user['email']; // Only the user's email in the "To" field
$subject = "Registrierung Alemannen Cup 2025 | Registration Alemannen Cup 2025"; // Email subject

// Use heredoc for better readability
$message = <<<HTML
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <p>Hallo {$user['vorname']} {$user['nachname']},</p>

    <p>Vielen Dank für deine Anmeldung, diese wird an die Turnierleitung übermittelt und spätestens <strong>innerhalb einer Woche</strong> bearbeitet.</p>
    <p>Die Meldung gilt erst als bestätigt, wenn sie hier (<a href="https://dbv.turnier.de/sport/events.aspx?id=8e25686d-193f-4971-a464-fd9d6a9af5cc">Link</a>) veröffentlicht wurde und nicht als "Nachrücker" gekennzeichnet ist. Sollte deine Meldung nicht innerhalb einer Woche dort zu finden sein, melde dich bitte unter:</p>
    <p><a href="mailto:anmeldung@alemannen-cup.de">anmeldung@alemannen-cup.de</a></p>

    <p>Hier sind die Details:</p>
    <ul>
        <li><strong>Geschlecht:</strong> {$user['geschlecht']}</li>
        <li><strong>Vorname:</strong> {$user['vorname']}</li>
        <li><strong>Nachname:</strong> {$user['nachname']}</li>
        <li><strong>Verein:</strong> {$user['verein']}</li>
        <li><strong>Spieler-ID:</strong> {$user['spieler_id']}</li>
        <li><strong>Handynummer:</strong> {$user['handynummer']}</li>
        <li><strong>E-Mail:</strong> {$user['email']}</li>
        <br>
        <li><strong>Einzel:</strong> {$user['einzel']}</li>
    </ul>

    <p><strong>Mixed:</strong></p>
    <ul>
        <li>Teilnahme: {$user['mixed']}</li>
        <li>Vorname: {$user['mixed_vorname']}</li>
        <li>Nachname: {$user['mixed_nachname']}</li>
        <li>Verein: {$user['mixed_verein']}</li>
        <li>Spieler-ID: {$user['mixed_spieler_id']}</li>
        <li>Handynummer: {$user['mixed_handynummer']}</li>
        <li>E-Mail: {$user['mixed_email']}</li>
    </ul>

    <p><strong>Doppel:</strong></p>
    <ul>
        <li>Teilnahme: {$user['doppel']}</li>
        <li>Vorname: {$user['doppel_vorname']}</li>
        <li>Nachname: {$user['doppel_nachname']}</li>
        <li>Verein: {$user['doppel_verein']}</li>
        <li>Spieler-ID: {$user['doppel_spieler_id']}</li>
        <li>Handynummer: {$user['doppel_handynummer']}</li>
        <li>E-Mail: {$user['doppel_email']}</li>
    </ul>

    <p>Mit freundlichen Grüßen
      <br>
      Alemannen Cup Team
    </p>

    <hr>

    <p>Hello {$user['vorname']} {$user['nachname']},</p>

    <p>Thank you for your registration, it will be forwarded to the tournament management and processed <strong>within a week</strong> at the latest.</p>
    <p>The registration is only confirmed when it is published here (<a href="https://dbv.turnier.de/sport/events.aspx?id=8e25686d-193f-4971-a464-fd9d6a9af5cc">link</a>) and is not marked as "substitute". If your registration is not listed there within a week, please contact:</p>
    <p><a href="mailto:anmeldung@alemannen-cup.de">anmeldung@alemannen-cup.de</a></p>

    <p>Here are the details:</p>
    <ul>
        <li><strong>Gender:</strong> {$user['geschlecht']}</li>
        <li><strong>Name:</strong> {$user['vorname']} {$user['nachname']}</li>
        <li><strong>Club:</strong> {$user['verein']}</li>
        <li><strong>Player ID:</strong> {$user['spieler_id']}</li>
        <li><strong>Phone Number:</strong> {$user['handynummer']}</li>
        <li><strong>Email:</strong> {$user['email']}</li>
        <br>
        <li><strong>Singles:</strong> {$user['einzel']}</li>
    </ul>

    <p><strong>Mixed:</strong></p>
    <ul>
        <li>Participation: {$user['mixed']}</li>
        <li>First Name: {$user['mixed_vorname']}</li>
        <li>Last Name: {$user['mixed_nachname']}</li>
        <li>Club: {$user['mixed_verein']}</li>
        <li>Player ID: {$user['mixed_spieler_id']}</li>
        <li>Phone Number: {$user['mixed_handynummer']}</li>
        <li>Email: {$user['mixed_email']}</li>
    </ul>

    <p><strong>Doubles:</strong></p>
    <ul>
        <li>Participation: {$user['doppel']}</li>
        <li>First Name: {$user['doppel_vorname']}</li>
        <li>Last Name: {$user['doppel_nachname']}</li>
        <li>Club: {$user['doppel_verein']}</li>
        <li>Player ID: {$user['doppel_spieler_id']}</li>
        <li>Phone Number: {$user['doppel_handynummer']}</li>
        <li>Email: {$user['doppel_email']}</li>
    </ul>

    <p>If you have any questions, feel free to reach out to us: <a href="mailto:anmeldung@alemannen-cup.de">anmeldung@alemannen-cup.de</a>.</p>

    <p>Best regards,<br>Alemannen Cup Team</p>
</body>
</html>
HTML;

// Set email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: anmeldung@alemannen-cup.de\r\n";
$headers .= "Reply-To: anmeldung@alemannen-cup.de\r\n";
$headers .= "BCC: ma.goldschmidt@web.de, anmeldung@alemannen-cup.de\r\n"; // Add additional recipient in BCC

// Send the email
if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Failed to send email.";
}
?>

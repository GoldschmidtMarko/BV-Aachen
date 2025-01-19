<?php
if (!isset($user)) {
    echo "No user data provided.";
    exit;
}

// Format email content with user data
$to = $user['email']; // Only the user's email in the "To" field
$subject = "Registration Confirmation";
$message = "
    Hallo {$user['vorname']} {$user['nachname']},

    Vielen Dank fuer die Registrierung. Hier sind die Details:

    Geschlecht: {$user['geschlecht']}
    Name: {$user['vorname']} {$user['nachname']}
    Verein: {$user['verein']}
    Spieler-ID: {$user['spieler_id']}
    Einzel: {$user['einzel']}

    Mixed:
      - Teilnahme: {$user['mixed']}
      - Vorname: {$user['mixed_vorname']}
      - Nachname: {$user['mixed_nachname']}
      - Verein: {$user['mixed_verein']}
      - Spieler-ID: {$user['mixed_spieler_id']}
      - E-Mail: {$user['mixed_email']}
      - Handynummer: {$user['mixed_handynummer']}

    Doppel:
      - Teilnahme: {$user['doppel']}
      - Vorname: {$user['doppel_vorname']}
      - Nachname: {$user['doppel_nachname']}
      - Verein: {$user['doppel_verein']}
      - Spieler-ID: {$user['doppel_spieler_id']}
      - E-Mail: {$user['doppel_email']}
      - Handynummer: {$user['doppel_handynummer']}

    Wenn Sie Fragen haben, koennen Sie sich gerne an uns wenden: anmeldung@alemannen-cup.de.

    Mfg,
    Ihr Alemannen Cup Team

    ---

    Hello {$user['vorname']} {$user['nachname']},

    Thank you for registering. Here are your details:

    Gender: {$user['geschlecht']}
    Name: {$user['vorname']} {$user['nachname']}
    Club: {$user['verein']}
    Player ID: {$user['spieler_id']}
    Singles: {$user['einzel']}

    Mixed:
      - Participation: {$user['mixed']}
      - First Name: {$user['mixed_vorname']}
      - Last Name: {$user['mixed_nachname']}
      - Club: {$user['mixed_verein']}
      - Player ID: {$user['mixed_spieler_id']}
      - Email: {$user['mixed_email']}
      - Phone Number: {$user['mixed_handynummer']}

    Doubles:
      - Participation: {$user['doppel']}
      - First Name: {$user['doppel_vorname']}
      - Last Name: {$user['doppel_nachname']}
      - Club: {$user['doppel_verein']}
      - Player ID: {$user['doppel_spieler_id']}
      - Email: {$user['doppel_email']}
      - Phone Number: {$user['doppel_handynummer']}

    If you have any questions, feel free to reach out to us: anmeldung@alemannen-cup.de.

    Best regards,
    Alemannen Cup Team
";



$headers = "From: anmeldung@alemannen-cup.de\r\n" .
           "Reply-To: anmeldung@alemannen-cup.de\r\n" .
           "BCC: ma.goldschmidt@web.de, anmeldung@alemannen-cup.de\r\n" . // Add the additional recipient in BCC
           "X-Mailer: PHP/" . phpversion();

// Send the email
if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Failed to send email.";
}
?>

<?php
// Database credentials
require_once 'db_config.php';
// exit();
try {
    // Connect to the database
    $host = $db_credentials['host'];
    $dbname = $db_credentials['dbname'];
    $username = $db_credentials['username'];
    $password = $db_credentials['password'];
    
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get form data
        $required_fields = ['vorname', 'nachname', 'geschlecht', 'verein', 'email', 'handynummer', 'einzel', 'mixed', 'doppel'];
        $optional_fields = [
            'spieler_id',
            'mixed_vorname', 'mixed_nachname', 'mixed_verein', 'mixed_spieler_id', 'mixed_email', 'mixed_handynummer',
            'doppel_vorname', 'doppel_nachname', 'doppel_verein', 'doppel_spieler_id', 'doppel_email', 'doppel_handynummer',
        ];

        // Check required fields
        foreach ($required_fields as $field) {
            if (empty($_POST[$field])) {
                throw new Exception("The field '{$field}' is required.");
            }
        }

        // Retrieve data from the POST request
        $data = [];
        foreach (array_merge($required_fields, $optional_fields) as $field) {
            $data[$field] = $_POST[$field] ?? null; // Set optional fields to null if not provided
        }

        // Prepare and execute the SQL query
        $stmt = $conn->prepare("
            INSERT INTO users (
                vorname, nachname, geschlecht, verein, spieler_id, email, handynummer, 
                einzel, mixed, mixed_vorname, mixed_nachname, mixed_verein, mixed_spieler_id, mixed_email, mixed_handynummer,
                doppel, doppel_vorname, doppel_nachname, doppel_verein, doppel_spieler_id, doppel_email, doppel_handynummer
            ) 
            VALUES (
                :vorname, :nachname, :geschlecht, :verein, :spieler_id, :email, :handynummer, 
                :einzel, :mixed, :mixed_vorname, :mixed_nachname, :mixed_verein, :mixed_spieler_id, :mixed_email, :mixed_handynummer,
                :doppel, :doppel_vorname, :doppel_nachname, :doppel_verein, :doppel_spieler_id, :doppel_email, :doppel_handynummer
            )
        ");

        // Bind parameters dynamically
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
        }

        $stmt->execute();

        // Get the last inserted ID
        $last_id = $conn->lastInsertId();

        // Retrieve the inserted record
        $stmt = $conn->prepare("SELECT * FROM users WHERE idPrimary = :id");
        $stmt->bindParam(':id', $last_id, PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Include email.php and send the email
        ob_start();
        include 'email.php';
        ob_end_clean();

        header('Location: ../success.html');
        exit;
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

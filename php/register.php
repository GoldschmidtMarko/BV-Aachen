<?php
// Database credentials
require_once 'php/db_config.php';

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
        $required_fields = ['vorname', 'nachname', 'geschlecht', 'verein', 'spieler_id', 'league', 'email', 'handynummer', 'einzel', 'mixed', 'doppel'];
        $optional_fields = [
            'mixed-vorname', 'mixed-nachname', 'mixed-verein', 'mixed-spieler_id', 'mixed-league',
            'doppel-vorname', 'doppel-nachname', 'doppel-verein', 'doppel-spieler_id', 'doppel-league'
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
                vorname, nachname, geschlecht, verein, spieler_id, league, email, handynummer, 
                einzel, mixed, mixed_vorname, mixed_nachname, mixed_verein, mixed_spieler_id, mixed_league, 
                doppel, doppel_vorname, doppel_nachname, doppel_verein, doppel_spieler_id, doppel_league
            ) 
            VALUES (
                :vorname, :nachname, :geschlecht, :verein, :spieler_id, :league, :email, :handynummer, 
                :einzel, :mixed, :mixed_vorname, :mixed_nachname, :mixed_verein, :mixed_spieler_id, :mixed_league, 
                :doppel, :doppel_vorname, :doppel_nachname, :doppel_verein, :doppel_spieler_id, :doppel_league
            )
        ");

        // Bind parameters dynamically
        foreach ($data as $key => $value) {
            $stmt->bindValue(':' . $key, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
        }

        $stmt->execute();

        echo "Registered successfully!";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

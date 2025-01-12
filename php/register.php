<?php
// Database credentials
require_once 'php/db_config.php';

try {
    // Connect to the database
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get form data
        $vorname = $_POST['vorname'];
        $nachname = $_POST['nachname'];
        $geschlecht = $_POST['geschlecht'];
        $verein = $_POST['verein'];
        $spieler_id = $_POST['spieler_id'];
        $league = $_POST['league'];
        $email = $_POST['email'];
        $handynummer = $_POST['handynummer'];

        // Prepare and execute the SQL query
        $stmt = $conn->prepare("INSERT INTO users (vorname, nachname, geschlecht, verein, spieler_id, league, email, handynummer) 
                                VALUES (:vorname, :nachname, :geschlecht, :verein, :spieler_id, :league, :email, :handynummer)");
        $stmt->bindParam(':vorname', $vorname);
        $stmt->bindParam(':nachname', $nachname);
        $stmt->bindParam(':geschlecht', $geschlecht);
        $stmt->bindParam(':verein', $verein);
        $stmt->bindParam(':spieler_id', $spieler_id);
        $stmt->bindParam(':league', $league, PDO::PARAM_INT);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':handynummer', $handynummer);

        $stmt->execute();

        echo "User registered successfully!";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>

import mysql.connector
from mysql.connector import Error

def get_credentials_from_file(file_path):
    credentials = {}
    try:
        with open(file_path, 'r') as file:
            for line in file:
                # Split key-value pairs by '='
                key, value = line.strip().split('=', 1)
                credentials[key] = value
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
    except Exception as e:
        print(f"Error reading credentials file: {e}")
    return credentials

def connect_to_database(credentials):
    try:
        # Connect to the MySQL database using the credentials
        connection = mysql.connector.connect(
            host=credentials.get('host'),
            port=3306,  # Default MySQL port
            database=credentials.get('dbname'),
            user=credentials.get('username'),
            password=credentials.get('password')
        )
        if connection.is_connected():
            print("Connected to the database successfully!")
            return connection
    except Error as e:
        print(f"Error connecting to database: {e}")
    return None

# Main execution
file_path = 'pythonscripts/db_credentials.txt'  # Path to the credentials file

# Fetch credentials from the text file
credentials = get_credentials_from_file(file_path)

if credentials:
    # Connect to the database
    db_connection = connect_to_database(credentials)

    # Close the connection if successful
    if db_connection:
        db_connection.close()
        print("Database connection closed.")

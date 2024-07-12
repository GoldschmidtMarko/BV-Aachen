import os
import sys
from ftplib import FTP
import subprocess

SECRET_HOST_NAME = os.getenv('SECRET_HOST_NAME')
SECRET_PASSWORD = os.getenv('SECRET_PASSWORD')
SECRET_USER_NAME = os.getenv('SECRET_USER_NAME')

upload_folder = "test"

uploadable_file_names = ["alemannencup.html",
                         "datenschutz.html",
                          "FAQ.html",
                          "impressum.html",
                          "index.html",
                          "kontakt.html",
                          "teams.html",
                          "training.html",
                          "verein.html",
                          # folders
                          "files",
                          "images",
                          "javascript",
                          "styles",
                          "startpage.mp4"]


# Function to upload a file
def upload_file(ftp, local_file_path, remote_file_path):
    with open(local_file_path, 'rb') as file:
        ftp.storbinary(f'STOR {remote_file_path}', file)
    
    
# Function to delete a file
def delete_file(ftp, file_path):
    try:
        ftp.delete(file_path)
        print(f'Deleted {file_path} from the FTP server.')
    except Exception as e:
        print(f'Could not delete {file_path} from the FTP server: {e}')

# Function to recursively delete files in a folder on FTP
def delete_folder_contents(ftp, folder_path):
    try:
        # Change to the upload_folder directory
        ftp.cwd(folder_path)

        # List files and directories in the current directory
        dir_contents = ftp.nlst()

        # Iterate through each file/directory
        for item in dir_contents:
          if item == '.' or item == '..':
            continue
          
          try:
              # Try to delete the item (file or directory)
              ftp.delete(item)  # Try to delete file
              print(f'Deleted file: {item}')
          except Exception as e:
              try:
                  # If it's a directory, recursively delete its contents
                  delete_folder_contents(ftp, f'{folder_path}/{item}')
                  # After deleting contents, change cwd back to current directory
                  ftp.cwd(folder_path)
                  # Delete the directory itself after its contents are deleted
                  ftp.rmd(item)
                  print(f'Deleted directory: {item}')
              except Exception as e:
                  print(f'Failed to delete {item}: {e}')
                  continue

        print(f'All contents in {folder_path} deleted.')

    except Exception as e:
        print(f'Failed to delete contents in {folder_path}: {e}')
      
      
def can_upload_file(file_name):
  for uploadable_file_name in uploadable_file_names:
    if uploadable_file_name in file_name:
      return True
  return False
  

def main_script():
  try:
    # create FTP server
    print("Creating FTP server")
    ftp = FTP(SECRET_HOST_NAME)

    # login to the server
    print("Logging in to the FTP server")
    ftp.login(user=SECRET_USER_NAME, passwd=SECRET_PASSWORD)
    print("Login successful")
    
    ftp.set_pasv(True)  # Enable passive mode
    print("Set passive mode")
    
    # list the files in the current directory
    root_files = ftp.nlst()
    
    if upload_folder not in root_files:
      # throw error if the folder does not exist
      print("Folder does not exist")
      print("Existing Folders: ", root_files)
      print("Specified Uploading folder", upload_folder)
      raise Exception("Folder does not exist")

    print("Deleting files from the FTP server")
    # Recursively delete files in the upload folder
    delete_folder_contents(ftp, upload_folder)
    
    # Upload all files from the Git repository
    try:
      print("Uploading files to the FTP server")
      repo_root = subprocess.check_output(['git', 'rev-parse', '--show-toplevel']).decode('utf-8').strip()
      for root, _, files in os.walk(repo_root):
            for file in files:
                file_path = os.path.join(root, file)
                # Determine the relative path for FTP upload (assuming it starts after the repo root)
                relative_path = os.path.relpath(file_path, repo_root)
                
                if can_upload_file(file):
                    # Upload the file to FTP
                    upload_file(ftp, file_path, os.path.join(upload_folder, relative_path))
                    print(f'Uploaded {file_path} to FTP server.')
    except Exception as e:
        print(f'Error uploading files to FTP server: {e}')
    



    # close the connection
    print("Closing the FTP server connection")
    ftp.quit()
  except Exception as e:
    print(e)
    print('Error: Unable to connect to the FTP server')
    
print("Script executed")
    
    
  
  
if __name__ == "__main__":
  main_script()


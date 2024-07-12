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
        
def is_ftp_directory(ftp, path):
  current_directory = ftp.pwd()  # Get current working directory
  try:
    ftp.cwd(path)  # Try to change directory to the given path
    ftp.cwd(current_directory)  # Move back to the original directory
    return True
  except Exception as e:
    ftp.cwd(current_directory)  # Move back to the original directory
    return False

# Function to recursively delete files in a folder on FTP
def delete_folder_contents(ftp, folder_path):
  current_files = ftp.nlst()
  if folder_path not in current_files:
    print(f'Folder {folder_path} does not exist on the FTP server.', current_files)
    return
  
  if folder_path == ".." or folder_path == "." or folder_path == "/":
    print(f'Cannot delete root folder name {folder_path}.')
    return
  
  if is_ftp_directory(ftp, folder_path) == False:
    ftp.delete(folder_path)
    print(f'Deleted file: {folder_path}')
  else:
    for file in ftp.nlst(folder_path):
      current_path = ftp.pwd()
      ftp.cwd(folder_path)
      delete_folder_contents(ftp, file)
      ftp.cwd(current_path)
    ftp.rmd(folder_path)
    print(f'Deleted folder: {folder_path}')

      
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
    
    # creating test folder
    print("Creating test folder")
    ftp.mkd(upload_folder)
    
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


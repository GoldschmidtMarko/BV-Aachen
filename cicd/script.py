import os
import sys
from ftplib import FTP
import subprocess

SECRET_HOST_NAME = os.getenv('SECRET_HOST_NAME')
SECRET_PASSWORD = os.getenv('SECRET_PASSWORD')
SECRET_USER_NAME = os.getenv('SECRET_USER_NAME')

SECRET_HOST_NAME = "www.bv-aachen.de"
SECRET_PASSWORD = "ZQsH0PVaeBjVZXy4sHEe"
SECRET_USER_NAME = "ftp_bva@bv-aachen.de"

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
                          "videos",
                          "tailwind.config.js"]


# Function to upload a file
def upload_file(ftp, local_file_path, remote_file_path):
    try:
       with open(local_file_path, 'rb') as file:
        ftp.storbinary(f'STOR {remote_file_path}', file)
    except Exception as e:
        print(f'Failed to upload {local_file_path} to {remote_file_path}, Error: {e}')
    
    
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
  try:
    current_files = ftp.nlst()
    # print(f'Current files: {current_files}')
    # print("Trying to delete: ", folder_path)
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
  except Exception as e:
    print(f'Failed to delete {folder_path}, Error: {e}')

      
def can_upload_file(file_name):
  for uploadable_file_name in uploadable_file_names:
    if uploadable_file_name in file_name:
      return True
  return False
  
def upload_files_recursivly(ftp, local_last_directory, local_full_path, remote_folder_path):
  # print("local_last_directory: ", local_last_directory + " | local_full_path: ", local_full_path + " | remote_folder_path: ", remote_folder_path)
  # Create the folder on the FTP server
  # print("Current working directory: ", ftp.pwd())
  ftp.cwd(local_last_directory)

  
  
  
  # Get list of items (files and directories) in the folder
  items = os.listdir(remote_folder_path)
    
  # getting all immidiate files and directories
  first_level_directories = [item for item in items if os.path.isdir(os.path.join(remote_folder_path, item))]
  first_level_files = [item for item in items if os.path.isfile(os.path.join(remote_folder_path, item))]
  
  # print(f'First level directories: {first_level_directories}')
  # print(f'First level files: {first_level_files}')
  
  for files in first_level_files:
    full_local_path = local_full_path + "/" + files
    if can_upload_file(full_local_path):
      files_path = remote_folder_path + "/" + files
      print(f'Uploading file: {files_path}')
      with open(files_path, 'rb') as file:
        ftp.storbinary(f'STOR {files}', file)
        
  # Recursively upload files in the subdirectories
  for directory in first_level_directories:
    full_local_path = local_full_path + "/" + directory
    # print("full_local_path: ", full_local_path)
    if can_upload_file(full_local_path):
      ftp.mkd(directory)
      
  for directory in first_level_directories:
    full_local_path = local_full_path + "/" + directory
    remote_folder_path_cur = remote_folder_path + "/" + directory
    # print("full_local_path: ", full_local_path)
    # print("remote_folder_path_cur: ", remote_folder_path_cur)
    if can_upload_file(full_local_path):
      print()
      upload_files_recursivly(ftp, directory, full_local_path, remote_folder_path_cur)
      ftp.cwd("..")

  

  
  

def main_script():
  try:
    # create FTP server
    print("Creating FTP server")
    ftp = FTP(SECRET_HOST_NAME)

    # login to the server
    print("Logging in to the FTP server")
    ftp.login(user=SECRET_USER_NAME, passwd=SECRET_PASSWORD)
    print("Login successful")
    
    # list the files in the current directory
    root_files = ftp.nlst()
    
    if upload_folder not in root_files:
      # throw error if the folder does not exist
      print("Folder does not exist")
      # print("Existing Folders: ", root_files)
      print("Specified Uploading folder", upload_folder)
      print("Creating test folder")
      ftp.mkd(upload_folder)
    else:
      print("Deleting files from the FTP server")
      # Recursively delete files in the upload folder
      delete_folder_contents(ftp, upload_folder)
    
    print()
    
    # Upload all files from the Git repository
    print("Uploading files to the FTP server")
    repo_root_path = subprocess.check_output(['git', 'rev-parse', '--show-toplevel']).decode('utf-8').strip()
    ftp.mkd(upload_folder)
    upload_files_recursivly(ftp, upload_folder, upload_folder, repo_root_path)
    



    # close the connection
    print("Closing the FTP server connection")
    ftp.quit()
  except Exception as e:
    print(e)
    print('Error: Unable to connect to the FTP server')
    
print("Script executed")
    
    
  
  
if __name__ == "__main__":
  main_script()


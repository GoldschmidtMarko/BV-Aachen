import os
import sys
from ftplib import FTP

SECRET_HOST_NAME = os.getenv('SECRET_HOST_NAME')
SECRET_PASSWORD = os.getenv('SECRET_PASSWORD')
SECRET_USER_NAME = os.getenv('SECRET_USER_NAME')

upload_folder = "test"

def upload_file(ftp, file_path):
  with open(file_path, "rb") as file:
    ftp.storbinary(f"STOR {file_path}", file)

def delete_file(ftp, file_path):
    try:
      ftp.delete(file_path)
      print(f"Deleted {file_path} from the FTP server.")
    except Exception as e:
      print(f"Could not delete {file_path} from the FTP server: {e}")

def main_script(modified_files, deleted_files):
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
      print("Existing Folders: ", root_files)
      print("Specified Uploading folder", upload_folder)
      raise Exception("Folder does not exist")

    # delete everything in the folder
    print("Deleting everything in the folder")
    files_in_folder = ftp.nlst(upload_folder)
    
    # delete all files and folders in the folder
    for file in files_in_folder:
      ftp.delete(file)
    
    # Upload modified and added files
    for file in modified_files.split():
      if os.path.isfile(file):
        upload_file(ftp, file)
    
    # Delete removed files
    for file in deleted_files.split():
      delete_file(ftp, file)
    


    # close the connection
    ftp.quit()
  except Exception as e:
    print(e)
    print('Error: Unable to connect to the FTP server')
    
    
  
  
if __name__ == "__main__":
  modified_files = sys.argv[1]
  deleted_files = sys.argv[2]
  main_script(modified_files, deleted_files)


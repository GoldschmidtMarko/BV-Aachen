import os
import sys
from ftplib import FTP

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


def upload_file(ftp, file_path):
  with open(file_path, "rb") as file:
    print(f"Uploading {file_path} to the FTP server.")
    ftp.storbinary(f"STOR {file_path}", file)
    

def delete_file(ftp, file_path):
    try:
      ftp.delete(file_path)
      print(f"Deleted {file_path} from the FTP server.")
    except Exception as e:
      print(f"Could not delete {file_path} from the FTP server: {e}")
      
      
def can_upload_file(file_name):
  for uploadable_file_name in uploadable_file_names:
    if uploadable_file_name in file_name:
      return True
  return False
  

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


    print("Attempt to upload modified files: ", modified_files)
    # Upload modified and added files
    for file in modified_files.split():
      if os.path.isfile(file):
        if can_upload_file(file):
          upload_file(ftp, file)
    
    # Delete removed files
    print("Attempt to delete files: ", deleted_files)
    for file in deleted_files.split():
      delete_file(ftp, file)
    


    # close the connection
    print("Closing the FTP server connection")
    ftp.quit()
  except Exception as e:
    print(e)
    print('Error: Unable to connect to the FTP server')
    
print("Script executed")
    
    
  
  
if __name__ == "__main__":
  modified_files = sys.argv[1]
  deleted_files = sys.argv[2]
  main_script(modified_files, deleted_files)


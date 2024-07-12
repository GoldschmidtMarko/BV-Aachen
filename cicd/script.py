import os
from ftplib import FTP

SECRET_HOST_NAME = os.getenv('SECRET_HOST_NAME')
SECRET_PASSWORD = os.getenv('SECRET_PASSWORD')
SECRET_USER_NAME = os.getenv('SECRET_USER_NAME')

try:
    # create FTP server
    ftp = FTP(SECRET_HOST_NAME)

    # login to the server
    ftp.login(user=SECRET_USER_NAME, passwd=SECRET_PASSWORD)

    # list the files in the current directory
    files = ftp.nlst()
    print(files)

    # close the connection
    ftp.quit()
except Exception as e:
  print(e)
  print('Error: Unable to connect to the FTP server')


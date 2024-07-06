import os

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.realpath(__file__))

# List all files in the directory
files = os.listdir(script_dir)

# Print the names of all files
for file in files:
    if os.path.isfile(os.path.join(script_dir, file)):
        print(file)
